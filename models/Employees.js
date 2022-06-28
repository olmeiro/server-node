const { Schema, model } = require('mongoose');
//Schema
const EmployeeSchema = Schema({
  first_name: {
    type: String,
    required: true
  }, 
  others_names: {
    type: String,
    required: false
  },
  first_surname: {
    type: String,
    required: true
  },
  second_last_name: {
    type: String,
    required: false
  },
  country_employment: {
    type: String,
    required: true
  },
  type_identification: {
    type: String,
    required: true
  },
  number_identification: {
    type: String,
    required: true,
    unique: true
  }, 
  email: {
    type: String,
    required: true
  },
  start:{
    type: Date,
    required: true
  },
  end:{
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

//Sobreescribiendo el toJSON
EmployeeSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Employee', EmployeeSchema);