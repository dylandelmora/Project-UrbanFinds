import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationDate from '../ReservationScreen/ReservationDate';

export default function RecommendedPlace({ route, navigation }) {
  const { place } = route.params; 

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PLACE TO GO</Text>
      </View>

      
      <Image
        source={require('../../assets/Antarakata.png')}  
        style={styles.placeImage}
      />
      <Text style={styles.placeTitle}>{place}</Text>
      <Text style={styles.placeAddress}>Jl. Antarakata No. 123, Jakarta Selatan, 12230, Indonesia</Text>

      
      <Text style={styles.sectionTitle}>Fasilitas</Text>
      <Text style={styles.text}>
        - Wi-Fi Gratis{'\n'}
        - Ruang Merokok{'\n'}
        - AC{'\n'}
        - Area Parkir{'\n'}
        - Ruang Untuk Acara (Meeting atau Gathering){'\n'}
        - Tempat Duduk Dalam Ruangan dan Luar Ruangan
      </Text>

     
      <Text style={styles.sectionTitle}>Deskripsi Singkat</Text>
      <Text style={styles.text}>
        Cafe Antarakata adalah kafe yang menawarkan suasana yang nyaman dan cocok untuk berbagai aktivitas, mulai dari bekerja, bersantai, hingga berkumpul bersama teman-teman. Dengan desain interior yang modern namun tetap hangat, kafe ini menyediakan berbagai pilihan kopi spesialti, makanan ringan, dan hidangan utama yang lezat.
      </Text>

      
      <TouchableOpacity style={styles.reservationButton}
      onPress={() => navigation.navigate('ReservationDate')}>
        <Text 
        style={styles.reservationButtonText}
        
        
        >Reservation</Text>
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
