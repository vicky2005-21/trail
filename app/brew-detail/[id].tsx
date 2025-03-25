import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { BREWS } from "@/mocks/brews";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Phone, 
  Video, 
  Send, 
  MapPinned, 
  Star, 
  Coffee 
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

export default function BrewDetailScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [showVenues, setShowVenues] = useState(false);
  
  // Find brew by id
  const brew = BREWS.find((b) => b.id.toString() === id);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // In a real app, this would send the message to the group chat
    setMessage("");
  };
  
  const toggleVenues = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowVenues(!showVenues);
  };
  
  const joinBrew = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // In a real app, this would add the user to the brew participants
    router.back();
  };
  
  const renderParticipant = ({ item }) => (
    <View style={styles.participantItem}>
      <Image source={{ uri: item.avatar }} style={styles.participantAvatar} />
      <Text style={styles.participantName}>{item.name}</Text>
    </View>
  );
  
  const renderVenue = ({ item }) => (
    <TouchableOpacity style={styles.venueCard}>
      <Image source={{ uri: item.image }} style={styles.venueImage} />
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{item.name}</Text>
        <View style={styles.venueRating}>
          <Star size={14} color={COLORS.primary} fill={COLORS.primary} />
          <Text style={styles.venueRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.venueLocation}>
          <MapPin size={14} color={COLORS.textLight} />
          <Text style={styles.venueLocationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: brew?.title || "Brew Detail",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={COLORS.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: brew?.image }} style={styles.brewImage} />
          
          <View style={styles.brewDetails}>
            <Text style={styles.brewTitle}>{brew?.title}</Text>
            
            <View style={styles.brewInfo}>
              <View style={styles.brewInfoItem}>
                <MapPin size={16} color={COLORS.textLight} />
                <Text style={styles.brewInfoText}>{brew?.location}</Text>
              </View>
              
              <View style={styles.brewInfoItem}>
                <Calendar size={16} color={COLORS.textLight} />
                <Text style={styles.brewInfoText}>{brew?.date}</Text>
              </View>
              
              <View style={styles.brewInfoItem}>
                <Clock size={16} color={COLORS.textLight} />
                <Text style={styles.brewInfoText}>{brew?.time}</Text>
              </View>
              
              <View style={styles.brewInfoItem}>
                <Users size={16} color={COLORS.textLight} />
                <Text style={styles.brewInfoText}>
                  {brew?.participants.length}/{brew?.maxParticipants} participants
                </Text>
              </View>
            </View>
            
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{brew?.category}</Text>
            </View>
            
            <Text style={styles.brewDescription}>
              {brew?.description || "Join us for a fun meetup with like-minded people! We'll be discussing our shared interests and enjoying some great coffee."}
            </Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Participants</Text>
              <FlatList
                data={brew?.participants}
                renderItem={renderParticipant}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.participantsList}
              />
            </View>
            
            <TouchableOpacity
              style={styles.venuesButton}
              onPress={toggleVenues}
            >
              <Coffee size={20} color={COLORS.primary} />
              <Text style={styles.venuesButtonText}>
                {showVenues ? "Hide Suggested Venues" : "Show Suggested Venues"}
              </Text>
            </TouchableOpacity>
            
            {showVenues && (
              <View style={styles.venuesSection}>
                <View style={styles.venuesHeader}>
                  <Text style={styles.venuesTitle}>AI Suggested Venues</Text>
                  <Text style={styles.venuesSubtitle}>
                    Based on your group's interests
                  </Text>
                </View>
                
                <FlatList
                  data={[
                    {
                      id: 1,
                      name: "Artisan Coffee House",
                      rating: 4.8,
                      location: "0.5 miles away",
                      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1778&auto=format&fit=crop",
                    },
                    {
                      id: 2,
                      name: "Brew & Co",
                      rating: 4.6,
                      location: "0.8 miles away",
                      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1847&auto=format&fit=crop",
                    },
                    {
                      id: 3,
                      name: "The Coffee Club",
                      rating: 4.5,
                      location: "1.2 miles away",
                      image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop",
                    },
                  ]}
                  renderItem={renderVenue}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.venuesList}
                />
              </View>
            )}
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.chatPreview}>
            <Text style={styles.chatPreviewTitle}>Group Chat</Text>
            <View style={styles.chatActions}>
              <TouchableOpacity style={styles.chatAction}>
                <MessageCircle size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatAction}>
                <Phone size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatAction}>
                <Video size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.joinButton} onPress={joinBrew}>
            <Text style={styles.joinButtonText}>Join Brew</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  brewImage: {
    width: "100%",
    height: 200,
  },
  brewDetails: {
    padding: 16,
  },
  brewTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
  },
  brewInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  brewInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  brewInfoText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  categoryTag: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  brewDescription: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  participantsList: {
    paddingBottom: 8,
  },
  participantItem: {
    alignItems: "center",
    marginRight: 16,
  },
  participantAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  participantName: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
  },
  venuesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    marginBottom: 24,
  },
  venuesButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: 8,
  },
  venuesSection: {
    marginBottom: 24,
  },
  venuesHeader: {
    marginBottom: 16,
  },
  venuesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  venuesSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  venuesList: {
    paddingBottom: 8,
  },
  venueCard: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  venueImage: {
    width: "100%",
    height: 150,
  },
  venueInfo: {
    padding: 12,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  venueRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  venueRatingText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 4,
  },
  venueLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  venueLocationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16,
  },
  chatPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  chatPreviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  chatActions: {
    flexDirection: "row",
  },
  chatAction: {
    marginLeft: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
