import { COLORS } from "constants/colors"; // Corrected import statement
import * as Haptics from "expo-haptics";
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from "expo-router";
import { ArrowLeft, ImageIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateBrewScreen() {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  
  const pickImage = async () => {
    // Request permission first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant access to your photos to upload an image.");
      return;
    }
    
    // Launch image picker with updated options (using MediaType instead of MediaTypeOptions)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images, // Updated from MediaTypeOptions to MediaType
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    // Basic form validation
    if (!image) {
      newErrors.image = "Please add a photo";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = () => {
    if (Platform.OS === "ios") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    if (!validateForm()) return;

    // In a real app, this would create a new brew
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Create Brew",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={COLORS.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.brewImage} />
            ) : (
              <TouchableOpacity
                style={styles.imagePlaceholder}
                onPress={pickImage}
              >
                <ImageIcon size={40} color={COLORS.textLight} />
                <Text style={styles.uploadText}>Add Photo</Text>
              </TouchableOpacity>
            )}
            {errors.image ? (
              <Text style={styles.errorText}>{errors.image}</Text>
            ) : null}
          </View>
          
          {/* Form fields would go here */}
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Create Brew</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    marginVertical: 16,
  },
  brewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: COLORS.textLight,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
