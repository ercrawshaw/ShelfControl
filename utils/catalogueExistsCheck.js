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
  const colRef = collection(db, "users", uid, "catalogues");

  const catalogues = query(colRef);

  return getDocs(catalogues).then((snapShot) => {
    snapShot.forEach((doc) => {
      if (doc.id == catalogueName) {
        alert("Catalogue already exists, Please use another name");
        return Promise.reject({
          message: "Catalogue already exists, Please use another name",
        });
      }
    });
  });
};

export { catalogueExistsCheckFunc };
