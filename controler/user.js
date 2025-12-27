const User = require("../models/user");

module.exports.userSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
}
module.exports.userSignup = async (req, res)=>{
    try{
        const {username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next();
            }
            req.flash("success", "Welcome to Wonderlust");
            res.redirect("/listings");
        })
    }catch(er){
        req.flash("error", er.message);
        res.redirect("/register");
    }
}
module.exports.userLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}
module.exports.userLogin = async (req, res)=>{
    req.flash("success", "Welcome to wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
module.exports.userLogout = (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("../listings");
    })
}