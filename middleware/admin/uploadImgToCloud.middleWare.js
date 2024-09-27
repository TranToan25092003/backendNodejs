const upload = require("../../helper/uploadCloudinary");

module.exports.UploadImgToCloud = async (req, res, next) => {
  if (req.file) {
    const url = await upload(req.file.buffer);
    req.body[req.file.fieldname] = url;
  }

  next();
};

module.exports.UploadMultipImgToCloud = async (req, res, next) => {
  if (req.file) {
    const url = await upload(req.file.buffer);
    req.body[req.file.fieldname] = url;
  }

  next();
};
