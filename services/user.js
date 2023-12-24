const { bucket } = require("../app/firebase");

async function uploadPhoto(userId, data) {
  try {
    const options = {
      destination: userId,
    };
    await bucket.upload(data, options);
    console.log(userId, data);
    return "OK";
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  uploadPhoto,
};
