import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { INTERESTS } from "@/constants/interests";
import { RELATIONSHIP_INTENTS } from "@/constants/relationship-intents";
import { ArrowRight } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export default function InterestsScreen() {
  const params = useLocalSearchParams();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedIntent, setSelectedIntent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        setError("You can select up to 5 interests");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const selectIntent = (intent) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedIntent(intent);
  };

  const handleContinue = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    if (!selectedIntent) {
      setError("Please select your relationship intent");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: "/upload-photo",
        params: {
          ...params,
          interests: selectedInterests.join(","),
          intent: selectedIntent,
        },
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Interests</Text>
          <Text style={styles.subtitle}>
            Select up to 5 interests to help us find your perfect matches
          </Text>
        </View>

        <View style={styles.interestsContainer}>
          {INTERESTS.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestItem,
                selectedInterests.includes(interest.id) && styles.interestSelected,
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text
                style={[
                  styles.interestText,
                  selectedInterests.includes(interest.id) && styles.interestTextSelected,
                ]}
              >
                {interest.emoji} {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.intentSection}>
          <Text style={styles.intentTitle}>What are you looking for?</Text>
          <View style={styles.intentOptions}>
            {RELATIONSHIP_INTENTS.map((intent) => (
              <TouchableOpacity
                key={intent.id}
                style={[
                  styles.intentItem,
                  selectedIntent === intent.id && styles.intentSelected,
                ]}
                onPress={() => selectIntent(intent.id)}
              >
                <Text
                  style={[
                    styles.intentText,
                    selectedIntent === intent.id && styles.intentTextSelected,
                  ]}
                >
                  {intent.emoji} {intent.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.continueButtonText}>Continue</Text>
              <ArrowRight size={20} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
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
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    gap: 10,
  },
  interestItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  interestSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  interestText: {
    color: COLORS.text,
    fontSize: 14,
  },
  interestTextSelected: {
    color: "#fff",
  },
  intentSection: {
    marginBottom: 30,
  },
  intentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: COLORS.text,
  },
  intentOptions: {
    gap: 10,
  },
  intentItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  intentSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  intentText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "500",
  },
  intentTextSelected: {
    color: "#fff",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
