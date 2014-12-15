var ctfs = require("./ctfs");

module.exports = function(app) {
	app.get("/ctf/next", function(req, res) {
		ctfs.get_next_ctf();
	});
};