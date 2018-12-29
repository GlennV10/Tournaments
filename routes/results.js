const express = require('express');
const router = express.Router();

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

/* Authorization middleware */
function isAuthenticated(req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;