// controllers/user.controller.js
const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {

	User.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving users.'
			});
		else res.send(data);
	});
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO user (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, email });
    });
};

