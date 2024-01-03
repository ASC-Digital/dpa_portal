const router = require('express').Router();
const action = require('../actions/AwardsAction');

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/')
  .get(action.list);

router.route('/import')
  .post(action.import);

router.route('/:key')
  .get(action.get)
  .put(action.update)
  .patch(action.update)
  .delete(action.delete);

module.exports = router;
