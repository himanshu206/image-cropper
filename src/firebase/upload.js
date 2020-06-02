import { storage } from "./firebase";
import { uuid } from "uuidv4";

const uploadImage = (name, imageSrc) => {
  const path = `/images/`;

  return storage
    .ref(path)
    .child(name)
    .put(new Blob([imageSrc]))
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL().then((downloadURL) => {
        return downloadURL;
      });
    })
    .catch((error) => {});
};

const uploadImages = (images) => {
  return Promise.all(images.map((image) => uploadImage(uuid(), image.src)))
    .then((urls) => {
      return urls;
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message);
    });
};

export { uploadImages };
