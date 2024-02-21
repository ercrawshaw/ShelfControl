import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation, useNavigationParam } from "@react-navigation/native";
import { getAllBooks } from "../src/getAllBooks";
import { getSingleBook } from "../src/getSingleBook";
import { Button, Card, TextInput, Text } from "react-native-paper";

const SingleBookScreen = ({ route }) => {
  const { catalogue_id, book_data, book_id } = route.params;
  const [currentBook, setCurrentBook] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  const [currentIsbn, setCurrentIsbn] = useState(null);

  useEffect(() => {
    console.log(currentUid);
    console.log(catalogue_id);
    console.log(book_id);
    getSingleBook(catalogue_id, currentUid, book_id).then((res) => {
      console.log(res.data());
      if (res.data().hasOwnProperty("isbn")) {
        setCurrentIsbn(res.data().isbn);
      }
    });
  }, [book_id]);

  return <View>{currentIsbn ? <Text></Text> : <Card></Card>}</View>;
};

export default SingleBookScreen;

const styles = StyleSheet.create({});
