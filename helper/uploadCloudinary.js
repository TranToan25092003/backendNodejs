const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
// config cloudinary
cloudinary.config({
  cloud_name: "dzq1rcnwl",
  api_key: "481635438533796",
  api_secret: "VStQWeIYxdwmt9EgH_pMYg0JFpI",
});

// upload to cloud
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// get url
module.exports = async function upload(buffer) {
  let result = await streamUpload(buffer);
  return result.url;
};
