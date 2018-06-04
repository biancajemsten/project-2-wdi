const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country: String,
  recommendation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation'}]
},{
  timestamps: true
});

module.exports = mongoose.model('country', countrySchema);
