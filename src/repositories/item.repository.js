import prisma from '../utils/prismaClient.js';

class ItemRepository {
  async createItem(data) {
    return await prisma.item.create({ data });
  }

  async getItems(filter) {
    const where = {
      deletedAt: null,
      ...(filter.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter.category && { categoryId: parseInt(filter.category) }),
      ...(filter.status && { status: filter.status }),
    };

    return await prisma.item.findMany({ where });
  }

  async getDeletedItems() {
    return await prisma.item.findMany({
      where: { deletedAt: { not: null } },
    });
  }

  async getActiveItems() {
    return await prisma.item.findMany({
      where: { deletedAt: null },
    });
  }

  async getItemById(id) {
    return await prisma.item.findUnique({ where: { id } });
  }

  async updateItem(id, data) {
    return await prisma.item.update({
      where: { id },
      data,
    });
  }

  async softDeleteItem(id) {
    return await prisma.item.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export default new ItemRepository();
