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
import { catalogueExistsCheckFunc } from "../utils/catalogueExistsCheck";

const NewCatalogueScreen = () => {
  const [catalogueName, setCatalogueName] = useState("");
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();

  const handleCatalogueAdd = () => {
    catalogueExistsCheckFunc(currentUid, catalogueName)
      .then(() => {
        addCatalogue(currentUid, catalogueName).then(() => {
          navigation.navigate("HomeScreen");
        });
      })
      .catch((error) => {
        console.log(error);
        navigation.navigate("NewCatalogueScreen");
      });
  };

  return (
    <View>
      <NavigationBar />

      <KeyboardAvoidingView>
        <View style={styles.profileContainer}>
          <View>
            <TextInput
              style={styles.profileTextInput}
              placeholder="Catalogue Name"
              value={catalogueName}
              onChangeText={(text) => setCatalogueName(text)}
            />
          </View>
          <View>
            <Pressable
              style={[styles.UPbutton, styles.buttonOutline]}
              onPress={handleCatalogueAdd}>
              <Text style={styles.NCbuttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewCatalogueScreen;
