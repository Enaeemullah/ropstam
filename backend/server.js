const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
const User = require('./models/userSchema');

app.use(express.json());
const PORT = process.env.PORT;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill the fields.' });
    }
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      res.json({ message: 'Error' });
    } else {
      res.status(200).json({ message: 'User login successfully' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: 'Please fill all fields.' });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'User already exist.' });
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({ error: 'User register successfully.' });
  } catch (error) {
    console.log(error);
  }
});

app.get('/login', (req, res) => {
  res.json({ message: 'Welcome to Ropstam application.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
