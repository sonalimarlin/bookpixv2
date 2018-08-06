const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      mongoose        = require("mongoose"),
      methodOverride  = require("method-override"),
      passport        = require("passport"),
      flash           = require("connect-flash"),
      LocalStrategy   = require("passport-local"),
      Book            = require("./models/book"),
      Comment         = require("./models/comment"),
      User            = require("./models/user"),
      seedDB          = require("./seeds");
      
app.use(flash());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://localhost/book_club_enh');
//mongoose.connect('mongodb://rusty:password@ds219098.mlab.com:19098/bookpix');

app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rainbow in the sky",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

//requiring routes
var commentRoutes    = require("./routes/comments"),
    bookRoutes = require("./routes/books"),
    indexRoutes      = require("./routes/index");

//passing req,user creds to all local pages
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/books/:id/comments", commentRoutes);

//Goodreads key: Q3xQkTBOjzvatlRWmbYA
//Goodreads secret: 0priAs7mVvE3DTYIdEB96pHxDQsf7UlbD0z82vcTII


app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
    console.log("The YelpCamp server has started!");
});








