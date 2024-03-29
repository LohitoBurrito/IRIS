// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// References
export const calendarCollectionRef = collection(db, "Calendar")
export const contactCollectionRef = collection(db, "Contact")
export const joinParagraphCollectionRef = collection(db, "Join_Paragraph")
export const FAQCollectionRef = collection(db, "FAQ")
export const MembersCollectionRef = collection(db, "Members")
export const OutreachCollectionRef = collection(db, "Outreach")
export const SponsorCollectionRef = collection(db, "Sponsor")
export const SponsorPackageCollectionRef = collection(db, "Sponsor_Package")
export const HomePageCollectionRef = collection(db, "Homepage")