const express = require("express");
const { auth } = require('../middlewares/auth');

const router = express.Router();


router.get("/", );
router.get("/", );
router.get("/songById/:id", );
router.get("/songByName/:name", );
router.get("/songByEmo/:emotion", );
router.get("/songByGenre/:genre", );
router.get("/songByArtist/:artist", );
router.get("/songByPeriodTag/:tag", );


router.post("/", auth(), addTask);
router.delete("/:id", auth(), deleteSong);

