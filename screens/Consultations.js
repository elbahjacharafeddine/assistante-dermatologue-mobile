// ConsultationList.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import ConsultationCard from './ConsultationCard';
import { API_BASE_URL } from './apiConfig';
import axios from 'axios';

const Consultations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiZXhwIjoxNzAxODY4ODEyLCJhdXRoIjoiUk9MRV9ERVJNQVRPTE9HVUUiLCJpYXQiOjE3MDE3ODI0MTJ9.buzpdyX3YKqnHqD0hCGcu5m2Wwsx39-HjTBEySfUQ8_40Ux3s9Q57akW8FT4IO8NUVvDLrNmlDr9LcFQR_xqew"


  // const api = 'http://192.168.1.11:8080'

  useEffect(() => {
    const getConsultations = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/api/consultations/listeConsultations/dematologue/655cd48a2f775e6a927c0b22',
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }).then((response) => {
            const consultationsData = response.data;
            setConsultations(consultationsData);
            // const alertMessage = consultationsData.map(consultation => (
            //   `Nom du patient: ${consultation.rendezVous.patient.user.firstName} ${consultation.rendezVous.patient.user.lastName}\n` +
            //   `Date de rendez-vous: ${consultation.rendezVous.dateDebut}\n` +
            //   `Téléphone: ${consultation.rendezVous.patient.telephone}\n` +
            //   '------------------------------------'
            // )).join('\n');

            // alert(alertMessage);
          });

      } catch (error) {
        console.error(error);
      }
    };

    getConsultations();
  }, []);


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
  },
});

export default Consultations;
