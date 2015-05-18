(function() {
	var app = angular.module('tableOfPersons', []);

	app.controller('PersonsController', function($scope){

	    $scope.people = persons;
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
	  });

    app.directive('customModal', function(){
           return{
               restrict: 'E',
               template: '<div class="modal fade">' + 
                          '<div class="modal-dialog">' + 
                            '<div class="modal-content">' + 
                              '<div class="modal-header">' + 
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="showLastMen(men)">&times;</button>' + 
                                '<h4 class="modal-title">{{ title }}</h4>' + 
                              '</div>' + 
                              '<div class="modal-body" ng-transclude></div>' + 
                              '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-default" data-dismiss="modal" ng-click="showLastMen(men)">{{ buttonCancel }}</button>' +
                                '<button type="button" class="btn btn-primary" ng-click="showLastMen(men)">{{ buttonOk }}</button>' +
                              '</div>' +
                            '</div>' +                             
                          '</div>' + 
                        '</div>',
               transclude:true,
               replace:true,
               scope:true,
               link: function postLink(scope, element, attrs) {
                   scope.buttonOk=attrs.oktext;
                   scope.buttonCancel=attrs.canceltext;

                   scope.$watch(attrs.show, function(value){
                        if(value == true){
                            $(element).modal('show');
                        }else{
                            $(element).modal('hide');    
                        }
                   });
                   scope.$watch(attrs.header, function(value){
                        scope.title = value;
                   });

                   $(element).on('shown.bs.modal', function(){
                      scope.$apply(function(){
                        scope.$parent[attrs.show] = true;
                      });
                    });


                    $(element).on('hidden.bs.modal', function(){
                      scope.$apply(function(){
                        scope.$parent[attrs.show] = false;
                      });
                    });

               }
           }
       }) 

    app.directive('denixDir', function() {
      return {
        restrict: 'E',
        template: "Denis Skachko <b>directive</b>"
      };
    });  

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