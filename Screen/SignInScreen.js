import { useState, useContext, useEffect } from "react";
import {Text, View, TextInput, Pressable, StyleSheet} from "react-native";

import { TokenContext, UsernameContext } from "../Context/Context";
import { signIn } from "../API/sign";
import LoadingIndicator from "../components/UI/LoadingIndicator";


export default function SignInScreen ({navigation}) {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  const signUserIn = () => {
    if (login.trim() !== "" && password.trim() !== "")
      signIn(login, password)
        .then(token => {
          setToken(token)
          setUsername(login)
          //navigation.navigate('Home')
        })
        .catch(err => {
          if (err.message[0] === "U")
            setError("Cet utilisateur n'existe pas !")
          else if (err.message[0] === "I")
            setError("Le mot de passe est incorrect !")
          else
            setError(err.message)
        })
    else
      setError("Vous devez indiquer tous les champs pour pouvoir vous connecter !")
  }

  return (
    <>
      {isLoading ? (
        <LoadingIndicator/>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Connectez vous pour gérer vos todolists</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              onChangeText={setLogin}
              placeholder="Nom d'utilisateur"
              value={login}
              style={styles.input}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder='Mot de passe'
              value={password}
              secureTextEntry={true}
              style={styles.input}
            />
            <Pressable onPress={() => signUserIn()} style={styles.button}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </Pressable>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Vous n'avez pas de compte ?{" "}
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.link}>Créez en</Text>
              </Pressable>
            </Text>
          </View>
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
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400, 
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#0077b6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#0077b6",
    fontWeight: "bold",
  },
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