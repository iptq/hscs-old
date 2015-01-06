var common = require("./common");

exports.get_teams = function(req, res) {
	common.db.collection("teams").find({

	}).toArray(function(err, teams) {
		res.send({
			status: 1,
			teams: teams
		});
	});
};