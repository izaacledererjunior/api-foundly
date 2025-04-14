import prisma from '../utils/prismaClient.js';

class UserRepository {
  async createUser(data) {
    return await prisma.user.create({ data });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async softDeleteUser(id) {
    return await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async listUsers(filter) {
    const where = {
      deletedAt: null,
      ...(filter.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter.email && {
        email: { contains: filter.email, mode: 'insensitive' },
      }),
    };

    return await prisma.user.findMany({ where });
  }
}

export default new UserRepository();
