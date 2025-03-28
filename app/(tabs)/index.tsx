import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { POSTS } from "@/mocks/posts";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Plus, 
  Image as ImageIcon, 
  Bell,
  Search,
  Filter,
  X,
  Video
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/theme-context";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedItems, setFeedItems] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  
  const uploadOptionsAnim = useRef(new Animated.Value(0)).current;
  const commentsAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Use posts and reels combined
      const posts = POSTS.map(post => ({ ...post, type: 'post' }));
      const reels = POSTS.slice(0, 5).map(post => ({ 
        ...post, 
        id: `reel-${post.id}`,
        type: 'reel',
        views: Math.floor(Math.random() * 10000) + 1000
      }));
      
      // Combine and sort by date (newest first)
      const combined = [...posts, ...reels];
      const sortedItems = combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setFeedItems(sortedItems);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    // Simulate refreshing data
    setTimeout(() => {
      // Shuffle the feed to simulate new content
      const shuffledFeed = [...feedItems].sort(() => Math.random() - 0.5);
      setFeedItems(shuffledFeed);
      setRefreshing(false);
    }, 1500);
  }, [feedItems]);
  
  const toggleLike = (id) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const handleDoubleTap = (id) => {
    if (!likedPosts[id]) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      toggleLike(id);
    }
  };
  
  const toggleSave = (id) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSavedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  const toggleUploadOptions = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setShowUploadOptions(!showUploadOptions);
    Animated.timing(uploadOptionsAnim, {
      toValue: showUploadOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const toggleComments = (postId) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setActivePostId(postId);
    setShowComments(!showComments);
    Animated.timing(commentsAnim, {
      toValue: showComments ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (showComments) {
        setActivePostId(null);
      }
    });
  };
  
  const submitComment = () => {
    if (commentText.trim() === "") return;
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // In a real app, you would send this to an API
    console.log(`Comment on post ${activePostId}: ${commentText}`);
    
    // Update the post's comment count
    setFeedItems(prev => 
      prev.map(item => 
        item.id === activePostId 
          ? { ...item, comments: item.comments + 1 } 
          : item
      )
    );
    
    setCommentText("");
    toggleComments(activePostId);
  };
  
  const navigateToProfile = (userId) => {
    router.push({
      pathname: "/profile/[id]",
      params: { id: userId }
    });
  };

  const navigateToMessages = () => {
    router.push("/messages");
  };

  const navigateToNotifications = () => {
    router.push("/notifications");
  };
  
  const navigateToSearch = () => {
    router.push("/search");
  };
  
  const renderFeedItem = ({ item }) => {
    const isReel = item.type === 'reel';
    
    return (
      <View style={[styles.postContainer, isDark && styles.postContainerDark]}>
        <TouchableOpacity 
          style={styles.postHeader}
          onPress={() => navigateToProfile(item.userId)}
        >
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
          <View>
            <Text style={[styles.userName, isDark && styles.userNameDark]}>{item.userName}</Text>
            <Text style={[styles.postLocation, isDark && styles.postLocationDark]}>{item.location}</Text>
          </View>
          {isReel && (
            <View style={styles.reelBadge}>
              <Text style={styles.reelBadgeText}>Reel</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          activeOpacity={0.9}
          delayLongPress={200}
          onPress={() => {}}
          onLongPress={() => handleDoubleTap(item.id)}
          onDoubleTap={() => handleDoubleTap(item.id)}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        </TouchableOpacity>
        
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Heart 
                size={24} 
                color={likedPosts[item.id] ? COLORS.secondary : (isDark ? "#fff" : COLORS.text)} 
                fill={likedPosts[item.id] ? COLORS.secondary : "transparent"} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => toggleComments(item.id)}
            >
              <MessageCircle size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Send size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => toggleSave(item.id)}>
            <Bookmark 
              size={24} 
              color={isDark ? "#fff" : COLORS.text} 
              fill={savedPosts[item.id] ? (isDark ? "#fff" : COLORS.text) : "transparent"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.postContent}>
          <Text style={[styles.likesCount, isDark && styles.likesCountDark]}>
            {item.likes + (likedPosts[item.id] ? 1 : 0)} likes
          </Text>
          <Text style={[styles.postCaption, isDark && styles.postCaptionDark]}>
            <Text style={[styles.userName, isDark && styles.userNameDark]}>{item.userName}</Text> {item.caption}
          </Text>
          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Text style={[styles.commentsCount, isDark && styles.commentsCountDark]}>
              View all {item.comments} comments
            </Text>
          </TouchableOpacity>
          <Text style={[styles.postTime, isDark && styles.postTimeDark]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>BREW</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerAction}
            onPress={navigateToSearch}
          >
            <Search size={24} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerAction}
            onPress={navigateToMessages}
          >
            <MessageCircle size={24} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerAction}
            onPress={navigateToNotifications}
          >
            <Bell size={24} color={isDark ? "#fff" : COLORS.text} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>Loading your feed...</Text>
        </View>
      ) : (
        <FlatList
          data={feedItems}
          renderItem={renderFeedItem}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}

      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={toggleUploadOptions}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>

        {showUploadOptions && (
          <View style={styles.uploadOptions}>
            <Animated.View
              style={[
                styles.uploadOption,
                {
                  transform: [
                    {
                      translateY: uploadOptionsAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                  opacity: uploadOptionsAnim,
                },
              ]}
            >
              <TouchableOpacity 
                style={styles.uploadOptionButton}
                onPress={() => {
                  setShowUploadOptions(false);
                  router.push("/create-post");
                }}
              >
                <ImageIcon size={20} color="#fff" />
                <Text style={styles.uploadOptionText}>Post</Text>
              </TouchableOpacity>
            </Animated.View>
            
            <Animated.View
              style={[
                styles.uploadOption,
                {
                  transform: [
                    {
                      translateY: uploadOptionsAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                  opacity: uploadOptionsAnim,
                },
              ]}
            >
              <TouchableOpacity 
                style={styles.uploadOptionButton}
                onPress={() => {
                  setShowUploadOptions(false);
                  router.push("/create-memory");
                }}
              >
                <ImageIcon size={20} color="#fff" />
                <Text style={styles.uploadOptionText}>Memory</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
      
      {showComments && (
        <Animated.View
          style={[
            styles.commentsOverlay,
            {
              opacity: commentsAnim,
              transform: [
                {
                  translateY: commentsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.commentsContainer, isDark && styles.commentsContainerDark]}>
            <View style={styles.commentsHeader}>
              <Text style={[styles.commentsTitle, isDark && styles.commentsTitleDark]}>Comments</Text>
              <TouchableOpacity onPress={() => toggleComments(activePostId)}>
                <X size={24} color={isDark ? "#fff" : COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.commentsList}>
              <Text style={[styles.noCommentsText, isDark && styles.noCommentsTextDark]}>
                Be the first to comment!
              </Text>
            </View>
            
            <View style={[styles.commentInputContainer, isDark && styles.commentInputContainerDark]}>
              <TextInput
                style={[styles.commentInput, isDark && styles.commentInputDark]}
                placeholder="Add a comment..."
                placeholderTextColor={isDark ? "#aaa" : "#999"}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity 
                style={[
                  styles.commentSubmitButton,
                  commentText.trim() === "" && styles.commentSubmitButtonDisabled
                ]}
                onPress={submitComment}
                disabled={commentText.trim() === ""}
              >
                <Send size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerDark: {
    borderBottomColor: "#333",
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
  headerActions: {
    flexDirection: "row",
    position: "absolute",
    right: 16,
    top: 14,
  },
  headerAction: {
    marginLeft: 20,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.secondary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
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
  postContainer: {
    marginBottom: 16,
  },
  postContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.text,
  },
  userNameDark: {
    color: "#fff",
  },
  postLocation: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  postLocationDark: {
    color: "#aaa",
  },
  reelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  reelBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: width,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  leftActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
  },
  postContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  likesCount: {
    fontWeight: "600",
    marginBottom: 6,
    color: COLORS.text,
  },
  likesCountDark: {
    color: "#fff",
  },
  postCaption: {
    marginBottom: 6,
    color: COLORS.text,
  },
  postCaptionDark: {
    color: "#eee",
  },
  commentsCount: {
    color: COLORS.textLight,
    marginBottom: 4,
  },
  commentsCountDark: {
    color: "#aaa",
  },
  postTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  postTimeDark: {
    color: "#888",
  },
  uploadContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 10,
  },
  uploadButton: {
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
  uploadOptions: {
    position: "absolute",
    bottom: 70,
    right: 0,
    width: 100,
  },
  uploadOption: {
    marginBottom: 10,
  },
  uploadOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  uploadOptionText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "500",
  },
  commentsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 20,
  },
  commentsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  commentsContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  commentsTitleDark: {
    color: "#fff",
  },
  commentsList: {
    padding: 16,
    minHeight: 200,
  },
  noCommentsText: {
    textAlign: "center",
    color: COLORS.textLight,
    marginTop: 40,
  },
  noCommentsTextDark: {
    color: "#aaa",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentInputContainerDark: {
    borderTopColor: "#333",
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
  },
  commentInputDark: {
    backgroundColor: "#333",
    color: "#fff",
  },
  commentSubmitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  commentSubmitButtonDisabled: {
    backgroundColor: COLORS.primary + "80",
  },
});
