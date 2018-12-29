const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

/* ==============
  Authentication
============== */
/* POST-request to register User*/
router.post('/register', authController.registerUser);

/* POST-request to authenticate User */
router.post('/login', authController.loginUser);

/* POST-request to logout user */
router.post('/logout', authController.logoutUser);

/* GET-request to get user status */
router.get('/status', authController.getStatus);

module.exports = router;