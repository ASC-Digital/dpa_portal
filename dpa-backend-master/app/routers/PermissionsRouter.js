const router = require('express').Router();
const action = require('../actions/PermissionsAction');

router.use(require('./middleware/Jwt'));
router.use(require('./middleware/Permission'));

router.route('/')
  .get(action.list)
  .post(action.create);

router.route('/:key')
  .get(action.get)
  .put(action.update)
  .patch(action.update)
  .delete(action.delete);

module.exports = router;
