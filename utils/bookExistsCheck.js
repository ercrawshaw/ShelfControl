// import {
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const bookExistsCheckFunc = (username) => {
//   const colRef = collection(db, "users");
//   const q = query(colRef, where("username", "==", username));
//   return getDocs(q)
//   .then((snapShot) => {
//     if (!snapShot.empty) {
//       alert("Book exists in your catalogue");
//       return Promise.reject({ message: "username is already taken" });
//     }
//   });
// };

// export { bookExistsCheckFunc };

