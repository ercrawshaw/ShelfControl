import {  StyleSheet, Text, View,Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const navigation = useNavigation()



export default function addNewBookScreen(){
    return(
        <View style={styles.container}>
            <Button title="Scan a book barcode" onPress={()=>{navigation.navigate('Scanner')}}/>
            <Button title="Manually add a book"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#42273B",
      width: "100%",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#42273B",
      borderWidth: 2,
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutlineText: {
      color: "#42273B",
      fontWeight: "700",
      fontSize: 16,
    },
  });
  