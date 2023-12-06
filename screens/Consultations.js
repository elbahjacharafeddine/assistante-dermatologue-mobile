// ConsultationList.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import ConsultationCard from './ConsultationCard';
import { API_BASE_URL } from './apiConfig';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useIsFocused} from "@react-navigation/native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const Consultations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [consultations, setConsultations] = useState([]);

  const [token, setToken] = useState("")
  const isFocused = useIsFocused();


  const getToken = async () => {
    try {
      const t = await AsyncStorage.getItem("token");
      const response = await axios.get(
          API_BASE_URL + '/api/consultations/listeConsultations/dematologue/6547cb2707c44a7f9323eaff',
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${t}`
            },
          }
      );

      setConsultations(response.data);
    } catch (error) {
      console.log(error);
      console.log("error dans la partie consultation")
    }
  }


  useEffect( () => {
    if (isFocused) {
      getToken()
  }}, [isFocused]);
//
  const searchFilter = (text) => {
    setSearchQuery(text);
    const query = text.toLowerCase();
    const filteredData = consultations.filter(item =>
      item.rendezVous.patient.user.firstName.toLowerCase().includes(query) ||
      item.rendezVous.patient.user.lastName.toLowerCase().includes(query) ||
      item.rendezVous.patient.telephone.toLowerCase().includes(query) ||
      item.rendezVous.dateDebut.toLowerCase().includes(query)
    );
    setFilteredConsultations(filteredData);
  };
  const renderItem = ({ item }) => (
    <ConsultationCard item={item} />
  );

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={searchFilter}
        value={searchQuery}
      />
      <View>

        <FlatList
          data={filteredConsultations.length > 0 ? filteredConsultations : consultations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
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
});

export default Consultations;
