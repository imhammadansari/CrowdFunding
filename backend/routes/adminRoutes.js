import express from 'express';
const router = express.Router();
import {registeredUser, loginUser, logout} from '../controllers/adminController.js';
import isAdminLoggedIn from '../middlewares/isAdminLoggedIn.js';

router.post('/admin_signup_safe', registeredUser);
router.post('/adminLogin', loginUser);
router.get('/adminLogout', isAdminLoggedIn, logout);

export default router; // Ensure this is a router object