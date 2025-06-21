const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/courseCtrl');

router.get('/', getCourses);

module.exports = router;
