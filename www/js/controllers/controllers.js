'use strict';

angular.module('todoApp.controllers', ['todoApp.list-controller'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state, $ionicSideMenuDelegate, FolderSrvc) {


  /*************** #Modal Stuff ***************/

  /* Add Folder Modal */ 
  $ionicModal.fromTemplateUrl('add-folder-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addFolderModal = modal;
  });

  $scope.openAddFolderModal = function() {
    $scope.addFolderModal.show();
  };

  $scope.closeAddFolderModal = function() {
    $scope.addFolderModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.addFolderModal.remove();
  });  

  /* Edit Folder Modal */

  $ionicModal.fromTemplateUrl('edit-folder-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editFolderModal = modal;
  });

  $scope.openEditFolderModal = function() {
    $scope.editFolderModal.show();
  };

  $scope.closeEditFolderModal = function() {
    $scope.editFolderModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.editFolderModal.remove();
  });

  /* End of Modal */


  /*************** #Folder Related Data ***************/

  $scope.folders = FolderSrvc.getAll();
  $scope.activeFolder = [] 
  $scope.currentlyEditingFolder = 0;
  $scope.selectedFolder = 0;
  $scope.listViewActive = false;

  $scope.foldersCanSwipe = true
  $scope.shouldShowDelete = false;

  /*************** #Folder Functions ***************/

  $scope.toggleDeleteFolder = function(){
    $scope.shouldShowDelete = $scope.shouldShowDelete ? false : true;
  }

  $scope.createFolder = function(folder){
    var folderToAdd = angular.copy(folder);
    $scope.folders.push(folderToAdd);
    folder.title = "";
    FolderSrvc.save($scope.folders);
    $scope.closeAddFolderModal();
  }  

  $scope.selectFolder = function(index){
    $scope.activeFolder = $scope.folders[index];
    // $ionicSideMenuDelegate.toggleLeft(false);
    FolderSrvc.setLastActiveFolder(index);
    $scope.listViewActive = true;
  }

  $scope.deleteFolder = function(index){
    $scope.folders.splice(index, 1)
    FolderSrvc.save($scope.folders);
  }

  $scope.editFolder = function($event, index){
    //Stop the default behavior of the parent element
    $event.stopPropagation();

    //Set selected folder index and set folder to edit.
    $scope.selectedFolder = index;
    $scope.folderToEdit = angular.copy($scope.folders[index]);

    //Open the edit folder modal
    $scope.openEditFolderModal();
  }

  $scope.updateFolder = function(newTitle){
    $scope.folders[$scope.selectedFolder].title = newTitle;
    FolderSrvc.save($scope.folders);
    $scope.closeEditFolderModal();
  }

  /* End Of Folder Functions */
})