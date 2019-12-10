var express = require('express');
var router = express.Router();
var notesController = require('../controllers/notes');

/*
 * GET
 */
router.get('/', notesController.list);

// /*
//  * GET
//  */
router.get('/:id', notesController.show);

// /*
//  * POST
//  */
router.post('/', notesController.create);

// /*
//  * PUT
//  */
router.put('/:id', notesController.update);

// /*
//  * DELETE
//  */
// router.delete('/:id', notesController.remove);

module.exports = router;
