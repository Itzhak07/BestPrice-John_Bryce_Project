const path = require("path");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

module.exports = upload;
