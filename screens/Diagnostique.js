// Diagnostique.js
import React from 'react';
import { View, Text } from 'react-native';

const Diagnostique = ({ route }) => {
    const { dermatologueId, patientId } = route.params;

    return (
        <View>
            <Text>Diagnostique Component</Text>
            <Text>Dermatologue ID: {dermatologueId}</Text>
            <Text>Patient ID: {patientId}</Text>
            {/* Add the rest of your code for the Diagnostique component */}
        </View>
    );
};

export default Diagnostique;
