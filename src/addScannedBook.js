import { doc, addDoc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addScannedBook = (uid, catalogueName, isbn) => {
  const docRef = doc(
    db,
    "users",
    uid,
    "catalogues",
    catalogueName,
    "scannedBooks",
    isbn
  );
  // it doesn't work with addDoc - returns uneven segment error message
  //using Date here rather than Timestamp as TS is interpreted as string
  //and can't be used to do the sortby

  return setDoc(docRef, {
    // created: Timestamp.now(),
    isbn: isbn,
    created: Date.now(),
  }).catch((error) => alert(error));
};
