import express from 'express';
const router = express.Router();
import {registeredUser, loginUser, ViewUser, checkLogin, logout} from '../controllers/authController.js';
import IsLoggedIn from '../middlewares/IsLoggedIn.js';

router.post('/signup', registeredUser);
router.post('/login', loginUser);
router.post('/viewUsers', ViewUser);
router.get("/check-login", checkLogin);
router.get('/logout', IsLoggedIn, logout);

export default router; // Ensure this is a router object