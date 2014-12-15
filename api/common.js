var MongoDB = require("mongodb").Db;
var Server = require("mongodb").Server;
var crypto = require("crypto");
var moment = require("moment");
var entities_ = require("html-entities").XmlEntities;

var entities = new entities_();

exports.db = new MongoDB("heroku_app32493553", new Server("ds063140.mongolab.com", 63140, { auto_reconnect: true }), { w: 1 });

// REPLACE THE FOLLOWING WITH YOUR OWN CREDENTIALS
exports.db.open(function(err, database) {
	if (err) {
		console.log("[api/common.js] error connecting to database");
		console.dir(err);
	} else {
		console.log("[api/common.js] connected to database");
		database.authenticate(process.env.MONGO_USER, process.env.MONGO_PASS, function(err2, result) {
			if (err2) {
				console.log("[api/common.js] error authenticating to database");
				console.dir(err2);
			} else {
				console.log("[api/common.js] authenticated to database");
			}
		});
	}
});