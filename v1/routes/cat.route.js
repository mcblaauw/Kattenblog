var express = require('express'),
    router  = express.Router(),
    middleware = require("../middleware") //automatically requires index.js

//Require controller
const cat_controller = require('../controllers/cat.controller');

// Cats overview
router.get('/',cat_controller.cat_home);
// Create cat
router.get('/create', middleware.isLoggedIn, cat_controller.cat_create_get);
router.post('/', middleware.isLoggedIn, cat_controller.cat_create_post);
// Read cat from database
router.get('/:id',cat_controller.cat_read);
// Update existing cat from database
router.put('/:id', middleware.checkCatOwnership, cat_controller.cat_update);
// Delete existing cat from database
router.delete('/:id', middleware.checkCatOwnership, cat_controller.cat_delete);

module.exports = router;