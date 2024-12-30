import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Email/Phone Number dan Password wajib diisi.');
      return;
    }
  
    try {
      const loginData = { identifier, password };
      const response = await axios.post('http://192.168.1.8:4001/api/auth/login', loginData);
  
      if (response.status === 200) {
        const user = response.data.user;
        if (user && user.id) {
          await AsyncStorage.clear();
          await AsyncStorage.setItem('userId', user.id.toString());  
          await AsyncStorage.setItem('user', JSON.stringify(user));
          Alert.alert('Success', response.data.message);
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Data pengguna tidak valid.');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan. Coba lagi.';
      console.error('Error dari backend:', errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email atau Phone Number"
        placeholderTextColor="#ccc"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.switch}>
        Don't have an Account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up Here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2B45',
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
    backgroundColor: '#2A3E55',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switch: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,

  },
  link: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
