import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ReservationMenu({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const items = [
    { id: 1, name: 'Coffee Latte', price: 25000, image: require('../../assets/Menu1.png') },
    { id: 2, name: 'Milo Dinosarawr', price: 15000, image: require('../../assets/Menu2.png') },
    { id: 3, name: 'Chips Cihuy', price: 15000, image: require('../../assets/Menu3.png') },
    { id: 4, name: 'Matcha Platter', price: 30000, image: require('../../assets/Menu4.png') },
    { id: 5, name: 'Cheesecake', price: 45000, image: require('../../assets/Menu5.png') },
    { id: 6, name: 'Pasta Alfredo', price: 55000, image: require('../../assets/Menu6.png') },
    { id: 7, name: 'Coffee Americano', price: 20000, image: require('../../assets/Menu1.png') },
    { id: 8, name: 'Milo Macchiato', price: 20000, image: require('../../assets/Menu2.png') },
  ];

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    setCartItems((prev) => [...prev, { ...selectedItem, quantity }]);

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Select Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ReservationCart', { cartItems })} style={styles.cartButton}>
          <Ionicons name="cart" size={24} color="#fff" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuCard}
            onPress={() => handleSelectItem(item)}
          >
            <Image source={item.image} style={styles.menuImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedItem && (
        <Modal
          transparent={true}
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalPrice}>Rp {selectedItem.price.toLocaleString()}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 35,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButton: {
    position: 'relative',
    right: 25,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  menuCard: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 157,
  },
  menuImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2A3E55',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  quantityText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
