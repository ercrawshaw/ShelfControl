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
    <View style={styles.container}>
  <View style={styles.profileHeader}>
    <Image style={styles.avatar} source={{ uri: user.data().avatar_img }} />
    <View style={styles.headerTextContainer}>
      <Text style={styles.username}>{user.data().username}</Text>
      {requested ? (
        <View style={styles.buttonContainer}>
          <Text style={styles.pendingText}>Friend request pending</Text>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </Pressable>
      )}
    </View>
  </View>
  
  <ScrollView style={styles.cataloguesContainer}>
    {currentCatalogues.map((catalogue, i) => {
      return (
        <Pressable
          key={i}
          onPress={() => {
            handleCatalogueClick(catalogue);
          }}
          style={styles.catalogueItemContainer}
        >
          <Text style={styles.catalogueItem}>{catalogue}</Text>  
        </Pressable>
      )
    })}
  </ScrollView>
</View>
  );
};

export default PublicProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   avatar: {
//     height: 50,
//     width: 50,
//   },
//   button: {
//     backgroundColor: "#42273B",
//     width: "90%",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#42273B",
//     borderWidth: 2,
//   },
//   buttonCatalogueText: {
//     color: "#42273B",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   scrollView: {
//     width: "95%",
//   },
//   bottomContainer: {
//     marginBottom: 5,
//   },
// });

const styles = StyleSheet.create({
  pressableContainer: {
    
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0F6F1',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: "#558D78",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pendingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cataloguesContainer: {
    flex: 1,
    marginTop: 20,
  },
  catalogueItemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 100,
    paddingVertical: 20,
    backgroundColor: "#558D78",
    marginTop: 5,
  },
  catalogueItem: {
    fontSize: 20,
    color: 'white',
  },
});
