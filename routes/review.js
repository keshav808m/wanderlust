const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewControler = require("../controler/reviews.js");
const router = express.Router({mergeParams: true}); // {mergeParams: true} -> For getting params information (id sended from app.js)

// Create route
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewControler.createReview))

//Delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync (reviewControler.destroyReview));

module.exports = router;