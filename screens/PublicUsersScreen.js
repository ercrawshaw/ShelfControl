import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { getAllPublicUsers } from "../src/getAllUsers";

const PublicUsersScreen = () => {
  useEffect(() => {
    getAllPublicUsers().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <View>
      <Text>PublicUsersScreen</Text>
    </View>
  );
};

export default PublicUsersScreen;

const styles = StyleSheet.create({});
