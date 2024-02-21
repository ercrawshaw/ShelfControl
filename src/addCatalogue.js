import { doc, addDoc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addCatalogue = (uid, catalogueName) => {
  const docRef = doc(db, "users", uid, "catalogues", catalogueName);
  // it doesn't wok with addDoc - returns uneven segment error message
  //using Date here rather than Timestamp as TS is interpreted as string
  //and can't be used to do the sortby

  return setDoc(docRef, {
    status: "private",
    // created: Timestamp.now(),
    created: Date.now(),
  }).catch((error) => alert(error));
};
