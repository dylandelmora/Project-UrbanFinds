import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const promoImage = require('../../assets/Promo.png');

export default function Home({ navigation }) {
  const [venues, setVenues] = useState([]);

  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://192.168.1.8:4001/api/auth/venues'); // Pastikan IP dan port benar
      setVenues(response.data); // Simpan data dari API ke state
    } catch (error) {
      console.error('Error fetching venues:', error.response?.data || error.message);
      Alert.alert('Error', 'Gagal mengambil data venue. Coba lagi.');
    }
  };

  useEffect(() => {
    fetchVenues(); // Panggil API saat komponen pertama kali dirender
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Venue"
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Promo Section */}
      <Text style={styles.sectionTitle}>Promo</Text>
      <ScrollView horizontal style={styles.promoContainer}>
        <TouchableOpacity
          style={styles.promoBox}
          onPress={() => navigation.navigate('Promo')}
        >
          <Image
            source={promoImage}
            style={styles.promoImage}
            resizeMode="contain" // Agar gambar tidak terpotong
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.promoBox}
          onPress={() => navigation.navigate('Promo')}
        >
          <Image
            source={promoImage}
            style={styles.promoImage}
            resizeMode="contain" // Agar gambar tidak terpotong
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Recommended Place Section */}
      <Text style={styles.sectionTitle}>Recommended Place</Text>
      <ScrollView>
        {venues.map((venue) => (
          <TouchableOpacity
            key={venue.venueId}
            style={styles.card}
            onPress={() =>
              navigation.navigate('Recommended', { placeId: venue.venueId }) 
            }
          >
            <Image
              source={{ uri: `http://192.168.1.8:4001${venue.venueImage}` }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>{venue.venueName}</Text>
            <Text style={styles.cardSubtitle}>{venue.venueDescription}</Text>
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
  },
  searchInput: {
    backgroundColor: '#2A3E55',
    color: '#fff',
    padding: 15,
    borderRadius: 15,
    width: '100%',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  promoBox: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoImage: {
    width: 140,
    height: 190,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
  },
});
