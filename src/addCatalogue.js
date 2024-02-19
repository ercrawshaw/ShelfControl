import { doc, addDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const addCatalogue = (uid, catalogueName) => {
  const docRef = doc(db, "users", uid, "catalogues", catalogueName);
  // it doesn't wok with addDoc - returns uneven segment error message
  return setDoc(docRef, { status: "private" }).catch((error) => alert(error));
};

export default addCatalogue;
