const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let CustomerSchema = new Schema({
	customerID: 'number',
	firstName: 'string',
	lastName: 'string',
	orders:'array'
	
}, {
	collection: 'customers'
});

module.exports = {
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("CustomerModel",
			CustomerSchema);
		};
		return model;
	}
};
























