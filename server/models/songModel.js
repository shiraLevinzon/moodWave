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
  genres: {
    type: [
      {
        type: String,
        enum: [
          "Rock",
          "Pop",
          "Hip Hop",
          "Jazz",
          "Blues",
          "Country",
          "Electronic",
          "Classical",
          "Metal",
          "Funk",
          "Soul",
          "Rap",
          "Mizrahi",
          "Israeli",
        ],
      },
    ],
    required: true,
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
  periodTag: {
    type: [
      {
        type: String,
        enum: [
          "summer",
          "winter",
          "spring",
          "none"
        ],
      },
    ],
    required: true,
  },

  image: {
    type: String,
  },
  date_upload: {
    type: Date,
    default: Date.now(),
  },
});

const Song = model("Song", songSchema);
module.exports.Song = Song;
