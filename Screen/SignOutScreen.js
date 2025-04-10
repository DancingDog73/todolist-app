import { useContext } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { UsernameContext, TokenContext } from "../Context/Context";

export default function SignOutScreen() {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  const signUserOut = () => {
    setUsername(null);
    setToken(null);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={signUserOut} style={styles.button}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
    padding: 20,
  },
  button: {
    backgroundColor: "#0077b6",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
