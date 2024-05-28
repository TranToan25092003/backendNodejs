const multer = require("multer");

// function to create file img and make it can show on the website
// change it to .png
module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  return storage;
};
