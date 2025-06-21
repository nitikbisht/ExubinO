const express = require('express');
const router = express.Router();
const { submitAnswers, getResult, submitExam } = require('../controllers/examCtrl');

router.post('/answers', submitAnswers);
router.post('/submit', submitExam);
router.get('/result/:courseId', getResult);

module.exports = router;
