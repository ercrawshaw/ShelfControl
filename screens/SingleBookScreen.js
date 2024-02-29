import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation, useNavigationParam } from "@react-navigation/native";
import { getAllBooks } from "../src/getAllBooks";
import { getSingleBook } from "../src/getSingleBook";
import { fetchBook } from "../components/api";
import styles from "../styles/styles";
import LoadingMessage from "../components/LoadingMessage";
import NavigationBar from "../components/Navbar";
import { LoadBundleTask } from "firebase/firestore";

const SingleBookScreen = ({ route }) => {
  const { catalogue_id, book_data, book_id, friendsUid } = route.params;
  const [currentBook, setCurrentBook] = useState({});
  const { currentUid } = useContext(CurrentUserContext);
  const [currentIsbn, setCurrentIsbn] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);



  useEffect(() => {
    if (currentIsbn) {
      fetchBook(currentIsbn).then((result) => {
        const fallbackImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png";
        const imageUrl = result.items[0].volumeInfo.imageLinks?.thumbnail || fallbackImageUrl;
        setCurrentBook({
          title: result.items[0].volumeInfo.title,
          author: result.items[0].volumeInfo.authors,
          description: result.items[0].volumeInfo.description,
          image: imageUrl,
        });
        setPageLoading(false);
      });
    } else {
      setCurrentBook({
        title: book_data.title,
        author: book_data.author,
        description: "No information available",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
      });
      setPageLoading(false);
    }
  }, [currentIsbn]);

  useEffect(() => {
    if (friendsUid) {
      getSingleBook(catalogue_id, friendsUid, book_id).then((res) => {
        if (res.data().hasOwnProperty("isbn")) {
          setCurrentIsbn(res.data().isbn);
        }
      });
    } else {
      getSingleBook(catalogue_id, currentUid, book_id).then((res) => {
        if (res.data().hasOwnProperty("isbn")) {
          setCurrentIsbn(res.data().isbn);
        }
      });
    }
  }, [book_id]);

  if (pageLoading) {
    return <LoadingMessage />;
  } else {
    return (
      <View>
        <NavigationBar />
        <ScrollView>
        <View>
            <View style={styles.SBimageContainer}>
              <Image
                source={{ uri: currentBook.image }}
                style={styles.SBimage}
              />
            </View>
            <View style={styles.SBinfoContainer}>
              <Text style={styles.SBtitleInfo}>{currentBook.title}</Text>
              {currentBook.author.length === 1 ? (
                  <Text style={styles.SBauthorInfo}>
                  {currentBook.author}
                  </Text>
                  ) : (
                  <Text style={styles.SBauthorInfo}>
                  {currentBook.author.join(", ")}
                  </Text>
                )}
            </View>  
            
              <Text style={styles.SBsynopsisInfo}>{currentBook.description}</Text>
            
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default SingleBookScreen;


