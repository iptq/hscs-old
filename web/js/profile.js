(function () {
	window.new_ctf = function() {
		$.ajax({
			url: "/api/ctf/new",
			method: "POST",
			cache: false,
			async: true,
			data: {
				name: $("#new_ctf_name").val(),
				url: $("#new_ctf_url").val(),
				start_time: $("#new_ctf_start").val(),
				end_time: $("#new_ctf_end").val(),
				contact: $("#new_ctf_contact").val()
			}
		}).done(function(data) {
			console.log(data);
		});
	};
})();