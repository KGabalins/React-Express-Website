const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/:email", controller.getUserDataCtrl);
router.get("/perm/:email", controller.getUserPermissionCtrl);
router.post("/login", controller.loginUserCtrl);
router.post("/", controller.addUserCtrl);
router.post("/:email", controller.updateUserEmailCtrl);
router.put("/:email", controller.updateUserPasswordCtrl);
router.delete("/:email", controller.deleteUserCtrl);

module.exports = router;
