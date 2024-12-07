
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Promo({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PROMO</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Got a promo code? Enter here"
          placeholderTextColor="#ccc"
        />
      </View>

      <ScrollView style={styles.promoList}>
        {[...Array(5)].map((_, index) => (
          <View style={styles.promoCard} key={index}>
            <Image
              source={require('../../assets/Promo.png')}  
              style={styles.promoImage}
            />
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Diskon 25% Untuk Pengguna Baru</Text>
              <Text style={styles.promoDescription}>
                Lakukan pembelian dengan minimal Rp. 100.000,00 untuk mendapatkan diskon 15% di setiap outlet cafe dan restaurant.
              </Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Save Voucher</Text>
              </TouchableOpacity>
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
    alignContent: 'center',
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
  promoList: {
    padding: 15,
  },
  promoCard: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  promoContent: {
    flex: 1,
    padding: 10,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
