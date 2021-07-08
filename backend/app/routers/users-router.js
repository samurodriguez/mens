const express = require('express');
const router = express.Router();

const { validateAuth } = require('../middlewares/validate-auth');
const { register, login, getSelfProfile, updateUser } = require('../controllers/users-controllers');

router.route('/profile').all(validateAuth).get(getSelfProfile).put(updateUser);
router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
