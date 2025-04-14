import itemRepository from '../repositories/item.repository.js';

class ItemController {
  async createItem(req, res, next) {
    try {
      const item = await itemRepository.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async getItems(req, res, next) {
    try {
      const items = await itemRepository.getItems(req.query);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getDeletedItems(req, res, next) {
    try {
      const items = await itemRepository.getDeletedItems();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getActiveItems(req, res, next) {
    try {
      const items = await itemRepository.getActiveItems();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const item = await itemRepository.getItemById(parseInt(req.params.id));
      if (!item || item.deletedAt) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const item = await itemRepository.updateItem(
        parseInt(req.params.id),
        req.body
      );
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const deletedItem = await itemRepository.softDeleteItem(
        parseInt(req.params.id)
      );
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      const updatedItem = await itemRepository.updateItem(parseInt(id), {
        foto: file.location,
      });

      res.status(200).json({
        message: 'Image uploaded successfully.',
        item: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ItemController();
