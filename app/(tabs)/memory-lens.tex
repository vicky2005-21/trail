import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  ActivityIndicator,
  SafeAreaView as RNSafeAreaView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { MEMORIES } from "@/mocks/memories";
import { 
  Camera, 
  MapPin, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  X, 
  Tag, 
  Send,
  Users,
  MessageCircle,
  Heart,
  BookOpen,
  Compass
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTheme } from "@/context/theme-context";

const { width, height } = Dimensions.get("window");

export default function MemoryLensScreen() {
  const { isDark } = useTheme();
  const [showCapture, setShowCapture] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyMemories, setNearbyMemories] = useState([]);
  const [activeTab, setActiveTab] = useState("explore");
  
  const captureAnimation = useRef(new Animated.Value(0)).current;
  const memoryDetailAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate loading nearby memories
    const timer = setTimeout(() => {
      setNearbyMemories(MEMORIES.slice(0, 5));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleCapture = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setShowCapture(!showCapture);
    Animated.timing(captureAnimation, {
      toValue: showCapture ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const showMemoryDetail = (memory) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setSelectedMemory(memory);
    Animated.timing(memoryDetailAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const hideMemoryDetail = () => {
    Animated.timing(memoryDetailAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedMemory(null);
    });
  };
  
  const navigateToCreateMemory = () => {
    router.push("/create-memory");
  };
  
  const navigateToMemoryDiary = () => {
    router.push("/memory-diary");
  };
  
  const renderARView = () => (
    <View style={styles.arView}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1769&auto=format&fit=crop" }}
        style={styles.arBackground}
      />
      
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Discovering nearby memories...</Text>
        </View>
      ) : (
        nearbyMemories && nearbyMemories.map((memory, index) => (
          <TouchableOpacity
            key={memory.id}
            style={[
              styles.arMemory,
              {
                top: 100 + (index * 70) % 300,
                left: 50 + (index * 80) % 250,
              },
            ]}
            onPress={() => showMemoryDetail(memory)}
          >
            <View style={styles.arMemoryBubble}>
              <Image source={{ uri: memory.coverImage }} style={styles.arMemoryThumbnail} />
            </View>
            <View style={styles.arMemoryInfo}>
              <Text style={styles.arMemoryName}>{memory.title}</Text>
              <Text style={styles.arMemoryLocation}>{memory.location}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
      
      <View style={styles.arOverlay}>
        <Text style={styles.arOverlayText}>AR Memory Lens</Text>
        <Text style={styles.arOverlaySubtext}>
          Explore memories around you
        </Text>
      </View>
    </View>
  );
  
  const renderCaptureView = () => (
    <Animated.View
      style={[
        styles.captureView,
        {
          opacity: captureAnimation,
          transform: [
            {
              translateY: captureAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        },
      ]}
    >
      <RNSafeAreaView style={{ flex: 1 }}>
        <View style={styles.captureHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCapture}>
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.captureTitle}>Capture Memory</Text>
        </View>
        
        <View style={styles.cameraPreview}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1769&auto=format&fit=crop" }}
            style={styles.cameraPreviewImage}
          />
          
          <View style={styles.captureControls}>
            <TouchableOpacity style={styles.captureTypeButton}>
              <ImageIcon size={24} color="#fff" />
              <Text style={styles.captureTypeText}>Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureTypeButton}>
              <Video size={24} color="#fff" />
              <Text style={styles.captureTypeText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.captureOptions}>
          <Text style={styles.captureOptionsTitle}>Memory Details</Text>
          
          <View style={styles.captureOption}>
            <MapPin size={20} color={COLORS.text} />
            <Text style={styles.captureOptionText}>Current Location</Text>
          </View>
          
          <View style={styles.captureOption}>
            <Tag size={20} color={COLORS.text} />
            <Text style={styles.captureOptionText}>Add Tags</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              toggleCapture();
              navigateToCreateMemory();
            }}
          >
            <Text style={styles.saveButtonText}>Continue</Text>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </RNSafeAreaView>
    </Animated.View>
  );
  
  const renderMemoryDetail = () => {
    if (!selectedMemory) return null;
    
    return (
      <Animated.View
        style={[
          styles.memoryDetailView,
          {
            opacity: memoryDetailAnimation,
            transform: [
              {
                translateY: memoryDetailAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <RNSafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.memoryDetailClose}
            onPress={hideMemoryDetail}
          >
            <X size={24} color="#fff" />
          </TouchableOpacity>
          
          <Image
            source={{ uri: selectedMemory.coverImage }}
            style={styles.memoryDetailImage}
          />
          
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.memoryDetailGradient}
          >
            <View style={styles.memoryDetailContent}>
              <View style={styles.memoryDetailHeader}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" }}
                  style={styles.memoryDetailAvatar}
                />
                <View>
                  <Text style={styles.memoryDetailName}>
                    {selectedMemory.userName || "Memory Creator"}
                  </Text>
                  <Text style={styles.memoryDetailDate}>
                    {new Date(selectedMemory.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.memoryDetailTitle}>
                {selectedMemory.title}
              </Text>
              
              <Text style={styles.memoryDetailDescription}>
                {selectedMemory.description}
              </Text>
              
              <View style={styles.memoryDetailLocation}>
                <MapPin size={16} color="#fff" />
                <Text style={styles.memoryDetailLocationText}>
                  {selectedMemory.location}
                </Text>
              </View>
              
              <View style={styles.memoryDetailTags}>
                {selectedMemory.tags ? (
                  selectedMemory.tags.map((tag, index) => (
                    <View key={index} style={styles.memoryDetailTag}>
                      <Text style={styles.memoryDetailTagText}>{tag}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.memoryDetailTag}>
                    <Text style={styles.memoryDetailTagText}>Memory</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.memoryDetailActions}>
                <TouchableOpacity style={styles.memoryDetailAction}>
                  <Heart size={20} color="#fff" />
                  <Text style={styles.memoryDetailActionText}>Like</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.memoryDetailAction}>
                  <MessageCircle size={20} color="#fff" />
                  <Text style={styles.memoryDetailActionText}>Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </RNSafeAreaView>
      </Animated.View>
    );
  };
  
  const renderTabContent = () => {
    if (activeTab === "explore") {
      return renderARView();
    } else if (activeTab === "memories") {
      return (
        <View style={styles.myMemoriesContainer}>
          <TouchableOpacity 
            style={styles.memoryDiaryButton}
            onPress={navigateToMemoryDiary}
          >
            <BookOpen size={24} color={COLORS.primary} />
            <Text style={styles.memoryDiaryButtonText}>Open Memory Diary</Text>
          </TouchableOpacity>
          
          <View style={styles.memoryStats}>
            <View style={styles.memoryStat}>
              <Text style={styles.memoryStatNumber}>{MEMORIES.length}</Text>
              <Text style={styles.memoryStatLabel}>Memories</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text style={styles.memoryStatNumber}>12</Text>
              <Text style={styles.memoryStatLabel}>Views</Text>
            </View>
            <View style={styles.memoryStat}>
              <Text style={styles.memoryStatNumber}>5</Text>
              <Text style={styles.memoryStatLabel}>Connections</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Recent Memories</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {MEMORIES.slice(0, 5).map((memory) => (
              <TouchableOpacity
                key={memory.id}
                style={styles.memoryItem}
                onPress={() => router.push(`/memory-diary/${memory.id}`)}
              >
                <Image source={{ uri: memory.coverImage }} style={styles.memoryItemImage} />
                <View style={styles.memoryItemContent}>
                  <Text style={styles.memoryItemTitle}>{memory.title}</Text>
                  <Text style={styles.memoryItemDate}>
                    {new Date(memory.date).toLocaleDateString()}
                  </Text>
                  {memory.location && (
                    <View style={styles.memoryItemLocation}>
                      <MapPin size={12} color={COLORS.textLight} />
                      <Text style={styles.memoryItemLocationText}>{memory.location}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>MemoryLens</Text>
        <Text style={[styles.headerSubtitle, isDark && styles.headerSubtitleDark]}>
          Discover and share AR memories
        </Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "explore" && styles.activeTab, isDark && styles.tabDark]}
          onPress={() => setActiveTab("explore")}
        >
          <Compass size={20} color={activeTab === "explore" ? COLORS.primary : (isDark ? "#fff" : COLORS.textLight)} />
          <Text
            style={[
              styles.tabText,
              activeTab === "explore" && styles.activeTabText,
              isDark && styles.tabTextDark
            ]}
          >
            Explore
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === "memories" && styles.activeTab, isDark && styles.tabDark]}
          onPress={() => setActiveTab("memories")}
        >
          <BookOpen size={20} color={activeTab === "memories" ? COLORS.primary : (isDark ? "#fff" : COLORS.textLight)} />
          <Text
            style={[
              styles.tabText,
              activeTab === "memories" && styles.activeTabText,
              isDark && styles.tabTextDark
            ]}
          >
            My Memories
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderTabContent()}
      {renderCaptureView()}
      {renderMemoryDetail()}
      
      {!showCapture && !selectedMemory && (
        <TouchableOpacity
          style={styles.captureToggleButton}
          onPress={toggleCapture}
        >
          <Camera size={24} color="#fff" />
          <Text style={styles.captureToggleText}>Capture</Text>
        </TouchableOpacity>
      )}
      
      {!showCapture && !selectedMemory && activeTab === "explore" && (
        <View style={styles.recentMemories}>
          <Text style={[styles.recentMemoriesTitle, isDark && styles.recentMemoriesTitleDark]}>Recent Memories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentMemoriesScroll}
          >
            {MEMORIES.map((memory) => (
              <TouchableOpacity
                key={memory.id}
                style={styles.recentMemory}
                onPress={() => showMemoryDetail(memory)}
              >
                <Image
                  source={{ uri: memory.coverImage }}
                  style={styles.recentMemoryImage}
                />
                <Text style={styles.recentMemoryLocation} numberOfLines={1}>
                  {memory.location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  headerTitleDark: {
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  headerSubtitleDark: {
    color: "#aaa",
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: COLORS.lightBg,
  },
  tabDark: {
    backgroundColor: "#2a2a2a",
  },
  activeTab: {
    backgroundColor: "rgba(94, 96, 206, 0.1)",
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textLight,
  },
  tabTextDark: {
    color: "#fff",
  },
  activeTabText: {
    color: COLORS.primary,
  },
  arView: {
    flex: 1,
    position: "relative",
  },
  arBackground: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  arOverlay: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  arOverlayText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  arOverlaySubtext: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  arMemory: {
    position: "absolute",
    alignItems: "center",
  },
  arMemoryBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  arMemoryThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  arMemoryInfo: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    width: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  arMemoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  arMemoryLocation: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  captureToggleButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  captureToggleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  recentMemories: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 5,
  },
  recentMemoriesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  recentMemoriesTitleDark: {
    color: "#fff",
  },
  recentMemoriesScroll: {
    paddingBottom: 16,
  },
  recentMemory: {
    marginRight: 12,
    width: 100,
  },
  recentMemoryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 4,
  },
  recentMemoryLocation: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
  },
  captureView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 20,
  },
  captureHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  captureTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cameraPreview: {
    flex: 1,
    position: "relative",
  },
  cameraPreviewImage: {
    width: "100%",
    height: "100%",
  },
  captureControls: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  captureTypeButton: {
    alignItems: "center",
  },
  captureTypeText: {
    color: "#fff",
    marginTop: 4,
    fontSize: 12,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  captureOptions: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  captureOptionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  captureOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  captureOptionText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  memoryDetailView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 20,
  },
  memoryDetailClose: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 21,
  },
  memoryDetailImage: {
    width: "100%",
    height: "100%",
  },
  memoryDetailGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 350,
    justifyContent: "flex-end",
  },
  memoryDetailContent: {
    padding: 20,
  },
  memoryDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memoryDetailAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  memoryDetailName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  memoryDetailDate: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  memoryDetailTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  memoryDetailDescription: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  memoryDetailLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memoryDetailLocationText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
  },
  memoryDetailTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  memoryDetailTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  memoryDetailTagText: {
    color: "#fff",
    fontSize: 12,
  },
  memoryDetailActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  memoryDetailAction: {
    alignItems: "center",
    marginRight: 24,
  },
  memoryDetailActionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginLeft: "auto",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  myMemoriesContainer: {
    flex: 1,
    padding: 16,
  },
  memoryDiaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(94, 96, 206, 0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  memoryDiaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 8,
  },
  memoryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  memoryStat: {
    alignItems: "center",
    flex: 1,
  },
  memoryStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  memoryStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  memoryItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  memoryItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  memoryItemContent: {
    flex: 1,
    justifyContent: "center",
  },
  memoryItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  memoryItemDate: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  memoryItemLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  memoryItemLocationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
});
