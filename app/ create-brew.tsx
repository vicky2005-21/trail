import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { Stack, router } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  Check,
  Lock,
  Globe,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";

export default function CreateBrewScreen() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    maxParticipants: "10",
    category: "",
    isPrivate: false,
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    "Coffee",
    "Food",
    "Sports",
    "Music",
    "Games",
    "Study",
    "Networking",
    "Other",
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Time is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (Platform.OS !== "web") {
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
                <Text style={styles.imagePlaceholderText}>
                  Add a cover image
                </Text>
              </TouchableOpacity>
            )}

            {image && (
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
              >
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="Enter brew title"
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[
                  styles.textArea,
                  errors.description && styles.inputError,
                ]}
                placeholder="Describe your brew..."
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <View
                style={[
                  styles.inputWithIcon,
                  errors.location && styles.inputError,
                ]}
              >
                <MapPin size={20} color={COLORS.textLight} />
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter location"
                  value={formData.location}
                  onChangeText={(text) => handleChange("location", text)}
                />
              </View>
              {errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Date</Text>
                <View
                  style={[
                    styles.inputWithIcon,
                    errors.date && styles.inputError,
                  ]}
                >
                  <Calendar size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="MM/DD/YYYY"
                    value={formData.date}
                    onChangeText={(text) => handleChange("date", text)}
                  />
                </View>
                {errors.date && (
                  <Text style={styles.errorText}>{errors.date}</Text>
                )}
              </View>

              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Time</Text>
                <View
                  style={[
                    styles.inputWithIcon,
                    errors.time && styles.inputError,
                  ]}
                >
                  <Clock size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="HH:MM AM/PM"
                    value={formData.time}
                    onChangeText={(text) => handleChange("time", text)}
                  />
                </View>
                {errors.time && (
                  <Text style={styles.errorText}>{errors.time}</Text>
                )}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Max Participants</Text>
              <View style={styles.inputWithIcon}>
                <Users size={20} color={COLORS.textLight} />
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter max participants"
                  value={formData.maxParticipants}
                  onChangeText={(text) => handleChange("maxParticipants", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      formData.category === category &&
                        styles.categoryButtonActive,
                    ]}
                    onPress={() => handleChange("category", category)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        formData.category === category &&
                          styles.categoryButtonTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.category && (
                <Text style={styles.errorText}>{errors.category}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <View style={styles.privacyContainer}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyLabel}>Private Brew</Text>
                  <Text style={styles.privacyDescription}>
                    Only visible to people you invite
                  </Text>
                </View>
                <Switch
                  value={formData.isPrivate}
                  onValueChange={(value) => handleChange("isPrivate", value)}
                  trackColor={{ false: COLORS.border, true: COLORS.primary }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.privacyIcon}>
                {formData.isPrivate ? (
                  <Lock size={24} color={COLORS.text} />
                ) : (
                  <Globe size={24} color={COLORS.text} />
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Check size={20} color="#fff" />
              <Text style={styles.createButtonText}>Create Brew</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.lightBg,
    marginBottom: 16,
  },
  brewImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 8,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  changeImageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 4,
  },
  textArea: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightBg,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  privacyInfo: {
    flex: 1,
  },
  privacyLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  privacyDescription: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  privacyIcon: {
    alignItems: "center",
    marginTop: 8,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
