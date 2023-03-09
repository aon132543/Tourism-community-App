// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKXXGJD3LP8MQyPFKNUfW9-QhcgFcjCJY",
  authDomain: "week10-f4477.firebaseapp.com",
  projectId: "week10-f4477",
  storageBucket: "week10-f4477.appspot.com",
  messagingSenderId: "708118762930",
  appId: "1:708118762930:web:e1621e6dc0443d578700ab"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp