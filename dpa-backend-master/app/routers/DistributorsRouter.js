const router = require('express').Router();
const action = require('../actions/DistributorsAction');

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/')
  .get(action.list)
  .post(action.create);

router.route('/active/:key')
  .put(action.active)
  .patch(action.active);

router.route('/disable/:key')
  .delete(action.disable);

router.route('/:key')
  .get(action.get)
  .put(action.update)
  .patch(action.update)
  .delete(action.delete);

module.exports = router;
