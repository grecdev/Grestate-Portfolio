// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3lydKz8V1bVmbxg6Qov-EIcMbic9lkko",
  authDomain: "grestate-e5d90.firebaseapp.com",
  databaseURL: "https://grestate-e5d90.firebaseio.com",
  projectId: "grestate-e5d90",
  storageBucket: "grestate-e5d90.appspot.com",
  messagingSenderId: "738914591200",
  appId: "1:738914591200:web:f51d43819a3bccff034b85",
  measurementId: "G-B53NT9TG9C"
};

// Initialize Firebase
const fire_auth = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire_auth;