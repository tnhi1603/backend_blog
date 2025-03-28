'use strict'

const express = require('express');
const router = express.Router();

router.use('/api', require('./access'));
router.use('/post', require('./post'));
router.use('/friend', require('./friend'));

module.exports = router;