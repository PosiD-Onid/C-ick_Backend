const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { signup, signin, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', isNotLoggedIn, signup);

// POST /auth/signin
router.post('/signin', isNotLoggedIn, signin);

// GET /auth/logout
router.post('/logout', isLoggedIn, logout);

module.exports = router;