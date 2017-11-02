'use strict';

var path = process.cwd();
var PictureHandler = require(path + '/app/back/pictureHandler.js');
var UserHandler = require(path + '/app/back/userHandler.js');

module.exports = function(app) {

	var pictureHandler = new PictureHandler();
	var userHandler = new UserHandler();

	app.route('/api/pics')
		.post(pictureHandler.addPicture)
		.get(pictureHandler.getPictures);

	app.route('/api/pics/:id')
		.put(pictureHandler.updatePicture);
		//.delete(pictureHandler.removePicture);

	app.route('/api/mypics')
		.post(pictureHandler.getMyPictures);

	app.route('/auth/facebook')
		.post(userHandler.login);

	app.use(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
