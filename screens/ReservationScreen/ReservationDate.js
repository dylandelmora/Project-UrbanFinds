import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function ReservationDate({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); 
    setSelectedDate(currentDate);
  };

  const handleAvailabilityCheck = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    navigation.navigate('ReservationMenu'); 
  };
  

  return (
    <View style={styles.container}>
     
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} 
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Choose Date Reservation</Text>

      <View style={styles.card}>
        <Image
          source={require('../../assets/Golden.png')}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>Cafe Antarakata</Text>
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.selectedDate}>
          {selectedDate.toDateString()}
        </Text>

        <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
          <Text style={styles.buttonText}>Pilih Tanggal</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <TouchableOpacity style={styles.reserveButton} onPress={handleAvailabilityCheck}>
        <Text style={styles.reserveButtonText}>Check Availability</Text>
      </TouchableOpacity>

     
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reservation Details</Text>
            <Text style={styles.modalText}>Cafe: Cafe Antarakata</Text>
            <Text style={styles.modalText}>Date: {selectedDate.toDateString()}</Text>

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Choose Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 10, 
    zIndex: 1, 
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: '#2A3E55',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
