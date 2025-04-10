import { Image, Pressable, Text, View, StyleSheet } from "react-native-web";
import { useState } from "react";

export default function Item(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View
      style={[styles.container, isHovered && styles.containerHover]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text style={styles.title}>{props.title}</Text>
      <Pressable onPress={() => props.delete()}>
        <Image source={require('../../assets/trash-can-outline.png')} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "transparent",
    padding: 20
  },
  title: {
    fontSize: 16,
  },
  icon: {
    height: 22.5,
    width: 22.5,
  },
  containerHover: {
    backgroundColor: "#f0f0f0",
  },
});
