var express = require('express'),
    router  = express.Router(),
    middleware = require("../middleware") //automatically requires index.js

// Require controller
const image_controller = require('../controllers/image.controller');

// Image post Route
router.post('/', middleware.isLoggedIn, image_controller.post);

module.exports = router;