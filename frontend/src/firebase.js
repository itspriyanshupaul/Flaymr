import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCxCXbPoIhvPuvjNNa6pHUL9QaROG9Q9Yo",
  authDomain: "flaymr89.firebaseapp.com",
  projectId: "flaymr89",
  storageBucket: "flaymr89.firebasestorage.app",
  messagingSenderId: "1078489980185",
  appId: "1:1078489980185:web:f3fbccd397378096eeb988"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()