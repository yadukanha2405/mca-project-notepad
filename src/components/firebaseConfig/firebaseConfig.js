import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCreDF2e2Db3DjCxhOGGKERuj4uv_3hfmE",
    authDomain: "easy-notepad-d018f.firebaseapp.com",
    projectId: "easy-notepad-d018f",
    storageBucket: "easy-notepad-d018f.firebasestorage.app",
    messagingSenderId: "830961209363",
    appId: "1:830961209363:web:93b3f0b80caaf0c330afe6",
    measurementId: "G-Z4NLMK1FZY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


