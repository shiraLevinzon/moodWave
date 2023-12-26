const express = require("express");
const {
  getAllArtists,
  simpleRegister,
  login,
} = require("../controllers/artistController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allArtist", auth(), getAllArtists);
router.post("/register", auth(), simpleRegister);
router.post("/login", login);
// router.patch("/:playlistId/addSong", auth(), addSong);
// router.patch("/:playlistId/addParticipant", auth(), addParticipant);

module.exports = router;
