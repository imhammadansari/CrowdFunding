const express = require('express');
const router = express.Router();
const {registeredUser, loginUser, ViewUser, checkLogin, logout} = require('../controllers/authController.js');
const IsLoggedIn = require('../middlewares/IsLoggedIn.js');

router.post('/signup', registeredUser);
router.post('/login', loginUser);
router.post('/viewUsers', ViewUser);
router.get("/check-login", checkLogin);
router.get('/logout', IsLoggedIn, logout);

module.exports = router;