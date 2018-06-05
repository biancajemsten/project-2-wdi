const mongoose = require('mongoose');

const Recommendation = require('../models/recommendation');

const countrySchema = new mongoose.Schema({
  country: String,
  recommendation: [Recommendation.schema],
  countryCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'}
},{
  timestamps: true
});



module.exports = mongoose.model('Country', countrySchema);
