import userRepository from '../repositories/user.repository.js';

class UserController {
  async getUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userRepository.getUserById(userId);

      if (!user || user.deletedAt) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.query;

      if (!email) {
        return res
          .status(400)
          .json({ message: 'Email query parameter is required' });
      }

      const user = await userRepository.getUserByEmail(email);

      if (!user || user.deletedAt) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userRepository.updateUser(userId, req.body);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id, 10);
      const deletedUser = await userRepository.softDeleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req, res, next) {
    try {
      const users = await userRepository.listUsers(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
