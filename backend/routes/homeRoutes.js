const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const router = express.Router();
const { allUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').get(allUsers,protect);

module.exports = router;