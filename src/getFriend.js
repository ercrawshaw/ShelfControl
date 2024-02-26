import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getFriend = (docId) => {
  
    const docRef = doc(db, "users", docId);
    //console.log(docRef, "here doc ref");
    return getDoc(docRef) 
};