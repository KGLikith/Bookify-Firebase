import { useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebasecontext = createContext(null);

export const usefirebase = () => useContext(firebasecontext);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APIID,
};

const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

const firebaseAuth = getAuth(firebaseapp);
const firestoreDB = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (newuser) => {
      if (newuser) {
        setuser(newuser);
        console.log(newuser);
      } else setuser(null);
    });
  }, []);

  const getUser = user;

  const registerEmailandPassword = async (email, password) =>
    await createUserWithEmailAndPassword(firebaseAuth, email, password);

  const loginEmailandPass = async (email, pass) =>
    await signInWithEmailAndPassword(firebaseAuth, email, pass);

  const singUpGoogle = async () =>
    await signInWithPopup(firebaseAuth, googleProvider);

  const signout = async () =>
    await signOut(firebaseAuth).then(() => console.log("signout successfull"));

  const handleNewListing = async (name, isbn, price, cover) => {
    const imgref = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadresult = await uploadBytes(imgref, cover);

    return await addDoc(collection(firestoreDB, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadresult.ref.fullPath,
      userid: user.uid,
      useremail: user.email,
      userdisplayName: user.displayName,
      userphotoURL: user.photoURL,
    });
  };

  const getListAllBooks = async () => {
    return await getDocs(collection(firestoreDB, "books"));
  };

  const getImageurl = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  const getUserbooks = async () => {
    const q = query(
      collection(firestoreDB, "books"),
      where("userid", "==", user.uid)
    );
    return await getDocs(q);
  };

  const getBookById = async (id) => {
    const ref = doc(firestoreDB, `books`, id);
    return await getDoc(ref);
  };

  const placeOrder = async (bookId, qty) => {
    const colref = collection(firestoreDB, "books", bookId, "orders");
    return await addDoc(colref, {
      username: user.displayName,
      email: user.email,
      userId: user.uid,
      photoUrl: user.photoURL,
      qty: Number(qty),
      approved: false,
    });
  };

  const fetchMyOrders = async (id) => {
    return await getDocs(collection(firestoreDB, "books", id, "orders"));
  };

  const deleteOrder = async (bookId, userId) => {
    const docref = doc(firestoreDB, "books", bookId, "orders", userId);
    return await deleteDoc(docref);
  };
  const updatestatus = async (bookId, userId) => {
    const docref = doc(firestoreDB, "books", bookId, "orders", userId);
    return await updateDoc(docref, {
      approved: true,
    });
  };

  const isLoggedIn = user ? true : false;

  return (
    <firebasecontext.Provider
      value={{
        singUpGoogle,
        registerEmailandPassword,
        loginEmailandPass,
        isLoggedIn,
        signout,
        handleNewListing,
        getListAllBooks,
        getImageurl,
        getUser,
        getUserbooks,
        getBookById,
        placeOrder,
        fetchMyOrders,
        deleteOrder,
        updatestatus,
      }}
    >
      {props.children}
    </firebasecontext.Provider>
  );
};
