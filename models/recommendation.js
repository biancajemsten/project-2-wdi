const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  title: String,
  city: String,
  content: String
},{
  timestamps: true
});


module.exports = mongoose.model('recommendation', recommendationSchema);

//also add tags and images (when mvp is reached)
