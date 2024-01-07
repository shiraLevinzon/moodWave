const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Artist } = require("../models/artistModel");
const { generateToken } = require("../utils/jwt");
const { User } = require("../models/UserModel");
const sendEmail = require("../utils/nodeMailer");

const artistJoiSchema = {
  login: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),
  }),
  simpleRegister: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().max(20).required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .error(() => Error("Email is not valid")),
    country: Joi.string(),
    genres: Joi.array(),
    image: Joi.string(),
    artistCode: Joi.string(),
    birthDate: Joi.date().less("now"),
  }),
};

const checkIfUserExists = async (email) => {
  const user = await Artist.findOne({ email });
  if (user) return user;
  return false;
};

const findArtist = async (email) => {
  const artist = await Artist.findOne({ email: email });
  if (artist) return artist;
  return false;
};

function generateBackupCode() {
  const generateRandomLetters = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const letters = generateRandomLetters(2);
  const digits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

  return `${letters}${digits}`;
}

const isAdmin = async (userId) => {
  const user = await User.findOne({ _id: userId });
  const isManager = user?.role == "admin";
  return isManager;
};

exports.getAllArtists = async (req, res, next) => {
  const userId = res.locals.userId;
  try {
    if (!(await isAdmin(userId)))
      throw new Error("You not allowd to get the artist list");
    const artist = await Artist.find(req.query);
    res.send(artist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.simpleRegister = async (req, res, next) => {
  const userId = res.locals.userId;
  const body = req.body;
  try {
    const validate = artistJoiSchema.simpleRegister.validate(body);
    if (validate.error) throw Error(validate.error);
    // if (!(await isAdmin(userId)))
    //   throw new Error("You not allowd to add an artist");
    if (await checkIfUserExists(body.email)) {
      throw new Error("Already in the system");
    }
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    body.artistCode = generateBackupCode();

    const newArtist = new Artist(body);
    console.log(newArtist);
    await newArtist.save();
    return res.status(201).send(newArtist);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const body = req.body;
  try {
    //sendEmail();
    const validate = artistJoiSchema.login.validate(body);
    if (validate.error) throw Error(validate.error);
    const artist = await findArtist(body.email);
    console.log(artist);
    if (!artist || !(await bcrypt.compare(body.password, artist.password))) {
      throw new Error("code or password not valid");
    }
    const token = generateToken(artist);
    return res.status(201).send({ artist, token });
  } catch (error) {
    next(error);
  }
};

exports.updateArtist = async (req, res, next) => {
  const artistId = req.params.artistId;
  const userId = res.locals.userId;
  try {
    if (artistId != userId && !(await isAdmin(userId)))
      throw new Error("You not allowd to edit this artist");
    const artist = await Artist.updateOne({ _id: artistId }, req.body);
    res.send(artist);
  } catch (error) {
    next(error);
  }
};
