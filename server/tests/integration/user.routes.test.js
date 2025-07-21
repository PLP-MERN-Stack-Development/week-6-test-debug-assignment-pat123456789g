const request = require('supertest');
const app = require('../../src/index');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/controllers/userController');

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'Password123',
        profile: {
          firstName: 'New',
          lastName: 'User'
        }
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.password).toBeUndefined();
    });

    test('should reject registration with invalid email', async () => {
      const userData = {
        username: 'newuser',
        email: 'invalid-email',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });

    test('should reject registration with weak password', async () => {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'weak'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });

    test('should reject duplicate email registration', async () => {
      const userData = {
        username: 'firstuser',
        email: 'duplicate@example.com',
        password: 'Password123'
      };

      // Create first user
      await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      // Try to create second user with same email
      const duplicateData = {
        username: 'seconduser',
        email: 'duplicate@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(duplicateData)
        .expect(400);

      expect(response.body.error).toBe('User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      // Create a test user
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      });
      await user.save();
    });

    test('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(200);

      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(loginData.email);
      expect(response.body.user.lastLogin).toBeDefined();
    });

    test('should reject login with invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error).toBe('Invalid credentials');
    });

    test('should reject login with invalid password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPassword'
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error).toBe('Invalid credentials');
    });

    test('should reject login for inactive user', async () => {
      // Deactivate the user
      await User.findOneAndUpdate(
        { email: 'test@example.com' },
        { isActive: false }
      );

      const loginData = {
        email: 'test@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error).toBe('Account deactivated');
    });
  });

  describe('GET /api/users/me', () => {
    let user, token;

    beforeEach(async () => {
      user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      });
      await user.save();
      token = generateToken(user._id);
    });

    test('should get current user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.user.username).toBe(user.username);
      expect(response.body.user.email).toBe(user.email);
    });

    test('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .expect(401);

      expect(response.body.error).toBe('Access denied. No token provided.');
    });

    test('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.error).toBe('Invalid token.');
    });
  });

  describe('PUT /api/users/profile', () => {
    let user, token;

    beforeEach(async () => {
      user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      });
      await user.save();
      token = generateToken(user._id);
    });

    test('should update user profile successfully', async () => {
      const updateData = {
        profile: {
          firstName: 'Updated',
          lastName: 'Name',
          avatar: 'https://example.com/avatar.jpg'
        }
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Profile updated successfully');
      expect(response.body.user.profile.firstName).toBe(updateData.profile.firstName);
      expect(response.body.user.profile.lastName).toBe(updateData.profile.lastName);
    });

    test('should reject profile update with invalid avatar URL', async () => {
      const updateData = {
        profile: {
          avatar: 'invalid-url'
        }
      };

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });
});
