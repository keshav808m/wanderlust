const mongoose = require("mongoose");
const Review = require("./review.js");
const { required } = require("joi");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
