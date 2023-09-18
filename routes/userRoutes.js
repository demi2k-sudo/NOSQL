const express = require('express')
const { loginController, registerController, searchController, authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login',loginController)

router.post('/register',registerController)

router.post('/search',searchController)

router.post('/getUserData',authMiddleware,authController)

module.exports = router