
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RestaurantCategory({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Restaurant</Text>
        </View>

       
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#ccc"
        />
      </View>

      <ScrollView style={styles.list}>
        {[...Array(5)].map((_, index) => (
          <View style={styles.recommendationCard} key={index}>
            <Image
              source={require('../../assets/Golden.png')}  
              style={styles.recommendationImage}
            />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}> Golden PIK Restaurant</Text>
              <Text style={styles.recommendationDescription}>
              Address : Jl. Melati Indah No. 25, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat, 10310
              </Text>
              <Text style = {styles.recommendationDescription}>
                Open Hours : 11:00 - 22:00
              </Text>
              <Text style= {styles.recommendationDescription}>
                Rating : 4.8 / 5.0
              </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  list: {
    padding: 15,
  },
  recommendationCard: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  recommendationImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  recommendationContent: {
    flex: 1,
    padding: 10,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
 
 
});
