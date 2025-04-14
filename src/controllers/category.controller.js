import CategoryRepository from '../repositories/category.repository.js';

class CategoryController {
  async createCategory(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res
          .status(400)
          .json({ message: 'The "nome" field is required.' });
      }

      const category = await CategoryRepository.createCategory({ nome });
      return res.status(201).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error creating the category.',
          error: error.message,
        });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryRepository.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error fetching the categories.',
          error: error.message,
        });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryRepository.getCategoryById(Number(id));
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error fetching the category.',
          error: error.message,
        });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!nome) {
        return res
          .status(400)
          .json({ message: 'The "nome" field is required.' });
      }

      const category = await CategoryRepository.updateCategory(Number(id), {
        nome,
      });
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error updating the category.',
          error: error.message,
        });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await CategoryRepository.deleteCategory(Number(id));
      return res
        .status(200)
        .json({ message: 'Category successfully deleted.' });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error deleting the category.',
          error: error.message,
        });
    }
  }
}

export default new CategoryController();
