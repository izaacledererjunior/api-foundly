import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.listUsers);
router.get('/email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
