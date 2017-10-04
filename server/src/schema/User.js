import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const minlength = [5, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

const User = new Schema({
  user_name: 'String',
  email: 'String',
  password: {
    type: 'String',
    minlength: 6,
  },
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
