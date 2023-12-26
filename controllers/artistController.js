const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Artist } = require("../models/artistModel");
const { generateToken } = require("../utils/jwt");
const { User } = require("../models/UserModel");

const adminJoiSchema = {
  login: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .error(() => Error("Email is not valid")),
    password: Joi.string(),
  }),
  register: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().max(20).required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .error(() => Error("Email is not valid")),
    country: Joi.string(),
    birthDate: Joi.date().less("now"),
    role: Joi.string(),
  }),
};

const checkIfUserExists = async (email) => {
  const user = await User.findOne({ email });
  if (user) return user;
  return false;
};

const isAdmin = async (userId) => {
  const user = await User.findOne({ _id: userId });
  const isManager = user.role == "admin";
  return isManager;
};

exports.getAllArtists = async (req, res, next) => {
  const userId = res.locals.userId;
  try {
    if (!(await isAdmin(userId)))
      throw new Error("You not allowd to get the artist list");
    const artist = await Artist.find({});
    res.send(artist);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const body = req.body;
  try {
    const validate = userJoiSchema.register.validate(body);
    if (validate.error) throw Error(validate.error);
    if (await checkIfUserExists(body.email)) {
      throw new Error("Already in the system");
    }
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;

    const newUser = new User(body);
    await newUser.save();
    return res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const body = req.body;
  try {
    const validate = userJoiSchema.login.validate(body);
    if (validate.error) throw Error(validate.error);
    const user = await checkIfUserExists(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new Error("userName or password not valid");
    }
    const token = generateToken(user);
    return res.send({ user, token });
  } catch (error) {
    next(error);
  }
};
