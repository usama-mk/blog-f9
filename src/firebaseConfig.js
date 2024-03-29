import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
     
    apiKey: "AIzaSyCtzueE7z4DgxLuMTI1MZjZlZO-3FjtEKM",
    authDomain: "crypto-blog-34272.firebaseapp.com",
    projectId: "crypto-blog-34272",
    storageBucket: "crypto-blog-34272.appspot.com",
    messagingSenderId: "992409999527",
    appId: "1:992409999527:web:c40d1456fbdbf83e9d2382"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
export { db, storage, auth }