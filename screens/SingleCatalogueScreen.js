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

const SingleCatalogueScreen = ({ route }) => {
  const navigation = useNavigation();
  const { catalogue_id } = route.params;
  const [currentBooks, setCurrentBooks] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  //   const catalogue = useNavigationParam("catalogue_id");

  useEffect(() => {
    console.log(catalogue_id);
    getAllBooks(currentUid, catalogue_id).then((res) => {
      console.log(res, "here in Single Screen");
      let books = [];
      res.forEach((doc) => {
        books.push(doc.id);
      });
      setCurrentBooks(books);
    });
  }, []);

  const handleBookClick = (book) => {
    navigation.navigate("SingleBookScreen", { isbn: book });
    console.log(book);
  };

  const handleScanBook = () => {};

  const handleSearchBook = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(catalogue_id)}</Text> */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {currentBooks.map((book, index) => (
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              // book={book}
              key={index}
              onPress={() => {
                handleBookClick(book);
              }}
            >
              <Text style={styles.buttonCatalogueText}>Here is: {book}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={handleScanBook} style={styles.button}>
          <Text style={styles.buttonText}>Scan a book</Text>
        </Pressable>
        <Pressable onPress={handleSearchBook} style={styles.button}>
          <Text style={styles.buttonText}>Search and add a book manually</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SingleCatalogueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonCatalogueText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  scrollView: {
    width: "95%",
  },
  bottomContainer: {
    marginBottom: 5,
  },
});
