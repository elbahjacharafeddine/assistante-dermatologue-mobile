import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';
const Profile = () => {
  const [dermatologueDrawer,setDermatologueDrawer]=useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiZXhwIjoxNzAxNDM0NTczLCJhdXRoIjoiUk9MRV9ERVJNQVRPTE9HVUUiLCJpYXQiOjE3MDEzNDgxNzN9.jqKC7Z0X1OdTyL6Oakas7eBSxH5VM8VAzcFkLvtrHN-Mdm5tng_d8gAMuUCRfQCu9hiLj5Jwcvo0A5kt1EjrgQ"

  useEffect(() => {
    const getDermatologue = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/api/dermatologues/655d346b1ccaf853d2b2b2a4',
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }).then((response) => {
           
            // const alertMessage = consultationsData.map(consultation => (
            //   `Nom du patient: ${consultation.rendezVous.patient.user.firstName} ${consultation.rendezVous.patient.user.lastName}\n` +
            //   `Date de rendez-vous: ${consultation.rendezVous.dateDebut}\n` +
            //   `Téléphone: ${consultation.rendezVous.patient.telephone}\n` +
            //   '------------------------------------'
            // )).join('\n');
            const dermatologueDrawer = response.data;
            setDermatologueDrawer(dermatologueDrawer);
    
            const { firstName, lastName } = dermatologueDrawer.user;
            setFirstName(firstName);
            setLastName(lastName);
    

            // Affichez les informations dans une alerte
            // alert(`Prénom: ${firstName}\nNom de famille: ${lastName}`);
          });

      } catch (error) {
        console.error(error);
      }
    };

    getDermatologue();
  }, []);
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
     coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
  
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} /> */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{` ${firstName} ${lastName}`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Like" onPress={() => {}} />
        <Button title="Message" onPress={() => {}} />
        <Button title="Share" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '60%',
    justifyContent: 'space-between',
  },
});


export default Profile;