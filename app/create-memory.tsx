import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Tag,
  Smile,
  X,
  Plus,
  Check,
  ChevronRight,
  Save,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Clock,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/theme-context";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// Mock data for tags
const TAGS = [
  "Happy",
  "Excited",
  "Grateful",
  "Peaceful",
  "Loved",
  "Adventure",
  "Family",
  "Friends",
  "Travel",
  "Food",
  "Nature",
  "Work",
  "Achievement",
  "Celebration",
  "Reflection",
];

// Mock data for moods
const MOODS = [
  { emoji: "😊", name: "Happy" },
  { emoji: "😍", name: "Loved" },
  { emoji: "😌", name: "Peaceful" },
  { emoji: "🥳", name: "Celebrating" },
  { emoji: "😎", name: "Cool" },
  { emoji: "🤔", name: "Thoughtful" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😤", name: "Frustrated" },
  { emoji: "😴", name: "Tired" },
];

export default function CreateMemoryScreen() {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1975&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop",
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const stepAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateToNextStep = (nextStep) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(stepAnimation, {
        toValue: nextStep,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentStep(nextStep);
  };

  const addPhoto = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // In a real app, this would open the camera or photo picker
    setIsLoading(true);

    setTimeout(() => {
      const newPhoto =
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop";
      setPhotos([...photos, newPhoto]);
      setIsLoading(false);
    }, 1500);
  };

  const removePhoto = (index) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const toggleTag = (tag) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const selectMood = (mood) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setSelectedMood(mood);
  };

  const saveMemory = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      router.replace("/memory-diary");
    }, 2000);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={[
            styles.stepDot,
            currentStep === step && styles.activeStepDot,
            currentStep > step && styles.completedStepDot,
            isDark && styles.stepDotDark,
            currentStep === step && isDark && styles.activeStepDotDark,
            currentStep > step && isDark && styles.completedStepDotDark,
          ]}
        />
      ))}
    </View>
  );

  const renderPhotosStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, isDark && styles.stepTitleDark]}>
        Add Photos
      </Text>
      <Text
        style={[styles.stepDescription, isDark && styles.stepDescriptionDark]}
      >
        Choose photos for your memory
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photosContainer}
      >
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity
              style={styles.removePhotoButton}
              onPress={() => removePhoto(index)}
            >
              <X size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.addPhotoButton, isDark && styles.addPhotoButtonDark]}
          onPress={addPhoto}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <>
              <Plus size={24} color={COLORS.primary} />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.nextButton,
          photos.length === 0 && styles.disabledButton,
        ]}
        onPress={() => animateToNextStep(2)}
        disabled={photos.length === 0}
      >
        <Text style={styles.nextButtonText}>Next</Text>
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, isDark && styles.stepTitleDark]}>
        Memory Details
      </Text>
      <Text
        style={[styles.stepDescription, isDark && styles.stepDescriptionDark]}
      >
        Add title, description and location
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
          Title
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Give your memory a title"
          placeholderTextColor={isDark ? "#777" : "#999"}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
          Description
        </Text>
        <TextInput
          style={[styles.textArea, isDark && styles.textAreaDark]}
          placeholder="Write about this memory..."
          placeholderTextColor={isDark ? "#777" : "#999"}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
          Location
        </Text>
        <View
          style={[styles.locationInput, isDark && styles.locationInputDark]}
        >
          <MapPin size={20} color={COLORS.primary} />
          <TextInput
            style={[
              styles.locationTextInput,
              isDark && styles.locationTextInputDark,
            ]}
            placeholder="Add location"
            placeholderTextColor={isDark ? "#777" : "#999"}
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, isDark && styles.inputLabelDark]}>
          Date
        </Text>
        <View
          style={[styles.locationInput, isDark && styles.locationInputDark]}
        >
          <Calendar size={20} color={COLORS.primary} />
          <TextInput
            style={[
              styles.locationTextInput,
              isDark && styles.locationTextInputDark,
            ]}
            placeholder="Add date"
            placeholderTextColor={isDark ? "#777" : "#999"}
            value={date}
            onChangeText={setDate}
          />
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => animateToNextStep(1)}
        >
          <ArrowLeft size={20} color={isDark ? "#fff" : COLORS.text} />
          <Text
            style={[styles.backButtonText, isDark && styles.backButtonTextDark]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!title || !description) && styles.disabledButton,
          ]}
          onPress={() => animateToNextStep(3)}
          disabled={!title || !description}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTagsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, isDark && styles.stepTitleDark]}>
        Tags & Mood
      </Text>
      <Text
        style={[styles.stepDescription, isDark && styles.stepDescriptionDark]}
      >
        Add tags and select your mood
      </Text>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Tag size={20} color={COLORS.primary} />
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Tags
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTags.includes(tag) && styles.selectedTagButton,
                isDark && styles.tagButtonDark,
                selectedTags.includes(tag) &&
                  isDark &&
                  styles.selectedTagButtonDark,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.selectedTagText,
                  isDark && styles.tagTextDark,
                  selectedTags.includes(tag) &&
                    isDark &&
                    styles.selectedTagTextDark,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Smile size={20} color={COLORS.primary} />
          <Text
            style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}
          >
            Mood
          </Text>
        </View>

        <View style={styles.moodsContainer}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.name}
              style={[
                styles.moodButton,
                selectedMood?.name === mood.name && styles.selectedMoodButton,
                isDark && styles.moodButtonDark,
                selectedMood?.name === mood.name &&
                  isDark &&
                  styles.selectedMoodButtonDark,
              ]}
              onPress={() => selectMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodText,
                  selectedMood?.name === mood.name && styles.selectedMoodText,
                  isDark && styles.moodTextDark,
                  selectedMood?.name === mood.name &&
                    isDark &&
                    styles.selectedMoodTextDark,
                ]}
              >
                {mood.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => animateToNextStep(2)}
        >
          <ArrowLeft size={20} color={isDark ? "#fff" : COLORS.text} />
          <Text
            style={[styles.backButtonText, isDark && styles.backButtonTextDark]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => animateToNextStep(4)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPreviewStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, isDark && styles.stepTitleDark]}>
        Preview
      </Text>
      <Text
        style={[styles.stepDescription, isDark && styles.stepDescriptionDark]}
      >
        Review your memory before saving
      </Text>

      <View style={[styles.memoryPreview, isDark && styles.memoryPreviewDark]}>
        <View style={styles.memoryHeader}>
          <View style={styles.memoryTitleContainer}>
            <Text
              style={[styles.memoryTitle, isDark && styles.memoryTitleDark]}
            >
              {title || "Untitled Memory"}
            </Text>
            {selectedMood && (
              <Text style={styles.memoryMood}>{selectedMood.emoji}</Text>
            )}
          </View>

          <View style={styles.memoryMeta}>
            <View style={styles.memoryMetaItem}>
              <Clock size={14} color={isDark ? "#aaa" : COLORS.textLight} />
              <Text
                style={[
                  styles.memoryMetaText,
                  isDark && styles.memoryMetaTextDark,
                ]}
              >
                {date}
              </Text>
            </View>

            {location && (
              <View style={styles.memoryMetaItem}>
                <MapPin size={14} color={isDark ? "#aaa" : COLORS.textLight} />
                <Text
                  style={[
                    styles.memoryMetaText,
                    isDark && styles.memoryMetaTextDark,
                  ]}
                >
                  {location}
                </Text>
              </View>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.memoryPhotosContainer}
        >
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.memoryPhoto}
            />
          ))}
        </ScrollView>

        <Text
          style={[
            styles.memoryDescription,
            isDark && styles.memoryDescriptionDark,
          ]}
        >
          {description}
        </Text>

        {selectedTags.length > 0 && (
          <View style={styles.memoryTagsContainer}>
            {selectedTags.map((tag) => (
              <View
                key={tag}
                style={[styles.memoryTag, isDark && styles.memoryTagDark]}
              >
                <Text
                  style={[
                    styles.memoryTagText,
                    isDark && styles.memoryTagTextDark,
                  ]}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.memoryActions}>
          <TouchableOpacity style={styles.memoryAction}>
            <Heart size={20} color={isDark ? "#aaa" : COLORS.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.memoryAction}>
            <MessageCircle
              size={20}
              color={isDark ? "#aaa" : COLORS.textLight}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.memoryAction}>
            <Bookmark size={20} color={isDark ? "#aaa" : COLORS.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.memoryAction}>
            <Share2 size={20} color={isDark ? "#aaa" : COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => animateToNextStep(3)}
        >
          <ArrowLeft size={20} color={isDark ? "#fff" : COLORS.text} />
          <Text
            style={[styles.backButtonText, isDark && styles.backButtonTextDark]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.savingButton]}
          onPress={saveMemory}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Save size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save Memory</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Create Memory",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <SafeAreaView
          style={[styles.container, isDark && styles.containerDark]}
          edges={["bottom"]}
        >
          {renderStepIndicator()}

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              {currentStep === 1 && renderPhotosStep()}
              {currentStep === 2 && renderDetailsStep()}
              {currentStep === 3 && renderTagsStep()}
              {currentStep === 4 && renderPreviewStep()}
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  stepDotDark: {
    backgroundColor: "#444",
  },
  activeStepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  activeStepDotDark: {
    backgroundColor: COLORS.primary,
  },
  completedStepDot: {
    backgroundColor: COLORS.secondary,
  },
  completedStepDotDark: {
    backgroundColor: COLORS.secondary,
  },
  stepContainer: {
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  stepTitleDark: {
    color: "#fff",
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  stepDescriptionDark: {
    color: "#aaa",
  },
  photosContainer: {
    paddingVertical: 16,
  },
  photoContainer: {
    position: "relative",
    marginRight: 12,
  },
  photo: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
  removePhotoButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoButton: {
    width: 120,
    height: 160,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  addPhotoButtonDark: {
    borderColor: "#444",
    backgroundColor: "#2a2a2a",
  },
  addPhotoText: {
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: "500",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    alignSelf: "flex-end",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  inputLabelDark: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  inputDark: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  textArea: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    height: 120,
    textAlignVertical: "top",
  },
  textAreaDark: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  locationInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  locationInputDark: {
    backgroundColor: "#2a2a2a",
  },
  locationTextInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  locationTextInputDark: {
    color: "#fff",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  backButtonTextDark: {
    color: "#fff",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 8,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagButtonDark: {
    backgroundColor: "#2a2a2a",
  },
  selectedTagButton: {
    backgroundColor: COLORS.primary,
  },
  selectedTagButtonDark: {
    backgroundColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.text,
    fontSize: 14,
  },
  tagTextDark: {
    color: "#fff",
  },
  selectedTagText: {
    color: "#fff",
    fontWeight: "500",
  },
  selectedTagTextDark: {
    color: "#fff",
  },
  moodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moodButton: {
    width: width / 3.5,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  moodButtonDark: {
    backgroundColor: "#2a2a2a",
  },
  selectedMoodButton: {
    backgroundColor: COLORS.primary,
  },
  selectedMoodButtonDark: {
    backgroundColor: COLORS.primary,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  moodText: {
    color: COLORS.text,
    fontSize: 14,
  },
  moodTextDark: {
    color: "#fff",
  },
  selectedMoodText: {
    color: "#fff",
    fontWeight: "500",
  },
  selectedMoodTextDark: {
    color: "#fff",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  savingButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  memoryPreview: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memoryPreviewDark: {
    backgroundColor: "#1e1e1e",
  },
  memoryHeader: {
    marginBottom: 12,
  },
  memoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  memoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  memoryTitleDark: {
    color: "#fff",
  },
  memoryMood: {
    fontSize: 24,
    marginLeft: 8,
  },
  memoryMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  memoryMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  memoryMetaText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  memoryMetaTextDark: {
    color: "#aaa",
  },
  memoryPhotosContainer: {
    paddingVertical: 12,
  },
  memoryPhoto: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  memoryDescription: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
    marginVertical: 12,
  },
  memoryDescriptionDark: {
    color: "#eee",
  },
  memoryTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  memoryTag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  memoryTagDark: {
    backgroundColor: "#2a2a2a",
  },
  memoryTagText: {
    fontSize: 12,
    color: COLORS.text,
  },
  memoryTagTextDark: {
    color: "#fff",
  },
  memoryActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  memoryAction: {
    marginRight: 20,
  },
});
