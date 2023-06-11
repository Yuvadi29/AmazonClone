import firebase from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1z5LL0y1GY28CIBGPdEek4GFERe51N80",
  authDomain: "clone-388116.firebaseapp.com",
  projectId: "amazonclone-388116",
  storageBucket: "amazonclone-388116.appspot.com",
  messagingSenderId: "838843467207",
  appId: "1:838843467207:web:023f0716b04d8d750745e2",
  measurementId: "G-8D7S5K5CQN"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;