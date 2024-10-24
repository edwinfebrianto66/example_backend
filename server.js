// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const user = require('./routes/user.routes.js');
const loginAuth = require('./routes/login.routes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// User
app.use('/api/user', user);


//Login
app.use('/v1/login', loginAuth);
// Server listen
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
