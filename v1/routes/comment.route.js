const express = require('express');
const router = express.Router({ mergeParams: true }); 
// mergeParams important! use :id parameter from parent route (cats)

//Require the controllers 
const comment_controller = require('../controllers/comment.controller');

// Cats overview
router.post('/',comment_controller.create);
router.delete('/:comment_id',comment_controller.delete);

module.exports = router;