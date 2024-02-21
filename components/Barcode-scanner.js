import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { fetchBook } from "./api";
import { useNavigation } from "@react-navigation/native";

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [isbn, setIsbn] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bookData, setBookData] = useState(null);
  const bookList = [];

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

  const scannerSwitch = () => {
    setScanned(false);
    setBookData(null);
  };
  const saveScan = () => {
    if (bookData !== null) {
      bookList.push(bookData);
      setScanned(false);
      setBookData(null);
    } else {
      console.warn("error with saved scan, check bookData value");
    }
  };
  return (
    <View style={styles.container}>
      <Text>ISBN: {isbn}</Text>
      <Text>{bookData ? bookData[0].id : "No book detected"}</Text>
      <Text>{bookData ? bookData[0].volumeInfo.authors[0] : null}</Text>
      <Text>{bookData ? bookData[0].volumeInfo.title : null}</Text>
      {!scanned ? (
        <View>
          <CameraView
            barCodeScannerSettings={{
              barCodeTypes: ["ean13"],
            }}
            onBarcodeScanned={(bookDetails) => {
              setIsbn(bookDetails.data);
              setScanned(true);
            }}
            style={styles.camera}
          >
            <TouchableOpacity>
              <Text style={styles.crosshair}>[ ]</Text>
            </TouchableOpacity>
          </CameraView>
          <Button
            title="Go Back"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      ) : (
        <View>
          <Button title="Scan again?" onPress={scannerSwitch} />
          <Button title="Scan another book?" onPress={saveScan} />
          <Button
            title="Return to Catalogue"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default BarcodeScanner;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: "auto",
    width: 300,
  },
  crosshair: {
    color: "white",
    textAlign: "center",
    fontSize: 110,
  },
});
