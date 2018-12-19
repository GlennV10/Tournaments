const express = require('express');
const router = express.Router();

const resultController = require('../controllers/result.controller');

/**
 * GET-requests
 */
/* Get ALL Results */
router.get('/', authenticated, resultController.getResults);

/* Get Results by Status */
router.get('/:status', authenticated, resultController.getResultsByStatus);

/**
 * POST-requests
 */
/* Add Result*/
router.post('/', authenticated, resultController.addResult);

/**
 * PUT-request
 * Update a result
 */
router.put('/:id', authenticated, resultController.updateResult);

/**
 * DELETE-request
 * Delete a result
 */
router.delete('/:id', authenticated, resultController.deleteResult);

/* Authorization middleware */
function authenticated (req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;