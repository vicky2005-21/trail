import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { BREWS } from "@/mocks/brews";
import { 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  Map as MapIcon, 
  List, 
  Coffee, 
  Search,
  Filter,
  ChevronRight
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTheme } from "@/context/theme-context";

const { width } = Dimensions.get("window");

export default function BrewScreen() {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState("list");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredBrews, setFilteredBrews] = useState(BREWS);
  const [isLoading, setIsLoading] = useState(true);
  
  const mapAnimation = useRef(new Animated.Value(0)).current;
  const listAnimation = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleViewMode = (mode) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (mode === viewMode) return;
    
    setViewMode(mode);
    
    if (mode === "map") {
      Animated.parallel([
        Animated.timing(mapAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(listAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(mapAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(listAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  };
  
  const filterByCategory = (category) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setActiveCategory(category);
    
    if (category === "all") {
      setFilteredBrews(BREWS);
    } else {
      setFilteredBrews(BREWS.filter(brew => brew.category.toLowerCase() === category.toLowerCase()));
    }
  };
  
  const navigateToBrewDetail = (id) => {
    router.push({
      pathname: "/brew-detail/[id]",
      params: { id }
    });
  };
  
  const navigateToCreateBrew = () => {
    router.push("/create-brew");
  };
  
  const renderBrewItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.brewCard, isDark && styles.brewCardDark]}
      onPress={() => navigateToBrewDetail(item.id)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.brewImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.brewGradient}
      >
        <View style={styles.brewInfo}>
          <Text style={styles.brewTitle}>{item.title}</Text>
          <View style={styles.brewMeta}>
            <View style={styles.brewMetaItem}>
              <MapPin size={14} color="#fff" />
              <Text style={styles.brewMetaText}>{item.location}</Text>
            </View>
            <View style={styles.brewMetaItem}>
              <Calendar size={14} color="#fff" />
              <Text style={styles.brewMetaText}>{item.date}</Text>
            </View>
            <View style={styles.brewMetaItem}>
              <Clock size={14} color="#fff" />
              <Text style={styles.brewMetaText}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.brewParticipants}>
            <View style={styles.avatarStack}>
              {item.participants.slice(0, 3).map((participant, index) => (
                <Image 
                  key={participant.id}
                  source={{ uri: participant.avatar }}
                  style={[
                    styles.participantAvatar,
                    { marginLeft: index > 0 ? -15 : 0 }
                  ]}
                />
              ))}
              {item.participants.length > 3 && (
                <View style={styles.moreParticipants}>
                  <Text style={styles.moreParticipantsText}>
                    +{item.participants.length - 3}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.participantsText}>
              {item.participants.length}/{item.maxParticipants} joined
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.categoryTag}>
        <Text style={styles.categoryTagText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderCategories = () => {
    const categories = [
      { id: "all", name: "All" },
      { id: "coffee", name: "Coffee" },
      { id: "food", name: "Food" },
      { id: "sports", name: "Sports" },
      { id: "games", name: "Games" },
      { id: "music", name: "Music" },
    ];
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id.toLowerCase() && styles.activeCategoryButton,
              isDark && styles.categoryButtonDark,
              activeCategory === category.id.toLowerCase() && isDark && styles.activeCategoryButtonDark,
            ]}
            onPress={() => filterByCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category.id.toLowerCase() && styles.activeCategoryButtonText,
                isDark && styles.categoryButtonTextDark,
                activeCategory === category.id.toLowerCase() && isDark && styles.activeCategoryButtonTextDark,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  
  const renderMapView = () => {
    // In a real app, this would be a map component
    return (
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?q=80&w=1769&auto=format&fit=crop" }}
          style={styles.mapImage}
        />
        
        {/* Map markers */}
        {filteredBrews.map((brew) => (
          <TouchableOpacity
            key={brew.id}
            style={[
              styles.mapMarker,
              {
                top: 100 + (brew.id * 50) % 300,
                left: 50 + (brew.id * 70) % 250,
              },
            ]}
            onPress={() => navigateToBrewDetail(brew.id)}
          >
            <View style={styles.markerPin}>
              <Coffee size={16} color="#fff" />
            </View>
            <View style={styles.markerInfo}>
              <Text style={styles.markerTitle}>{brew.title}</Text>
              <Text style={styles.markerSubtitle}>{brew.date} • {brew.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingCard}>
        <View style={styles.loadingImage} />
        <View style={styles.loadingContent}>
          <View style={styles.loadingTitle} />
          <View style={styles.loadingText} />
          <View style={styles.loadingText} />
        </View>
      </View>
      <View style={styles.loadingCard}>
        <View style={styles.loadingImage} />
        <View style={styles.loadingContent}>
          <View style={styles.loadingTitle} />
          <View style={styles.loadingText} />
          <View style={styles.loadingText} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Brew</Text>
        <Text style={[styles.headerSubtitle, isDark && styles.headerSubtitleDark]}>
          Find and create coffee meetups
        </Text>
        
        <View style={[styles.viewToggle, isDark && styles.viewToggleDark]}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === "list" && styles.activeViewToggleButton,
            ]}
            onPress={() => toggleViewMode("list")}
          >
            <List
              size={20}
              color={viewMode === "list" ? "#fff" : (isDark ? "#fff" : COLORS.text)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === "map" && styles.activeViewToggleButton,
            ]}
            onPress={() => toggleViewMode("map")}
          >
            <MapIcon
              size={20}
              color={viewMode === "map" ? "#fff" : (isDark ? "#fff" : COLORS.text)}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={[styles.searchBar, isDark && styles.searchBarDark]}
          onPress={() => router.push("/search")}
        >
          <Search size={20} color={isDark ? "#aaa" : COLORS.textLight} />
          <Text style={[styles.searchPlaceholder, isDark && styles.searchPlaceholderDark]}>
            Search for brew events...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, isDark && styles.filterButtonDark]}>
          <Filter size={20} color={isDark ? "#fff" : COLORS.text} />
        </TouchableOpacity>
      </View>
      
      {renderCategories()}
      
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.listContainer,
            {
              opacity: listAnimation,
              transform: [
                {
                  translateX: listAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
              display: viewMode === "list" ? "flex" : "none",
            },
          ]}
        >
          {isLoading ? (
            renderLoadingState()
          ) : (
            <FlatList
              data={filteredBrews}
              renderItem={renderBrewItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.brewsList}
            />
          )}
        </Animated.View>
        
        <Animated.View
          style={[
            styles.mapViewContainer,
            {
              opacity: mapAnimation,
              transform: [
                {
                  translateX: mapAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
              display: viewMode === "map" ? "flex" : "none",
            },
          ]}
        >
          {renderMapView()}
        </Animated.View>
      </View>
      
      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToCreateBrew}
      >
        <Plus size={24} color="#fff" />
        <Text style={styles.createButtonText}>Create Brew</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    position: "relative",
  },
  headerDark: {
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  headerTitleDark: {
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  headerSubtitleDark: {
    color: "#aaa",
  },
  viewToggle: {
    position: "absolute",
    right: 16,
    top: 16,
    flexDirection: "row",
    backgroundColor: COLORS.lightBg,
    borderRadius: 20,
    padding: 4,
  },
  viewToggleDark: {
    backgroundColor: "#333",
  },
  viewToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  activeViewToggleButton: {
    backgroundColor: COLORS.primary,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchBarDark: {
    backgroundColor: "#333",
  },
  searchPlaceholder: {
    color: COLORS.textLight,
    marginLeft: 8,
    fontSize: 14,
  },
  searchPlaceholderDark: {
    color: "#aaa",
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.lightBg,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonDark: {
    backgroundColor: "#333",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightBg,
    marginRight: 10,
  },
  categoryButtonDark: {
    backgroundColor: "#333",
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  activeCategoryButtonDark: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    color: COLORS.text,
    fontWeight: "500",
  },
  categoryButtonTextDark: {
    color: "#fff",
  },
  activeCategoryButtonText: {
    color: "#fff",
  },
  activeCategoryButtonTextDark: {
    color: "#fff",
  },
  content: {
    flex: 1,
    position: "relative",
  },
  listContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapViewContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  brewsList: {
    padding: 16,
    paddingBottom: 80,
  },
  brewCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    height: 220,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brewCardDark: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
  },
  brewImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  brewGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    justifyContent: "flex-end",
    padding: 16,
  },
  brewInfo: {
    width: "100%",
  },
  brewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  brewMeta: {
    marginBottom: 12,
  },
  brewMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  brewMetaText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 6,
  },
  brewParticipants: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarStack: {
    flexDirection: "row",
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  moreParticipants: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  moreParticipantsText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  participantsText: {
    color: "#fff",
    fontSize: 12,
  },
  categoryTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  categoryTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  createButton: {
    position: "absolute",
    bottom: 20,
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
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapMarker: {
    position: "absolute",
    alignItems: "center",
  },
  markerPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  markerInfo: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    width: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  markerTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
    textAlign: "center",
  },
  markerSubtitle: {
    fontSize: 10,
    color: COLORS.textLight,
    textAlign: "center",
  },
  loadingContainer: {
    padding: 16,
  },
  loadingCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    height: 120,
  },
  loadingImage: {
    width: 100,
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  loadingContent: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  loadingTitle: {
    height: 20,
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 12,
  },
  loadingText: {
    height: 14,
    width: "60%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
});
