/**
 * Module dependencies.
 */
var monk = require("monk");
var wrap = require("co-monk");

/**
 * Creates an monk database from the connectionstring
 *
 * @param {connectionString} connection string to mongodb
 * @return {database} a monk database object
 * @api public
 */
var getDatabase = function (connectionString){
	return monk(connectionString);
};
module.exports.getDatabase = getDatabase;

/**
 * Creates generator friendly collection
 *
 * @param {connectionString} connection string to mongodb
 * @param {collectionName} the name of the collection to return
 * @return {Collection}
 * @api public
 */
var getCoMonkCollection = function (connectionString, collectionName) {
	var db = getDatabase(connectionString);
	return wrap(db.get(collectionName));
};
module.exports.getCollection = getCoMonkCollection;