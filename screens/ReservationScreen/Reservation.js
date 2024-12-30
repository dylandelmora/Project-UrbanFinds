import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Reservation({ navigation }) {
  const [venues, setVenues] = useState([]);

  // Fetch data venue dari database menggunakan API
  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://192.168.1.8:4001/api/auth/venues'); 
      setVenues(response.data); // Simpan data venue ke state
    } catch (error) {
      console.error('Error fetching venues:', error.response?.data || error.message);
      Alert.alert('Error', 'Gagal mengambil data venue. Coba lagi.');
    }
  };

  useEffect(() => {
    fetchVenues(); 
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Venue"
          placeholderTextColor="#CCC"
        />
        <TouchableOpacity
          style={styles.historyIcon}
          onPress={() => navigation.navigate('ReservationHistory')}
        >
          <Icon name="history" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.reservationContainer}>
      {venues.map((venue) => (
        <TouchableOpacity
  key={venue.venueId}
  style={styles.card}
  onPress={() =>
    navigation.navigate('ReservationDate', {
      place: venue.venueName,
      image: venue.venueImage,
      facility: venue.venueFacility,
      description: venue.description,
      venueId: venue.venueId, 
    })
  }
>
  <Image
    source={{ uri: `http://192.168.1.8:4001${venue.venueImage}` }}
    style={styles.cardImage}
  />
  <Text style={styles.cardTitle}>{venue.venueName}</Text>
</TouchableOpacity>


))}

      </ScrollView>
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
    marginBottom: 20,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    backgroundColor: '#2A3E55',
    color: '#fff',
    padding: 15,
    borderRadius: 15,
    width: '85%',
  },
  historyIcon: {
    padding: 10,
  },
  reservationContainer: {
    flexDirection: 'column',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
