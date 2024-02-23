import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import addFriend from "../src/addFriend";
import { getAllCatalogues } from "../src/getAllCatalogues";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation } from "@react-navigation/native";


const PublicProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { currentUid } = useContext(CurrentUserContext);
  const { user } = route.params;
  const [requested, isRequested] = useState(false);
  const [currentCatalogues, setCurrentCatalogues] = useState([]);
  const uid = "N1xC3SF9KgNLNAde6sWvODrRaUO2";

  function handleAddFriend() {
    //creating friendship document for both user
    addFriend(uid, user.id);
    isRequested(true);
  };

  const handleCatalogueClick = (catalogue) => {
    navigation.navigate("SingleCatalogueScreen", { catalogue_id: catalogue, friendsUid: user.id });
  };

  useEffect(() => {
    getAllCatalogues(user.id).then((res) => {
      let catalogues = [];
      res.forEach((doc) => {
        catalogues.push(doc.id);
      });
      setCurrentCatalogues(catalogues);
    });
  }, []);


  //if add button click change to non editable and display "friend request sent"
  return (
    <View>
      <Image style={styles.avatar} source={{ uri: user.data().avatar_img }} />
      <Text>{user.data().username}</Text>
      {requested ? (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} disabled={true}>
            Friend request pending
          </Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add as friend</Text>
        </Pressable>
      )}
      <ScrollView>
        {currentCatalogues.map((catalogue, i) => {
          return (
            <View key={i}>
              <Pressable
              onPress={() => {
                handleCatalogueClick(catalogue);
              }}
              >
              <Text>{catalogue}</Text>  
              </Pressable>
              
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
};

export default PublicProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    height: 50,
    width: 50,
  },
  button: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonCatalogueText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  scrollView: {
    width: "95%",
  },
  bottomContainer: {
    marginBottom: 5,
  },
});
