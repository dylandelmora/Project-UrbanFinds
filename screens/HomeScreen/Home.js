import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cafe Antarakata"
          placeholderTextColor="#ccc"
        />
      </View>
      <Text style={styles.sectionTitle}>Promo</Text>
      <ScrollView horizontal style={styles.promoContainer}>
        <TouchableOpacity
          style={styles.promoBox}
          onPress={() => navigation.navigate('Promo')} 
        >
          <Text style={styles.promoText}>Promo Untuk Pengguna Baru!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.promoBox}
          onPress={() => navigation.navigate('Promo')} 
        >
          <Text style={styles.promoText}>Promo Untuk Pengguna Baru!</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.sectionTitle}>Recommended Place</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Recommended', { place: 'Cafe Antarakata' })
        } 
      >
        <Image
          source={require('../../assets/Antarakata.png')} 
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>Cafe Antarakata</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Recommended', { place: 'The Garden PIK' })
        } 
      >
        <Image
          source={require('../../assets/Golden.png')}  
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>The Garden PIK</Text>
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
    marginBottom: 20,
    padding: 5,
    alignItems: 'center',
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
    padding: 20,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
