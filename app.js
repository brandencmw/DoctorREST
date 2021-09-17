const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/kingDB");

const bookSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: String,
  publisher: String,
  publishYear: Number,
  numberOfPages: Number,
  characters: [{ name: String, age: Number }],
});
const Book = mongoose.model("Books", bookSchema);

app
  .route("/books")

  .get(function (req, res) {
    Book.find(function (err, foundBooks) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundBooks);
      }
    });
  })

  .post(function (req, res) {
    book = new Book({
      title: req.body.title,
      description: req.body.description,
      publisher: req.body.publisher,
      publishYear: req.body.publishYear,
      numberOfPages: req.body.numOfPages,
      characters: req.body.characters,
    });
    book.save();
  })

  .delete(function (req, res) {
    Book.deleteMany(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("All books have been deleted from the database");
      }
    });
  });
app
  .route("/books/:bookID")

  .get()

  .post()

  .patch()

  .delete();
