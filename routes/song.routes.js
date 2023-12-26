const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  getAllSongs,
  getSongById,
  getSongByName,
  getSongByArtist,
  getSongByEmo,
  getSongByGenre,
  getSongByPeriodTag,
  addSong,
  deleteSong,
} = require("../controllers/songController");

const router = express.Router();

router.get("/", getAllSongs);
router.get("/songById/:id", getSongById);
router.get("/songByName", getSongByName);
router.get("/songByArtist", getSongByArtist);

router.get("/songByEmo/:emo", getSongByEmo);
router.get("/songByGenre/:gen", getSongByGenre);
router.get("/songByPeriodTag/:pTag", getSongByPeriodTag);

router.post("/", auth(), addSong);
router.delete("/:id", auth(), deleteSong);

module.exports = router;
