import { storage } from './firebase';
import { v4 as generateId } from 'uuid';

export const storeImages = async (selectedFiles) => {
  if (selectedFiles) {
    const fileUploadPromises = [];
    selectedFiles.forEach((file) => {
      const id = generateId();
      const extension = file.name.substr(file.name.lastIndexOf('.'));
      const filename = id + extension;
      const childRef = storage.child(filename);
      fileUploadPromises.push(childRef.put(file));
    });
    const fileUploads = await Promise.all(fileUploadPromises);
    const fileURLPromises = [];
    fileUploads.forEach((fileUpload) => {
      const fileRef = fileUpload.ref;
      fileURLPromises.push(fileRef.getDownloadURL());
    });
    const fileURLs = await Promise.all(fileURLPromises);
    return fileURLs;
  }
  return [];
};
