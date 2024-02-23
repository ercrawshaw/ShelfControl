import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { db } from "../firebaseConfig";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const updateUser = (uid, user) => {
  // return verifyBeforeUpdateEmail(getAuth().currentUser, user.email).then(() => {
      // return updateEmail(getAuth().currentUser, user.email).then(() => {
    const docRef = doc(db, "users", uid);
    return updateDoc(docRef, {
      // username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  // });
};


export default updateUser;

const styles = StyleSheet.create({});

