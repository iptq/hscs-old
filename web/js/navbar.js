$(document).ready(function() {
	$.ajax({
		url: "/api/loggedin",
		method: "GET",
		dataType: "json"
	}).done(function(loggedin) {
		alert(loggedin);	
	}).fail(function() {
		alert("something fucked up");
	});
});