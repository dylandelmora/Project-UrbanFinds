import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function RestaurantCategory({ navigation }) {
  const [restaurants, setRestaurants] = useState([]); // State untuk menyimpan data restoran
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian

  // Fungsi untuk mengambil data dari API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://192.168.1.8:4001/api/auth/venues'); // Ganti URL dengan endpoint API Anda
      const filteredRestaurants = response.data.filter((item) => item.venueType === 'Restaurant'); // Filter untuk kategori "Restaurant"
      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
    }
  };

  // Ambil data saat komponen dirender
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Restaurant</Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <ScrollView style={styles.list}>
        {restaurants
          .filter((restaurant) =>
            restaurant.venueName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((restaurant) => (
            <View style={styles.recommendationCard} key={restaurant.venueId}>
              <Image
                source={{ uri: `http://192.168.1.8:4001${restaurant.venueImage}` }}
                style={styles.recommendationImage}
              />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>{restaurant.venueName}</Text>
                <Text style={styles.recommendationDescription}>
                  Address: {restaurant.venueAddress}
                </Text>
                <Text style={styles.recommendationDescription}>
                  Open Hours: {restaurant.openTime} - {restaurant.closeTime}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
  },
  header: {
    padding: 30,
    backgroundColor: '#1A2B45',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#2A3E55',
    color: '#fff',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  list: {
    padding: 15,
  },
  recommendationCard: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  recommendationImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  recommendationContent: {
    flex: 1,
    padding: 10,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
});
