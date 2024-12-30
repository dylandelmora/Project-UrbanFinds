import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ReservationDate({ route, navigation }) {
  const { place, image, facility, description, venueId } = route.params; 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          Alert.alert('Error', 'User ID tidak ditemukan.');
          navigation.navigate('Login');
          return;
        }
        setUserId(storedUserId); // Simpan userId di state
        console.log('Stored User ID:', storedUserId);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(false);
    setSelectedDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const handleSaveReservation = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID tidak ditemukan.');
      return;
    }
  
    const reservationData = {
      reservationDate: selectedDate.toISOString().split('T')[0], 
      reservationTime: selectedTime.toTimeString().split(' ')[0], 
      customerId: userId, 
      venueId: venueId, 
    };
  
    try {
      const response = await axios.post('http://192.168.1.8:4001/api/auth/reservation', reservationData);
      if (response.status === 201) {
        const reservationId = response.data.reservationId;  
        await AsyncStorage.setItem('reservationId', reservationId.toString());  
        Alert.alert('Success', response.data.message);
        navigation.navigate('ReservationMenu');
      }
    } catch (error) {
      console.error('Error reserving venue:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Terjadi kesalahan saat menyimpan reservasi.');
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Choose Date and Time Reservation</Text>
        </View>

        {/* Kartu Tempat */}
        <View style={styles.card}>
          <Image
            source={{ uri: `http://192.168.1.8:4001${image}` }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>{place}</Text>
        </View>

        {/* Pemilih Tanggal */}
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.selectedDate}>{selectedDate.toDateString()}</Text>
          <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
            <Text style={styles.buttonText}>Pilih Tanggal</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Pemilih Waktu */}
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.selectedDate}>
            {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
            <Text style={styles.buttonText}>Pilih Waktu</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Fasilitas</Text>
        <Text style={styles.text}>{facility || 'Tidak ada data fasilitas.'}</Text>

        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.text}>{description || 'Tidak ada deskripsi.'}</Text>

        <TouchableOpacity style={styles.reserveButton} onPress={handleSaveReservation}>
          <Text style={styles.reserveButtonText}>Save Reservation</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    marginTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: '#2A3E55',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  timePickerContainer: {
    backgroundColor: '#2A3E55',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  selectedDate: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
});
