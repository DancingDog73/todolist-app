import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput, View, Pressable } from "react-native-web";


export default function Input (props) {

    const [text, setText] = useState("")

    const [error, setError] = useState("")



    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={(value) => {
                    setText(value)
                    if (error) setError("")
                }}
                placeholder={props.placeholder}
                value={text}
            />
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.addButton} onPress={() => {
                    if (text.trim() !== "") {
                        props.action(text.trim())
                        setText("")
                    } else {
                        setError("Vous devez indiquer tous les champs")
                    }
                }}>
                    <Text style={styles.buttonText}>Ajouter</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => {
                    props.cancel()
                    setText("")
                    setError("")
                }}>
                    <Text style={styles.buttonText}>Annuler</Text>
                </Pressable>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: "#ff4d4d",
    },
    errorContainer: {
        marginTop: 8,
        marginBottom: 15,
    },
    errorText: {
        color: "#ff4d4d",
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,  // Added margin to separate from input
    },
    addButton: {
        backgroundColor: "#0077b6",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        width: "48%",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#888", // Slightly opaque gray for visibility
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        width: "48%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});