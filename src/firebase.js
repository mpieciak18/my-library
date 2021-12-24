// Import firebase modules
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD27BaorWNp_7HTAcFpfcQJEU2k6O75HpU",
    authDomain: "library-92910.firebaseapp.com",
    projectId: "library-92910",
    storageBucket: "library-92910.appspot.com",
    messagingSenderId: "778596230620",
    appId: "1:778596230620:web:031ba101402eb1b8185b19"
  };
  
// Initialize Firebase app
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()

// Query database and return array of books from user
const retrieveBooks = async (userId) => {
    const users = collection(db, "users")
    const user = doc(users, userId)
    const books = collection(user, "books")
    const booksQuery = await getDocs(books)
    let booksArr = []
    booksQuery.forEach((doc) => {
        const bookObj = doc.data()
        bookObj.id = doc.id
        booksArr = [...booksArr, bookObj]
    })
    return booksArr
}

// Register, and then sign in, user
const createUser = async (auth, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const uid = user.uid
        await setDoc(doc(db, 'users', uid), {email: `${email}`})
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

// Sign in user
const signinUser = async (auth, email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

export { app, retrieveBooks, createUser, signinUser }