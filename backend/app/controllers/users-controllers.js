const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, lastName, birthday } = req.body;

    const user = new User({ name, last_name: lastName, birthday });

    const saveUser = await user.save();

    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;

    const token = jwt.sign({ id: saveUser._id, name, lastName }, JWT_SECRET, { expiresIn: JWT_SESSION_TIME });

    res.send({ accessToken: token, expiresIn: JWT_SESSION_TIME });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.getSelfProfile = async (req, res) => {
  try {
    const { id } = req.auth;

    const user = await User.findById(id);
    console.log(id);

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.auth;

    const user = await User.findByIdAndUpdate(id, { avatar: 'sadasdaa' });

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
