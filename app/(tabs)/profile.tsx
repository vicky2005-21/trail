import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth-store";
import { 
  Settings, 
  Edit, 
  Grid, 
  Bookmark, 
  Award, 
  LogOut, 
  MapPin, 
  Calendar, 
  Heart 
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("posts");
  
  const handleLogout = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    logout();
    router.replace("/login");
  };
  
  const navigateToSettings = () => {
    router.push("/settings");
  };
  
  const navigateToEditProfile = () => {
    router.push("/edit-profile");
  };
  
  const navigateToMemoryDiary = () => {
    router.push("/memory-diary");
  };
  
  const renderPostsGrid = () => {
    // Mock posts data
    const posts = Array(9).fill(0).map((_, i) => ({
      id: i,
      imageUrl: `https://images.unsplash.com/photo-${1550000000 + i * 10000}?q=80&w=400&auto=format&fit=crop`,
    }));
    
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771&auto=format&fit=crop" }}
              style={styles.gridImage}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
      />
    );
  };
  
  const renderSavedGrid = () => {
    // Mock saved posts data
    const saved = Array(6).fill(0).map((_, i) => ({
      id: i,
      imageUrl: `https://images.unsplash.com/photo-${1560000000 + i * 10000}?q=80&w=400&auto=format&fit=crop`,
    }));
    
    return (
      <FlatList
        data={saved}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1770&auto=format&fit=crop" }}
              style={styles.gridImage}
            />
            <View style={styles.savedBadge}>
              <Bookmark size={12} color="#fff" fill="#fff" />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
      />
    );
  };
  
  const renderAchievementsGrid = () => {
    // Mock achievements data
    const achievements = [
      { id: 1, title: "Social Butterfly", description: "Connected with 10+ people", icon: "👋" },
      { id: 2, title: "Brew Master", description: "Created 5 successful meetups", icon: "☕" },
      { id: 3, title: "Memory Maker", description: "Shared 20+ AR memories", icon: "📸" },
      { id: 4, title: "Explorer", description: "Visited 5 different locations", icon: "🗺️" },
    ];
    
    return (
      <View style={styles.achievementsContainer}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerAction}
            onPress={navigateToSettings}
          >
            <Settings size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction} onPress={handleLogout}>
            <LogOut size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || "John Doe"}</Text>
            <View style={styles.profileLocation}>
              <MapPin size={14} color={COLORS.textLight} />
              <Text style={styles.profileLocationText}>New York, USA</Text>
            </View>
            
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>42</Text>
                <Text style={styles.profileStatLabel}>Posts</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>128</Text>
                <Text style={styles.profileStatLabel}>Connections</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>15</Text>
                <Text style={styles.profileStatLabel}>Brews</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.profileActions}>
          <TouchableOpacity
            style={styles.profileAction}
            onPress={navigateToEditProfile}
          >
            <Edit size={16} color={COLORS.primary} />
            <Text style={styles.profileActionText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.profileAction}
            onPress={navigateToMemoryDiary}
          >
            <Calendar size={16} color={COLORS.primary} />
            <Text style={styles.profileActionText}>Memory Diary</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileBio}>
          <Text style={styles.profileBioText}>
            Coffee enthusiast, avid traveler, and tech lover. Always looking for new connections and adventures!
          </Text>
          
          <View style={styles.interestsContainer}>
            {user?.interests?.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            )) || (
              <>
                <View style={styles.interestTag}>
                  <Text style={styles.interestText}>Coffee</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestText}>Travel</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestText}>Technology</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestText}>Music</Text>
                </View>
              </>
            )}
          </View>
        </View>
        
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentActivityScroll}
          >
            <View style={styles.activityCard}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.activityCardGradient}
              >
                <Calendar size={24} color="#fff" />
                <Text style={styles.activityCardTitle}>Coffee Meetup</Text>
                <Text style={styles.activityCardSubtitle}>Yesterday</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.activityCard}>
              <LinearGradient
                colors={[COLORS.secondary, COLORS.secondaryDark]}
                style={styles.activityCardGradient}
              >
                <Heart size={24} color="#fff" />
                <Text style={styles.activityCardTitle}>New Connection</Text>
                <Text style={styles.activityCardSubtitle}>2 days ago</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.activityCard}>
              <LinearGradient
                colors={["#6C5CE7", "#4834D4"]}
                style={styles.activityCardGradient}
              >
                <MapPin size={24} color="#fff" />
                <Text style={styles.activityCardTitle}>New Memory</Text>
                <Text style={styles.activityCardSubtitle}>Last week</Text>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.contentTabs}>
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === "posts" && styles.contentTabActive,
            ]}
            onPress={() => setActiveTab("posts")}
          >
            <Grid
              size={20}
              color={activeTab === "posts" ? COLORS.primary : COLORS.textLight}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === "saved" && styles.contentTabActive,
            ]}
            onPress={() => setActiveTab("saved")}
          >
            <Bookmark
              size={20}
              color={activeTab === "saved" ? COLORS.primary : COLORS.textLight}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === "achievements" && styles.contentTabActive,
            ]}
            onPress={() => setActiveTab("achievements")}
          >
            <Award
              size={20}
              color={
                activeTab === "achievements" ? COLORS.primary : COLORS.textLight
              }
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          {activeTab === "posts" && renderPostsGrid()}
          {activeTab === "saved" && renderSavedGrid()}
          {activeTab === "achievements" && renderAchievementsGrid()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: "row",
  },
  headerAction: {
    marginLeft: 16,
  },
  profileHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  profileLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileLocationText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileStat: {
    alignItems: "center",
  },
  profileStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  profileStatLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  profileActions: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  profileActionText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: 6,
  },
  profileBio: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileBioText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    backgroundColor: COLORS.lightBg,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "500",
  },
  recentActivity: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  recentActivityScroll: {
    paddingBottom: 8,
  },
  activityCard: {
    width: 150,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
  },
  activityCardGradient: {
    width: "100%",
    height: "100%",
    padding: 12,
    justifyContent: "center",
  },
  activityCardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  activityCardSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 4,
  },
  contentTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contentTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  contentTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  contentContainer: {
    padding: 4,
  },
  gridItem: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 2,
    position: "relative",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  savedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
  },
  achievementCard: {
    width: "48%",
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  achievementDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
