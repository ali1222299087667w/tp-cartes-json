import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, Animated, StyleSheet, ScrollView } from "react-native";

const users = [
  {
    id: 1,
    name: "Ali",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    url: "https://www.linkedin.com",
  },
  {
    id: 2,
    name: "Sara",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    url: "https://img.freepik.com/free-photo/young-determined-armenian-curlyhaired-female-university-student-listen-carefully-asignment-look-confident-ready-task-cross-hands-chest-smiling-selfassured-standing-white-background_176420-56066.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Youssef",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2uNOJZWmyhVONBJWqzD7mF8ElJ90aPz_dBXuGgCxxKbwsA3kVh3tSDVYmlFzHDGBabvk&usqp=CAU",
  },
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👥 Liste des Profils</Text>
      {users.map((user, index) => (
        <AnimatedCard key={user.id} user={user} delay={index * 200} />
      ))}
    </ScrollView>
  );
}

function AnimatedCard({ user, delay }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Impossible d’ouvrir ce lien : " + url);
    }
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openLink(user.url)}>
        <Text style={styles.buttonText}>Voir plus 🔗</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
