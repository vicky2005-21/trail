import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Info,
  Link,
  Check,
  X,
  Coffee,
  Edit3,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/theme-context";

export default function EditProfileScreen() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Coffee enthusiast and tech lover. Always looking for the next adventure.",
    photo:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop",
    website: "johndoe.com",
    birthday: "1990-01-15",
    interests: ["Coffee", "Technology", "Travel", "Photography"],
    notifications: {
      messages: true,
      comments: true,
      follows: true,
      mentions: false,
    },
    privacy: {
      privateProfile: false,
      showLocation: true,
      showEmail: false,
    },
  });

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handlePrivacyChange = (field, value) => {
    setProfile({
      ...profile,
      privacy: {
        ...profile.privacy,
        [field]: value,
      },
    });
  };

  const handleNotificationChange = (field, value) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [field]: value,
      },
    });
  };

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
      handleChange("photo", result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      router.back();
    }, 1500);
  };

  const renderInterests = () => (
    <View style={styles.interestsContainer}>
      {profile.interests.map((interest, index) => (
        <View
          key={index}
          style={[styles.interestTag, isDark && styles.interestTagDark]}
        >
          <Text
            style={[
              styles.interestTagText,
              isDark && styles.interestTagTextDark,
            ]}
          >
            {interest}
          </Text>
          <TouchableOpacity style={styles.removeInterestButton}>
            <X size={14} color={isDark ? "#aaa" : COLORS.textLight} />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={[
          styles.addInterestButton,
          isDark && styles.addInterestButtonDark,
        ]}
      >
        <Plus size={16} color={COLORS.primary} />
        <Text style={styles.addInterestText}>Add Interest</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen
        options={{
          headerTitle: "Edit Profile",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSave} disabled={isSaving}>
              {isSaving ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Check size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: isDark ? "#fff" : COLORS.text,
          },
        }}
      />

      <SafeAreaView
        style={[styles.container, isDark && styles.containerDark]}
        edges={["bottom"]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: profile.photo }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={pickImage}
            >
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Name
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <User size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your full name"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Username
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <User size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your username"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <Mail size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your email address"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Phone
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <Phone size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your phone number"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.phone}
                  onChangeText={(text) => handleChange("phone", text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Location
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <MapPin size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your location"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.location}
                  onChangeText={(text) => handleChange("location", text)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Birthday
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <Calendar
                  size={20}
                  color={isDark ? "#aaa" : COLORS.textLight}
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your birthday"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.birthday}
                  onChangeText={(text) => handleChange("birthday", text)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Bio
              </Text>
              <TextInput
                style={[styles.textArea, isDark && styles.textAreaDark]}
                placeholder="Tell us about yourself"
                placeholderTextColor={isDark ? "#aaa" : "#999"}
                value={profile.bio}
                onChangeText={(text) => handleChange("bio", text)}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Website
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  isDark && styles.inputContainerDark,
                ]}
              >
                <Link size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Your website"
                  placeholderTextColor={isDark ? "#aaa" : "#999"}
                  value={profile.website}
                  onChangeText={(text) => handleChange("website", text)}
                  keyboardType="url"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>
                Interests
              </Text>
              {renderInterests()}
            </View>

            <View style={styles.sectionHeader}>
              <Text
                style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
              >
                Privacy Settings
              </Text>
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Private Profile
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Only approved followers can see your profile
                </Text>
              </View>
              <Switch
                value={profile.privacy.privateProfile}
                onValueChange={(value) =>
                  handlePrivacyChange("privateProfile", value)
                }
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.privacy.privateProfile ? COLORS.primary : "#f4f3f4"
                }
              />
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Show Location
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Allow others to see your location
                </Text>
              </View>
              <Switch
                value={profile.privacy.showLocation}
                onValueChange={(value) =>
                  handlePrivacyChange("showLocation", value)
                }
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.privacy.showLocation ? COLORS.primary : "#f4f3f4"
                }
              />
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Show Email
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Allow others to see your email address
                </Text>
              </View>
              <Switch
                value={profile.privacy.showEmail}
                onValueChange={(value) =>
                  handlePrivacyChange("showEmail", value)
                }
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.privacy.showEmail ? COLORS.primary : "#f4f3f4"
                }
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text
                style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
              >
                Notification Settings
              </Text>
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Messages
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Receive notifications for new messages
                </Text>
              </View>
              <Switch
                value={profile.notifications.messages}
                onValueChange={(value) =>
                  handleNotificationChange("messages", value)
                }
                trackColor={{
                  false: isDark ? "#333" : COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.notifications.messages
                    ? COLORS.primary
                    : isDark
                    ? "#666"
                    : "#f4f3f4"
                }
              />
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Comments
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Receive notifications for comments on your posts
                </Text>
              </View>
              <Switch
                value={profile.notifications.comments}
                onValueChange={(value) =>
                  handleNotificationChange("comments", value)
                }
                trackColor={{
                  false: isDark ? "#333" : COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.notifications.comments
                    ? COLORS.primary
                    : isDark
                    ? "#666"
                    : "#f4f3f4"
                }
              />
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Follows
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Receive notifications when someone follows you
                </Text>
              </View>
              <Switch
                value={profile.notifications.follows}
                onValueChange={(value) =>
                  handleNotificationChange("follows", value)
                }
                trackColor={{
                  false: isDark ? "#333" : COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.notifications.follows
                    ? COLORS.primary
                    : isDark
                    ? "#666"
                    : "#f4f3f4"
                }
              />
            </View>

            <View
              style={[styles.settingItem, isDark && styles.settingItemDark]}
            >
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    isDark && styles.settingTitleDark,
                  ]}
                >
                  Mentions
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    isDark && styles.settingDescriptionDark,
                  ]}
                >
                  Receive notifications when you are mentioned
                </Text>
              </View>
              <Switch
                value={profile.notifications.mentions}
                onValueChange={(value) =>
                  handleNotificationChange("mentions", value)
                }
                trackColor={{
                  false: isDark ? "#333" : COLORS.border,
                  true: `${COLORS.primary}80`,
                }}
                thumbColor={
                  profile.notifications.mentions
                    ? COLORS.primary
                    : isDark
                    ? "#666"
                    : "#f4f3f4"
                }
              />
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, isDark && styles.footerDark]}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Check size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainerDark: {
    backgroundColor: "#121212",
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  labelDark: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainerDark: {
    backgroundColor: "#2a2a2a",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  inputDark: {
    color: "#fff",
  },
  textArea: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 120,
    textAlignVertical: "top",
  },
  textAreaDark: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTagDark: {
    backgroundColor: "#2a2a2a",
  },
  interestTagText: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 4,
  },
  interestTagTextDark: {
    color: "#fff",
  },
  removeInterestButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addInterestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(94, 96, 206, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  addInterestButtonDark: {
    backgroundColor: "rgba(94, 96, 206, 0.2)",
  },
  addInterestText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemDark: {
    borderBottomColor: "#333",
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  settingTitleDark: {
    color: "#fff",
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  settingDescriptionDark: {
    color: "#aaa",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerDark: {
    backgroundColor: "#121212",
    borderTopColor: "#333",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

// Helper component for the Plus icon
const Plus = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: size,
        height: 2,
        backgroundColor: color,
        position: "absolute",
      }}
    />
    <View
      style={{
        width: 2,
        height: size,
        backgroundColor: color,
        position: "absolute",
      }}
    />
  </View>
);

