const formidable = require("formidable");
const { bucket, auth } = require("../app/firebase");

async function updateProfileImage(req, res) {
  const form = new formidable.IncomingForm({ multiples: true });
  const id = req.params.id;
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "There was an error parsing the files",
          data: {},
          error: err,
        });
      }
      if (!files.profileImage) {
        return res.status(422).json({
          message: "No file found under 'profileImg' key. Make sure the file is saved inside 'profileImage' key",
          data: {},
          error: { status: 422, type: "fileError", desc: "Key not found" },
        });
      }
      if (files.profileImage.length > 1) {
        return res.status(422).send({
          message: "Multiple files sended. Make sure to send only one image per request!",
          data: {},
          error: { status: 422, type: "fileError", desc: "Sending multiple files" },
        });
      }
      if (files.profileImage[0].mimetype.includes("image")) {
        const profileImage = files.profileImage;
        const downloadLink = `https://storage.cloud.google.com/${
          process.env.STORAGE_BUCKET
        }/images/${id}/profileImage.${profileImage[0].mimetype.slice(6)}`;
        await bucket.upload(profileImage[0].filepath, {
          destination: `images/${id}/profileImage.${profileImage[0].mimetype.slice(6)}`, // adds the file type to the destination (ex: jpg, png...)
          resumable: true,
          contentType: "image/*",
        });

        if (auth.getUser(id)) {
          await auth.updateUser(id, {
            photoURL: downloadLink,
          });
        } else {
          return res.status(404).send({
            message: "User not found",
            data: {},
            error: { status: 404, type: "user error", desc: "Cannot get user with the provided id" },
          });
        }
        return res.status(200).send({
          message: "Profile image saved successfully!",
          data: {},
          error: {},
        });
      } else {
        return res.status(422).send({
          message: "Invalid file type! Make sure to send only images",
          data: {},
          error: { status: 422, type: "fileError", desc: "Unexpected file type" },
        });
      }
    });
  } catch (err) {
    res.send({
      message: "Something went wrong",
      data: {},
      error: err,
    });
  }
}

module.exports = {
  updateProfileImage,
};
