const { Router } = require("express");
const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const mailToken = require("../middlewares/verifyMailToken.js")
const router = Router();


router.post("/register", registerController);
router.get("/verify/:token", mailToken)
router.post("/login", loginController)

module.exports = router; 
