var common = require("./common");
var ObjectID = require("mongodb").ObjectID;
var entities_ = require("html-entities").XmlEntities;
var entities = new entities_();

exports.get_teams = function(req, res) {
	common.db.collection("teams").find({
	}).toArray(function(err, teams) {
		res.send({
			status: 1,
			teams: teams
		});
	});
};

exports.delete_team = function(req, res) {
	if (req.session.user) {
		common.db.collection("teams").find({
			_id: new ObjectID(req.param("id"))
		}).toArray(function(err, teams) {
			if (teams.length == 0 || teams.length > 1) {
				res.send({
					status: 0,
					message: "Team not found."
				});
				return;
			}
			var team = teams[0];
			if (team.admin == req.session.user._id.valueOf()) {
				common.db.collection("teams").remove({
					_id: new ObjectID(req.param("id"))
				}, { w: 1 }, function(err2, docs) {
					res.send({
						status: 1,
						message: "Deleted team."
					});
					return;
				});
				return;
			} else {
				res.send({
					status: 0,
					message: "You're not admin."
				});
				return;
			}
		});
	} else {
		res.send({
			status: 0,
			message: "You're not logged in."
		});
		return;
	}
}

exports.create_team = function(req, res) {
	if (req.session.user) {
		var new_team = req.param("new_team").trim();
		if (!new_team) {
			res.send({
				status: 0,
				message: "Please enter a team name."
			});
			return;
		}
		if (req.param("new_team").length > 32) {
			res.send({
				status: 0,
				message: "Team name must be 32 characters long or less."
			});
			return;
		}
		common.db.collection("teams").find({
			name: new_team
		}).toArray(function(err, teams) {
			if (teams.length == 0) {
				common.db.collection("teams").insert({
					name: new_team,
					admin: req.session.user._id.valueOf(),
					members: [ req.session.user._id.valueOf() ],
					score: 0
				}, { w: 1 }, function(err2, result) {
					res.send({
						status: 1,
						message: "Great! You have a new team now!"
					});
					return;
				});
			} else {
				res.send({
					status: 0,
					message: "Team name is taken."
				});
				return;
			}
		});
	} else {
		res.send({
			status: 0,
			message: "You're not logged in."
		});
		return;
	}
};