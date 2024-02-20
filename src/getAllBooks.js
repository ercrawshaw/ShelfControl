import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getAllBooks = (uid, catalogue) => {
  console.log("here in get all books");
  return getDocs(
    query(collection(db, "users", uid, "catalogues", catalogue, "Books"))
  );
};
