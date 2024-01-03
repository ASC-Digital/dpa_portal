const router = require('express').Router();
const action = require('../actions/StorageAction');

router.use(require('./middleware/Jwt'));

router.route('/upload')
  .post(action.upload);

module.exports = router;
