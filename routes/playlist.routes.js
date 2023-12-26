const express = require("express");
const {
  createPlaylist,
  addSong,
  getAllPlaylists,
  addParticipant,
} = require("../controllers/playlistController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allPlaylists", auth(), getAllPlaylists);
router.post("/createPlaylist", auth(), createPlaylist);
router.patch("/:playlistId/addSong", auth(), addSong);
router.patch("/:playlistId/addParticipant", auth(), addParticipant);

module.exports = router;
