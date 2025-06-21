const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/questionCtrl');

router.get('/:courseId', getQuestions);

module.exports = router;
