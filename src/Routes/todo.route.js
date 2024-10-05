import express from 'express';
import todoController from '../Controllers/todo.controller.js';
import auth from '../Middlewares/auth.middleware.js';

const todoRoute = express.Router();

const controller = new todoController();

todoRoute.get('/', auth,controller.getAllByEmail);
todoRoute.post('/add',auth,controller.add);
todoRoute.post('/delete/:id', auth, controller.delete);


export default todoRoute;