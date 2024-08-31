const express = require('express')
const userControllers = require('../controllers/userControllers')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()


router.route('/login')
            .get()
            .post(userControllers.login)

router.route('/testToken')
            .get(verifyToken,userControllers.testvalidation)
            .post()

router.route('/signup')
            .get()
            .post(userControllers.signup)



module.exports = router