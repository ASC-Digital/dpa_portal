const router = require('express').Router();
const action = require('../actions/PowerBIAction');

router.use(require('./middleware/Jwt'));

router.route('/').post(action.getEmbedData);

module.exports = router;
