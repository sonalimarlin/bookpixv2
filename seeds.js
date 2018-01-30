var mongoose    = require("mongoose"),
    Book        = require("./models/book"),
    Comment     = require("./models/comment");

var data = [
    {
      title: "Pachinko", 
      author: "Min Jin Lee",
      description: "Pachinko, a finalist for the National Book Award, follows four generations of a Korean family from 1910, when Japan annexed Korea, through most of the 20th Century. It begins with an aging fisherman and his wife, who run a boarding house in a village near the port city of Busan. Their son, who has a cleft palate and twisted foot, is married at last. When his teenage daughter Sunja becomes pregnant by a visiting businessman, a kind pastor marries her and takes her to Osaka. After he dies, Sunja’s grit keeps the family afloat during the tough war years. One son makes it into Waseda University. The youngest runs pachinko parlours, where gamblers play machines in a game similar to pinball. But their future is shadowed by past secrets and betrayals.",
      image: "https://images.gr-assets.com/books/1462393298l/29983711.jpg",
      isbn:1455563935
    },
  {
  title: "A Kind of Freedom", 
      author: "Margaret Wilkerson Sexton",
      description: "Sexton’s powerful first novel, which made the longlist for the National Book Award, traces the complex downward spiral of a black family in New Orleans from World War Two through to the aftermath of Hurricane Katrina. She begins with Evelyn, a Creole debutante, who falls for Renard, from a lower-class family, in 1944, a time of Jim Crow segregation. Her family objects, but as Renard heads to war, their bond is set. In the 1980s their daughter Jackie struggles to raise her son after her husband Terry loses his pharmacist job and begins using crack cocaine. By 2010, Jackie’s son TC is released from Orleans Parish Prison after a stint for drug possession, eager to redeem himself, surrounded by temptation. Despite struggles, A Kind of Freedom glimmers with hope.",
      image: "https://images.gr-assets.com/books/1492015397l/33946142.jpg",
    isbn: 1619029227
  }
];

function seedDB(){
   //Remove all books
   Book.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed books!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few books
//             data.forEach(function(seed){
//                 Book.create(seed, function(err, book){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a book");
//                         //create a comment
//                         Comment.create(
//                             {
//                               username: "Homer",
//                               text: "This place is great, but I wish there was internet"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     book.comments.push(comment._id);
//                                     book.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
        });
    }); 
}

module.exports = seedDB;