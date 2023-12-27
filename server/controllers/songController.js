const { Song } = require("../models/songModel");
const Joi = require("joi");

const perPage = 10;

// const songJoiSchema = {
//     songS: Joi.object().keys({
//         name: Joi.string().required(),
//         duration: Joi.string().required(),
//         songUrl: Joi.string().required(),
//         genres: Joi.array().required(),
//         artistCode: Joi.string(), // Assuming artistCode is a string (change as needed)
//         emotion: Joi.string().required(),
//         periodTag: Joi.array().required(),
//         image: Joi.string(),
//         date_upload: Joi.date().default(Date.now(), 'current date'),
//     }),
// };

exports.getAllSongs = async (req, res, next) => {
  try {
    const { page } = req.query;

    const songs = await Song.find()
      //   .populate("artistCode")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
exports.getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.find({ _id: id });
    res.send(song);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.getSongByName = async (req, res, next) => {
  try {
    const { sname, page } = req.query;
    const songs = await Song.find({ name: sname })
      //   .populate("artistCode")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.getSongByArtist = async (req, res, next) => {
  try {
    const { artist, page } = req.query;
    const songs = await Song.find({ artistCode: artist })
      //   .populate("_id")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
exports.getSongByEmo = async (req, res, next) => {
  try {
    const { emo } = req.params;
    const { page } = req.query;
    const songs = await Song.find({ emotion: emo })
      //   .populate("artistCode")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.getSongByGenre = async (req, res, next) => {
  try {
    const { gen } = req.params;
    const { page } = req.query;
    const songs = await Song.find({ genres: { $in: [gen] } })
      //   .populate("artistCode")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
exports.getSongByPeriodTag = async (req, res, next) => {
  try {
    const { pTag } = req.params;
    const { page } = req.query;
    const songs = await Song.find({ periodTag: { $in: [pTag] } })
      //   .populate("artistCode")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.addSong = async (req, res, next) => {
  const body = req.body;
  const artistId = res.locals.userId;
  try {
    // const valid = songJoiSchema.songS.validate(body);
    // if (valid.error) {
    //     throw Error(valid.error);
    // }
    const newSong = new Song(body);
    //save the parent referncing to the current loded in user
    newSong.artistCode = artistId;
    await newSong.save();
    res.status(201).send(newSong);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
exports.deleteSong = async (req, res, next) => {
  try {
    //console.log(req.params.id);
    const song = await Song.findOne({ _id: req.params.id });
    if (res.locals.userId != song.artistCode)
      return res
        .status(404)
        .json({ msg: "the login artist cant delete this song" });

    const delItem = await Song.findByIdAndDelete(req.params.id);
    if (!delItem) return res.sendStatus(404);
    res.status(200).send(delItem);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
