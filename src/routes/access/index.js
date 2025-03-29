'use strict'

const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller')

//signup
router.post('/signup', accessController.signUp);
router.post('/login', accessController.login);

module.exports = router;