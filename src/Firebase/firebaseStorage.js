import {app} from "./firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.error(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });

    return downloadURL;
}

export const deleteImage = async (url) => {
    const imageRef = ref(storage, url);
    try {
        await imageRef.delete();
    } catch (error) {
        console.error(error);
    }
}

