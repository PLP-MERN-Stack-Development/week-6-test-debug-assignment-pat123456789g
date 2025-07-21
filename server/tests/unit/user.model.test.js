const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');

describe('User Model', () => {
  describe('User Creation', () => {
    test('should create a valid user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
        profile: {
          firstName: 'Test',
          lastName: 'User'
        }
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).not.toBe(userData.password); // Should be hashed
      expect(savedUser.profile.firstName).toBe(userData.profile.firstName);
      expect(savedUser.role).toBe('user'); // Default role
      expect(savedUser.isActive).toBe(true); // Default active
    });

    test('should require username, email, and password', async () => {
      const user = new User({});
      
      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.username).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    test('should not allow duplicate email', async () => {
      const userData = {
        username: 'testuser1',
        email: 'test@example.com',
        password: 'Password123'
      };

      await User.create(userData);

      const duplicateUser = new User({
        username: 'testuser2',
        email: 'test@example.com',
        password: 'Password123'
      });

      let error;
      try {
        await duplicateUser.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // Duplicate key error
    });

    test('should validate email format', async () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Password123'
      };

      const user = new User(userData);
      
      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    test('should enforce minimum password length', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: '123'
      };

      const user = new User(userData);
      
      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });
  });

  describe('Password Hashing', () => {
    test('should hash password before saving', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };

      const user = new User(userData);
      await user.save();

      expect(user.password).not.toBe(userData.password);
      expect(user.password.length).toBeGreaterThan(50); // Hashed password is longer
    });

    test('should compare password correctly', async () => {
      const password = 'Password123';
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password
      };

      const user = new User(userData);
      await user.save();

      const isMatch = await user.comparePassword(password);
      const isNotMatch = await user.comparePassword('wrongpassword');

      expect(isMatch).toBe(true);
      expect(isNotMatch).toBe(false);
    });
  });

  describe('User Methods', () => {
    test('should return full name virtual', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
        profile: {
          firstName: 'John',
          lastName: 'Doe'
        }
      };

      const user = new User(userData);
      expect(user.fullName).toBe('John Doe');
    });

    test('should handle empty names in full name virtual', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
        profile: {}
      };

      const user = new User(userData);
      expect(user.fullName).toBe('');
    });

    test('should find active users', async () => {
      await User.create({
        username: 'activeuser',
        email: 'active@example.com',
        password: 'Password123',
        isActive: true
      });

      await User.create({
        username: 'inactiveuser',
        email: 'inactive@example.com',
        password: 'Password123',
        isActive: false
      });

      const activeUsers = await User.findActiveUsers();
      expect(activeUsers).toHaveLength(1);
      expect(activeUsers[0].username).toBe('activeuser');
    });
  });

  describe('JSON Transformation', () => {
    test('should exclude password from JSON output', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };

      const user = new User(userData);
      await user.save();

      const userJSON = user.toJSON();
      expect(userJSON.password).toBeUndefined();
      expect(userJSON.username).toBe(userData.username);
      expect(userJSON.email).toBe(userData.email);
    });
  });
});
