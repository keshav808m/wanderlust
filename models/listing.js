const mongoose = require("mongoose");
const Review = require("./review.js");
const { required } = require("joi");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        fileName: String,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

// For deleting associated reviews
listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;