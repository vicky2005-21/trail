import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { MEMORIES } from "@/mocks/memories";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Heart,
  Share2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Edit,
  Bookmark,
  MessageCircle,
  Tag,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = width * 0.8;

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [memory, setMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundMemory = MEMORIES.find((m) => m.id.toString() === id);
      setMemory(foundMemory);
      setIsLoading(false);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, [id]);

  const handleLike = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Share functionality would go here
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const navigateToEdit = () => {
    // Navigate to edit screen
    router.push({
      pathname: "/edit-memory",
      params: { id: memory.id },
    });
  };

  const handleImageChange = (index) => {
    if (currentImageIndex !== index) {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setCurrentImageIndex(index);
    }
  };

  const renderImageGallery = () => (
    <View style={styles.galleryContainer}>
      <FlatList
        data={memory.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.galleryImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / width
          );
          handleImageChange(newIndex);
        }}
        initialScrollIndex={currentImageIndex}
        getItemLayout={(data, index) => ({
          length: IMAGE_WIDTH,
          offset: IMAGE_WIDTH * index,
          index,
        })}
      />

      <View style={styles.paginationContainer}>
        {memory.images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === currentImageIndex && styles.paginationDotActive,
            ]}
            onPress={() => handleImageChange(index)}
          />
        ))}
      </View>

      {currentImageIndex > 0 && (
        <TouchableOpacity
          style={[styles.galleryNavButton, styles.galleryNavButtonLeft]}
          onPress={() => handleImageChange(currentImageIndex - 1)}
        >
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {currentImageIndex < memory.images.length - 1 && (
        <TouchableOpacity
          style={[styles.galleryNavButton, styles.galleryNavButtonRight]}
          onPress={() => handleImageChange(currentImageIndex + 1)}
        >
          <ChevronRight size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading || !memory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading memory...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerActionButton}
              onPress={handleLike}
            >
              <Heart
                size={24}
                color="#fff"
                fill={isLiked ? "#E91E63" : "transparent"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerActionButton}
              onPress={handleBookmark}
            >
              <Bookmark
                size={24}
                color="#fff"
                fill={isBookmarked ? "#fff" : "transparent"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerActionButton}
              onPress={handleShare}
            >
              <Share2 size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerActionButton}
              onPress={() => {}}
            >
              <MoreVertical size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: memory.coverImage }}
              style={styles.coverImage}
            />
            <LinearGradient
              colors={[
                "rgba(0,0,0,0.6)",
                "transparent",
                "transparent",
                "rgba(0,0,0,0.6)",
              ]}
              style={styles.coverGradient}
            />
          </View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>{memory.title}</Text>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Calendar size={16} color={COLORS.textLight} />
                <Text style={styles.metaText}>
                  {new Date(memory.date).toLocaleDateString()}
                </Text>
              </View>

              {memory.location && (
                <View style={styles.metaItem}>
                  <MapPin size={16} color={COLORS.textLight} />
                  <Text style={styles.metaText}>{memory.location}</Text>
                </View>
              )}
            </View>

            {memory.description && (
              <Text style={styles.description}>{memory.description}</Text>
            )}

            {memory.tags && memory.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                <View style={styles.tagsSectionHeader}>
                  <Tag size={16} color={COLORS.textLight} />
                  <Text style={styles.tagsSectionTitle}>Tags</Text>
                </View>
                <View style={styles.tagsList}>
                  {memory.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Photos</Text>
                <Text style={styles.sectionCount}>{memory.images.length}</Text>
              </View>

              {renderImageGallery()}
            </View>

            {memory.videos && memory.videos.length > 0 && (
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Videos</Text>
                  <Text style={styles.sectionCount}>
                    {memory.videos.length}
                  </Text>
                </View>

                {/* Video gallery would go here */}
              </View>
            )}

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Heart
                  size={24}
                  color={COLORS.text}
                  fill={isLiked ? COLORS.secondary : "transparent"}
                />
                <Text style={styles.actionButtonText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={24} color={COLORS.text} />
                <Text style={styles.actionButtonText}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleBookmark}
              >
                <Bookmark
                  size={24}
                  color={COLORS.text}
                  fill={isBookmarked ? COLORS.text : "transparent"}
                />
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={COLORS.text} />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>

        <TouchableOpacity style={styles.editButton} onPress={navigateToEdit}>
          <Edit size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Memory</Text>
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  coverImageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagsSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tagsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 6,
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: COLORS.lightBg,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.text,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  sectionCount: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  galleryContainer: {
    position: "relative",
  },
  galleryImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 12,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: COLORS.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  galleryNavButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryNavButtonLeft: {
    left: 16,
  },
  galleryNavButtonRight: {
    right: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 16,
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  },
  editButton: {
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
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
