const router = require("express").Router();
const action = require("../actions/AdvertisingMaterialAction");

router.use(require("./middleware/Jwt"));
//router.use(require('./middleware/Permission'));

router.route("/").get(action.list).post(action.create);

router.route("/active/:key").put(action.active).patch(action.active);

router.route("/disable/:key").delete(action.disable);

router
  .route("/:key")
  .get(action.get)
  .put(action.update)
  .patch(action.update)
  .delete((req, res) => {
    req.query.force_delete = "true";
    action.delete(req, res);
  });

module.exports = router;
