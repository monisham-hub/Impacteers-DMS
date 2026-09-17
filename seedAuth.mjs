import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw2_GaMIosmLN1DhnTXDTnHm1yCEUinks",
  authDomain: "impacteers-dms.firebaseapp.com",
  projectId: "impacteers-dms",
  storageBucket: "impacteers-dms.firebasestorage.app",
  messagingSenderId: "1036195727581",
  appId: "1:1036195727581:web:099af02c27bd8403f47334"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const DEMO_USERS = [
  { email: 'monisha@impacteers.club' },
  { email: 'chairman@impacteers.club' },
  { email: 'edwin@impacteers.club' },
  { email: 'musthafa@impacteers.club' },
  { email: 'vinoth@impacteers.club' },
  { email: 'swami@impacteers.club' },
  { email: 'bala@impacteers.club' },
  { email: 'prem@impacteers.club' },
  { email: 'muzammil@impacteers.club' },
  { email: 'campus@impacteers.club' },
  { email: 'institutions@impacteers.club' },
  { email: 'marketing@impacteers.club' }
];

async function seed() {
  console.log('Starting Firebase Auth seeding for DEMO_USERS...');
  
  for (const user of DEMO_USERS) {
    try {
      await createUserWithEmailAndPassword(auth, user.email, 'test@123');
      console.log(`Successfully created Auth account for: ${user.email}`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`Account already exists for: ${user.email} - Skipping.`);
      } else {
        console.error(`Error creating account for ${user.email}:`, error.message);
      }
    }
  }
  
  console.log('Seeding complete! You can safely terminate this script.');
  process.exit(0);
}

seed();
