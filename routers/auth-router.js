const router = require('express').Router();
const authController = require('../controllers/auth-controller.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.post('/logout', authController.logout);

module.exports = router;
