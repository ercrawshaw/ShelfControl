import {  StyleSheet, Text, View,Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";



export default function AddNewBookScreen(){
  const navigation = useNavigation()
    const [manIsbn, setManIsbn] = useState(null)
    const [manBookData,setManBookData]=useState(null)
    useEffect(()=>{
      if(manIsbn.length===13){
      fetchBook(manIsbn).then(({items})=>{
        if(items.length===0)setManBookData(null)
        setManBookData(items)
      }).catch((err)=>{
        console.log(err)
      })}
    },[manIsbn])
    return(
        <View style={styles.container}>
            <Text title="Enter ISBN if known"/>
            {!manBookData?<TextInput 
            inputMode="numeric"
            maxLength={13}
            value={manIsbn}
            onChangeText={text => setManIsbn(text)}
            />
            :
            <View>
              <Text>{manBookData[0].id}</Text>
              <Text>{manBookData[0].volumeInfo.title}</Text>
              <Text>{manBookData[0].volumeInfo.title}</Text>
              <View>
                <Button title="Submit?"/> {/*build post function*/}
                <Button title="Go Back" onPress={()=>{navigation.goback()}}/>
              </View>
            </View>}
            <Button title="Scan a book barcode" onPress={()=>{navigation.navigate('Scanner')}}/>
            <Button title="Manually add a book"/> {/*consult Elle on her branch*/}
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
  