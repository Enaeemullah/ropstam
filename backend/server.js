const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const middleware = require('./middleware/middleware')

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

dotenv.config();

require('./db/conn');
const User = require('./models/userSchema');

app.use(express.json());
const PORT = process.env.PORT;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Server is working on PORT 4000' });
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill the fields.' });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.json({ error: 'Invalid Credentials.' });
      } else {
        res.status(200).json({ message: 'User login successfully' });
      }
    } else {
      res.json({ error: 'Invalid Credentials.' });
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

app.get('/detail', middleware, (req, res) => {
 console.log("Helo from middleware");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
