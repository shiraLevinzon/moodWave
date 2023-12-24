const { Schema, model, default: mongoose } = require("mongoose");

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "Rock",
      "Pop",
      "Hip Hop",
      "R&B",
      "Jazz",
      "Blues",
      "Country",
      "Electronic",
      "Classical",
      "Reggae",
      "Folk",
      "Indie",
      "Metal",
      "Punk",
      "Funk",
      "Soul",
      "EDM",
      "Gospel",
      "Rap",
      "Techno",
      "Mizrahi",
      "Israeli",
    ],
  },
  artistCode: {
    type: mongoose.Types.ObjectId,
    ref: "Artist",
  },
  emotion: {
    type: String,
    enum: [
      "anger",
      "disgust",
      "fear",
      "happiness",
      "neutral",
      "sadness",
      "surprise",
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date_upload: {
    type: Date,
    default: Date.now(),
  },
});

const Song = model("Song", songSchema);
module.exports.Song = Song;
