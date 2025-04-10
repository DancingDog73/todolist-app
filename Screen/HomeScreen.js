import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UsernameContext } from "../Context/Context";
import LoadingIndicator from "../components/UI/LoadingIndicator";

export default function HomeScreen () {

  const [username, setUsername] = useContext(UsernameContext)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{username}</Text>
          <Text style={styles.subtitle}>Votre tableau de bord</Text>
        </View>
      )}
    </>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9", // Fond clair pour un contraste doux
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});