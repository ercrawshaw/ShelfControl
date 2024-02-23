import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { addCatalogue } from "../src/addCatalogue";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import NavigationBar from "../components/Navbar";


const NewCatalogueScreen = () => {
  const [catalogueName, setCatalogueName] = useState("");
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();

  const handleCatalogueAdd = () => {
    addCatalogue(currentUid, catalogueName).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
    <View>
    <NavigationBar />

    <KeyboardAvoidingView>
      <View style={styles.profileContainer}>
        <TextInput
          placeholder="Catalogue Name"
          style={styles.profileText}
          value={catalogueName}
          onChangeText={(text) => setCatalogueName(text)}
        ></TextInput>
        <Pressable
          style={[styles.UPbutton, styles.buttonOutline]}
          onPress={handleCatalogueAdd}
        >
          <Text style={styles.NCbuttonText}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
    
    </View>
  );
};

export default NewCatalogueScreen;

