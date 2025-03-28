import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { NOTIFICATIONS } from "@/mocks/notifications";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  UserPlus,
  Calendar,
  Coffee,
  Bell,
  BellOff,
  Check,
  Trash2,
} from "lucide-react-native";
import { useTheme } from "@/context/theme-context";

export default function NotificationsScreen() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  
  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications(NOTIFICATIONS);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const filterNotifications = (tab) => {
    setSelectedTab(tab);
  };
  
  const getFilteredNotifications = () => {
    if (selectedTab === "all") {
      return notifications;
    }
    return notifications.filter(notification => notification.type === selectedTab);
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true,
      }))
    );
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={20} color="#E91E63" />;
      case "comment":
        return <MessageCircle size={20} color="#2196F3" />;
      case "follow":
        return <UserPlus size={20} color="#4CAF50" />;
      case "event":
        return <Calendar size={20} color="#FF9800" />;
      case "brew":
        return <Coffee size={20} color="#795548" />;
      default:
        return <Bell size={20} color={COLORS.primary} />;
    }
  };
  
  const navigateToNotificationSource = (notification) => {
    // In a real app, you would navigate to the appropriate screen based on the notification type
    switch (notification.type) {
      case "like":
      case "comment":
        router.push(`/post/${notification.sourceId}`);
        break;
      case "follow":
        router.push(`/profile/${notification.sourceId}`);
        break;
      case "event":
        router.push(`/event/${notification.sourceId}`);
        break;
      case "brew":
        router.push({
          pathname: "/brew-detail/[id]",
          params: { id: notification.sourceId }
        });
        break;
      default:
        break;
    }
    
    // Mark this notification as read
    setNotifications(
      notifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };
  
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
        isDark && styles.notificationItemDark,
        !item.read && isDark && styles.unreadNotificationDark,
      ]}
      onPress={() => navigateToNotificationSource(item)}
    >
      <View style={styles.notificationIconContainer}>
        {getNotificationIcon(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
          <View style={styles.notificationInfo}>
            <Text style={[
              styles.notificationText,
              !item.read && styles.unreadText,
              isDark && styles.notificationTextDark,
              !item.read && isDark && styles.unreadTextDark,
            ]}>
              <Text style={styles.userName}>{item.userName}</Text> {item.text}
            </Text>
            <Text style={[styles.notificationTime, isDark && styles.notificationTimeDark]}>
              {item.time}
            </Text>
          </View>
        </View>
        
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.notificationImage} />
        )}
      </View>
    </TouchableOpacity>
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <BellOff size={60} color={isDark ? "#aaa" : COLORS.textLight} />
      <Text style={[styles.emptyStateTitle, isDark && styles.emptyStateTitleDark]}>
        No notifications
      </Text>
      <Text style={[styles.emptyStateText, isDark && styles.emptyStateTextDark]}>
        You're all caught up! Check back later for new notifications.
      </Text>
    </View>
  );
  
  const renderTabs = () => {
    const tabs = [
      { id: "all", label: "All" },
      { id: "like", label: "Likes" },
      { id: "comment", label: "Comments" },
      { id: "follow", label: "Follows" },
      { id: "brew", label: "Brews" },
    ];
    
    return (
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === item.id && styles.activeTab,
                isDark && styles.tabDark,
                selectedTab === item.id && isDark && styles.activeTabDark,
              ]}
              onPress={() => filterNotifications(item.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === item.id && styles.activeTabText,
                  isDark && styles.tabTextDark,
                  selectedTab === item.id && isDark && styles.activeTabTextDark,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tabsList}
        />
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, isDark && styles.actionButtonDark]}
            onPress={markAllAsRead}
          >
            <Check size={16} color={isDark ? "#fff" : COLORS.text} />
            <Text style={[styles.actionButtonText, isDark && styles.actionButtonTextDark]}>
              Mark all read
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, isDark && styles.actionButtonDark]}
            onPress={clearAllNotifications}
          >
            <Trash2 size={16} color={isDark ? "#fff" : COLORS.text} />
            <Text style={[styles.actionButtonText, isDark && styles.actionButtonTextDark]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Notifications",
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
              Loading notifications...
            </Text>
          </View>
        ) : (
          <>
            {renderTabs()}
            
            {getFilteredNotifications().length === 0 ? (
              renderEmptyState()
            ) : (
              <FlatList
                data={getFilteredNotifications()}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.notificationsList}
              />
            )}
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightBg,
    marginRight: 8,
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
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.lightBg,
  },
  actionButtonDark: {
    backgroundColor: "#2a2a2a",
  },
  actionButtonText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
  },
  actionButtonTextDark: {
    color: "#fff",
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
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
  notificationItemDark: {
    backgroundColor: "#1e1e1e",
  },
  unreadNotification: {
    backgroundColor: "rgba(94, 96, 206, 0.05)",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  unreadNotificationDark: {
    backgroundColor: "rgba(94, 96, 206, 0.1)",
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  notificationTextDark: {
    color: "#fff",
  },
  unreadText: {
    fontWeight: "600",
  },
  unreadTextDark: {
    fontWeight: "600",
  },
  userName: {
    fontWeight: "600",
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  notificationTimeDark: {
    color: "#aaa",
  },
  notificationImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 8,
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
  },
  emptyStateTextDark: {
    color: "#aaa",
  },
});
