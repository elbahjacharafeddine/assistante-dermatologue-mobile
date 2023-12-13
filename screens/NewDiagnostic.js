import React, { useCallback, useEffect, useState } from 'react';
import { Button, Image, Platform, View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { API_BASE_MODEL, API_BASE_URL } from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';





export default function NewDiagnostic() {


  const [image, setImage] = useState(null);
  const [imageString, setImageString] = useState(null);

  const [selectedSymptom, setSelectedSymptom] = useState([]);
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

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false)
  const navigation = useNavigation();

  
  const handleCheckBoxChange = (symptom) => {
    setCheckBoxValues((prevValues) => ({
      ...prevValues,
      [symptom]: !prevValues[symptom],
    }));
  };



  const ConfirmSenddata = async () => {
    setVisible(true)
    const s = symptoms.filter((symptom) => checkBoxValues[symptom]);
    console.log('Selected Symptoms:', s);
    dataJson.symptoms=s
    const apiUrl = API_BASE_MODEL + '/disease/predict';
    

    const formData = new FormData();
    formData.append('image',
    {
      uri: image,
      type: 'image/jpeg',
      name: 'image',
    }
    );

      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response =>{
        console.log(response.data);
        // dataJson.probability = response.data.probability
        
      }).catch(error =>{
        console.log(error);
      })


      await sendDataToBack();
  };

  const dataJson = {
    "dateDiagnostic": "2023-12-13T08:09:02.385Z",
    "picture": "",
    "pictureContentType": "image/jpeg",
    "description": "",
    "prescription": "",
    "probability": 61.94,
    "probabilities": [
        9.86,
        1.18,
        0.06,
        26.76,
        0.04,
        61.94,
        0.17
    ],
    "symptoms":selectedSymptom,
    "consultations": {
        "id": "6578587dd20828576b9e91fc",
        "dateConsultation": "2023-12-12T13:00:00Z"
    },
    "maladies": [
        {
            "id": "656a2065816d2001e3943ff6",
            "fullName": "Melanocytic nevi",
            "abbr": "nv"
        }
    ],
    "maladiesDetected": [
        {
            "id": "656a2065816d2001e3943ff6",
            "fullName": "Melanocytic nevi",
            "abbr": "nv"
        }
    ]
}

  const sendDataToBack = useCallback( async () =>{
    const consultation_Id = await AsyncStorage.getItem("consultationId")
    try {
      const token = await AsyncStorage.getItem("token");
      dataJson.consultations.id = consultation_Id;
      const response = await axios.post(API_BASE_URL+"/api/diagnostics",dataJson,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      
    } catch (error) {
      console.log(error);
    }
    setVisible(false)
    navigation.navigate('Diagnostic', {consultationId:consultation_Id});
  })

const showData = () =>{
  console.log(dataJson);
}

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
      await showImage()
    }
    
  };


  const showImage = async () => {
    console.log("ELBAHJA jjjjjjjjjjjjjjjj");
    const imagePath = image; 
    const response = await fetch(imagePath);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {
        // var base64data = reader.result;
        var base64data = reader.result.split(',')[1];
        // console.log(base64data);
        dataJson.picture = base64data
    };
    reader.readAsDataURL(blob);
    console.log("ELBAHJA HHHHHHH");
}
  

  return (
    <View style={styles.container}>
      <Button  title='Show image' onPress={showImage}/>
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

      {
        <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.containerLoading}>
          <View style={styles.horizontal}>
            <ActivityIndicator size="large" color="green" />
          </View>
        </View>
      </Modal>
      }
      <Button title='Show Data' onPress={showData}/>

      {
        image && <Button title="Confirm" onPress={ConfirmSenddata} />
      }
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

  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
