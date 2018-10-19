const express = require('express');
const router = express.Router();

const tournament = require('../controllers/tournament.controller');

/**
 * GET-requests
 */
/* Get ALL Tournaments */
router.get('/', tournament.getAllTournaments);

/* Get Tournaments starting soon */
router.get('/starting', tournament.getStartingTournaments);

/**
 * POST-requests
 */
/* Add Tournament*/
router.post('/', tournament.addTournament);

/**
 * PUT-request
 * Update a tournament
 */
router.put('/:id', tournament.updateTournament);

/**
 * DELETE-request
 * Delete a tournament
 */
router.delete('/:id', tournament.deleteTournament);

module.exports = router;