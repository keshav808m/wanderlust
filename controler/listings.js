const Listing = require("../models/listing");
const axios = require("axios");
// This url is the API endpoint of OpenStreetMap’s Nominatim service.
const api_url = "https://nominatim.openstreetmap.org/search";


module.exports.index = async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}
module.exports.createNewForm = (req, res)=>{
    res.render("listings/new.ejs");
}
module.exports.createNewListing = async (req, res)=>{
    let { location } = req.body.listing;
    const response = await axios.get(api_url, {
        params: {
        q: location,
        format: "json",
        limit: 1
        },
        headers: {
        "User-Agent": "Wandelust"
        }
    });
    // if location is not currect
      if (!response.data.length) {
        req.flash("error", "Invalid location");
        return res.redirect("/listings/new");
    }
    const lat = parseFloat(response.data[0].lat);
    const lng = parseFloat(response.data[0].lon);
    let url = req.file.path;
    let fileName = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, fileName};
    // Storing Coordinates
    newListing.geometry = {
        type: "Point",
        coordinates: [lng, lat]
    };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}
// module.exports.searchListing = async (req, res) =>{
//     let query = req.query.q;
//     console.log(query);
//     const allListings = await Listing.find({location: query});
//     console.log(allListings);
//     res.render("listings/index.ejs", {allListings});
// }
module.exports.searchListing = async (req, res) => {
    let query = req.query.q?.trim();
    if (!query) {
      return res.redirect("/listings");
    }
    const allListings = await Listing.find({
      location: { $regex: query, $options: "i" }
    });
    res.render("listings/index.ejs", {allListings});

  }
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {path: "author"},
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}
module.exports.showEditForm = async (req, res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}
module.exports.updateListing = async (req, res)=>{
    const {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let fileName = req.file.filename;
        listing.image = {url, fileName};
        await listing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing = async (req, res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}