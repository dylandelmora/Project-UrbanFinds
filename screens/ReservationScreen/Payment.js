import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Payment({ navigation, route }) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [userId, setUserId] = useState(null);
  const cartItems = route.params?.cartItems || [];
  const totalPrice = route.params?.totalPrice || 0;
  const [reservationId, setReservationId] = useState(null);

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
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    const fetchReservationId = async () => {
      try {
        const storedReservationId = await AsyncStorage.getItem('reservationId');
        if (!storedReservationId) {
          console.error('Reservation ID not found.');
          return;
        }
        setReservationId(storedReservationId); // Set reservationId
      } catch (error) {
        console.error('Error fetching reservationId:', error);
      }
    };

    fetchUserId();
    fetchReservationId();
  }, []);

  const handlePayment = async () => {
    if (!userId || !reservationId) {
      console.error('User ID or Reservation ID is missing');
      return;
    }
  
    if (cartItems.length === 0 || !cartItems[0]?.quantity) {
      console.error('Quantity is missing');
      return;
    }
  
    const transactionData = cartItems.map(item => {
      // Validate price and quantity before calculating
      if (isNaN(item.menuPrice) || item.menuPrice <= 0) {
        console.error('Invalid menuPrice for item:', item);
        return null; // Skip this item if price is invalid
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        console.error('Invalid quantity for item:', item);
        return null; // Skip this item if quantity is invalid
      }
  
      return {
        amount: item.menuPrice * item.quantity,  // Correct price calculation
        customerId: userId,
        quantity: item.quantity,
        reservationId: reservationId,
        transactionStatus: 'Paid',
      };
    }).filter(item => item !== null); // Remove invalid items
  
    if (transactionData.length === 0) {
      console.error('All items are invalid. Cannot proceed with payment.');
      return;
    }
  
    console.log('Transaction Data:', transactionData);
  
    try {
      const response = await axios.post('http://192.168.1.8:4001/api/auth/addTransaction', { transactions: transactionData });
  
      if (response.status === 201) {
        setPaymentCompleted(true);
        setTimeout(() => {
          setPaymentCompleted(false);
          navigation.navigate('Home');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saat mengirim transaksi:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan saat melakukan pembayaran.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment QRIS</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={require('../../assets/Qris.png')} style={styles.cardImage} />
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Pay With Qris</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={paymentCompleted} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Payment Completed</Text>
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
    alignContent: 'center',
  },
  cardImage: {
    width: 300,
    height: 300,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 35,
  },
  paymentButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 50,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B45',
  },
});
