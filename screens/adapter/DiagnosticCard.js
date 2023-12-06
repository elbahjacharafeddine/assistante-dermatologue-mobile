// ConsultationCard.js

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DiagnosticCard = ({ item }) => {

    const  getDate = (date) =>{
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }
    const getHour = (date) =>{
        const dateObject = new Date(date);
        const hours = dateObject.getUTCHours()+1;
        const minutes = dateObject.getUTCMinutes();
        const seconds = dateObject.getUTCSeconds();

        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const handleClickItem = () =>{
        // alert("item clicked ...")
        alert(item.dateDiagnostic)
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
                    {/*<Text style={styles.title}>{item.id}</Text>*/}
                    <Text style={styles.title}>Disease : {item.maladies[0].abbr}</Text>
                    <Text style={styles.title}>Probabilty : {item.probability}</Text>
                    <Text>Date :<Text style={styles.title}>{getDate(item.dateDiagnostic)}</Text></Text>
                    <Text>Hour :{getHour(item.dateDiagnostic)}</Text>
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
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DiagnosticCard;
