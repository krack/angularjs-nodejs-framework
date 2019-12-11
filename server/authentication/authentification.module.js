
var configureAPI = require('../rest/rest-api-database');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

module.exports = function init(configuration, app) {
	// Passport session setup.
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	app.use(session({ secret: 'keyboard cat', key: 'sid' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cookieParser());

	function checkConnectedFunction(req, res, next) {
		if (req.isAuthenticated()) {
			serviceUser.find({ "facebookId": req.user.id }).then(function (users) {
				if (users.length > 0) {
					req.principal = users[0];
					return next();
				} else {
					res.sendStatus(401);
				}
			});

		} else {
			res.sendStatus(401);
		}
	}

	var userModel = [
		{
			"name": "displayName",
			"type": "String"
		},
		{
			"name": "owner",
			"type": "Boolean",
			"restrictUpdate": ""
		},
		{
			"name": "administrator",
			"type": "Boolean",
			"restrictUpdate": "o"
		},
		{
			"name": "profilPhoto",
			"type": "String"
		}
	];

	//update model in fonction of 
	if (configuration.facebook) {
		userModel.push({
			"name": "facebookId",
			"type": "String"
		});
	}


	var configApp = {
		"baseApi": "/api/users/",
		"shema": 'users',
		"api": {
			"delete": "a",
			"get": "m",
			"put": "o",
		}
	}

	var serviceUser = configureAPI(configApp, userModel, app, checkConnectedFunction, null);



	if (configuration.facebook) {

		passport.use(new FacebookStrategy({
			clientID: configuration.facebook.api_key,
			clientSecret: configuration.facebook.api_secret,
			callbackURL: configuration.facebook.callback_url,
			profileFields: ['id', 'displayName', 'picture.type(large)']
		},
			function (accessToken, refreshToken, profile, done) {
				process.nextTick(function () {
					return done(null, profile);
				});
			}
		));

		app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: [] }));
		app.get('/auth/facebook/callback', passport.authenticate('facebook'), function (req, res) {

			serviceUser.find({ "facebookId": req.user.id }).then(function (users) {
				serviceUser.find({ "owner": "true" }).then(function (owners) {
					var hasOwner = owners.length !== 0;
					// if not already exist this user : create it
					if (!users.length) {
						serviceUser.create({
							"facebookId": req.user.id,
							"displayName": req.user.displayName,
							"owner": !hasOwner,
							"administrator": false,
							"profilPhoto": (req.user.photos[0]) ? req.user.photos[0].value : null
						}).then(function (user) {
							res.redirect(302, configuration.redirectUrl);
						});
					} else {
						//update the existing user
						var user = users[0];
						var updated = false;
						//update picture
						if (req.user.photos[0]) {
							user.profilPhoto = req.user.photos[0].value;
							updated = true;
						}
						if (!hasOwner) {
							user.owner = true;
							updated = true;
						}
						if (updated) {
							serviceUser.update(user._id, user).then(function (user) {
								res.redirect(302, configuration.redirectUrl);
							});
						} else {
							res.redirect(302, configuration.redirectUrl);
						}
					}
				});

			});

		}
		);

	}


	app.get('/api/me', function (req, res) {
		console.log("GET /api/me");
		if (req.isAuthenticated()) {
			serviceUser.find({ "facebookId": req.user.id }).then(function (users) {
				if (users.length) {
					res.json(users[0]);
				} else {
					res.sendStatus(401);
				}
			});
		} else {
			res.sendStatus(401);
		}
	});



	return {
		"checkConnectedFunction": checkConnectedFunction
	}

};