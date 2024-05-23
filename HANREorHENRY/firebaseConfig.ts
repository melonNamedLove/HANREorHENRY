// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe-Zap0FDiihxhamkGk2IVkiV99taDG9U",
  authDomain: "instadaelim-2cdcc.firebaseapp.com",
  projectId: "instadaelim-2cdcc",
  storageBucket: "instadaelim-2cdcc.appspot.com",
  messagingSenderId: "40332779099",
  appId: "1:40332779099:web:09ed934302a8b35275a97e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//

//Initialize Firebase Authentication
// export const auth = getAuth(app);-> web
//for react-native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

//firebase

//storage
const storage = getStorage(app);

export { auth, storage };

//auth.onAuthStateChange()->Firebase    ->o|X          ->  AuthStack|MainStack
