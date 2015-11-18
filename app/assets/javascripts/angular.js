var app = angular.module('AngryEmailApp', ['ngRoute']);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Routes Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('RouteController', ['$http', '$scope', '$route', '$routeParams', '$location',
function($http, $scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}]);

app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/application/angular', {
    templateUrl: '/templates/new.html',
    controller: 'EmailController',
    controllerAs: 'emailCtrl'
  }).when('/search', {
    templateUrl: '/templates/index.html',
    controller: 'EmailController',
    controllerAs: 'emailCtrl'
  }).when('/enter', {
    templateUrl: '/templates/enter.html',
    controller: 'EmailController',
    controllerAs: 'emailCtrl'
  }).when('/emails/:id', {
    templateUrl: '/templates/show.html',
    controller: 'SpecificController',
    controllerAs: 'specificCtrl',
  })
}]);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Session Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SessionController', ['$http', '$scope', '$window',
function($http, $scope, $window) {
  var controller = this;

  $http.get('/session').success(function (data) {
    controller.current_user = data.current_user;
  });

  this.deleteSession = function () {
    $http.delete('/session', {
    }).success(function(data){
    })
  }
}])

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Email Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('EmailController', ['$http', '$scope', function($http, $scope) {
  var controller = this;
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var randomWords = ['bark', 'santa', 'hippo', 'jar']
  var number
  var word
  var password

  this.getEmails = function () {
    $http.get('emails').success(function(data) {
      controller.emails = data.emails
      controller.current_user = data.current_user
    })
  }

  this.setPassword = function () {
    number = Math.floor(Math.random()*randomWords.length)
    word = randomWords[number]

    controller.word = word
  }

  this.setPassword();

  this.createEmail = function () {
    $http.post('/emails', {
      authenticity_token: authenticity_token,
      email: {
        recipient: controller.newEmail.recipient,
        body: controller.newEmail.body,
        password: word
      }
    }).success(function(data){
      controller.newEmail = {};
    }).error(function (data, error) {
      console.log("error")
    })
  }

  this.secretPassword = function () {
    password = controller.password
    controller.password = ""


    $http.get('emails').success(function(data) {
      var emails = []

      angular.forEach(data.emails, function (value) {
        if (value.password === password) {
          emails.push(value)
        }
      });
      controller.user_id = data.current_user_id
      controller.emails = emails
    })
  }

  this.deleteEmail = function (email) {
    console.log(email)

    $http.delete('/emails/'+ email.id, {

      //include authenticity_token
    }).success(function(data){
    }).error(function(data, status) {
    });
  }

}]);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Specific Email Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SpecificController', ['$http', '$scope', '$routeParams', '$location', '$window',
function($http, $scope, $routeParams, $location, $window) {
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var controller = this;

  this.getEmail = function () {
    $http.get('/emails/'+ $routeParams.id +'.json', {

      }).success(function(data){
        controller.email = data
      }).error(function(data, status) {
      });
    }

    this.deleteEmail = function () {

      $http.delete('/emails/'+ $routeParams.id, {

      }).success(function(data){
        console.log('deleted!')
        $location.path("/search");
      }).error(function(data, status) {
        $location.path("/search");
      });
    }

 this.getEmail()
}])
