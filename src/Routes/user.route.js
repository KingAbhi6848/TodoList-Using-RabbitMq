import express from 'express';
import userController from '../Controllers/user.controller.js';
import { validateSignup } from '../Middlewares/validation.middleware.js';
const userRoute = express.Router();


const user = new userController();


userRoute.get('/signin',user.signin);
userRoute.get('/signup',user.signup);

userRoute.post('/create',validateSignup, user.createUser);
userRoute.post('/login',user.login);
userRoute.post('/logout',user.logout);

export default userRoute;