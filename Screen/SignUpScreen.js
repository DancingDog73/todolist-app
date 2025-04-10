import { useState, useContext } from "react";
import {Text, View, TextInput, Pressable, StyleSheet} from "react-native";

import { TokenContext, UsernameContext } from "../Context/Context";
import { signUp } from "../API/sign";



export default function SignUpScreen ({navigation}) {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");

  const signUserUp = () => {
    if (login.trim() === "" || password.trim() === "" || passwordConfirmation.trim() === "")
      setError("Vous devez indiquez tous les champs pour créer votre compte !")
    else if (password !== passwordConfirmation)
      setError("Votre confirmation de mot de passe est incorrecte !")
    else
      signUp(login, password)
        .then(token => {
          setToken(token)
          setUsername(login)
          //navigation.navigate('Home')
        })
        .catch(err => {
          if (err.message[0] === "U")
            setError("Cet utilisateur existe déjà !")
          else
            setError(err.message)
        })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Créer un compte pour gérer vos todolists</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          onChangeText={setLogin}
          placeholder="Nom d'utlisateur"
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
        <TextInput
          onChangeText={setPasswordConfirmation}
          placeholder='Confirmation de mot de passe'
          value={passwordConfirmation}
          secureTextEntry={true}
          style={styles.input}
        />
        <Pressable onPress={() => signUserUp()} style={styles.button}>
            <Text style={styles.buttonText}>Créer un compte</Text>
        </Pressable>
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Vous avez déjà un compte ?{" "}
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.link}>Se connecter</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9", // fond clair pour contraster avec les éléments
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5, // ombre légère
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400, // Limite la largeur pour éviter que ça ne soit trop grand sur les écrans larges
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
    color: "#333", // Couleur sombre pour le titre
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
    backgroundColor: "#0077b6", // Bleu plus doux
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
    color: "#777", // Couleur grise pour le texte de pied de page
  },
  link: {
    color: "#0077b6", // Le bleu plus doux
    fontWeight: "bold",
  },
});