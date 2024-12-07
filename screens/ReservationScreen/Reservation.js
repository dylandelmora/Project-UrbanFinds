import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';  

export default function Reservation({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="TOMORO COFFEE"
          placeholderTextColor="#CCC"
        />
        <TouchableOpacity style={styles.historyIcon}
        onPress= {() => navigation.navigate('ReservationHistory')}
        >
          <Icon name="history" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.reservationContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReservationDate', { place: 'Antarakata Cafe' })}
        >
          <Image
            source={require('../../assets/Antarakata.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Cafe Antarakata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReservationDate', { place: 'The Garden PIK' })}
        >
          <Image
            source={require('../../assets/Golden.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>The Garden PIK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReservationDate', { place: 'Antarakata Cafe' })}
        >
          <Image
            source={require('../../assets/Antarakata.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Cafe Antarakata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReservationDate', { place: 'The Garden PIK' })}
        >
          <Image
            source={require('../../assets/Golden.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>The Garden PIK</Text>
        </TouchableOpacity>
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
