// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkVmINQY7373Xgw3TBkz7_iJ9S28yNKbY",
  authDomain: "tencentnexus.firebaseapp.com",
  projectId: "tencentnexus",
  storageBucket: "tencentnexus.firebasestorage.app",
  messagingSenderId: "857593417916",
  appId: "1:857593417916:web:1a748e3b134003a87ec0b9",
  measurementId: "G-EB85DL50GX"
};

// Initialize Firebase
let db;

function initFirebase() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('🔥 Firebase initialized successfully!');
}

// Initialize on load
if (typeof firebase !== 'undefined') {
    initFirebase();
} else {
    console.error('Firebase SDK not loaded');
}
