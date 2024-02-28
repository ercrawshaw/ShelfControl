import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { CameraView } from "expo-camera/next";
import { Camera } from "expo-camera";
import { fetchBook } from "./api";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { CurrentUserContext } from "../contexts/userContext";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";
import addBook from "../src/addBook";
import * as MediaLibrary from "expo-media-library";
import { bookExistsCheckFunc } from "../utils/bookExistsCheck";
import styles from "../styles/styles";
import { Audio } from "expo-av";

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useState(false);
  const [isbn, setIsbn] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bookData, setBookData] = useState(null);
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );
  const [sound, setSound] = useState();

  useEffect(() => {
    (async () => {
      MediaLibrary.getPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(cameraStatus.granted);
    })();
  }, []);

  useEffect(() => {
    if (isbn) {
      fetchBook(isbn)
        .then(({ items }) => {
          if (items.length === 0) setBookData(null);
          setBookData(items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isbn]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/scanner_beep.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const scannerSwitch = () => {
    setScanned(false);
    setBookData(null);
  };

  const handleScanAnotherBook = () => {
    //console.log(bookData[0]);
    const bookInfo = {
      author: bookData[0].volumeInfo.authors,
      title: bookData[0].volumeInfo.title,
      publication_date: bookData[0].volumeInfo.publishedDate,
      isbn: bookData[0].volumeInfo.industryIdentifiers[0].identifier,
    };
    addBook(currentUid, currentCatalogue, bookInfo);
    setScanned(false);
    setBookData(null);
    setIsbn(null);
  };

  const handleReturnToCatalogue = () => {
    const bookInfo = {
      author: bookData[0].volumeInfo.authors,
      title: bookData[0].volumeInfo.title,
      publication_date: bookData[0].volumeInfo.publishedDate,
      isbn: bookData[0].volumeInfo.industryIdentifiers[0].identifier,
    };

    bookExistsCheckFunc(currentUid, currentCatalogue, bookInfo.title)
      .then(() => {
        addBook(currentUid, currentCatalogue, bookInfo);
        setScanned(false);
        setBookData(null);
        setIsbn(null);
        navigation.navigate("SingleCatalogueScreen", {
          catalogue_id: currentCatalogue,
        });
      })
      .catch((error) => {
        navigation.navigate("Scanner");
        alert(error.message);
      });
  };

  if (permission) {
    return (
      <View style={styles.scannerContainer}>
        {bookData ? (
          <Card style={styles.scannerBookcard}>
            <Card.Content>
              <Text style={styles.scannerBookcardTitle}>Book added</Text>
              <Text style={styles.scannerBookcardText}>ISBN: {isbn}</Text>
              {/* <Text style={styles.scannerBookcardText}>
                Book id: {bookData[0].id}{" "}
              </Text> */}
              <Text style={styles.scannerBookcardText}>
                Author: {bookData[0].volumeInfo.authors[0]}
              </Text>
              <Text style={styles.scannerBookcardText}>
                Title: {bookData[0].volumeInfo.title}
              </Text>
              {bookData[0].volumeInfo.imageLinks.thumbnail ? (
                <Card.Cover
                  style={styles.scannerBookcardImage}
                  source={{
                    uri: bookData[0].volumeInfo.imageLinks.thumbnail,
                  }}
                />
              ) : null}
            </Card.Content>
          </Card>
        ) : (
          <Text>No book detected</Text>
        )}

        {!scanned ? (
          <View style={styles.scannerCameraContainer}>
            <CameraView
              barCodeScannerSettings={{
                barCodeTypes: ["ean13"],
              }}
              onBarcodeScanned={(bookDetails) => {
                setIsbn(bookDetails.data);
                setScanned(true);
                playSound();
              }}
              style={styles.scannerCamera}
            >
              <TouchableOpacity>
                <Text style={styles.scannerCrosshair}>[ ]</Text>
              </TouchableOpacity>
            </CameraView>
            <Pressable
              style={styles.buttonBackScanner}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.scannerButtonText}>Go Back</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.scannerButtonContainer}>
            <Pressable style={styles.scannerButton} onPress={scannerSwitch}>
              <Text style={styles.scannerButtonText}>Cancel add</Text>
            </Pressable>
            {/* <Pressable style={styles.button} onPress={saveScan}>
            <Text style={styles.buttonText}>Scan another book?</Text>
          </Pressable> */}
            <Pressable
              style={styles.scannerButton}
              onPress={handleScanAnotherBook}
            >
              <Text style={styles.scannerButtonText}>Scan another book</Text>
            </Pressable>
            {/* <Pressable
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Return to Catalogue</Text>
          </Pressable> */}
            <Pressable
              style={styles.scannerButton}
              onPress={handleReturnToCatalogue}
            >
              <Text style={styles.scannerButtonText}>
                Add & Return to Catalogue
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <Text>
        App does not have permission to access camera, please reload app and
        grant permissions
      </Text>
    );
  }
};

export default BarcodeScanner;
