import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ReservationHistory({ navigation }) {
  const [reservations] = useState([
    {
      id: 1,
      name: "Tomoro Coffee",
      address: "Jl. Melati Indah No 25, Jakarta Pusat",
      price: "Rp240.000",
      image: require("../../assets/Antarakata.png"), 
    },
    {
        id: 2,
        name: "Golden PIK Restaurant",
        address: "Jl. PIK Indah No 36, Jakarta Barat",
        price: "Rp320.000",
        image: require("../../assets/Golden.png"), 
      },

      {
        id: 3,
        name: "123 Billiard",
        address: "Jl. Soeharto Hatta No. 46 , Jakarta Timur",
        price: "Rp50.000",
        image: require("../../assets/Billiard.png"), 
      },
   
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    Alert.alert(
      "Review Submitted",
      `Thank you for reviewing ${selectedReservation?.name}!`
    );
    setReviewModalVisible(false);
    setReviewText("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Reservation History</Text>
      <ScrollView contentContainerStyle={styles.reservationContainer}>
        {reservations.map((item) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.address}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => {
                setSelectedReservation(item);
                setReviewModalVisible(true);
              }}
            >
              <Text style={styles.reviewButtonText}>Give Review</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Review {selectedReservation?.name}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Write your review here..."
              placeholderTextColor="#aaa"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setReviewModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSubmit}
                onPress={handleReviewSubmit}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  reservationContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#2A3B55",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardSubtitle: {
    color: "#bbb",
    fontSize: 14,
    marginVertical: 5,
  },
  cardPrice: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    borderRadius: 5,
  },
  reviewButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#2A3B55",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: "#FFA500",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    height: 100,
    backgroundColor: "#1A2B45",
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButtonCancel: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonSubmit: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
