const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema");
const expressError = require("./utils/expressError");
const wrapAsync = require("./utils/wrapAsync");

module.exports.isLoggedIn = (req, res, next)=> {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be Logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =  wrapAsync( async (req, res, next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!(res.locals.currUser && res.locals.currUser._id.equals(listing.owner._id))){
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
})

// Server side Listings validation
module.exports.validateListing = (req, res, next) =>{
    // server side validation(if one row is empty or validation mismatch then error occured)
    const {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(404, error);
    }else{
        next();
    }
}

// Server side Review validation
module.exports.validateReview = (req, res, next) =>{
    // server side validation(if one row is empty or validation mismatch then error occured)
    let reviewData = {review: req.body};
    const {error} = reviewSchema.validate(reviewData);
    if(error){
        throw new expressError(404, error);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = wrapAsync( async (req, res, next)=>{
    let { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!(res.locals.currUser && review.author.equals(res.locals.currUser._id))){
        req.flash("error", "You are not the owner of this Review!");
        return res.redirect(`/listings/${id}`)
    }
    next();
})