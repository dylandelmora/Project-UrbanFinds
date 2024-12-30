import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  // Fetch profile data from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          console.log('Data ditemukan:', userData); // Debug untuk memastikan data ditemukan
          setProfile(JSON.parse(userData)); // Set profile data if found
        } else {
          console.log('Tidak ada data user di AsyncStorage'); // Log when no user data is found
        }
      } catch (error) {
        console.error('Error mengambil data dari AsyncStorage:', error); // Log error if occurs
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('User data removed from AsyncStorage');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error saat logout:', error); 
      Alert.alert('Error', 'Terjadi kesalahan saat logout.');
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Unable to load profile data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/Profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{profile.name}</Text>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Full Name</Text>
          <Text style={styles.emailText}>{profile.name}</Text>
        </View>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Email</Text>
          <Text style={styles.emailText}>{profile.email}</Text>
        </View>
      </View>

      {/* Tombol Log Out */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles remain unchanged


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#1A2B45',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },

  logoutButton: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
