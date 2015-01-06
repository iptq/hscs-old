var common = require("./common");
var validator = require("validator");
var CryptoJS = require("crypto-js");

exports.login_user = function(req, res) {
	if (!(req.param("email") && req.param("password"))) {
		res.send({
			status: 0,
			message: "Please fill out all of the fields."
		});
		return;
	}
	if (!validator.isEmail(req.param("email"))) {
		res.send({
			status: 0,
			message: "Please enter a valid email."
		});
		return;
	}
	common.db.collection("users").find({
		email: req.param("email").toLowerCase()
	}).toArray(function(err, users) {
		if (err) {
			res.send({
				status: 0,
				message: "Can't fetch accounts.",
				details: err
			});
			return;
		} else {
			if (users.length <= 0) {
				res.send({
					status: 0,
					message: "Can't find that account."
				});
				return;
			} else if (users.length > 1) {
				res.send({
					status: 0,
					message: "Fuck you."
				});
				return;
			} else {
				var user = users[0];
				var salt = user.password.substring(0, 16);
				var password = salt + CryptoJS.SHA256(req.param("password") + salt);
				if (password === user.password) {
					req.session.user = user;
					res.send({
						status: 1,
						message: "Logged in successfully."
					});
					return;
				} else {
					res.send({
						status: 0,
						message: "Whoops... wrong password."
					});
					return;
				}
			}
		}
	});
};

exports.register_user = function(req, res) {
	if (!(req.param("email") && req.param("username") && req.param("password"))) {
		res.send({
			status: 0,
			message: "Please fill out all of the fields."
		});
		return;
	}
	if (!validator.isEmail(req.param("email"))) {
		res.send({
			status: 0,
			message: "Please enter a valid email.",
		});
		return;
	}
	common.db.collection("users").find({
		$or: [
			{ email: req.param("email").toLowerCase() },
			{ username: req.param("username") }
		],
	}).toArray(function(err, users) {
		if (err) {
			res.send({
				status: 0,
				message: "Can't fetch accounts.",
				details: err
			});
			return;
		} else {
			if (users.length == 0) {
				var salt = common.generate_string(16);
				common.db.collection("users").insert({
					email: req.param("email").toLowerCase(),
					username: req.param("username"),
					password: salt + CryptoJS.SHA256(req.param("password") + salt)
				}, { w: 1 }, function(err2, doc) {
					if (err2) {
						res.send({
							status: 0,
							message: "Can't insert document.",
							details: err2
						});
						return;
					} else {
						res.send({
							status: 1,
							message: "Registered successfully!"
						});
						return;
					}
				});
			} else {
				res.send({
					status: 0,
					message: "That email or username is already registered."
				});
				return;
			}
		}
	});
};