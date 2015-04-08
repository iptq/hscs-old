var common = require("./common");

exports.new_ctf = function(req, res) {
	if (req.session.user && req.session.user.group == 0) {
		var name = req.param("name");
		var url = req.param("url");
		var start_time = req.param("start_time");
		var end_time = req.param("end_time");
		var contact = req.param("contact");
		if (!name || !url || !start_time || !end_time || !contact) {
			return res.send({
				success: 0,
				message: "Fill out all the fields."
			});
		}
	}
};