// Diagnostic.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import { RNCamera } from 'react-native-camera';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from './apiConfig';
import DiagnosticCard from "./adapter/DiagnosticCard";
import { FontAwesome } from '@expo/vector-icons';
import {TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
const Diagnostic = ({ route }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const { dermatologueId, consultationId } = route.params;
    const [token, setToken] = useState("")
    const isfocused = useIsFocused();

    const [diagnostics, setDiagnostics] = useState([])

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <DiagnosticCard item={item} />
    );

    const getAllDiagnostics = async ()=>{
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await axios.get(API_BASE_URL+"/api/diagnostics/consultations/"+ consultationId,{
                headers: {
                    "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                },
            }
        );
            setDiagnostics(response.data)
        }catch (error){
            console.log(error)
            console.log("Error dans la partie Diagnostics")
        }
    }

    useEffect(() => {
        if (isfocused){
            getAllDiagnostics()
        }
    }, [isfocused]);

    const handleAddDiagnostic = () => {
        navigation.navigate("new Diagnostic")
    };



    return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    // onChangeText={searchFilter}
                    // value={searchQuery}
                />
                <View >
                    <ScrollView>
                        <FlatList
                            data={diagnostics}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                        />
                    </ScrollView>

                </View>

                    <View style={styles.modalStyle}>
                        <TouchableOpacity
                            style={styles.addButtonText}
                            onPress={handleAddDiagnostic}
                        >
                            <FontAwesome name="plus" size={30} color="green" style={{textAlign:"center", marginBottom:0}} />
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
        marginBottom:10,
        justifyContent: 'space-between',
    },
    modalStyle:{
        display:'flex',
        justifyContent:'flex-start'

    },
    listContainer: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#A9A9A9',
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop:-50,
    },

    addButtonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        // marginBottom:20,
        marginTop:-10,
        textAlign:"center"
    },
});
export default Diagnostic;
