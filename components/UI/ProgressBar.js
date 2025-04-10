import { useState } from "react";
import { View, Text, StyleSheet } from "react-native-web";


export default function ProgressBar ({progress}) {

    const getProgressColor = (progress) => {
        const red = Math.floor(255 * (1 - progress)); // Diminue du rouge
        const green = Math.floor(125 * progress); // Augmente du vert
        return `rgb(${red}, ${green}, 0)`;
    }

    const progressColor = getProgressColor(progress);

    return (
        <View style={styles.progressBarBackground}>
            <View
                style={[
                    styles.progressBarFill,
                    { width: `${progress * 100}%`, backgroundColor: progressColor },
                ]}
            />
            <Text style={styles.percentageText}>{`${Math.round(progress * 100)}%`}</Text>
        </View>
    );

}


const styles = StyleSheet.create({
    progressBarBackground: {
        width: '100%',
        height: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        position: 'relative',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 10,
    },
    percentageText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 15,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});