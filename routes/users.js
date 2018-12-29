const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/* ===========
  User Profile
=========== */
/* GET-request to get User Profile */
router.get('/profile', isAuthenticated, userController.getUserProfile);

/* ============
  User Schedule
============ */
/* GET */ 
/* Get Scheduled Tournaments */
router.get('/schedule', isAuthenticated, userController.getUserSchedule);

/* Weekly schedule */
router.get('/schedule/weekly', isAuthenticated, userController.getWeeklyUserSchedule);

/* Get Scheduled Tournaments Running now*/
router.get('/schedule/now', isAuthenticated, userController.getUserScheduleNow);

/* POST */
/* Add Tournament to schedule */
router.post('/schedule', isAuthenticated, userController.addTournamentToSchedule);

/* DELETE */
/* Remove Tournament from schedule */
router.delete('/schedule/:id', isAuthenticated, userController.deleteTournamentFromSchedule);

/* Authorization middleware */
function isAuthenticated(req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;