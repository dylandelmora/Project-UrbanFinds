import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';

export default function Payment({ navigation }) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePayment = () => {
    setPaymentCompleted(true); 
    setTimeout(() => {
      setPaymentCompleted(false);
      navigation.navigate('Home'); 
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment QRIS</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/Qris.png')} 
        style={styles.cardImage}
      />

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={handlePayment}
      >
        <Text style={styles.paymentButtonText}>Pay With Qris</Text>
      </TouchableOpacity>

      
      <Modal
        transparent={true}
        visible={paymentCompleted}
        animationType="fade"
      >
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
  card: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
