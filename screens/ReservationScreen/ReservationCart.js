
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ReservationCart({ route, navigation }) {
  const cartItems = route.params?.cartItems || []; 


  const totalPrice = cartItems.reduce((sum, item) => sum + item.menuPrice * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Judul */}
      <Text style={styles.title}>Menu Details</Text>

      {/* Menampilkan cart */}
      <ScrollView contentContainerStyle={styles.cartContainer}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image 
                source={{ uri: `http://192.168.1.8:4001${item.menuImage}` }} 
                style={styles.itemImage} 
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.menuName} </Text>
                <Text style={styles.itemPrice}>Rp {item.menuPrice.toLocaleString()}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
      </ScrollView>

      {/* Total harga */}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Price:</Text>
          <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString()}</Text>
        </View>
      )}

      {/* Tombol pembayaran */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('Payment', { cartItems, totalPrice })}  
        >
          <Text style={styles.paymentButtonText}>Pay With Qris</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
    padding: 20,
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
  cartContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    color: '#FFA500',
    fontSize: 14,
    marginBottom: 5,
  },
  itemQuantity: {
    color: '#fff',
    fontSize: 14,
  },
  emptyCartText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  totalContainer: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#FFA500',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
