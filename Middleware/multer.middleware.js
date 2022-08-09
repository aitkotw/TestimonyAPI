var multer = require("multer");
var path = require("path");

const crypto = require("crypto");

const multerFileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    var fileName =
      crypto.randomBytes(10).toString("hex") +
      Date.now().toString() +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

const checkFileType = (req, file, cb) => {
  if (!file) {
    return cb(new Error("File not found"));
  }
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only Image files are allowed"));
  }
  return cb(null, true);
};

var upload = multer({ storage: multerFileUpload, fileFilter: checkFileType });

const uploadImage = async (req, res, next) => {
  var multerUpload = upload.single("photo");

  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        error: {
          multer:
            "Testimony image was invalid or empty. Please provide a valid image.",
        },
      });
    }
    next();
  });
};

module.exports = { uploadImage };
