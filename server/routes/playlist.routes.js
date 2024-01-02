const express = require("express");
const {
  createPlaylist,
  addSong,
  getAllPlaylists,
  addParticipant,
  deleteSong,
  deleteParticipant,
  getPlaylistsByName
} = require("../controllers/playlistController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allPlaylists", auth(), getAllPlaylists);
router.get("/playlistsByName", auth(), getPlaylistsByName);
router.post("/createPlaylist", auth(), createPlaylist);
router.patch("/:playlistId/addSong", auth(), addSong);
router.patch("/:playlistId/addParticipant", auth(), addParticipant);

router.patch("/:playlistId/deleteSong", auth(), deleteSong);
router.patch("/:playlistId/deleteParticipant", auth(), deleteParticipant);
module.exports = router;
