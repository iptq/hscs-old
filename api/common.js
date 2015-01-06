var MongoDB = require("mongodb").Db;
var Server = require("mongodb").Server;
var crypto = require("crypto");
var moment = require("moment");
var entities_ = require("html-entities").XmlEntities;
require("dotenv").load();

var entities = new entities_();

exports.db = new MongoDB(process.env.MONGO_DB, new Server(process.env.MONGO_HOST, process.env.MONGO_PORT, { auto_reconnect: true }), { w: 1 });

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

exports.generate_string = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < length; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};