import express from 'express';
import { signup, login, logout, deleteUser } from '../controllers/userController.js';
import {auth } from '../middleware/auth';


const router = express.Router();

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/logout",auth, logout);

router.delete("/user/delete/:id", deleteUser);


export default router;
