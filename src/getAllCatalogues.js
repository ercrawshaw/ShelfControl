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

export const getAllCatalogues = (uid) => {
  return getDocs(query(collection(db, "users", uid, "catalogues")));
};
