import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_FIREBASE_API_KEY,
    authDomain: process.env.REACT_FIREBASE_AURH_DOMAIN,
    databaseURL: process.env.REACT_FIREBASE_DB_URL,
    projectId: process.env.REACT_FIREBASE_PROJECT_ID,
};
// Initialize Firebase
const firebaseAPP = firebase.initializeApp(firebaseConfig);

export default firebaseAPP;
