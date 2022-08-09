const mongoose = require("mongoose");
const db = process.env.DB_URI;

const database = (req, res, next) => {
  //Database Connection
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (!err) {
        console.log("Connection Success");
        next();
      } else {
        console.log(err);
        res.json({ Error: "Server Connection Error" });
        next();
      }
    }
  );
};

module.exports = database;
