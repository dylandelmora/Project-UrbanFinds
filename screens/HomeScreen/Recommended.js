import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecommendedPlace({ route, navigation }) {
  const { placeId } = route.params; // Get the place ID passed from the previous screen
  const [placeDetails, setPlaceDetails] = useState(null); // Store the details of the place
  const [userId, setUserId] = useState(null); // Store the user ID

  // Fetch place details from the API
  const fetchPlaceDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.8:4001/api/auth/venue/${placeId}`);
      setPlaceDetails(response.data); // Set place details in the state
    } catch (error) {
      console.error('Error fetching place details:', error.message);
      Alert.alert('Error', 'Gagal mengambil data tempat. Coba lagi.');
    }
  };

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          Alert.alert('Error', 'User ID tidak ditemukan.');
          navigation.navigate('Login');
          return;
        }
        setUserId(storedUserId); // Set the userId in the state
        console.log('Stored User ID:', storedUserId);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId(); // Call the function to fetch userId
    fetchPlaceDetails(); // Fetch place details as soon as the component is mounted
  }, [placeId]);

  // Display loading screen until place details are fetched
  if (!placeDetails || !userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PLACE TO GO</Text>
      </View>

      {/* Display the place image and details */}
      <Image
        source={{ uri: `http://192.168.1.8:4001${placeDetails.venueImage}` }}
        style={styles.placeImage}
      />
      <Text style={styles.placeTitle}>{placeDetails.venueName}</Text>
      <Text style={styles.placeAddress}>{placeDetails.venueAddress}</Text>

      {/* Display the facilities */}
      <Text style={styles.sectionTitle}>Fasilitas</Text>
      <Text style={styles.text}>{placeDetails.venueFacility}</Text>

      {/* Display the description */}
      <Text style={styles.sectionTitle}>Deskripsi Singkat</Text>
      <Text style={styles.text}>{placeDetails.description}</Text>

      {/* Reservation Button */}
      <TouchableOpacity
        style={styles.reservationButton}
        onPress={() =>
          navigation.navigate('ReservationDate', {
            place: placeDetails.venueName,
            image: placeDetails.venueImage,
            facility: placeDetails.venueFacility,
            description: placeDetails.description,
            venueId: placeDetails.venueId,
            customerId: userId, // Pass the userId to ReservationDate screen
          })
        }
      >
        <Text style={styles.reservationButtonText}>Reservation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  placeAddress: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  reservationButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  reservationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
