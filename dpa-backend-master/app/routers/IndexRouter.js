const router = require('express').Router();
const action = require('../actions/IndexAction');

router.route('/').get(action.get);

module.exports = router;
