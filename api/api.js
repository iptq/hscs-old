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
	
	app.post("/api/ctf/new", function(req, res) {
		ctfs.new_ctf(req, res);
	});

	app.get("/api/teams", function(req, res) {
		teams.get_teams(req, res);
	});
	app.get("/api/teams/one", function(req, res) {
		teams.get_one_team(req, res);
	});
	app.post("/api/teams/create", function(req, res) {
		teams.create_team(req, res);
	});
	app.post("/api/teams/delete", function(req, res) {
		teams.delete_team(req, res);
	});

	app.get("/api/user/loggedin", function(req, res) {
		res.send({
			status: (req.session.user && req.session.user["username"]) ? 1 : 0
		});
		return;
	});
	app.get("/api/user/me", function(req, res) {
		res.send({
			status: (req.session.user && req.session.user["username"]) ? 1 : 0,
			user: req.session.user
		});
	});
	app.get("/api/user/logout", function(req, res) {
		req.session.user = null;
		res.send({
			status: 1
		});
	});
	app.post("/api/user/register", function(req, res) {
		users.register_user(req, res);
	});
	app.post("/api/user/login", function(req, res) {
		users.login_user(req, res);
	});
};