import express from 'express';
import itemController from '../controllers/item.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post(
  '/:id/upload',
  authMiddleware,
  upload.single('foto'),
  itemController.uploadImage
);
router.post('/', authMiddleware, itemController.createItem);
router.get('/', authMiddleware, itemController.getItems);
router.get('/deleted', authMiddleware, itemController.getDeletedItems);
router.get('/active', authMiddleware, itemController.getActiveItems);
router.get('/:id', authMiddleware, itemController.getItemById);
router.put('/:id', authMiddleware, itemController.updateItem);
router.delete('/:id', authMiddleware, itemController.deleteItem);

export default router;
