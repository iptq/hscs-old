var ctfs = require("./ctfs");
var users = require("./users");
var teams = require("./teams");
var common = require("./common");

module.exports = function(app) {
	app.get("/api", function(req, res) {
		res.send({
			status: 1,
			message: "API is up and running!"
		});
		return;
	})

	app.get("/api/teams", function(req, res) {
		teams.get_teams(req, res);
	});

	app.post("/api/user/register", function(req, res) {
		users.register_user(req, res);
	});
	app.post("/api/user/login", function(req, res) {
		users.login_user(req, res);
	});
};