import { db } from '../firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteBook = async (bookId, userId, catalogueId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "catalogues", catalogueId, "books", bookId));
    console.log("Book successfully deleted!");
  } catch (error) {
    console.error("Error deleting book: ", error);
    throw new Error("Failed to delete book.");
  }
};