const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../config/auth');

const resultController = require('../controllers/result.controller');

/* GET */
/* Get ALL Results */
router.get('/', isAuthenticated, resultController.getResults);

/* Get Results by Status */
router.get('/:status', isAuthenticated, resultController.getResultsByStatus);

/* POST */
/* Add Result*/
router.post('/', isAuthenticated, resultController.addResult);

/* PUT */
/* Update a result */
router.put('/:id', isAuthenticated, resultController.updateResult);

/* DELETE */
/* Delete a result */
router.delete('/:id', isAuthenticated, resultController.deleteResult);

module.exports = router;