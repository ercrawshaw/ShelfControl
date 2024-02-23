import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/Navbar";
import styles from "../styles/styles";



export default function AddNewBookScreen() {

  const navigation = useNavigation();
  const [manIsbn, setManIsbn] = useState(null);
  const [manBookData, setManBookData] = useState(null);


  useEffect(() => {
    if (manIsbn && manIsbn.length === 13) {
      fetchBook(manIsbn)
        .then(({ items }) => {
          if (items.length === 0) setManBookData(null);
          setManBookData(items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [manIsbn]);


  return (

    <View style={styles.ADcontainer}>
      
      <NavigationBar/>

      <Text title="Enter ISBN if known" />
      {!manBookData ? (
        <TextInput
          inputMode="numeric"
          maxLength={13}
          value={manIsbn}
          onChangeText={(text) => setManIsbn(text)}
        />
      ) : (
        <View>
          <Text>{manBookData[0].id}</Text>
          <Text>{manBookData[0].volumeInfo.authors}</Text>
          <Text>{manBookData[0].volumeInfo.title}</Text>
          <View>
            <Button title="Submit?" /> {/*build post function*/}
            <Button
              title="Go Back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      )}
      
      <View style={styles.bigButtonContainer}>
        <Pressable
        style={styles.bigButton}
        onPress={() => {
            navigation.navigate("Scanner");
        }}
        >
            <Text style={styles.bigButtonText}>Scan a Book Barcode</Text>
        </Pressable>

        <Pressable
        style={styles.bigButton}
        onPress={() => {
            navigation.navigate("ManualSearch");
        }}
        >
            <Text style={styles.bigButtonText}>Manually Add a Book</Text>
        </Pressable>
      </View>


    </View>
  );
}


