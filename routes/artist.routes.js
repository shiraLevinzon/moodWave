const express = require("express");
const { getAllArtists } = require("../controllers/artistController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allArtist", auth(), getAllArtists);
// router.post("/createPlaylist", auth(), createPlaylist);
// router.patch("/:playlistId/addSong", auth(), addSong);
// router.patch("/:playlistId/addParticipant", auth(), addParticipant);

module.exports = router;
