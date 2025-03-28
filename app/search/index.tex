import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { BREWS } from "@/mocks/brews";
import { PROFILES } from "@/mocks/profiles";
import { MEMORIES } from "@/mocks/memories";
import {
  Search as SearchIcon,
  X,
  TrendingUp,
  Clock,
  User,
  Coffee,
  BookOpen,
  MapPin,
  Calendar,
  ArrowLeft,
} from "lucide-react-native";
import { useTheme } from "@/context/theme-context";

export default function SearchScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    people: [],
    brews: [],
    memories: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const [recentSearches, setRecentSearches] = useState([
    "Coffee meetup",
    "John Smith",
    "Beach memories",
    "New York",
  ]);
  
  const trendingTopics = [
    "Coffee tasting",
    "Book club",
    "Hiking adventures",
    "Photography",
    "Cooking class",
    "Tech meetup",
  ];
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({
        people: [],
        brews: [],
        memories: [],
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate search delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Search people
      const peopleResults = PROFILES.filter(
        profile =>
          profile.name.toLowerCase().includes(query) ||
          profile.bio.toLowerCase().includes(query)
      );
      
      // Search brews
      const brewResults = BREWS.filter(
        brew =>
          brew.title.toLowerCase().includes(query) ||
          brew.location.toLowerCase().includes(query) ||
          brew.category.toLowerCase().includes(query)
      );
      
      // Search memories
      const memoryResults = MEMORIES.filter(
        memory =>
          memory.title.toLowerCase().includes(query) ||
          (memory.description && memory.description.toLowerCase().includes(query)) ||
          (memory.location && memory.location.toLowerCase().includes(query))
      );
      
      setSearchResults({
        people: peopleResults,
        brews: brewResults,
        memories: memoryResults,
      });
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  const addToRecentSearches = (query) => {
    if (query.trim() === "") return;
    
    // Remove if already exists
    const updatedRecent = recentSearches.filter(item => item !== query);
    
    // Add to beginning
    setRecentSearches([query, ...updatedRecent.slice(0, 4)]);
    
    // In a real app, you would save this to storage
  };
  
  const removeRecentSearch = (query) => {
    setRecentSearches(recentSearches.filter(item => item !== query));
  };
  
  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    
    addToRecentSearches(searchQuery);
  };
  
  const selectRecentSearch = (query) => {
    setSearchQuery(query);
  };
  
  const renderTabs = () => {
    const tabs = [
      { id: "all", label: "All", icon: SearchIcon },
      { id: "people", label: "People", icon: User },
      { id: "brews", label: "Brews", icon: Coffee },
      { id: "memories", label: "Memories", icon: BookOpen },
    ];
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
              isDark && styles.tabDark,
              activeTab === tab.id && isDark && styles.activeTabDark,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <tab.icon
              size={16}
              color={activeTab === tab.id ? "#fff" : (isDark ? "#fff" : COLORS.text)}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
                isDark && styles.tabTextDark,
                activeTab === tab.id && isDark && styles.activeTabTextDark,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  
  const renderRecentSearches = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Clock size={18} color={isDark ? "#aaa" : COLORS.textLight} />
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Recent Searches</Text>
        </View>
        
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={() => setRecentSearches([])}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {recentSearches.length > 0 ? (
        <View style={styles.recentSearchesContainer}>
          {recentSearches.map((query, index) => (
            <View key={index} style={[styles.recentSearchItem, isDark && styles.recentSearchItemDark]}>
              <TouchableOpacity
                style={styles.recentSearchContent}
                onPress={() => selectRecentSearch(query)}
              >
                <Clock size={16} color={isDark ? "#aaa" : COLORS.textLight} />
                <Text style={[styles.recentSearchText, isDark && styles.recentSearchTextDark]}>{query}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.removeRecentButton}
                onPress={() => removeRecentSearch(query)}
              >
                <X size={16} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No recent searches</Text>
      )}
    </View>
  );
  
  const renderTrendingTopics = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <TrendingUp size={18} color={isDark ? "#aaa" : COLORS.textLight} />
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Trending Topics</Text>
        </View>
      </View>
      
      <View style={styles.trendingContainer}>
        {trendingTopics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.trendingItem, isDark && styles.trendingItemDark]}
            onPress={() => selectRecentSearch(topic)}
          >
            <Text style={[styles.trendingText, isDark && styles.trendingTextDark]}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  const renderPeopleResults = () => (
    <View style={styles.resultsSection}>
      <Text style={[styles.resultsSectionTitle, isDark && styles.resultsSectionTitleDark]}>People</Text>
      
      {searchResults.people.map(person => (
        <TouchableOpacity
          key={person.id}
          style={[styles.personItem, isDark && styles.personItemDark]}
          onPress={() => router.push(`/profile/${person.id}`)}
        >
          <Image source={{ uri: person.photo }} style={styles.personAvatar} />
          <View style={styles.personInfo}>
            <Text style={[styles.personName, isDark && styles.personNameDark]}>{person.name}</Text>
            <Text style={[styles.personBio, isDark && styles.personBioDark]} numberOfLines={1}>
              {person.bio}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      
      {searchResults.people.length === 0 && (
        <Text style={[styles.noResultsText, isDark && styles.noResultsTextDark]}>No people found</Text>
      )}
    </View>
  );
  
  const renderBrewResults = () => (
    <View style={styles.resultsSection}>
      <Text style={[styles.resultsSectionTitle, isDark && styles.resultsSectionTitleDark]}>Brews</Text>
      
      {searchResults.brews.map(brew => (
        <TouchableOpacity
          key={brew.id}
          style={[styles.brewItem, isDark && styles.brewItemDark]}
          onPress={() => router.push({
            pathname: "/brew-detail/[id]",
            params: { id: brew.id }
          })}
        >
          <Image source={{ uri: brew.image }} style={styles.brewImage} />
          <View style={styles.brewInfo}>
            <Text style={[styles.brewTitle, isDark && styles.brewTitleDark]}>{brew.title}</Text>
            <View style={styles.brewMeta}>
              <View style={styles.brewMetaItem}>
                <MapPin size={12} color={isDark ? "#aaa" : COLORS.textLight} />
                <Text style={[styles.brewMetaText, isDark && styles.brewMetaTextDark]}>{brew.location}</Text>
              </View>
              <View style={styles.brewMetaItem}>
                <Calendar size={12} color={isDark ? "#aaa" : COLORS.textLight} />
                <Text style={[styles.brewMetaText, isDark && styles.brewMetaTextDark]}>{brew.date}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      {searchResults.brews.length === 0 && (
        <Text style={[styles.noResultsText, isDark && styles.noResultsTextDark]}>No brews found</Text>
      )}
    </View>
  );
  
  const renderMemoryResults = () => (
    <View style={styles.resultsSection}>
      <Text style={[styles.resultsSectionTitle, isDark && styles.resultsSectionTitleDark]}>Memories</Text>
      
      {searchResults.memories.map(memory => (
        <TouchableOpacity
          key={memory.id}
          style={[styles.memoryItem, isDark && styles.memoryItemDark]}
          onPress={() => router.push(`/memory-diary/${memory.id}`)}
        >
          <Image source={{ uri: memory.coverImage }} style={styles.memoryImage} />
          <View style={styles.memoryInfo}>
            <Text style={[styles.memoryTitle, isDark && styles.memoryTitleDark]}>{memory.title}</Text>
            <View style={styles.memoryMeta}>
              <View style={styles.memoryMetaItem}>
                <Calendar size={12} color={isDark ? "#aaa" : COLORS.textLight} />
                <Text style={[styles.memoryMetaText, isDark && styles.memoryMetaTextDark]}>
                  {new Date(memory.date).toLocaleDateString()}
                </Text>
              </View>
              {memory.location && (
                <View style={styles.memoryMetaItem}>
                  <MapPin size={12} color={isDark ? "#aaa" : COLORS.textLight} />
                  <Text style={[styles.memoryMetaText, isDark && styles.memoryMetaTextDark]}>{memory.location}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      {searchResults.memories.length === 0 && (
        <Text style={[styles.noResultsText, isDark && styles.noResultsTextDark]}>No memories found</Text>
      )}
    </View>
  );
  
  const renderSearchResults = () => {
    const totalResults = 
      searchResults.people.length + 
      searchResults.brews.length + 
      searchResults.memories.length;
    
    if (totalResults === 0 && searchQuery.trim() !== "") {
      return (
        <View style={styles.noResultsContainer}>
          <SearchIcon size={60} color={isDark ? "#aaa" : COLORS.textLight} />
          <Text style={[styles.noResultsTitle, isDark && styles.noResultsTitleDark]}>No results found</Text>
          <Text style={[styles.noResultsSubtitle, isDark && styles.noResultsSubtitleDark]}>
            Try different keywords or check your spelling
          </Text>
        </View>
      );
    }
    
    if (activeTab === "all") {
      return (
        <>
          {searchResults.people.length > 0 && renderPeopleResults()}
          {searchResults.brews.length > 0 && renderBrewResults()}
          {searchResults.memories.length > 0 && renderMemoryResults()}
        </>
      );
    } else if (activeTab === "people") {
      return renderPeopleResults();
    } else if (activeTab === "brews") {
      return renderBrewResults();
    } else if (activeTab === "memories") {
      return renderMemoryResults();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen
        options={{
          headerTitle: "Search",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
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
        <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
          <View style={[styles.searchInputContainer, isDark && styles.searchInputContainerDark]}>
            <SearchIcon size={20} color={isDark ? "#aaa" : COLORS.textLight} />
            <TextInput
              style={[styles.searchInput, isDark && styles.searchInputDark]}
              placeholder="Search people, brews, memories..."
              placeholderTextColor={isDark ? "#aaa" : "#999"}
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={handleSearchSubmit}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <X size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {renderTabs()}
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : searchQuery.trim() === "" ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderRecentSearches()}
            {renderTrendingTopics()}
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderSearchResults()}
          </ScrollView>
        )}
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainerDark: {
    borderBottomColor: "#333",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInputContainerDark: {
    backgroundColor: "#2a2a2a",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: COLORS.text,
  },
  searchInputDark: {
    color: "#fff",
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightBg,
    marginRight: 10,
  },
  tabDark: {
    backgroundColor: "#2a2a2a",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  activeTabDark: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.text,
    fontWeight: "500",
    marginLeft: 6,
  },
  tabTextDark: {
    color: "#fff",
  },
  activeTabText: {
    color: "#fff",
  },
  activeTabTextDark: {
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 8,
  },
  sectionTitleDark: {
    color: "#fff",
  },
  clearText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  recentSearchesContainer: {
    marginTop: 8,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentSearchItemDark: {
    borderBottomColor: "#333",
  },
  recentSearchContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recentSearchText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  recentSearchTextDark: {
    color: "#fff",
  },
  removeRecentButton: {
    padding: 4,
  },
  trendingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  trendingItem: {
    backgroundColor: COLORS.lightBg,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  trendingItemDark: {
    backgroundColor: "#2a2a2a",
  },
  trendingText: {
    color: COLORS.text,
    fontWeight: "500",
  },
  trendingTextDark: {
    color: "#fff",
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 16,
  },
  emptyTextDark: {
    color: "#aaa",
  },
  resultsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultsSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },
  resultsSectionTitleDark: {
    color: "#fff",
  },
  personItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  personItemDark: {
    borderBottomColor: "#333",
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  personNameDark: {
    color: "#fff",
  },
  personBio: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  personBioDark: {
    color: "#aaa",
  },
  brewItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brewItemDark: {
    borderBottomColor: "#333",
  },
  brewImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  brewInfo: {
    flex: 1,
    justifyContent: "center",
  },
  brewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  brewTitleDark: {
    color: "#fff",
  },
  brewMeta: {
    flexDirection: "column",
  },
  brewMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  brewMetaText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  brewMetaTextDark: {
    color: "#aaa",
  },
  memoryItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  memoryItemDark: {
    borderBottomColor: "#333",
  },
  memoryImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  memoryInfo: {
    flex: 1,
    justifyContent: "center",
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  memoryTitleDark: {
    color: "#fff",
  },
  memoryMeta: {
    flexDirection: "column",
  },
  memoryMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  memoryMetaText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  memoryMetaTextDark: {
    color: "#aaa",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginTop: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsTitleDark: {
    color: "#fff",
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
  noResultsSubtitleDark: {
    color: "#aaa",
  },
  noResultsText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 8,
  },
  noResultsTextDark: {
    color: "#aaa",
  },
});
