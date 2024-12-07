import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HistoryDetail({ route, navigation }) {
  const { reservation } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Detail History</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.venueName}>{reservation.name}</Text>
        <Text style={styles.subtitle}>{reservation.address}</Text>
        <Text style={styles.detailTitle}>Purchase Items:</Text>
        <View style={styles.items}>
          <Text style={styles.item}>- Paket Platter</Text>
          <Text style={styles.item}>- Nugget</Text>
          <Text style={styles.item}>- Pasta Carbonara</Text>
          <Text style={styles.item}>- Milo Dinosaur</Text>
        </View>
        <Text style={styles.detailTitle}>Price: {reservation.price}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2B45",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  content: {
    marginTop: 20,
  },
  venueName: {
    color: "#FFA500",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 20,
  },
  detailTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  items: {
    marginTop: 10,
    marginBottom: 20,
  },
  item: {
    color: "#fff",
    fontSize: 16,
  },
});
