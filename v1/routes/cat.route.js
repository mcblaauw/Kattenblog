const express = require('express');
const router = express.Router();

//Require the controllers 
const cat_controller = require('../controllers/cat.controller');

//cats overview
router.get('/home',cat_controller.cat_home);
// Create cat
router.get('/create',cat_controller.cat_create_get);
router.post('/create',cat_controller.cat_create_post);
// Read cat from database
router.get('/:id',cat_controller.cat_read);
// Update existing cat from database
router.post('/:id/update',cat_controller.cat_update);
// Delete existing cat from database
router.get('/:id/delete',cat_controller.cat_delete);


module.exports = router;