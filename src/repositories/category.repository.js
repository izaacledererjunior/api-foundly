import prisma from '../utils/prismaClient.js';

class CategoryRepository {
  async createCategory(data) {
    return await prisma.categoria.create({ data });
  }

  async getAllCategories() {
    return await prisma.categoria.findMany();
  }

  async getCategoryById(id) {
    return await prisma.categoria.findUnique({ where: { id } });
  }

  async updateCategory(id, data) {
    return await prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id) {
    return await prisma.categoria.delete({ where: { id } });
  }
}

export default new CategoryRepository();
