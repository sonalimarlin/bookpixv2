var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    username: String
  },
  createdAt: { type: Date, default: Date.now },
  description: String,
  image: String,
  isbn: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Book", bookSchema);