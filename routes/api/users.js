const express = require("express");
const router = express.Router();

const { subscription, auth, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  ctrlWrapper(subscription),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
