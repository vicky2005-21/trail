import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { CHAT_PREVIEWS } from "@/mocks/chat-previews";
import {
  ArrowLeft,
  Search,
  Edit,
  CheckCheck,
  Check,
  Plus,
  Filter,
  X,
  MessageCircle,
  Users,
} from "lucide-react-native";
import { useTheme } from "@/context/theme-context";
import * as Haptics from "expo-haptics";

export default function MessagesScreen() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [chatPreviews, setChatPreviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredChats, setFilteredChats] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  
  const searchBarAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate loading chat previews
    setTimeout(() => {
      setChatPreviews(CHAT_PREVIEWS);
      setFilteredChats(CHAT_PREVIEWS);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chatPreviews);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = chatPreviews.filter(
      chat => chat.name.toLowerCase().includes(query) || 
              chat.lastMessage.toLowerCase().includes(query)
    );
    
    setFilteredChats(filtered);
  }, [searchQuery, chatPreviews]);
  
  const navigateToChat = (id) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push({
      pathname: "/chat/[id]",
      params: { id }
    });
  };
  
  const toggleSearch = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setIsSearching(!isSearching);
    
    Animated.timing(searchBarAnim, {
      toValue: isSearching ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    if (isSearching) {
      setSearchQuery("");
    }
  };
  
  const filterByTab = (tab) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setActiveTab(tab);
    
    if (tab === "all") {
      setFilteredChats(chatPreviews);
    } else if (tab === "unread") {
      setFilteredChats(chatPreviews.filter(chat => chat.unreadCount > 0));
    } else if (tab === "groups") {
      setFilteredChats(chatPreviews.filter(chat => chat.isGroup));
    }
  };
  
  const renderMessageStatus = (status) => {
    switch (status) {
      case "read":
        return <CheckCheck size={16} color={COLORS.primary} />;
      case "delivered":
        return <CheckCheck size={16} color={isDark ? "#aaa" : COLORS.textLight} />;
      case "sent":
        return <Check size={16} color={isDark ? "#aaa" : COLORS.textLight} />;
      default:
        return null;
    }
  };
  
  const renderChatItem = ({ item }) => {
    const isUnread = item.unreadCount > 0;
    
    return (
      <TouchableOpacity
        style={[styles.chatItem, isDark && styles.chatItemDark]}
        onPress={() => navigateToChat(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          {item.isGroup ? (
            <View style={styles.groupAvatarContainer}>
              <Image source={{ uri: item.groupMembers[0].avatar }} style={styles.groupAvatar1} />
              <Image source={{ uri: item.groupMembers[1].avatar }} style={styles.groupAvatar2} />
            </View>
          ) : (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          )}
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[
              styles.chatName,
              isUnread && styles.unreadText,
              isDark && styles.chatNameDark,
              isUnread && isDark && styles.unreadTextDark,
            ]}>
              {item.name}
            </Text>
            <Text style={[styles.chatTime, isDark && styles.chatTimeDark]}>
              {item.time}
            </Text>
          </View>
          
          <View style={styles.chatPreview}>
            <View style={styles.lastMessageContainer}>
              {item.lastMessageSent && renderMessageStatus(item.messageStatus)}
              <Text 
                style={[
                  styles.lastMessage,
                  item.lastMessageSent && styles.lastMessageSent,
                  isUnread && styles.unreadText,
                  isDark && styles.lastMessageDark,
                  item.lastMessageSent && isDark && styles.lastMessageSentDark,
                  isUnread && isDark && styles.unreadTextDark,
                ]}
                numberOfLines={1}
              >
                {item.lastMessageSent && "You: "}{item.lastMessage}
              </Text>
            </View>
            
            {isUnread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image 
        source={{ uri: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1770&auto=format&fit=crop" }}
        style={styles.emptyStateImage}
      />
      <Text style={[styles.emptyStateTitle, isDark && styles.emptyStateTitleDark]}>
        No messages yet
      </Text>
      <Text style={[styles.emptyStateText, isDark && styles.emptyStateTextDark]}>
        Start a conversation with friends or connect with new people
      </Text>
      <TouchableOpacity style={styles.newChatButton}>
        <Plus size={20} color="#fff" />
        <Text style={styles.newChatButtonText}>New Message</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderSearchResults = () => {
    if (filteredChats.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, isDark && styles.noResultsTextDark]}>
            No results found for "{searchQuery}"
          </Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
      />
    );
  };
  
  const renderTabs = () => (
    <View style={[styles.tabsContainer, isDark && styles.tabsContainerDark]}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "all" && styles.activeTab,
          isDark && styles.tabDark,
          activeTab === "all" && isDark && styles.activeTabDark,
        ]}
        onPress={() => filterByTab("all")}
      >
        <MessageCircle size={16} color={activeTab === "all" ? "#fff" : (isDark ? "#fff" : COLORS.text)} />
        <Text
          style={[
            styles.tabText,
            activeTab === "all" && styles.activeTabText,
            isDark && styles.tabTextDark,
            activeTab === "all" && isDark && styles.activeTabTextDark,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "unread" && styles.activeTab,
          isDark && styles.tabDark,
          activeTab === "unread" && isDark && styles.activeTabDark,
        ]}
        onPress={() => filterByTab("unread")}
      >
        <MessageCircle size={16} color={activeTab === "unread" ? "#fff" : (isDark ? "#fff" : COLORS.text)} />
        <Text
          style={[
            styles.tabText,
            activeTab === "unread" && styles.activeTabText,
            isDark && styles.tabTextDark,
            activeTab === "unread" && isDark && styles.activeTabTextDark,
          ]}
        >
          Unread
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "groups" && styles.activeTab,
          isDark && styles.tabDark,
          activeTab === "groups" && isDark && styles.activeTabDark,
        ]}
        onPress={() => filterByTab("groups")}
      >
        <Users size={16} color={activeTab === "groups" ? "#fff" : (isDark ? "#fff" : COLORS.text)} />
        <Text
          style={[
            styles.tabText,
            activeTab === "groups" && styles.activeTabText,
            isDark && styles.tabTextDark,
            activeTab === "groups" && isDark && styles.activeTabTextDark,
          ]}
        >
          Groups
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Messages",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerAction} onPress={toggleSearch}>
                {isSearching ? (
                  <X size={24} color={isDark ? "#fff" : COLORS.text} />
                ) : (
                  <Search size={24} color={isDark ? "#fff" : COLORS.text} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerAction}>
                <Filter size={24} color={isDark ? "#fff" : COLORS.text} />
              </TouchableOpacity>
            </View>
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
        {isSearching && (
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: searchBarAnim,
                transform: [
                  {
                    translateY: searchBarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={[styles.searchInputContainer, isDark && styles.searchInputContainerDark]}>
              <Search size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              <TextInput
                style={[styles.searchInput, isDark && styles.searchInputDark]}
                placeholder="Search messages..."
                placeholderTextColor={isDark ? "#aaa" : "#999"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <X size={20} color={isDark ? "#aaa" : COLORS.textLight} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}
        
        {renderTabs()}
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
              Loading messages...
            </Text>
          </View>
        ) : filteredChats.length === 0 && !isSearching ? (
          renderEmptyState()
        ) : (
          renderSearchResults()
        )}
        
        <TouchableOpacity
          style={styles.newMessageButton}
          onPress={() => router.push("/new-message")}
        >
          <Edit size={24} color="#fff" />
        </TouchableOpacity>
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
  headerActions: {
    flexDirection: "row",
  },
  headerAction: {
    marginLeft: 20,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContainerDark: {
    borderBottomColor: "#333",
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  loadingTextDark: {
    color: "#fff",
  },
  chatList: {
    padding: 16,
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chatItemDark: {
    backgroundColor: "#1e1e1e",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  groupAvatarContainer: {
    width: 56,
    height: 56,
    position: "relative",
  },
  groupAvatar1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 2,
    borderColor: "#fff",
  },
  groupAvatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#fff",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#fff",
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  chatNameDark: {
    color: "#fff",
  },
  chatTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  chatTimeDark: {
    color: "#aaa",
  },
  chatPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  lastMessageDark: {
    color: "#aaa",
  },
  lastMessageSent: {
    color: COLORS.textLight,
  },
  lastMessageSentDark: {
    color: "#aaa",
  },
  unreadText: {
    fontWeight: "600",
    color: COLORS.text,
  },
  unreadTextDark: {
    color: "#fff",
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyStateTitleDark: {
    color: "#fff",
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 32,
  },
  emptyStateTextDark: {
    color: "#aaa",
  },
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  newChatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
  noResultsTextDark: {
    color: "#aaa",
  },
  newMessageButton: {
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
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
