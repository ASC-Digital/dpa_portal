const router = require("express").Router();
const action = require("../actions/MeAction");

router.use(require("./middleware/Jwt"));

router.route("/").get(action.get).put(action.update).patch(action.update);

router.route("/wallet").get(action.get_wallet);
router.route("/dashboard").get(action.get_dashboard);
router.route("/transactions/:key").get(action.list_transactions);
router.route("/reports").get(action.get_reports);

module.exports = router;
