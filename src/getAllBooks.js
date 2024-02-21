import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  collectionGroup,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getAllBooks = (uid, catalogue_id) => {
  // return getDocs(
  //   query(collection(db, "users", uid, "catalogues", catalogue_id, "Books"))
  // );
  const scannedBooks = getDocs(
    query(
      collection(db, "users", uid, "catalogues", catalogue_id, "scannedBooks")
    )
  );
  const manualBooks = getDocs(
    query(
      collection(db, "users", uid, "catalogues", catalogue_id, "manualBooks"),
      orderBy("title", "asc")
    )
  );
  Promise.all([scannedBooks, manualBooks]).then((res) => {
    let scannedBooksISBN = [];
    //res[0] is list of scanned books ISBN
    res[0].forEach((doc) => {
      scannedBooksISBN.push(doc.id);
    });
    let manualBooksInfo = [];
    res[1].forEach((doc) => {
      manualBooksInfo.push(doc.data());
    });
    console.log(scannedBooksISBN);
    console.log(manualBooksInfo);
    return scannedBooksISBN;
  });
};
