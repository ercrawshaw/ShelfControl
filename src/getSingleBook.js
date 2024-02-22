import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getSingleBook = (catalogue_id, currentUid, book_id) => {
  return getDoc(
    doc(db, "users", currentUid, "catalogues", catalogue_id, "Books", book_id)
  );
};
