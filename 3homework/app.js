(function() {
	var app = angular.module('tableOfPersons', ['ngRoute']);

	app.controller('PersonsController', ['$http', '$scope', function($http, $scope){
        $scope.people = [];

        $http.get('../sampleJSON.json').success(function(data){
            $scope.people = data;
        });

	    //$scope.people = persons;
	    $scope.contentIsShow = false;
	    $scope.buttonText = 'Show Lesson Content';
	    $scope.predicate ="age";

        $scope.showContent = function(){	    	
	    	if($scope.contentIsShow) {
	    		$scope.buttonText = 'Show Lesson Content';
	    	}else{
	    		$scope.buttonText = 'Hide Lesson Content'
	    	}
	    	$scope.contentIsShow = !$scope.contentIsShow;	
	    }
      $scope.showContent();


        $scope.showModal = false;
        $scope.titleWindow = null;
        $scope.showCustomModal = function(men){
            $scope.showModal = !$scope.showModal;
            $scope.men = men;
            $scope.titleWindow = men.firstName + ' ' + men.lastName;
        };	
        $scope.showLastMen = function(lastMen){
            $scope.lastMenIsSubmite = true;
            $scope.lastMen = lastMen;
        } 
        $scope.hideCustomModal = function(){
            $scope.showModal = false;
        } 
	  }]);
    
    app.directive('customModal', function(){
           return{
               restrict: 'E',
               templateUrl: "modal.html",
               transclude:true,
               replace:true,
               scope:true,
               link: function postLink(scope, element, attrs) {
                   scope.buttonOk=attrs.oktext;
                   scope.buttonCancel=attrs.canceltext;
                   
                   scope.$watch(attrs.header, function(value){
                        scope.title = value;
                   });

                   

               }
           }
       }) 

    app.controller('PersonViewController', function($scope, $routeParams, $location){
        var id = $routeParams.id;
        var peoples = $scope.people;
        $scope.currentMen = {}; 
        $scope.currentMenIndex = null;

        for (var i=0; i< peoples.length; i++){
            for (p in peoples[i]){
                if (p =='id' && peoples[i][p] == id){
                    $scope.currentMen = angular.copy(peoples[i]);
                    $scope.currentMenIndex = i;
                    break; 
                }
            }
        }
        $scope.updateMen = function(){            
            $scope.showValidationMessage = true;
            if($scope.updateForm.$invalid) {
                return;
            };
            $scope.people[$scope.currentMenIndex] = angular.copy($scope.currentMen);
            $location.path('/list');
        }
    })

    app.config(function($routeProvider, $locationProvider){
        $routeProvider
         .when("/",{
            templateUrl:"list.html"
        })
        .when("/list",{
            templateUrl:"list.html"
        })
        .when("/person/:id",{
            templateUrl:"personView.html",
            controller:'PersonViewController'
        })
        .otherwise({
            redirectTo:'/'
        })
    })



	var persons = [
        {
            "firstName": "John",
            "lastName": "Smith",
            "age": 25,
            "address":
            {
                "streetAddress": "21 2nd Street",
                "city": "New York",
                "state": "NY",
                "postalCode": "10021"
            },
            "phoneNumber":
                [
                    {
                        "type": "home",
                        "number": "212 555-1234"
                    },
                    {
                        "type": "fax",
                        "number": "646 555-4567"
                    }
                ]
        },
        {
            "firstName": "Simona",
            "lastName": "Morasca",
            "age": 22,
            "address":
            {
                "streetAddress": "3 Mcauley Dr",
                "city": "Ashland",
                "state": "OH",
                "postalCode": "44805"
            },
            "phoneNumber":
                [
                    {
                        "type": "home",
                        "number": "419-503-2484"
                    },
                    {
                        "type": "fax",
                        "number": "419-800-6759"
                    }
                ]
        },
        {
            "firstName": "Josephine",
            "lastName": "Darakjy",
            "age": 33,
            "address":
            {
                "streetAddress": "4 B Blue Ridge Blvd",
                "city": "Brighton",
                "state": "MI",
                "postalCode": "48116"
            },
            "phoneNumber":
                [
                    {
                        "type": "home",
                        "number": "973-605-6492"
                    },
                    {
                        "type": "fax",
                        "number": "602-919-4211"
                    }
                ]
        }
    ]
})();