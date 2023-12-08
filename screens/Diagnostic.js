import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import DiagnosticCard from "./adapter/DiagnosticCard";
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from './apiConfig';

const Diagnostic = ({ route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { dermatologueId, consultationId } = route.params;
    const [token, setToken] = useState("")
    const isfocused = useIsFocused();

    const [diagnostics, setDiagnostics] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const navigation = useNavigation();

    const getAllDiagnostics = useCallback(async () => {
        try {
            setIsRefreshing(true);
            const token = await AsyncStorage.getItem("token")
            const response = await axios.get(API_BASE_URL + "/api/diagnostics/consultations/" + consultationId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            setDiagnostics(response.data)
        } catch (error) {
            console.log(error)
            console.log("Error dans la partie Diagnostics")
        } finally {
            setIsRefreshing(false);
        }
    }, [consultationId]);

    useEffect(() => {
        if (isfocused) {
            getAllDiagnostics()
        }
    }, [isfocused, getAllDiagnostics]);

    const handleAddDiagnostic = () => {
        navigation.navigate("new Diagnostic")
    };

    const renderItem = ({ item }) => (
        <DiagnosticCard item={item} />
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
            />
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={getAllDiagnostics}
                />
            }>
                <FlatList
                    data={diagnostics}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                />
            </ScrollView>
            <View style={styles.modalStyle}>
                <TouchableOpacity
                    style={styles.addButtonText}
                    onPress={handleAddDiagnostic}
                >
                    <FontAwesome name="plus" size={30} color="green" style={{ textAlign: "center", marginBottom: 0 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    modalStyle: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    searchInput: {
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#A9A9A9',
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: -50,
    },
    addButtonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: -10,
        textAlign: "center"
    },
});

export default Diagnostic;
