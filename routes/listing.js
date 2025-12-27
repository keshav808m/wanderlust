const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingControler = require("../controler/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload =  multer({storage});

// Index Route
// Create Route
router.route("/")
    .get(wrapAsync (listingControler.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControler.createNewListing));

// New Route
router.get("/new", isLoggedIn, listingControler.createNewForm)

// Searching Listings
router.get("/search", wrapAsync (listingControler.searchListing))

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingControler.showEditForm))

// Show Route
// Update Route
// Delete Listing
router.route("/:id")
    .get(wrapAsync (listingControler.showListing))
    .put(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync (listingControler.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync (listingControler.destroyListing));

module.exports = router;