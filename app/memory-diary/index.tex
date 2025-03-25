import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { MEMORIES } from "@/mocks/memories";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Search,
  Plus,
  BookOpen,
  Grid,
  List,
  Filter,
  ChevronDown,
  Heart,
  Share2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/theme-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export default function MemoryDiaryScreen() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [memories, setMemories] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [favoriteMemories, setFavoriteMemories] = useState({});
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate loading memories
    setTimeout(() => {
      setMemories(MEMORIES);
      setIsLoading(false);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);
  
  const filterMemories = (filter) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setSelectedFilter(filter);
    
    // In a real app, you would filter the memories based on the selected filter
    // For now, we'll just simulate it
    setIsLoading(true);
    fadeAnim.setValue(0);
    
    setTimeout(() => {
      if (filter === "all") {
        setMemories(MEMORIES);
      } else if (filter === "featured") {
        setMemories(MEMORIES.filter(memory => memory.featured));
      } else if (filter === "recent") {
        setMemories([...MEMORIES].sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else if (filter === "favorites") {
        setMemories(MEMORIES.filter(memory => favoriteMemories[memory.id]));
      }
      
      setIsLoading(false);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 500);
  };
  
  const toggleFavorite = (id) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setFavoriteMemories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const navigateToMemoryDetail = (id) => {
    router.push({
      pathname: "/memory-diary/[id]",
      params: { id }
    });
  };
  
  const navigateToCreateMemory = () => {
    router.push("/create-memory");
  };
  
  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigateToMemoryDetail(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.coverImage }} style={styles.gridItemImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.gridItemGradient}
      >
        <View style={styles.gridItemContent}>
          <Text style={styles.gridItemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.gridItemDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={18} 
            color="#fff" 
            fill={favoriteMemories[item.id] ? "#fff" : "transparent"} 
          />
        </TouchableOpacity>
      </LinearGradient>
      
      {item.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  
  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.listItem, isDark && styles.listItemDark]}
      onPress={() => navigateToMemoryDetail(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.coverImage }} style={styles.listItemImage} />
      <View style={styles.listItemContent}>
        <View style={styles.listItemHeader}>
          <Text style={[styles.listItemTitle, isDark && styles.listItemTitleDark]}>
            {item.title}
          </Text>
          {item.featured && (
            <View style={styles.listFeaturedBadge}>
              <Text style={styles.listFeaturedBadgeText}>Featured</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.listItemDate, isDark && styles.listItemDateDark]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        
        {item.location && (
          <View style={styles.listItemLocation}>
            <MapPin size={12} color={isDark ? "#aaa" : COLORS.textLight} />
            <Text style={[styles.listItemLocationText, isDark && styles.listItemLocationTextDark]}>
              {item.location}
            </Text>
          </View>
        )}
        
        <View style={styles.listItemActions}>
          <TouchableOpacity 
            style={[styles.listItemAction, isDark && styles.listItemActionDark]}
            onPress={() => toggleFavorite(item.id)}
          >
            <Heart 
              size={16} 
              color={isDark ? "#fff" : COLORS.text} 
              fill={favoriteMemories[item.id] ? (isDark ? "#fff" : COLORS.text) : "transparent"} 
            />
            <Text style={[styles.listItemActionText, isDark && styles.listItemActionTextDark]}>
              {favoriteMemories[item.id] ? "Favorited" : "Favorite"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.listItemAction, isDark && styles.listItemActionDark]}>
            <Share2 size={16} color={isDark ? "#fff" : COLORS.text} />
            <Text style={[styles.listItemActionText, isDark && styles.listItemActionTextDark]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderHeader = () => (
    <View style={[styles.diaryHeader, isDark && styles.diaryHeaderDark]}>
      <View style={styles.diaryInfo}>
        <Text style={[styles.diaryTitle, isDark && styles.diaryTitleDark]}>Memory Diary</Text>
        <Text style={[styles.diarySubtitle, isDark && styles.diarySubtitleDark]}>
          Your personal collection of memories
        </Text>
      </View>
      
      <View style={styles.diaryStats}>
        <View style={[styles.diaryStat, isDark && styles.diaryStatDark]}>
          <Text style={[styles.diaryStatNumber, isDark && styles.diaryStatNumberDark]}>
            {memories.length}
          </Text>
          <Text style={[styles.diaryStatLabel, isDark && styles.diaryStatLabelDark]}>
            Memories
          </Text>
        </View>
        <View style={[styles.diaryStat, isDark && styles.diaryStatDark]}>
          <Text style={[styles.diaryStatNumber, isDark && styles.diaryStatNumberDark]}>
            {memories.filter(m => m.featured).length}
          </Text>
          <Text style={[styles.diaryStatLabel, isDark && styles.diaryStatLabelDark]}>
            Featured
          </Text>
        </View>
        <View style={[styles.diaryStat, isDark && styles.diaryStatDark]}>
          <Text style={[styles.diaryStatNumber, isDark && styles.diaryStatNumberDark]}>
            {Object.keys(favoriteMemories).length}
          </Text>
          <Text style={[styles.diaryStatLabel, isDark && styles.diaryStatLabelDark]}>
            Favorites
          </Text>
        </View>
      </View>
      
      <View style={styles.diaryActions}>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, isDark && styles.filterButtonDark]}
            onPress={() => {}}
          >
            <Filter size={16} color={isDark ? "#fff" : COLORS.text} />
            <Text style={[styles.filterButtonText, isDark && styles.filterButtonTextDark]}>
              {selectedFilter === "all" ? "All Memories" : 
               selectedFilter === "featured" ? "Featured" : 
               selectedFilter === "favorites" ? "Favorites" : "Recent"}
            </Text>
            <ChevronDown size={16} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          
          <View style={[styles.viewToggle, isDark && styles.viewToggleDark]}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "grid" && styles.activeViewToggleButton,
                isDark && styles.viewToggleButtonDark,
                viewMode === "grid" && isDark && styles.activeViewToggleButtonDark,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <Grid
                size={16}
                color={viewMode === "grid" ? "#fff" : (isDark ? "#fff" : COLORS.text)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === "list" && styles.activeViewToggleButton,
                isDark && styles.viewToggleButtonDark,
                viewMode === "list" && isDark && styles.activeViewToggleButtonDark,
              ]}
              onPress={() => setViewMode("list")}
            >
              <List
                size={16}
                color={viewMode === "list" ? "#fff" : (isDark ? "#fff" : COLORS.text)}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabs}
        >
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "all" && styles.activeFilterTab,
              isDark && styles.filterTabDark,
              selectedFilter === "all" && isDark && styles.activeFilterTabDark,
            ]}
            onPress={() => filterMemories("all")}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === "all" && styles.activeFilterTabText,
                isDark && styles.filterTabTextDark,
                selectedFilter === "all" && isDark && styles.activeFilterTabTextDark,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "featured" && styles.activeFilterTab,
              isDark && styles.filterTabDark,
              selectedFilter === "featured" && isDark && styles.activeFilterTabDark,
            ]}
            onPress={() => filterMemories("featured")}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === "featured" && styles.activeFilterTabText,
                isDark && styles.filterTabTextDark,
                selectedFilter === "featured" && isDark && styles.activeFilterTabTextDark,
              ]}
            >
              Featured
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "recent" && styles.activeFilterTab,
              isDark && styles.filterTabDark,
              selectedFilter === "recent" && isDark && styles.activeFilterTabDark,
            ]}
            onPress={() => filterMemories("recent")}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === "recent" && styles.activeFilterTabText,
                isDark && styles.filterTabTextDark,
                selectedFilter === "recent" && isDark && styles.activeFilterTabTextDark,
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "favorites" && styles.activeFilterTab,
              isDark && styles.filterTabDark,
              selectedFilter === "favorites" && isDark && styles.activeFilterTabDark,
            ]}
            onPress={() => filterMemories("favorites")}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === "favorites" && styles.activeFilterTabText,
                isDark && styles.filterTabTextDark,
                selectedFilter === "favorites" && isDark && styles.activeFilterTabTextDark,
              ]}
            >
              Favorites
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <BookOpen size={60} color={isDark ? "#aaa" : COLORS.textLight} />
      <Text style={[styles.emptyStateTitle, isDark && styles.emptyStateTitleDark]}>
        No memories yet
      </Text>
      <Text style={[styles.emptyStateText, isDark && styles.emptyStateTextDark]}>
        Start capturing your special moments
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToCreateMemory}
      >
        <Plus size={20} color="#fff" />
        <Text style={styles.createButtonText}>Create Memory</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Memory Diary",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Search size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: isDark ? '#fff' : COLORS.text,
          },
        }}
      />
      
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={["bottom"]}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
              Loading your memories...
            </Text>
          </View>
        ) : memories.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {renderHeader()}
            
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
              {viewMode === "grid" ? (
                <FlatList
                  data={memories}
                  renderItem={renderGridItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.gridColumnWrapper}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.gridContainer}
                />
              ) : (
                <FlatList
                  data={memories}
                  renderItem={renderListItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContainer}
                />
              )}
            </Animated.View>
            
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={navigateToCreateMemory}
            >
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  loadingTextDark: {
    color: "#fff",
  },
  diaryHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  diaryHeaderDark: {
    borderBottomColor: "#333",
  },
  diaryInfo: {
    marginBottom: 16,
  },
  diaryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  diaryTitleDark: {
    color: "#fff",
  },
  diarySubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  diarySubtitleDark: {
    color: "#aaa",
  },
  diaryStats: {
    flexDirection: "row",
    marginBottom: 16,
  },
  diaryStat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.lightBg,
    marginRight: 8,
  },
  diaryStatDark: {
    backgroundColor: "#2a2a2a",
  },
  diaryStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  diaryStatNumberDark: {
    color: "#fff",
  },
  diaryStatLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  diaryStatLabelDark: {
    color: "#aaa",
  },
  diaryActions: {
    marginTop: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterButtonDark: {
    backgroundColor: "#2a2a2a",
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.text,
    marginHorizontal: 8,
  },
  filterButtonTextDark: {
    color: "#fff",
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: COLORS.lightBg,
    borderRadius: 8,
    padding: 2,
  },
  viewToggleDark: {
    backgroundColor: "#2a2a2a",
  },
  viewToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewToggleButtonDark: {
    backgroundColor: "#2a2a2a",
  },
  activeViewToggleButton: {
    backgroundColor: COLORS.primary,
  },
  activeViewToggleButtonDark: {
    backgroundColor: COLORS.primary,
  },
  filterTabs: {
    paddingBottom: 8,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightBg,
    marginRight: 8,
  },
  filterTabDark: {
    backgroundColor: "#2a2a2a",
  },
  activeFilterTab: {
    backgroundColor: COLORS.primary,
  },
  activeFilterTabDark: {
    backgroundColor: COLORS.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  filterTabTextDark: {
    color: "#fff",
  },
  activeFilterTabText: {
    color: "#fff",
  },
  activeFilterTabTextDark: {
    color: "#fff",
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  gridColumnWrapper: {
    justifyContent: "space-between",
  },
  gridItem: {
    width: (width - 40) / 2,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  gridItemImage: {
    width: "100%",
    height: "100%",
  },
  gridItemGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  gridItemContent: {
    flex: 1,
    marginRight: 8,
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  gridItemDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  featuredBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemDark: {
    backgroundColor: "#2a2a2a",
  },
  listItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  listItemTitleDark: {
    color: "#fff",
  },
  listFeaturedBadge: {
    backgroundColor: COLORS.primary,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  listFeaturedBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  listItemDate: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  listItemDateDark: {
    color: "#aaa",
  },
  listItemLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listItemLocationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  listItemLocationTextDark: {
    color: "#aaa",
  },
  listItemActions: {
    flexDirection: "row",
  },
  listItemAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  listItemActionDark: {
    backgroundColor: "#333",
  },
  listItemActionText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
  },
  listItemActionTextDark: {
    color: "#fff",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateTitleDark: {
    color: "#fff",
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 24,
  },
  emptyStateTextDark: {
    color: "#aaa",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
});
