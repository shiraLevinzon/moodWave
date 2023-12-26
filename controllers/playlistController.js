const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Playlist } = require("../models/playlistModel");
const { generateToken } = require("../utils/jwt");
const { User } = require("../models/UserModel");
const { Song } = require("../models/songModel");

const playlistJoiSchema = {};

const isOwner = async (playlistId, userId) => {
  const playlist = await Playlist.findOne({ _id: playlistId });
  if (playlist.ownerId == userId) return true;
  return false;
};

const checkIfUserExists = async (userId) => {
  const user = await User.findOne({ _id: userId });
  console.log(user);
  if (user) return true;
  return false;
};

exports.getAllPlaylists = async (req, res, next) => {
  //by user (add participant)
  const userId = res.locals.userId;
  try {
    // const playlists = await Playlist.find({ ownerId: userId });
    const playlists = await Playlist.find({
      $or: [
        { ownerId: userId }, // Playlists where the user is the owner
        { participants: { $in: [userId] } }, // Playlists where the user is a participant
      ],
    }).populate("songs.song");
    res.send(playlists);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createPlaylist = async (req, res, next) => {
  const userId = res.locals.userId;
  try {
    const emptyPlaylist = {
      ownerId: userId,
      songs: [],
      participants: [],
    };
    const newPlaylist = new Playlist(emptyPlaylist);
    await newPlaylist.save();
    return res.status(201).send(newPlaylist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addSong = async (req, res, next) => {
  const playlistId = req.params.playlistId;
  const body = req.body;
  try {
    const p = await Playlist.findOne({ _id: playlistId });
    console.log(p);
    const newSongs = [...p.songs, body.song];
    console.log(newSongs);
    const playlist = await Playlist.updateOne(
      { _id: playlistId },
      { songs: newSongs }
    );
    res.send(playlist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addParticipant = async (req, res, next) => {
  const playlistId = req.params.playlistId;
  const body = req.body;
  try {
    if (!(await checkIfUserExists(body.participant)))
      throw new Error("user is not exist");
    const p = await Playlist.findOne({ _id: playlistId });
    const newParticipant = [...p.participants, body.participant];
    const playlist = await Playlist.updateOne(
      { _id: playlistId },
      { participants: newParticipant }
    );
    res.send(playlist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
