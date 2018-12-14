const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/* ===========
  User Profile
=========== */
/* GET-request to get User Profile */
router.get('/profile', authenticated, userController.getUserProfile);

/* ============
  User Schedule
============ */
/* GET */ 
/* Get Scheduled Tournaments */
router.get('/schedule', authenticated, userController.getUserSchedule);

/* Weekly schedule */
router.get('/schedule/weekly', authenticated, userController.getWeeklyUserSchedule);

/* Get Scheduled Tournaments Running now*/
router.get('/schedule/now', authenticated, userController.getUserScheduleNow);

/* POST */
/* Add Tournament to schedule */
router.post('/schedule', authenticated, userController.addTournamentToSchedule);

/* DELETE */
/* Remove Tournament from schedule */
router.delete('/schedule/:id', authenticated, userController.deleteTournamentFromSchedule);

/* Authorization middleware */
function authenticated (req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;