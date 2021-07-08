const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Busboy = require('busboy');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { email, password, name, lastName, birthday } = req.body;

    const dbUser = await User.find({ email });

    const isEmailTaken = dbUser.length > 0;
    if (isEmailTaken) {
      throw new Error('Already exists an user using that email');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ email, password: passwordHash, name, lastName, birthday });

    const createdUser = await user.save();

    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;

    const token = jwt.sign({ id: createdUser._id, name, lastName }, JWT_SECRET, { expiresIn: JWT_SESSION_TIME });

    res.send({ accessToken: token, expiresIn: JWT_SESSION_TIME });
  } catch (e) {
    console.log(e);
    res.status(500).send({ err: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await User.find({ email: email });

    const dbPassword = user?.password || '';
    const isPasswordOk = await bcrypt.compare(password, dbPassword);

    if (!user || !isPasswordOk) {
      throw new Error('Wrong email or password');
    }

    const { _id, name, lastName } = user;

    const tokenPayload = { _id, name, lastName };
    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_SESSION_TIME });

    await user.save();

    res.send({ accessToken: token, expiresIn: JWT_SESSION_TIME });
  } catch (e) {
    console.log(e);
    res.status(500).send({ err: e.message });
  }
};

exports.getSelfProfile = async (req, res) => {
  try {
    const { userId } = req.auth;

    const user = await User.findById(userId);

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ err: e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.auth;
    console.log('id', userId);

    const busboy = new Busboy({ headers: req.headers });
    let saveTo = '';

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      saveTo = 'uploads/images/profiles/' + filename;
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', async function () {
      const user = await User.findByIdAndUpdate(userId, { $set: { avatar: saveTo } }, { new: true });
      console.log('user', user);
      res.send(user);
    });

    req.pipe(busboy);
  } catch (e) {
    console.log(e);
    res.status(500).send({ err: e.message });
  }
};
