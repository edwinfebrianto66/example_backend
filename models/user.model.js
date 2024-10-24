// models/user.model.js
const db = require('../config/db.config');

const User = function (user) {
	this.name = user.name;
	this.email = user.email;
};

User.getAll = (result) => {
	db.query('SELECT * FROM user', (err, res) => {
		if (err) {
			console.log('Error: ', err);
			result(err, null);
			return;
		}
		result(null, res);
	});
};

// Mencari user berdasarkan username
User.findByUsername = (username) => {
	return new Promise((resolve, reject) => {
		db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
			if (err) {
				return reject(err); // Menolak promise jika ada kesalahan
			}
			resolve(results); // Mengembalikan hasil query
		});
	});
};


module.exports = User;
