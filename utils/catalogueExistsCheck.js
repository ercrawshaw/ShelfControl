import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const catalogueExistsCheckFunc = (uid, catalogueName) => {


  const colRef = collection(db, "users", uid, "catalogues", "catalogues");

  const catalogues = query(colRef, where("name", "==", catalogueName));
  return getDocs(catalogues).then((snapShot) => {
    if (!snapShot.empty) {
      alert("catalogue already exists, Please try another catalogue");
      return Promise.reject({
        message: "catalogue already exists, Please try another catalogue",
      });
    }
  });
};

export { catalogueExistsCheckFunc };
