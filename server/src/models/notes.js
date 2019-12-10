const mongoose = require('mongoose');

const { Schema } = mongoose;

const notesSchema = new Schema({
  date: Date,
  title: String,
  type: String,
  latLng: {
    lat: Number,
    lng: Number,
  },
  place: String,
  text: String,
});

module.exports = mongoose.model('notes', notesSchema);
