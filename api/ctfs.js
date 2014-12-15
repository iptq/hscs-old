var common = require("./common");

exports.get_next_ctf = function(req, res) {
	common.db.collection("ctfs").find({
	}).sort({
		startDate: -1
	}).toArray(function(err, ctfs) {
		if (err) {
			console.dir(err);
		} else {
			if (ctfs.length == 0) {
				res.send({
					success: 0,
					message: "No CTFs found."
				});
				return;
			} else {
				res.send({
					success: 1,
					ctf: ctfs[0]
				});
				return;
			}
		}
	});
};

exports.get_upcoming_ctfs = function(req, res) {
	common.db.collection("ctfs").find({
	}).sort({
		startDate: -1
	}).toArray(function(err, ctfs) {
		if (err) {
			console.dir(err);
		} else {
			if (ctfs.length == 0) {
				res.send({
					success: 0,
					message: "No CTFs found."
				});
				return;
			} else {
				res.send({
					success: 1,
					ctfs: ctfs
				});
				return;
			}
		}
	});
};