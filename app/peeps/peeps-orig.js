'use strict';

angular.module('myPeepsApp.peeps', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/peeps', {
    templateUrl: 'peeps/peeps.html',
    controller: 'PeepsCtrl'
  });
}])

.controller('PeepsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
//init Firebase
 var ref = new Firebase('https://mypeepsapp.firebaseio.com/peeps');

 $scope.peeps = $firebaseArray(ref);

 // Show Add Form
 	$scope.showAddForm = function(){
 		$scope.addFormShow = true;
    $scope.peepShowIntro = true;
 	}

  // Show Edit Form
  	$scope.showEditForm = function(peep){
  		$scope.editFormShow = true;
      $scope.peepShowIntro = true;
      $scope.peepShow = true;
      $scope.actions = true;
      // $scope.peepHide = true;

      $scope.$id			    = peep.$id;
      $scope.name 			= peep.name;
      $scope.email 			= peep.email;
      $scope.company 			= peep.company;
      $scope.work_phone 		= peep.phones[0].work;
      $scope.home_phone 		= peep.phones[0].home;
      $scope.mobile_phone 	= peep.phones[0].mobile;
      $scope.street_address 	= peep.address[0].street_address;
      $scope.city 			= peep.address[0].city;
      $scope.state 			= peep.address[0].state;
      $scope.zipcode 			= peep.address[0].zipcode;

  	}


 	// Hide Forms
 	$scope.hide = function(){
 		$scope.addFormShow = false;
    $scope.editFormShow = false;
    $scope.actions = false;
    $scope.peepShow = false;
 	}
  //Submit Peep
  $scope.addFormSubmit = function() {
    console.log('Adding Peep to contact list...');

    //Must assign default null values for Firebase
    if($scope.name){ var name = $scope.name } else { var name = null; }
		if($scope.email){ var email = $scope.email; } else { var email = null; }
		if($scope.company){ var company = $scope.company; } else { var company = null; }
		if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = null; }
		if($scope.home_phone){ var home_phone = $scope.home_phone; } else { var home_phone = null; }
		if($scope.work_phone){ var work_phone = $scope.work_phone; } else { var work_phone = null; }
		if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = null; }
		if($scope.city){ var city = $scope.city; } else { var city = null; }
		if($scope.state){ var state = $scope.state; } else { var state = null; }
		if($scope.zipcode){ var zipcode = $scope.zipcode; } else { var zipcode = null; }

    $scope.peeps.$add({
      name: name,
      email: email,
      company: company,
      phones: [
        {
          mobile_phone: mobile_phone,
          home_phone: home_phone,
          work_phone: work_phone
        }
      ],
      address: [
        {
          street_address: street_address,
          city: city,
          state: state,
          zipcode: zipcode
        }
      ]
    }).then(function(ref){
      var id = ref.key();
      console.log('Added Peep with ID: '+id);
      //Clear form fields
      clearFields();
      //Hide Add Peep Form
      $scope.addFormShow = false;
      //Send Message
      $scope.msg = 'Peep added.'
    });

  }

  $scope.editFormSubmit = function(){
		console.log('Updating Peep...');

		// Get ID
		var id = $scope.id;

		// Get Record
		var record = $scope.peeps.$getRecord(id);
    console.log(record);

		// Assign Values
		record.name 						= $scope.name;
		record.email 						= $scope.email;
		record.company 						= $scope.company;
		record.phones[0].work 				= $scope.work_phone;
		record.phones[0].home 				= $scope.home_phone;
		record.phones[0].mobile 			= $scope.mobile_phone;
		record.address[0].street_address 	= $scope.street_address;
		record.address[0].city 				= $scope.city;
		record.address[0].state 			= $scope.state;
		record.address[0].zipcode 			= $scope.zipcode;

		// Save Conrtact
		$scope.peeps.$save(record).then(function(ref){
			console.log(ref.key);
		});

		clearFields();

		// Hide Form
		$scope.editFormShow = false;

		$scope.msg = "Peep Updated";
	}


  $scope.showPeep = function(peep) {
    console.log('Getting Peep...');

    $scope.name = peep.name;
    $scope.email = peep.email;
    $scope.company = peep.company;
    $scope.mobile_phone = peep.phones[0].work;
    $scope.home_phone = peep.phones[0].home;
    $scope.work_phone = peep.phones[0].mobile;
    $scope.street_adress = peep.address[0].street_address;
    $scope.city = peep.address[0].city;
    $scope.state = peep.address[0].state;
    $scope.zipcode = peep.address[0].zipcode;


    $scope.peepShow = true;


  }

  $scope.removeContact = function(peep){
		console.log('Removing Peep');

		$scope.peeps.$remove(peep);

		$scope.msg="Peep Removed";
	}

  function clearFields() {
    console.log('Clearing All Fields...');

    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_adress = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }

}]);
