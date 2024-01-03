const router = require('express').Router();
const RolesAction = require('../actions/RolesAction');

const action = new RolesAction();

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/active/:key')
  .put(action.active)
  .patch(action.active);

router.route('/disable/:key')
  .delete(action.disable);

router.route('/export')
  .get(action.export);

router.route('/:key')
  .get(action.read)
  .put(action.update)
  .patch(action.update)
  .delete(action.delete);

router.route('/')
  .get(action.read)
  .post(action.create);

module.exports = router;
