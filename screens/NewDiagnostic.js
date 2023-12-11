import React, { useEffect, useState } from 'react';
import { Button, Image, Platform, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { API_BASE_MODEL } from './apiConfig';

export default function NewDiagnostic() {
  const [image, setImage] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState("Symptom 1");
  const symptoms = ['Rougeur', 'Démangeaisons', 'Irritation', 'Sécheresse', 'Eruption cutanée', 'Desquamation', 'Taches sombres'];
  const [checkBoxValues, setCheckBoxValues] = useState({
    Rougeur: false,
    Démangeaisons: false,
    Irritation: false,
    Sécheresse: false,
    "Eruption cutanée": false,
    "Desquamation": false,
    "Taches sombres": false,
  });

  const handleCheckBoxChange = (symptom) => {
    setCheckBoxValues((prevValues) => ({
      ...prevValues,
      [symptom]: !prevValues[symptom],
    }));
  };

  const displaySelectedSymptoms = async () => {
    const selectedSymptoms = symptoms.filter((symptom) => checkBoxValues[symptom]);
    console.log('Selected Symptoms:', selectedSymptoms);

    const apiUrl = API_BASE_MODEL + '/disease/predict';

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    // try {
    //   const response = await axios.post(apiUrl, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response =>{
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

      console.log("Hi ELBAHJA ......");
      console.log('Prediction result:', response.data);
    // } catch (error) {
    //   console.error('Error predicting disease:', error.message);
    // }
  };

  useEffect(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied !!');
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
            {image == null ? <Text>Tap here to upload your image</Text> : <Text></Text>}
          </View>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <View style={styles.checkboxContainer}>
          {symptoms.map((symptom, index) => (
            <CheckBox
              key={index}
              title={symptom}
              checked={checkBoxValues[symptom]}
              onPress={() => handleCheckBoxChange(symptom)}
            />
          ))}
        </View>
      </ScrollView>

      <Button title="Confirm" onPress={displaySelectedSymptoms} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 10,
    flex: 1,
  },
  checkboxContainer: {
    marginTop: 20,
  },
});
