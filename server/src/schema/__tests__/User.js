import mongoose from 'mongoose';
import User from '../User';

describe('Test that a user is created successfully', () => {
  const userToSave = {
    user_name: 'Austin',
    email: 'elektricwebdesign@gmail.com',
    password: 'testing',
  };
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/uTile')
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

  afterAll((done) => {
    User.deleteMany({user_name: 'Austin'}).then(() => {
      console.log(' DELETE USERS');
    })
    mongoose.disconnect(done);
  });
});
