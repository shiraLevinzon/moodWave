const { Schema, model, default: mongoose } = require("mongoose");

const playlistSchema = new Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
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
        song: {
          type: mongoose.Types.ObjectId,
          ref: "Song",
        },
      },
    ],
  },
});

const Playlist = model("Playlist", playlistSchema);
module.exports.Playlist = Playlist;
