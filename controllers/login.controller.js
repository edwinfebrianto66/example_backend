// controllers/user.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.login = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
	try {
        const results = await User.findByUsername(username); // Menggunakan async/await
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = results[0];
        // Tambahkan log untuk melihat nilai yang diambil dari database
        // console.log('User from DB:', user);

        // Periksa apakah password hash valid
        if (!user.password_hash) {
            return res.status(500).json({ message: 'User found but password is missing.' });
        }

        // Bandingkan password
        const passwordIsValid = bcrypt.compareSync(password, user.password_hash.replace(/^\$2y\$/, '$2a$'));

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        res.json({ auth: true, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching user.' });
    }
};