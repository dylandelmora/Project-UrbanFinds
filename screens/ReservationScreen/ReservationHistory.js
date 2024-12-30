import React, { useState, useEffect } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReservationHistory({ navigation }) {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(""); // Tambahkan state untuk rating
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndReservations = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");

        if (!storedUserId) {
          Alert.alert("Error", "User ID tidak ditemukan.");
          navigation.navigate("Login");
          return;
        }
        setUserId(storedUserId);

        const response = await axios.get(`http://192.168.1.8:4001/api/auth/reservations/${storedUserId}`);
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error.message);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data reservasi.");
      }
    };

    fetchUserIdAndReservations();
  }, [navigation]);

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || !rating) {
      Alert.alert("Error", "Rating dan review tidak boleh kosong.");
      return;
    }

    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      Alert.alert("Error", "Rating harus berupa angka antara 1.0 hingga 5.0.");
      return;
    }

    const reviewData = {
      customerId: userId,
      venueId: selectedReservation.venueId,
      rating: parsedRating,
      reviewDescription: reviewText.trim(),
    };

    console.log("Review Data:", reviewData); // Debugging

    try {
      const response = await axios.post(
        "http://192.168.1.8:4001/api/auth/addReview",
        reviewData
      );

      if (response.status === 201) {
        Alert.alert("Success", `Terima kasih atas review untuk ${selectedReservation.venueName}!`);
        setReviewModalVisible(false);
        setReviewText("");
        setRating(""); // Reset rating
      }
    } catch (error) {
      console.error("Error adding review:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Terjadi kesalahan saat mengirimkan review.");
    }
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
          <View key={item.reservationId} style={styles.card}>
            <TouchableOpacity>
              {item.venueImage ? (
                <Image
                  source={{ uri: `http://192.168.1.8:4001${item.venueImage}` }}
                  style={styles.cardImage}
                  onError={() => console.log("Error loading image")}
                />
              ) : (
                <Text style={styles.noImageText}>No image available</Text>
              )}
              <Text style={styles.cardTitle}>{item.venueName}</Text>
              <Text style={styles.cardSubtitle}>{item.venueDescription}</Text>
              <Text style={styles.cardSubtitle}>Reservation Date : {item.reservationDate}</Text>
              <Text style={styles.cardSubtitle}>Reservation Time : {item.reservationTime}</Text>
              <Text style={styles.cardSubtitle}>Reservation Status : {item.reservationStatus}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => {
                console.log("Selected Reservation:", item); 
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
              Review {selectedReservation?.venueName}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter rating (1-5)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={rating}
              onChangeText={setRating}
            />
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
    marginTop: 15,
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
  noImageText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
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
