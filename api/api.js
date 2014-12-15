var ctfs = require("./ctfs");

module.exports = function(app) {
	app.get("/ctfs/next", function(req, res) {
		ctfs.get_next_ctf(req, res);
	});
	app.get("/ctfs/upcoming", function(req, res) {
		ctfs.get_upcoming_ctfs(req, res);
	});
	app.get("/ctfs/all", function(req, res) {
		ctfs.get_all_ctfs(req, res);
	});
};