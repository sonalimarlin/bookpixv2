const express     = require("express"),
      router      = express.Router({mergeParams: true}),
      Book        = require("../models/book"),
      Comment     = require("../models/comment"),
      middleware  = require("../middleware");

//Create new comment ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res) {
  Book.findById(req.params.id, function(err,foundBook){
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {book: foundBook});
    }
  });
});

//POST new comment Route
router.post("/", middleware.isLoggedIn, function(req,res){
  Book.findById(req.params.id, function(err, book) {
    if(err) {
      console.log(err);
      res.redirect("/books");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err){
          console.log(err);
        } else {
          //add username and id to comment
          comment.user.id = req.user.id;
          comment.user.username = req.user.username;
          //save comment
          comment.save();
          book.comments.push(comment._id);
          book.save();
          res.redirect("/books/" + book._id);
        }
      });
    }
  });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back")
    } else {
      res.render("comments/edit", {book_id: req.params.id, comment:foundComment});
    }
  });
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedBook){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/books/" + req.params.id);
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/books/" + req.params.id);
       }
    });
});


module.exports = router;
