
import React,{ useState, useEffect, useRef } from 'react';
import {StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { fetchBook } from './api';
import { useNavigation } from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
export default  BarcodeScanner=({route})=>{
  const cameraRef = useRef(null)
    
    const navigation = useNavigation()
    const [permission, requestPermission] = useCameraPermissions();
    const [isbn, setIsbn]=useState(null)
    const [scanned , setScanned]=useState(false)
    const [bookData , setBookData]= useState(null)
    const [capturedImage, setCapturedImage]=useState(null) //saved from the cache as a state variable you can use to push to database
    const bookList=[]

 
 useEffect(()=>{
  if(isbn ){
  fetchBook(isbn).then(({items})=>{
    if(items.length===0)setBookData(null)
    setBookData(items)
  }).catch((err)=>{
    console.log(err)
  })}
},[isbn])

const scannerSwitch=()=>{
 setScanned(false)
 setBookData(null)
}
const saveScan = ()=>{
  if(bookData !==null){
    bookList.push(bookData)
    setScanned(false)
    setBookData(null)
  }
  else{
    console.warn("error with saved scan, check bookData value")
  }
}
const takePicture = async()=>{
  if(cameraRef){
    try{
    const data = await cameraRef.current.takePictureAsync()
    setCapturedImage(data.uri)
    console.log(capturedImage) // saves to file:///data/user/0/host.exp.exponent/cache/ExperienceData/
    }
    catch(err){
      console.log(err)
    }
  }
}
return (
  route.name==='Scanner'?
    <View style={styles.container}>
      <Text>ISBN: {isbn}</Text>
      <Text>{bookData?bookData[0].id:'No book detected'}</Text>
      <Text>{bookData?bookData[0].volumeInfo.authors[0]:null}</Text>
      <Text>{bookData?bookData[0].volumeInfo.title:null}</Text>
      {!scanned?
      <View>
      <CameraView 
        ref={cameraRef}
        barCodeScannerSettings={{
            barCodeTypes: ["ean13"]
          }}
        onBarcodeScanned={(bookDetails)=>{
          setIsbn(bookDetails.data)
          setScanned(true)
        }}
      style={styles.barcode} >
          <TouchableOpacity>
            <Text style={styles.crosshair}>[     ]</Text>
          </TouchableOpacity>
      </CameraView>
      </View>
      :
      <View>
          <Button title='Scan again?' onPress={scannerSwitch}/>
          <Button title='Scan another book?' onPress={saveScan}/>
          <Button title='Return to Catalogue' onPress={()=>{navigation.goBack()}}/>
          <Button title='Go Back' onPress={()=>{navigation.goBack()}}/>
        </View>}
    </View>
    :
    <View style={styles.container}>
      <CameraView style={styles.camera}>
        <TouchableOpacity >
            <View >
              <Entypo name='camera' size={40} style={styles.cameraIcon} onPress={takePicture}/>
            </View>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      alignSelf:'center',
      flex:1
    },

    barcode:{
      width:300,
      height:170
    },
    camera:{
      width:300,
      height:500,
      
    },
    // takePicture:{
    //   flexDirection:'row',
    //   justifyContent: 'center',
      
    // },
    cameraIcon:{
      color:'#f1f1f1',
      marginLeft:5,
      flexDirection:'row',
      
    },
    crosshair:{
      justifyContent:'center',
      color:'white',
      textAlign:'center',
      fontSize:110
    },
    cameraButton:{
      height:40,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center'
    }
  })


            