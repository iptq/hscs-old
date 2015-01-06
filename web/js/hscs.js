var app = angular.module("hscs", [
	"ngRoute"
]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "partials/home.html",
		controller: "pageController"
	}).when("/upcoming", {
		templateUrl: "partials/upcoming.html",
		controller: "pageController"
	}).when("/archive", {
		templateUrl: "partials/archive.html",
		controller: "pageController"
	}).when("/calendar", {
		templateUrl: "partials/calendar.html",
		controller: "pageController"
	}).when("/teams", {
		templateUrl: "partials/teams.html",
		controller: "pageController"
	}).when("/about", {
		templateUrl: "partials/about.html",
		controller: "pageController"
	}).when("/register", {
		templateUrl: "partials/register.html",
		controller: "pageController"
	}).when("/login", {
		templateUrl: "partials/login.html",
		controller: "pageController"
	}).otherwise("/404", {
		templateUrl: "partials/404.html",
		controller: "pageController"
	});
}]);

app.controller("pageController", function($scope, $location, $http) {
});

// stuff

var register_form = function() {
	$("#register_form input").attr("disabled", "disabled");
	$("#register_msg").hide();
	$.ajax({
		url: "/api/user/register",
		method: "POST",
		data: {
			email: $("#email").val(),
			username: $("#username").val(),
			password: $("#password").val()
		},
		dataType: "json"
	}).done(function(data) {
		var alert_class = "";
		if (data.status == 1) {
			alert_class = "alert-success";
		} else {
			alert_class = "alert-danger";
			$("#register_form input").removeAttr("disabled");
		}
		$("#register_msg").html("<div class='alert " + alert_class + "'>" + data.message + "</div>");
		$("#register_msg").slideDown("medium", "swing");
		setTimeout(function() {
			$("#register_msg").slideUp("medium", "swing", function() {
				$("#register_msg").html("");
			});
		}, 2000);
	});
};

var login_form = function() {
	$("#login_form input").attr("disabled", "disabled");
	$("#login_msg").hide();
	$.ajax({
		url: "/api/user/login",
		method: "POST",
		data: {
			email: $("#email").val(),
			password: $("#password").val()
		},
		dataType: "json"
	}).done(function(data) {
		var alert_class = "";
		if (data.status == 1) {
			alert_class = "alert-success";
		} else {
			alert_class = "alert-danger";
			$("#login_form input").removeAttr("disabled");
		}
		$("#login_msg").html("<div class='alert " + alert_class + "'>" + data.message + "</div>");
		$("#login_msg").slideDown("medium", "swing");
		setTimeout(function() {
			$("#login_msg").slideUp("medium", "swing", function() {
				$("#login_msg").html("");
			});
		}, 2000);
	});
};