const { Schema, model } = require('mongoose');

//schema
const UsersSchema = Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('User', UsersSchema);
