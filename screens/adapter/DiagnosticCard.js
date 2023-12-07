// ConsultationCard.js

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Root, Popup } from 'popup-ui'
const DiagnosticCard = ({ item }) => {

    const  getDate = (date) =>{
        const dateObject = new Date(date);
        dateObject.setHours(dateObject.getHours()+1)
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;

        const day = dateObject.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }
    const getHour = (date) =>{
        const dateObject = new Date(date);
        dateObject.setHours(dateObject.getHours()+1)
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const handleClickItem = () =>{
        // alert("item clicked ...")
        // alert(item.dateDiagnostic)
    }

    return (
        <TouchableOpacity onPress={handleClickItem}>
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `data:image/png;base64,${item.picture}` }}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>
                        <Text style={styles.value}>Disease :</Text>{' '}
                        <Text style={styles.label}>{item.maladies[0].abbr}</Text>
                    </Text>

                    <Text style={styles.cardText}>
                        <Text style={styles.value}>Probabilty :</Text>{' '}
                        <Text style={styles.label}>{item.probability}</Text>
                    </Text>

                    <Text style={styles.cardText}>
                        <Text style={styles.value}>Date :</Text>{' '}
                        <Text style={styles.label}>{getDate(item.dateDiagnostic)}</Text>
                    </Text>

                    <Text style={styles.cardText}>
                        <Text style={styles.value}>Date :</Text>{' '}
                        <Text style={styles.label}>{getHour(item.dateDiagnostic)}</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 25,
    },
    textContainer: {
        marginTop:10,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        // color: ''
        fontSize: 18,
    },
});

export default DiagnosticCard;
