const router = require('express').Router();
const action = require('../actions/ViewAction');

router.route('/banner-login').get(action.bannerLogin);
router.route('/banners-home').get(action.bannersHome);
router.route('/configs').get(action.configs);

module.exports = router;
