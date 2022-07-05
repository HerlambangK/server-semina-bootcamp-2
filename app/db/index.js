// (1) import package mongoose
const mongoose = require("mongoose");

// (2) kita import konfigurasi terkait MongoDB dari app/config/index.js
const { urlDb } = require("../config");

// (3) connect ke MongoDB menggunakan konfigurasi yang telah kita import
// mongoose.connect(urlDb);
// mongoose.createConnection("mongodb://localhost:27017/db_bootcamp", {
//   auth: {
//     authSource: "root_admin",
//   },
//   user: "admin",
//   pass: "123456",
// });

// mongoose.connect(`${urlDb}db_bootcamp`, {
//   auth: { authSource: "root_admin" },
//   user: "root_admin",
//   pass: "123456",
//   useNewUrlParser: true,
//   useMongoClient: true,
//   //   useUnifiedTopology: true,
// });

mongoose.connect(
  `${urlDb}db_bootcamp?authSource=admin`
  //   "mongodb://root_admin:123456@localhost:27017/db_bootcamp?authSource=admin"
);

// (4) simpan koneksi dalam constant db
const db = mongoose.connection;

// (5) export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;
