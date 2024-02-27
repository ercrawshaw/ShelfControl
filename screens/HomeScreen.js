import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "../contexts/userContext";
import { getAllCatalogues } from "../src/getAllCatalogues";
import NavigationBar from "../components/Navbar";
import { TextInput } from "react-native-web";
import styles from "../styles/styles";
import LoadingMessage from "../components/LoadingMessage";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentCatalogues, setCurrentCatalogues] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { currentUid } = useContext(CurrentUserContext);
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused){
    getAllCatalogues(currentUid).then((res) => {
      let catalogues = [];
      res.forEach((doc) => {
        catalogues.push(doc.id);
      });
      setPageLoading(false);
      setCurrentCatalogues(catalogues);
    });
    }
  }, [isFocused]);

  //console.log(auth.currentUser.providerData);

  const handleAddCatalogue = () => {
    navigation.navigate("NewCatalogueScreen");
  };

  const handleCatalogueClick = (catalogue) => {
    navigation.navigate("SingleCatalogueScreen", { catalogue_id: catalogue });
  };

  if (pageLoading) {
    return <LoadingMessage />;
  } else {
    return (
      <SafeAreaView style={styles.HScontainer}>
        <NavigationBar />

        <View style={styles.HSmainScreen}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {currentCatalogues.map((catalogue, index) => (
              <Pressable
                style={[
                  styles.filledPressButton,
                  styles.filledPressButtonOutline,
                ]}
                // catalogue={catalogue}
                key={index}
                onPress={() => {
                  handleCatalogueClick(catalogue);
                }}
              >
                <Text style={styles.filledPressButtonText}>{catalogue}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <Pressable onPress={handleAddCatalogue} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Add a New Catalogue</Text>
          </Pressable>
        </View>
        
      </SafeAreaView>
    );
  }
};
export default HomeScreen;
