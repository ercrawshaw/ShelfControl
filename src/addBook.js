import { doc, addDoc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const addBook = (uid, catalogueName, bookInfo) => {
  const author = bookInfo.author;
  const title = bookInfo.title;
  const publication_date = bookInfo.publication_date;
  let isbn = null;

  if (bookInfo.hasOwnProperty("isbn")) {
    isbn = bookInfo.isbn;
  }

  const docRef = doc(
    collection(db, "users", uid, "catalogues", catalogueName, "Books")
  );

  //using Date here rather than Timestamp as TS is interpreted as string
  //and can't be used to do the sortby
  //cannot use setDoc here as we don't create the doc id for the book
  return setDoc(docRef, {
    author: author,
    title: title,
    publication_date: publication_date,
    created: Date.now(),
    isbn: isbn,
  }).catch((error) => alert(error));
};

export default addBook;
