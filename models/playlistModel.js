const { Schema, model, default: mongoose } = require("mongoose");

const playlistSchema = new Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    default: "My Playlist",
  },
  participants: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  songs: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
});

const Playlist = model("Playlist", playlistSchema);
module.exports.Playlist = Playlist;
