import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
 
  const handleSignIn = () => {
    
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>LOGIN</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#ccc"
      />

    
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#ccc"
      />

     
     

      
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

     
      <Text style={styles.switch}>
        Don't have an Account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
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
  forgot: {
    color: '#FFA500',
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
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
