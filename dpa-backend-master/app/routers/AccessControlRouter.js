const router = require('express').Router();
const AccessControlAction = require('../actions/AccessControlAction');

const action = new AccessControlAction();

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/').get(action.read);
router.route('/export').get(action.export);

module.exports = router;
