// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const dotenv = require('dotenv');
console.log(dotenv.config());

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
module.exports = firebaseApp;