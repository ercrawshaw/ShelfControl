import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Searchbar } from "react-native-paper";
import { Button, Card, TextInput, Text } from "react-native-paper";
import addBook from "../src/addBook";
import { CurrentUserContext } from "../contexts/userContext";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/Navbar";
import styles from "../styles/styles";
import { bookExistsCheckFunc } from "../utils/bookExistsCheck";

//import * as ImagePicker from 'expo-image-picker';
// import ImageLibrary from "./Image-picker";
const ManualSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [image, setImage] = useState(null);
  const [manualAdd, setManualAdd] = useState(false);
  const [manualBookTitle, setManualBookTitle] = useState("");
  const [manualAuthorName, setManualAuthorName] = useState("");
  const [manualPublishDate, setManualPublishDate] = useState("");
  const [manuallyAddedBook, setMannuallyAddedBook] = useState({});
  const [bookAdded, setBookAdded] = useState(false);
  const [infoNeeded, setInfoNeeded] = useState("");
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );
  const navigation = useNavigation();
  const [selectedBook, setSelectedBook] = useState([]);

  function searchBook() {
    Keyboard.dismiss();
    setIsLoading(true);
    setManualAdd(false);

    if (bookTitle.length === 0) {
      setAlert("You must write a book title!");
      setIsLoading(false);
      setBookTitle("");
    } else {
      axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`,
      }).then((response) => {
        if (response.data.items) {
          setBooks(response.data.items);
          setIsLoading(false);
          setBookTitle("");
        } else {
          setError("No results found");
          setBooks([]);
        }
      });
    }
  }

  function handleAddClick() {
    setManualAdd(true);
  }

  function handleManualBookAdd() {
    if (manualAuthorName === "" || manualBookTitle === "") {
      setInfoNeeded("Need to fill out title and author name!");
    } else {
      setInfoNeeded("");
      setMannuallyAddedBook({
        title: manualBookTitle,
        author: [manualAuthorName],
        publication_date: manualPublishDate,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
      });
      setBookAdded(true);
    }
  }
  //   const pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     });

  // if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  function handleCancelClick() {
    setBookAdded(false);
    setManualBookTitle("");
    setManualAuthorName("");
    setManualPublishDate("");
  }

  function handleEditClick() {
    setBookAdded(false);
  }

  function handleSubmitManualBook() {
    bookExistsCheckFunc(currentUid, currentCatalogue, manualBookTitle)
      .then(() => {
        addBook(currentUid, currentCatalogue, manuallyAddedBook).then(() => {
          // navigation.navigate("ManualSearch");
          setManualAdd(false);
          setManualBookTitle("");
          setManualAuthorName("");
          setManualPublishDate("");
          setBookAdded(false);
        });
      })
      .catch((error) => {
        navigation.navigate("ManualSearch");
        // alert(error.message);
      });
  }

  //console.log(selectedBook);
  function handleSubmitSearchedBook(book) {
    const bookInfo = {
      author: book.volumeInfo.authors,
      title: book.volumeInfo.title,
      publication_date: book.volumeInfo.publishedDate,
      isbn: book.volumeInfo.industryIdentifiers[0].identifier,
    };
    bookExistsCheckFunc(currentUid, currentCatalogue, bookInfo.title)
      .then(() => {
        addBook(currentUid, currentCatalogue, bookInfo)
          .then(() => {
            console.log("success");
            navigation.navigate("AddNewBookScreen");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        navigation.navigate("ManualSearch");
      });
  }

  //Search Options Chosen
  if (books.length === 0 && !manualAdd) {
    return (
      <View>
        <NavigationBar />
        <View style={styles.MSsearchBarContainer}>
          <Text style={styles.MSText}>
            Either search for a book title using a keyword
          </Text>
          <Searchbar
            placeholder="Search Book Title"
            onChangeText={(bookTitle) => setBookTitle(bookTitle)}
            value={bookTitle}
            onIconPress={searchBook}
            style={styles.MSsearchBar}
            onSubmitEditing={searchBook}
          />
          <Text>{alert}</Text>
          <Text>{error}</Text>
          <StatusBar style="auto" />
        </View>
        <Text style={styles.MSText}>Or enter the book details manually</Text>
        <Pressable
          style={styles.MSButton}
          mode="contained"
          onPress={handleAddClick}>
          <Text style={styles.MSButtonText}>Enter book details</Text>
        </Pressable>
      </View>
    );

    // Books shown from Google Books Api
  } else if (books.length !== 0 && !manualAdd) {
    return (
      <View style={{ flex: 1 }}>
  <NavigationBar />
  <View style={styles.MSsearchBar}>
    <Searchbar
      placeholder="Search Book Title"
      onChangeText={(bookTitle) => setBookTitle(bookTitle)}
      value={bookTitle}
      onSubmitEditing={() => searchBook()}
      onIconPress={searchBook}
    />
    <StatusBar style="auto" />
  </View>


 
        <ScrollView style={styles.MSscrollContainer} contentContainerStyle={{ paddingBottom: 120 }}>
          <View>
            {books.map((book, i) => {
              //issue with thumbnail at times
              const fallbackImageUrl =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
              const thumbnailUrl = book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : fallbackImageUrl;
              return (
                <Card key={i} style={styles.bookcard}>
                  <Card.Title
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.authors}
                  />
                  <Card.Cover
                    style={styles.bookcover}
                    source={{ uri: thumbnailUrl }}
                  />
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        handleSubmitSearchedBook(book);
                      }}>
                      Add Book
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })}
          </View>
        </ScrollView>
        <View>
          <Pressable>
            <Text>Back</Text>
          </Pressable>
        </View>
      </View>
    );

    //Manually adding book information
  } else if (manualAdd) {
    //Manually adding form
    if (!bookAdded) {
      return (
        <View>
          <NavigationBar />
        
        <View style={styles.MSFormContainer}>
          {/* <Button icon="plus" mode="contained" onPress={handleAddClick}>
            Add a Book
          </Button> */}

          {/* <Searchbar
            placeholder="Search Book Title"
            onChangeText={(bookTitle) => setBookTitle(bookTitle)}
            value={bookTitle}
            onIconPress={searchBook}
          /> */}

          <View style={styles.bookForm}>
            <Text style={styles.bookFormText} variant="headlineLarge">
              Enter book details
            </Text>
            <TextInput
              style={styles.bookFormComponent}
              label="Book Title"
              value={manualBookTitle}
              onChangeText={(manualBookTitle) =>
                setManualBookTitle(manualBookTitle)
              }
            />
            <TextInput
              style={styles.bookFormComponent}
              label="Book Author"
              value={manualAuthorName}
              onChangeText={(manualAuthorName) =>
                setManualAuthorName(manualAuthorName)
              }
            />
            <TextInput
              style={styles.bookFormComponent}
              label="Year Published"
              value={manualPublishDate}
              keyboardType="numeric"
              onChangeText={(manualPublishDate) =>
                setManualPublishDate(manualPublishDate)
              }
            />

            {/* <Button
              style={styles.bookFormComponent}
              icon="camera"
              mode="contained"
              onPress={ImageLibrary}
            >
              Add a cover
            </Button>
            {image? <Image source={image}/>:null} */}

            <Pressable
              style={styles.bookFormButton}
              icon={{
                uri: "https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png",
              }}
              mode="contained"
              onPress={handleManualBookAdd}
              title="Check Book Details">
              <Text style={styles.bookFormButtonText}>Check Details</Text>
            </Pressable>

            <Text style={styles.bookFormText}>{infoNeeded}</Text>
            <Button title="Check Book Details!" onPress={handleManualBookAdd} />
          </View>
        </View>
        </View>
      );

      //Book information displayed for check before adding
    } else {
      return (
        <View>
          <NavigationBar />
        <View style={styles.MSFormContainer}>
          {/* <Button icon="plus" mode="contained" onPress={handleAddClick}>
            Add a Book
          </Button>

          <Searchbar
            placeholder="Search Book Title"
            onChangeText={(bookTitle) => setBookTitle(bookTitle)}
            value={bookTitle}
            onIconPress={searchBook}
          /> */}

          <Card>
            <Card.Content>
              <Text variant="titleLarge">Title: {manuallyAddedBook.title}</Text>
              <Text variant="bodyMedium">
                Author: {manuallyAddedBook.author}
              </Text>
              <Text variant="bodyMedium">
                Published: {manuallyAddedBook.publication_date}
              </Text>
            </Card.Content>
            <Card.Cover source={{ uri: manuallyAddedBook.image }} />
            <Card.Actions>
              <Button
                icon={{
                  uri: "https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png",
                }}
                onPress={handleCancelClick}
              />
              <Button
                style={styles.bookFormButtonCheck}
                onPress={handleEditClick}>
                Edit Book
              </Button>
              <Button
                style={styles.bookFormButtonCheck}
                onPress={handleSubmitManualBook}>
                Add Book
              </Button>
            </Card.Actions>
          </Card>
        </View>
        </View>
      );
    }
  }
};

export default ManualSearch;
