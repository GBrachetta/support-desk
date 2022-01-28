const express = require('express');

const { loginUser, registerUser } = require('../../controllers/useController');

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;
