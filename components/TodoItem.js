import { View, Text, Pressable, StyleSheet, Image } from "react-native-web";
import { useState, useEffect } from "react";

export default function TodoItem(props) {
    const [isDone, setIsDone] = useState(props.item.done);

    useEffect(
        () => {setIsDone(props.item.done)},
        [props.item.done]
    )

    const handleToggle = () => {
        setIsDone(!isDone);
        props.doItem();
    };

    return (
        <View style={[styles.container, isDone && styles.doneContainer]}>
            <Pressable onPress={handleToggle} style={styles.checkmark}>
                <Text style={styles.checkmarkText}>{isDone ? "✓" : ""}</Text>
            </Pressable>
            <Text style={[styles.text, isDone && styles.doneText]}>{props.item.content}</Text>
            <Pressable onPress={props.deleteItem} style={styles.deleteButton}>
                <Image source={require("../assets/trash-can-outline.png")} style={styles.deleteIcon} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 20, // Décalage vers la gauche
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        transition: "background-color 0.2s ease-in-out",
    },
    checkmark: {
        marginRight: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
    },
    checkmarkText: {
        fontSize: 16,
        color: "#0077b6",
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    deleteButton: {
        padding: 5,
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
    doneContainer: {
        backgroundColor: "#f0f8ff",
    },
    doneText: {
        textDecorationLine: "line-through",
        color: "#888",
    },
});
