const cloudinary = require("cloudinary").v2;
const { generateId } = require("./otp");
const error = require("./error_handler");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  uploadImage: async (res, image) => {
    const public_id = generateId();
    let imageUrl, imageId;
    await cloudinary.uploader.upload(
      image,
      { public_id: `${public_id}` },
      (err, result) => {
        if (err) {
          error.errorHandler(res, "image not uploaded", "image");
          return;
        }

        imageUrl = result.url;
        imageId = result.public_id;
      }
    );
    return { imageUrl, imageId };
  },
  removeImage: async (res, public_id) => {
    await cloudinary.uploader.destroy(
      public_id,
      { invalidate: true, resource_type: "image" },
      (err, result) => {
        if (err) error.errorHandler(res, "Image not deleted", "image");
      }
    );
  },
};
