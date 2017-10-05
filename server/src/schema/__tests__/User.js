import mongoose from 'mongoose';
import User from '../User';

describe('Test that a user is created successfully', () => {
  const userToSave = {
    user_name: 'Austin',
    email: 'elektricwebdesign@gmail.com',
    password: 'testing',
  };
  const userBadCreds = {
    user_name: 'Austin',
    email: 'elektricwebdesign@gmail.com',
    password: 'test',
  };
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/uTile', {
      useMongoClient: true,
      promiseLibrary: require('bluebird'),
    })
      .then(() => {
        expect(true);
      })
      .catch((err) => {
        expect(err).toBeTruthy();
      });
  });
  test('Should create a user', () => {
    const user = new User(userToSave);
    user.save()
      .then((savedUser) => {
        expect(savedUser.user_name).toBe(user.user_name);
      })
      .catch((err) => {
        expect(err).toBeTruthy();
      });
  });
  test('Should fail creating a user with password less than 6 char long', () => {
    const user = new User(userBadCreds);
    user.save()
      .then((savedUser) => {
        expect(savedUser).toBe(user.user_name);
      })
      .catch((err) => {
        expect(err).toBeTruthy();
        expect(err.name).toBe('ValidationError');
      });
  });
  afterAll((done) => {
    User.deleteMany({ user_name: 'Austin' }).then(() => {
      console.info(' DELETE USERS');
    });
    mongoose.disconnect(done);
  });
});
