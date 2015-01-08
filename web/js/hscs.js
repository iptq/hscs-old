var app = angular.module("hscs", [
	"ngRoute"
]).filter('trustUrl', function($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
});

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
	}).when("/profile", {
		templateUrl: "partials/profile.html",
		controller: "profileController"
	}).when("/logout", {
		templateUrl: "partials/logout.html",
		controller: "pageController"
	}).when("/register", {
		templateUrl: "partials/register.html",
		controller: "pageController"
	}).when("/login", {
		templateUrl: "partials/login.html",
		controller: "pageController"
	}).when("/team/:team", {
		templateUrl: "partials/viewteam.html",
		controller: "teamController"
	}).otherwise({
		templateUrl: "partials/404.html",
		controller: "404Controller"
	});
}]);

app.controller("pageController", function($scope, $location, $http) {
});

app.controller("privatePageController", function($scope, $location, $http) {
	redirect_if_not_logged_in();
});

app.controller("404Controller", function($scope, $location, $http) {
	$scope.getRandomHash = function() {
		var chars = "abcdef0123456789";
		var str = "";
		for(var i=0; i<32; i++) {
			str += chars.charAt(Math.floor(Math.random()*16));
		}
		return str;
	};
});

app.controller("profileController", function($scope, $location, $http) {
	redirect_if_not_logged_in();
	$scope.teams = [];
	$http.get("/api/teams").success(function(data, status) {
		var teams = [];
		$http.get("/api/user/me").success(function(data2, status) {
			if (data2.status == 1) {
				for(var i=0; i<data.teams.length; i++) {
					if (data.teams[i].members.indexOf(data2.user._id) != -1) {
						teams.push({
							id: data.teams[i]._id,
							name: data.teams[i].name,
							encoded_name: encodeURIComponent(encodeURIComponent(data.teams[i].name)),
							is_admin: data.teams[i].admin == data2.user._id,
							members: data.teams[i].members
						});
					}
				}
				$scope.teams = teams;
			}
		});
	});
});

app.controller("teamController", function($scope, $location, $http, $routeParams) {
	$http.get("/api/teams/one?name=" + $routeParams.team).success(function(data, status) {
		$scope.error = data.status == 0;
		if ($scope.error) {
			$scope.error_message = data.message;
		} else {
			$scope.team = data.team;
			$scope.team.encoded_name = encodeURIComponent(data.team.name);
		}
	});
});

var redirect_if_not_logged_in = function() {
	$.ajax({
		url: "/api/user/loggedin",
		method: "GET",
		dataType: "json"
	}).done(function(data) {
		if (data.status == 1) {
		} else {
			location.href = "#login";
		}
	});
};

// stuff

var delete_team = function(id) {
	$("#delete_team_" + id + "_form input").attr("disabled", "disabled");
	$("#delete_team_" + id + "_msg").hide();
	$.ajax({
		url: "/api/teams/delete",
		method: "POST",
		data: {
			id: id
		},
		dataType: "json"
	}).done(function(data) {
		var alert_class = "";
		if (data.status == 1) {
			alert_class = "alert-success";
		} else {
			alert_class = "alert-danger";
			$("#delete_team_" + id + "_form input").removeAttr("disabled");
		}
		$("#delete_team_" + id + "_msg").html("<div class='alert " + alert_class + "'>" + data.message + "</div>");
		$("#delete_team_" + id + "_msg").slideDown("medium", "swing");
		setTimeout(function() {
			$("#delete_team_" + id + "_msg").slideUp("medium", "swing", function() {
				$("#delete_team_" + id + "_msg").html("");
				if (data.status == 1) location.reload(true);
			});
		}, 2000);
	});
};

var create_new_team = function() {
	var name = $("#new_team").val();
	$("#new_team_form input").attr("disabled", "disabled");
	$("#new_team_msg").hide();
	$.ajax({
		url: "/api/teams/create",
		method: "POST",
		data: {
			new_team: name,
		},
		dataType: "json"
	}).done(function(data) {
		var alert_class = "";
		if (data.status == 1) {
			alert_class = "alert-success";
		} else {
			alert_class = "alert-danger";
			$("#new_team_form input").removeAttr("disabled");
		}
		$("#new_team_msg").html("<div class='alert " + alert_class + "'>" + data.message + "</div>");
		$("#new_team_msg").slideDown("medium", "swing");
		setTimeout(function() {
			$("#new_team_msg").slideUp("medium", "swing", function() {
				$("#new_team_msg").html("");
				if (data.status == 1) location.reload(true);
			});
		}, 2000);
	});
};

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
				if (data.status == 1) location.href = "#login";
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
				if (data.status == 1) location.href = "/";
			});
		}, 2000);
	});
};