const mongoose = require('mongoose');

const recommendationPictureSchema = new mongoose.Schema({
  title: String,
  url: String,
  fileMetadata: Object
});

module.exports = mongoose.model('recommendationPicture', recommendationPictureSchema);
