const express = require('express');
const router = express.Router();

const tournamentController= require('../controllers/tournament.controller');

/**
 * GET-requests
 */
/* Get ALL Tournaments */
router.get('/', tournamentController.getAllTournaments);

/* Get Tournaments starting soon */
router.get('/starting', tournamentController.getStartingTournaments);

/* Get ONE Tournament */
router.get('/:id', tournamentController.getTournamentById);

/**
 * POST-requests
 */
/* Add Tournament*/
router.post('/', tournamentController.addTournament);

/**
 * PUT-request
 * Update a tournament
 */
router.put('/:id', tournamentController.updateTournament);

/**
 * DELETE-request
 * Delete a tournament
 */
router.delete('/:id', tournamentController.deleteTournament);

module.exports = router;