import React from "react";
import { View, StyleSheet } from "react-native-web";

export default function ActivityIndicator () {
  return (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0077b6" />
    </View>
  );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 10,
      },
  });
  