const mongoose = require('mongoose');


const recommendationSchema = new mongoose.Schema({
  title: String,
  city: String,
  content: String,
  url: String,
  fileMetadata: Object,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
},{
  timestamps: true
});


module.exports = mongoose.model('Recommendation', recommendationSchema);
