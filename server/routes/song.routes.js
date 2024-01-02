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

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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



router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        public_id: `audio/${Date.now()}`,
        audio_codec: 'mp3', // Adjust based on your audio file format
      },
      async (error, result) => {
        if (error) throw error;

        // Save the Song object to MongoDB with the songUrl

        const body = req.body;
        const artistId = res.locals.userId;

        const newSong = new Song(body);
        //save the parent referncing to the current loded in user
        newSong.artistCode = artistId;
        newSong.songUrl = result.secure_url;
        await newSong.save();

        res.json({ url: result.secure_url });
      }
    );
    req.file.stream.pipe(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
