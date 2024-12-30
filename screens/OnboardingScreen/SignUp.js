import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Signup({ navigation }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validasi Form
  const validateForm = () => {
    if (!customerName || !customerPhone || !customerEmail || !customerPassword || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom wajib diisi.');
      return false;
    }
    if (customerPassword !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
  
    try {
      const userData = {
        customerName,
        customerPhone,
        customerEmail,
        customerPassword,
      };
  
      console.log("Mengirim data ke backend:", userData); 
  
      const response = await axios.post('http://192.168.1.8:4001/api/auth/signup', userData);


      console.log("Respons dari backend:", response.data); 
  
      if (response.status === 201) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error("Error dari backend:", error.response?.data || error.message); 
      Alert.alert('Error', error.response?.data?.message || 'Terjadi kesalahan. Coba lagi.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        placeholderTextColor="#ccc" 
        value={customerName} 
        onChangeText={setCustomerName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Phone Number" 
        placeholderTextColor="#ccc" 
        value={customerPhone} 
        onChangeText={setCustomerPhone} 
        keyboardType="phone-pad"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#ccc" 
        value={customerEmail} 
        onChangeText={setCustomerEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry={true} 
        placeholderTextColor="#ccc" 
        value={customerPassword} 
        onChangeText={setCustomerPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm Password" 
        secureTextEntry={true} 
        placeholderTextColor="#ccc" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
   
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignup} 
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
