'use strict'

const express = require('express');
const router = express.Router();

router.use('/api', require('./access'));

module.exports = router;