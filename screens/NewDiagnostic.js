import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity,
    StyleSheet, Alert } from "react-native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

export default function NewDiagnostic() {
    const [selectedImage, setImage] = useState(null)

    const imagePicker = () =>{
        alert("hello")
        let options ={
            storageOptions:{
                path: 'image',
            },
        };

        launchImageLibrary(options,response => {
            console.log(response)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Add Image:
            </Text>

            {/* Button to choose an image */}
            <TouchableOpacity style={styles.button}
                              onPress={() =>{imagePicker();}}
                >
                <Text style={styles.buttonText}>
                    Choose Image
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
});
