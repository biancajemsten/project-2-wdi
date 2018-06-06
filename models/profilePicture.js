const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
  title: String,
  url: String,
  fileMetadata: Object
});

module.exports = mongoose.model('profilePicture', profilePictureSchema);
