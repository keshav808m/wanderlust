const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userControler = require("../controler/user.js");

// signUp page
// Storing signUp information
router.route("/signup")
    .get(userControler.userSignupForm)
    .post(wrapAsync(userControler.userSignup));

// Login page
// Checking login information
router.route("/login")
    .get(userControler.userLoginForm)
    .post(saveRedirectUrl,  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    }), wrapAsync(userControler.userLogin))

// LogOut
router.get("/logout", userControler.userLogout);

module.exports = router;