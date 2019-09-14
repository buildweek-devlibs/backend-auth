const router = require('express').Router();
const auth = require('../controllers/auth-controller.js');

router.post('/register', auth.register, auth.errorHandler);
router.post('/login', auth.login, auth.errorHandler);
router.post('/verify', auth.verify, auth.errorHandler);
router.post('/logout', auth.logout, auth.errorHandler);

module.exports = router;
