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
/* GET-request to get Scheduled Tournaments */
router.get('/schedule', authenticated, userController.getUserSchedule);

/* PUT-request to add Tournament to schedule */
router.put('/schedule', authenticated, userController.addTournamentToSchedule);

/* DELETE-request to remove Tournament from schedule */
router.delete('/schedule/:id', authenticated, userController.deleteTournamentFromSchedule);

/* Authorization middleware */
function authenticated (req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;