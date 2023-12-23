const { FirebaseStorage } = require("../app/firebase");
const { ref, uploadBytes } = require("firebase/storage");

async function uploadPhoto(userId, data) {
  try {
    const fileRef = ref(FirebaseStorage, `images/${userId}`);
    await uploadBytes(fileRef, data);
  } catch (error) {
    return error;
  }
}

module.exports = {
  uploadPhoto,
};
