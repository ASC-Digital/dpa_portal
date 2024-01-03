const router = require('express').Router();
const action = require('../actions/DashboardAction');

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/').get(action.get);

module.exports = router;
