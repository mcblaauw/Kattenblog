var express = require('express'),
    router = express.Router({ mergeParams: true }), // mergeParams to use :id parameter from parent route (cats)
    middleware = require("../middleware") //automatically requires index.js

//Require the controllers 
const comment_controller = require('../controllers/comment.controller');

// Cats overview
router.post('/', middleware.isLoggedIn, comment_controller.create);
router.put('/:comment_id', middleware.checkCommentOwnership, comment_controller.update);
router.delete('/:comment_id', middleware.checkCommentOwnership, comment_controller.delete);

module.exports = router;