const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("Connected to Mongo"));
db.on("error", console.error.bind(console, "Oopsie Doopsie"));

module.exports = db;
