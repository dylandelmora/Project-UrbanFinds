import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} placeholderTextColor="#ccc" />
      
   
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')} 
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
  
      <Text style={styles.switch}>
        Already have an Account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08142A',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1A2B45',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switch: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
