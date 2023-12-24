const { Schema, model, default: mongoose } = require("mongoose");

const playlistSchema = new Schema({
  usersId: {
    type: [
        {
            userId: {
            type: String,
          },
        }
    ],
    required: true,
  },
  songs:{
    type:[
        {
            song:{
                type: mongoose.Types.ObjectId,
                ref: "Song",
            }
        }
    ]
  }
  
});

const Playlist = model("Playlist", playlistSchema);
module.exports.Playlist = Playlist;
