import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  LogBox,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation, useNavigationParam } from "@react-navigation/native";
import NavigationBar from "../components/Navbar";
import { getAllBooks } from "../src/getAllBooks";
import LoadingMessage from "../components/LoadingMessage";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";

import styles from "../styles/styles";
import SearchBarComponent from "../components/SearchBar";
import { useIsFocused } from "@react-navigation/native";

const SingleCatalogueScreen = ({ route }) => {
  const navigation = useNavigation();
  const { catalogue_id, friendsUid } = route.params;
  const [currentBooks, setCurrentBooks] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  const [pageLoading, setPageLoading] = useState(true);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  const [mapArr, setMapArr] = useState([]);
  const isFocused = useIsFocused();
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
        setPageLoading(false);
      });
    } else {
      getAllBooks(currentUid, catalogue_id).then((res) => {
        let books = [];
        res.forEach((doc) => {
          books.push(doc);
        });
        setMapArr(books);
        setCurrentBooks(books);
        setPageLoading(false);
      });
    }
  }, [catalogue_id, isFocused]);

  const handleBookClick = (book) => {
    if (friendsUid) {
      navigation.navigate("SingleBookScreen", {
        catalogue_id: catalogue_id,
        book_data: book.data(),
        book_id: book.id,
        friendsUid: friendsUid,
      });
    } else{
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

  if (pageLoading) {
    return <LoadingMessage />;
  } else {
    return (
      <View style={styles.SCcontainer}>
        <NavigationBar />

        {mapArr.length === 0 ? null : (
          <View style={styles.SCsearchBar}>
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
        )}

        <View style={styles.SCmain}>
          <Text style={styles.SCheaderText}>{catalogue_id}</Text>

          <ScrollView
            style={styles.SCscrollView}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {mapArr.length === 0 ? (
              <Text style={styles.emptyListMsg}>
                Start adding books to your catalogue by clicking on the add a
                book button below!
              </Text>
            ) : (
              mapArr.map((book, index) => (
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

                  {book.data().author.length === 1 ? (
                  <Text style={styles.buttonCatalogueText}>
                  {book.data().author}
                  </Text>
                  ) : (
                  <Text style={styles.buttonCatalogueText}>
                  {book.data().author.join(", ")}
                  </Text>
                  )}
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>

        {friendsUid ? null : (
          <View style={styles.bottomContainer}>
            <Pressable onPress={handleAddBook} style={styles.bottomButton}>
              <Text style={styles.buttonText}>Add a book</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
};

export default SingleCatalogueScreen;
