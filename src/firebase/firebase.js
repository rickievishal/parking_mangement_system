import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAD6XyftOfpc4lIwMzsFtOd0BjyYdCUy3I",
    authDomain: "parkingmanagement-73755.firebaseapp.com",
    projectId: "parkingmanagement-73755",
    storageBucket: "parkingmanagement-73755.appspot.com",
    messagingSenderId: "877208135023",
    appId: "1:877208135023:web:b402af8b31d1b24e09f49a",
    measurementId: "G-J2NQFTZR2Z"
  };

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;