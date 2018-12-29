const express = require('express');
const router = express.Router();

const tournamentController= require('../controllers/tournament.controller');

/* GET */
/* Get ALL Tournaments */
router.get('/', isAuthenticated, tournamentController.getAllTournaments);

/* Get Tournaments starting soon */
router.get('/starting', isAuthenticated, tournamentController.getStartingTournaments);

/* Get ONE Tournament */
router.get('/:id', isAuthenticated, tournamentController.getTournamentById);

/* POST */
/* Add Tournament*/
router.post('/', isAuthenticated, tournamentController.addTournament);

/* PUT */
/* Update Tournament*/
router.put('/:id', isAuthenticated, tournamentController.updateTournament);

/* DELETE */ 
/* Delete a tournament */
router.delete('/:id', isAuthenticated, tournamentController.deleteTournament);

/* Authorization middleware */
function isAuthenticated(req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;