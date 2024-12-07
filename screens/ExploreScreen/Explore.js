import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

export default function Explore({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Categories..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={handleSearch} 
        />
      </View>

      <Text style={styles.sectionTitle}>Explore Categories</Text>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate('RecommendationCategory', { category: 'RecommendationCategory' })}
        >
          <Image
            source={require('../../assets/Recommended.png')} 
            style={styles.categoryImage}
          />
          <Text style={styles.categoryTitle}>Recommended</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate('CafeCategory', { category: 'CafeCategory' })}
        >
          <Image
            source={require('../../assets/Golden.png')} 
            style={styles.categoryImage}
          />
          <Text style={styles.categoryTitle}>Cafe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate('RestaurantCategory', { category: 'RestaurantCategory' })}
        >
          <Image
            source={require('../../assets/Antarakata.png')} 
            style={styles.categoryImage}
          />
          <Text style={styles.categoryTitle}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate('Billiard', { category: 'Billiard' })}
        >
          <Image
            source={require('../../assets/Billiard.png')} 
            style={styles.categoryImage}
          />
          <Text style={styles.categoryTitle}>Billiard</Text>
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
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#2A3E55',
    color: '#fff',
    padding: 15,
    borderRadius: 15,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoriesContainer: {
    flexDirection: 'column',  
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#2A3E55',
    borderRadius: 8,
    marginBottom: 15,  
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});
