var hscs = angular.module("hscs", [ "ngRoute", "ngAnimate", "ngSanitize" ]);
hscs.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl: 	"views/home.html",
		controller: 	"mainController"
	}).when("/about", {
		templateUrl: 	"views/about.html",
		controller: 	"aboutController"
	}).when("/events", {
		templateUrl: 	"views/events.html",
		controller: 	"eventController"
	}).when("/register", {
		templateUrl: 	"views/register.html",
		controller: 	"registerController"
	}).otherwise({
		templateUrl: 	"views/404.html",
		controller: 	"newsController"
	});
});

hscs.controller("mainController", function($scope, $http) {
	$scope.message = "The Student-Run High School CTF League";
});

hscs.controller("newsController", function($scope, $http, $routeParams, $filter) {

});

hscs.controller("indexController", function($scope, $http) {

});

hscs.controller("aboutController", function($scope, $http) {
	$scope.message = "About HSCS.io";
});

hscs.controller("eventController", function($scope, $http) {
	$scope.message = "Upcoming CTFs";
});

hscs.controller("registerController", function($scope, $http) {
	$scope.message = "Organize a CTF";
});

// Ripples :D
$('[data-toggle="tooltip"]').tooltip();$(document).ready(function(){(function(e,t){t(function(){t(".altripple").on("click",function(n){n.preventDefault();var r=t("<div/>"),i=t(this).offset(),s=n.pageX-i.left,o=n.pageY-i.top;r.addClass("ripple-effect");var u=t(".ripple-effect");u.css("height",t(this).height());u.css("width",t(this).height());r.css({top:o-u.height()/2,left:s-u.width()/2,background:t(this).data("ripple-color")}).appendTo(t(this));e.setTimeout(function(){r.remove()},2e3)})})})(window,jQuery)});