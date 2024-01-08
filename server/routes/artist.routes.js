const express = require("express");
const {
  getAllArtists,
  simpleRegister,
  login,
  updateArtist,
} = require("../controllers/artistController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allArtist", getAllArtists);
router.post("/register", simpleRegister);
router.post("/login", login);
router.patch("/:artistId", updateArtist);
// router.patch("/:playlistId/addParticipant", auth(), addParticipant);

module.exports = router;
