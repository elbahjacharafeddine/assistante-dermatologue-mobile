import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConsultationCard = ({ item }) => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        const dermatologueId = item.rendezVous.patient.user.id;
        const patientId = item.rendezVous.id;
        const consultationId = item.id

        // Alert.alert(
        //     'Détails de la consultation',
        //     `ID du patient: ${patientId}\nID du consulations: ${consultationId}`
        //
        // );
        navigation.navigate('Diagnostic', { dermatologueId, consultationId });
    };

    return (
        <TouchableOpacity onPress={handleCardPress}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardContent}>
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
        marginBottom: 20,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FDF5E6',
        borderWidth: 1,
        borderColor: '#FFA07A',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
        color: '#8B4513',
    },
    cardContent: {
        flexDirection: 'column',
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
