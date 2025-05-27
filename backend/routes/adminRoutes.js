const express = require('express');
const router = express.Router();
const {registeredUser, loginUser, logout} = require('../controllers/adminController.js');
const isAdminLoggedIn = require('../middlewares/isAdminLoggedIn.js');

router.post('/admin_signup_safe', registeredUser);
router.post('/adminLogin', loginUser);
router.get('/adminLogout', isAdminLoggedIn, logout);

module.exports = router;