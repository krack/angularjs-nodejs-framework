
var configureAPI = require('./server/rest/rest-api-database');
var auth = require('./server/authentication/authentification.module');

module.exports.configureAPI = configureAPI;
module.exports.auth = auth;