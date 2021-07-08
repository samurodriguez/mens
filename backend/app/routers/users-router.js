const express = require('express');
const router = express.Router();

const { validateAuth } = require('../middlewares/validate-auth');
const { register, getSelfProfile, updateUser } = require('../controllers/users-controllers');

router.route('/profile').all(validateAuth).get(getSelfProfile).put(updateUser);
router.route('/register').post(register);

module.exports = router;
