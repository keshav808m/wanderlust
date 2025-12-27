const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let {rating, comment} = req.body;
    let newReview = new Review({rating, comment});
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyReview = async (req, res)=>{
    const {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}