import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const bookExistsCheckFunc = (uid, catalogueName, title) => {
  const BookRef = doc(db, "users", uid, "catalogues", catalogueName);

  const colRef = collection(BookRef, "Books");

  const books = query(colRef, where("title", "==", title));
  return getDocs(books).then((snapShot) => {
    if (!snapShot.empty) {
      alert("Book already exists");
      return Promise.reject({ message: "Book already exists" });
    }
  });
};

export { bookExistsCheckFunc };
