import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { db } from "../firebaseConfig";

const deleteSingleUser = (uid, user) => {
  return deleteDoc(doc(db, "users", uid)).then(() => {
    deleteUser(getAuth().currentUser).then(() => {
    });
  });
};

export default deleteSingleUser;

const styles = StyleSheet.create({});
