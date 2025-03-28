import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { Camera, Upload, Check } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { useAuthStore } from "@/stores/auth-store";

export default function UploadPhotoScreen() {
  const params = useLocalSearchParams();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthStore();

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleComplete = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    setIsLoading(true);
    
    // Parse interests from comma-separated string
    const interests = params.interests ? params.interests.split(",") : [];
    
    // Create user object
    const user = {
      name: params.name,
      email: params.email,
      age: parseInt(params.age),
      gender: params.gender,
      interests,
      intent: params.intent,
      photo: photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop",
    };
    
    // Simulate API call
    setTimeout(() => {
      signup(user);
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Photo</Text>
          <Text style={styles.subtitle}>
            Add a photo so others can recognize you
          </Text>
        </View>

        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Camera size={40} color={COLORS.textLight} />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Upload size={20} color={COLORS.primary} />
          <Text style={styles.uploadButtonText}>
            {photo ? "Change Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.completeButton,
            photo ? styles.completeButtonActive : styles.completeButtonDisabled,
          ]}
          onPress={handleComplete}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.completeButtonText}>Complete Setup</Text>
              <Check size={20} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleComplete}
          disabled={isLoading}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 40,
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  completeButton: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  completeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  completeButtonDisabled: {
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  skipButton: {
    padding: 12,
  },
  skipButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
});
