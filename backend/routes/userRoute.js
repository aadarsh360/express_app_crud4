const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

// user router

router.get('/users', userController.getAllUsers);
router.post('/create', userController.createUser);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;