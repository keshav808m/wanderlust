if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const Passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const passport = require("passport");

// Routes
const listingRout = require("./routes/listing.js");
const reviewRout = require("./routes/review.js");
const userRout = require("./routes/user.js");
const { default: MongoStore } = require('connect-mongo');


// Connection
const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(dbUrl);
}

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: "mysupersecretcode",
    },
    touchAfter: 24*3600, // Sec.
})
store.on("error", ()=>{
    console.log("Error");
})
const sessionOptions = {
    store: store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7*24*60*60*1000),
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(Passport.initialize());
app.use(Passport.session());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // passport automatically store user info. req object (user)
    next();
})

Passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes middleware
app.use("/listings", listingRout);
app.use("/listings/:id/reviews", reviewRout);
app.use("/", userRout);

app.use((req, res, next) => {
    next(new expressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=>{
    let {statusCode = 500, message="Something went Wrong"} = err;
    res.status(statusCode).render("error.ejs", {err});
    // res.send("something went wrong!");
});

app.listen(8080, ()=>{
    console.log("Listening on port 8080");
});
