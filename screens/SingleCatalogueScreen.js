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
import NavigationBar from "../components/Navbar";
import { getAllBooks } from "../src/getAllBooks";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";

import styles from "../styles/styles";
import SearchBarComponent from "../components/SearchBar";

const SingleCatalogueScreen = ({ route }) => {
  const navigation = useNavigation();
  const { catalogue_id, friendsUid } = route.params;
  const [currentBooks, setCurrentBooks] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  const [mapArr, setMapArr] = useState([]);
  //   const catalogue = useNavigationParam("catalogue_id");

  useEffect(() => {
    if (friendsUid) {
      getAllBooks(friendsUid, catalogue_id).then((res) => {
        let books = [];
        res.forEach((doc) => {
          books.push(doc);
        });
        setMapArr(books);
        setCurrentBooks(books);
      });
    } else {
      getAllBooks(currentUid, catalogue_id).then((res) => {
        let books = [];
        res.forEach((doc) => {
          books.push(doc);
        });
        //console.log(books);
        setMapArr(books);
        setCurrentBooks(books);
      });
    }
  }, [catalogue_id]);

  const handleBookClick = (book) => {
    if (friendsUid) {
      navigation.navigate("SingleBookScreen", {
        catalogue_id: catalogue_id,
        book_data: book.data(),
        book_id: book.id,
        friendsUid: friendsUid,
      });
    } else {
      navigation.navigate("SingleBookScreen", {
        catalogue_id: catalogue_id,
        book_data: book.data(),
        book_id: book.id,
      });
    }
  };

  useEffect(() => {
    if (foundBooks.length !== 0) {
      setMapArr(foundBooks);
      //setMapArr(currentBooks)
    }
  }, [foundBooks]);

  const handleAddBook = () => {
    //connects here with Arran's AddNewBookScreen
    setCurrentCatalogue(catalogue_id);
    navigation.navigate("AddNewBookScreen");
  };

  return (
    <View style={styles.homeContainer}>
      <NavigationBar />
      <View>
        <SearchBarComponent
          currentBooks={currentBooks}
          setMapArr={setMapArr}
          mapArr={mapArr}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          foundBooks={foundBooks}
          setFoundBooks={setFoundBooks}
        />
      </View>
      <View style={styles.homeContainer}>
        {/* <Text>{JSON.stringify(catalogue_id)}</Text> */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {mapArr.map((book, index) => (
            <Pressable
              style={[styles.SCbutton, styles.buttonOutline]}
              // book={book}
              key={index}
              onPress={() => {
                handleBookClick(book);
              }}
            >
              <Text style={styles.buttonCatalogueText}>
                {book.data().title}
              </Text>
              <Text style={styles.buttonCatalogueText}>
                {book.data().author}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {friendsUid ? null : (
        <View style={styles.bottomContainer}>
          <Pressable onPress={handleAddBook} style={styles.SCbutton}>
            <Text style={styles.buttonText}>Add a book</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SingleCatalogueScreen;
