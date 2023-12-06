import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConsultationCard = ({ item }) => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        const dermatologueId = item.rendezVous.patient.user.id;
        const patientId = item.rendezVous.id;

        Alert.alert(
            'Détails de la consultation',
            `ID du patient: ${patientId}\nID du dermatologue: ${dermatologueId}`
        );
        navigation.navigate('Diagnostique', { dermatologueId, patientId });
    };

    return (
        <TouchableOpacity onPress={handleCardPress}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./consultationImage.jpg')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.label}>Nom :</Text>{' '}
                        <Text style={styles.value}>
                            {item.rendezVous.patient.user.firstName}{' '}
                            {item.rendezVous.patient.user.lastName}
                        </Text>
                    </Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.label}>Téléphone :</Text>{' '}
                        <Text style={styles.value}>{item.rendezVous.patient.telephone}</Text>
                    </Text>
                    <Text style={styles.cardText}>
                        <Text style={styles.label}>Date de consultations :</Text>{' '}
                        <Text style={styles.value}>{item.rendezVous.dateDebut}</Text>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', // Utiliser flexDirection pour disposer les éléments en ligne
        marginBottom: 20,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FDF5E6',
        borderWidth: 1,
        borderColor: '#FFA07A',
    },
    imageContainer: {
        marginRight: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: 'cover',
        borderRadius:10
    },
    infoContainer: {
        flex: 1, // Utiliser flex: 1 pour que les informations occupent tout l'espace restant
        flexDirection: 'column',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#8B4513',
    },
    cardText: {
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        color: '#2E8B57',
    },
    value: {
        color: '#696969',
    },
});

export default ConsultationCard;
