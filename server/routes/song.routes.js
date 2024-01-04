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
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Song } = require("../models/songModel");


const router = express.Router();

router.get("/", getAllSongs);
router.get("/songById/:id", getSongById);
router.get("/songByName", getSongByName);
router.get("/songByArtist", getSongByArtist);

router.get("/songByEmo/:emo", getSongByEmo);
router.get("/songByGenre/:gen", getSongByGenre);
router.get("/songByPeriodTag/:pTag", getSongByPeriodTag);

router.delete("/:id", auth(), deleteSong);


router.post("/", async (req, res) => {
  // Get the file name and extension with multer
  console.log(req);
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log(req.file);
    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },

      // Send cloudinary response or catch error
      async (err, audio) => {
        if (err) return res.send(err);


        fs.unlinkSync(path);

        const body = req.body;
        const artistId = res.locals.userId;
        const newSong = new Song(body);
        //save the parent referncing to the current loded in user
        newSong.artistCode = artistId;
        newSong.songUrl = audio.secure_url;
        await newSong.save();

        res.status(200).send(newSong);
      }
    );
  });
});


module.exports = router;
