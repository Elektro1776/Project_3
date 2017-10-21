import mongoose from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const minlength = [6, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

const User = new Schema({
  username: 'String',
  email: 'String',
  salt: 'String',
  password: {
    type: 'String',
    minlength,
  },
  git_profile: {
    login: 'String',
    id: 'String',
  },
});

// User.plugin();
module.exports = mongoose.model('User', User);
