const express = require('express');
const router = express.Router();

require('./db/conn');
const User = require('./models/userSchema');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Ropstam application.' });
});
