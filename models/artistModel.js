const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: [true, "first name is requred"],
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  artistCode: {
    type: String,
    required: true,
  },
  genres: {
    type: [
      {
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
      },
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

const Artist = model("Artist", artistSchema);
module.exports.Artist = Artist;
