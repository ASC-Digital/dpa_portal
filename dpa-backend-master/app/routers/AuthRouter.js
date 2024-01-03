const router = require('express').Router();
const action = require('../actions/AuthAction');

router.use(require('./middleware/apiKey'));

router.route('/login').post(action.login);
router.route('/logout').post(action.logout);
router.route('/forgot-password').post(action.forgotPassword);
router.route('/reset-password').post(action.resetPassword);

module.exports = router;
