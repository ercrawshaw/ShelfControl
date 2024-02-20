import {
  StyleSheet,
  Text,
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

const SingleBookScreen = ({ route }) => {
  const { isbn } = route.params;
  const [currentBook, setCurrentBook] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);

  useEffect(() => {
    getSingleBook(isbn);
  });
  return (
    <View>
      <Text>SingleBookScreen</Text>
    </View>
  );
};

export default SingleBookScreen;

const styles = StyleSheet.create({});
