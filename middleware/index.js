var Book            = require("../models/book");
var Comment         = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkBookOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        Book.findById(req.params.id, function(err, foundBook){
           if(err){
             req.flash("error", "Book not found");
             res.redirect("back");
           }  else {
               // does user own the book?
            if(foundBook.user.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
              req.flash("error", "You don't have permission to do that");
              res.redirect("back");
            }
           }
        });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
             req.flash("error", "Comment not found!");
             res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.user.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
              req.flash("error", "You don't have permission to do that");
              res.redirect("back");
            }
           }
        });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
    }
}

module.exports = middlewareObj;
