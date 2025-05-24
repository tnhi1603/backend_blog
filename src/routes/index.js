'use strict'

const express = require('express');
const router = express.Router();

router.use('/api', require('./access'));
router.use('/post', require('./post'));
router.use('/friend', require('./friend'));
router.use('/message', require('./message'));
router.use('/notification', require('./notification'));

module.exports = router;