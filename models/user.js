const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Country = require('../models/country');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true},
  age: String,
  nationality: String,
  currentlyIn: String,
  url: String,
  fileMetadata: Object,
  password: { type: String, required: true },
  country: [Country.schema]
},{
  timestamps: true
});


// countries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Country'}]



userSchema.virtual('countries', {
  localField: '_id',
  foreignField: 'countryCreator',
  ref: 'User'
});


userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  next();
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });


userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('password');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
