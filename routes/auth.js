const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');

/* ==============
  Authentication
============== */
/* POST-request to register User*/
router.post('/register', authController.registerUser);

/* POST-request to authenticate User */
router.post('/login', authController.loginUser);

/* POST-request to logout user */
router.post('/logout', authenticated, authController.logoutUser);

/* GET-request to get user status */
router.get('/status', authController.getStatus);

/* Authorization middleware */
function authenticated (req, res, next) {
   if (req.isAuthenticated()) return next();   
   res.status(401).json({ message: 'Unauthorized'});
};

module.exports = router;