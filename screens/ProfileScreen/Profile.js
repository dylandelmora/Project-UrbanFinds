import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 


const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.headerContainer}>
        <Image
         source={require('../../assets/Profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>

     
      <View style={styles.profileInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Full Name</Text>
          <Text style={styles.emailText}>John Doe</Text>
        </View>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Email</Text>
          <Text style={styles.emailText}>johndoe@gmail.com</Text>
        </View>
        </View>
        
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out" size={25} color="#fff" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#1A2B45',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 20,
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
  bio: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
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
  buttonsContainer: {
    marginHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;
