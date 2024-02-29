import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Video, ResizeMode } from "expo-av";

const SplashScreen = () => {
  const video = React.useRef(null);
  const playerButton = React.useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [status, setStatus] = React.useState({});
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "white",
    },
    video: {
      height: "100%",
      width: "100%",
    },
    buttons: {
      display: "flex",
      width: "500px",
      flexDirection: "row",
      padding: 0,
      margin: 0,
      justifyContent: "flex-start",
      marginLeft: "200px",
    },
    spacing: {
      marginRight: "16px",
    },
  });

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/splash.mp4")}
        autoPlay
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={true}
        isMuted={isMuted}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default SplashScreen;
