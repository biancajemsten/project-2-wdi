const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  title: String,
  city: String,
  content: String,
  url: String,
  fileMetadata: Object
},{
  timestamps: true
});


module.exports = mongoose.model('Recommendation', recommendationSchema);

//also add tags and images (when mvp is reached)
