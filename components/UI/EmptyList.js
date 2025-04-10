import React from "react";
import { View, Text, Image, StyleSheet } from "react-native-web";

export default function EmptyList({ message = "Aucune donnée disponible", image }) {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
