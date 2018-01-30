const express     = require("express"),
      router      = express.Router(),
      request     = require("request"),
      Book        = require("../models/book"),
      middleware  = require("../middleware");

//INDEX ROUTE - SHOW ALL BOOKS
router.get("/", function(req,res){
  var noMatch;
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Book.find({title:regex}, function(err, allBooks) {
    if(err){
      console.log(err);
    } else {
      if(allBooks.length<1){
        noMatch = "No books found. Please try another search!"
      }
      res.render("books/index", {books:allBooks, noMatch:noMatch});
    }
  });
  } else {
  Book.find({}, function(err, allBooks) {
    if(err){
      console.log(err);
    } else {
      res.render("books/index", {books:allBooks, noMatch:noMatch});
    }
  });
  }
});

//NEW FORM TO ADD NEW BOOK
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("books/new");
});

//CREATE POST ROUTE TO SAVE NEW BOOK TO DB
router.post("/", middleware.isLoggedIn, function(req,res){
  var user = {
    id: req.user._id,
    username: req.user.username
  };
  var title = req.body.title;
  var isbn = req.body.isbn;
  var description = req.body.description;
  var author = req.body.author;
  var image = req.body.image;
  var newBook = {user:user, title:title, isbn:isbn, description:description, image:image, author:author};
  Book.create(newBook, function(err, newBook) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/books");
    }
  });
  
});

//SHOW A PARTICULAR BOOK
router.get("/:id", function(req, res){
  Book.findById(req.params.id).populate("comments").exec(function(err, foundBook) {
    if(err) {
      console.log(err);
    } else {
      request("https://www.goodreads.com/book/review_counts.json?key=Q3xQkTBOjzvatlRWmbYA&isbns="+foundBook.isbn, function(error, response, body){
        var goodreads = JSON.parse(body);
        res.render("books/show", {book:foundBook, goodreads:goodreads});
        });
    }
  });
});

//EDIT A PARTICULAR BOOK
router.get("/:id/edit", middleware.checkBookOwnership, function(req, res){
  Book.findById(req.params.id, function(err, foundBook){
      res.render("books/edit", {book: foundBook});
  });
});

//UPDATE BOOK IN DB
router.put("/:id", middleware.checkBookOwnership, function(req, res){
  Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
    if(err){
      res.redirect("/books");
    } else {
      res.redirect("/books/" + req.params.id);
    }
  });
});

// DESTROY BOOK ROUTE
router.delete("/:id", middleware.checkBookOwnership, function(req, res){
   Book.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/books");
      } else {
          res.redirect("/books");
      }
   });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;





