import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView as RNSafeAreaView,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { PROFILES } from "@/mocks/profiles";
import { 
  X, 
  Heart, 
  MessageCircle, 
  Star, 
  Sparkles,
  MapPin,
  Camera,
  Users,
  Gamepad2,
  Coffee,
  Zap,
  UserRound,
  ChevronRight,
  Smile,
  Frown,
  Meh,
  ArrowRight,
  Check
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTheme } from "@/context/theme-context";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

export default function ConnectScreen() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("swipe");
  const [profiles, setProfiles] = useState(PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showARView, setShowARView] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showRelationshipPrompt, setShowRelationshipPrompt] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [showGameMenu, setShowGameMenu] = useState(false);
  
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  
  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  
  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  
  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.9, 1],
    extrapolate: "clamp",
  });

  // Animation for AR view
  const arViewAnimation = useRef(new Animated.Value(0)).current;
  const matchAnimation = useRef(new Animated.Value(0)).current;
  const relationshipAnimation = useRef(new Animated.Value(0)).current;
  const gameMenuAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate requesting camera permission
    const requestCameraPermission = async () => {
      // In a real app, you would use expo-camera's requestPermissionsAsync
      // For now, we'll just simulate it
      setTimeout(() => {
        setCameraPermission('granted');
      }, 1000);
    };
    
    requestCameraPermission();
  }, []);

  const toggleARView = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setShowARView(!showARView);
    Animated.timing(arViewAnimation, {
      toValue: showARView ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          swipeRight();
        } else if (gesture.dx < -120) {
          swipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  
  const swipeLeft = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    Animated.timing(position, {
      toValue: { x: -width, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };
  
  const swipeRight = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    Animated.timing(position, {
      toValue: { x: width, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Show match animation here
      if (Math.random() > 0.5) { // 50% chance of match for demo
        showMatch(profiles[currentIndex]);
      } else {
        setCurrentIndex(currentIndex + 1);
        position.setValue({ x: 0, y: 0 });
      }
    });
  };

  const showMatch = (profile) => {
    setMatchedProfile(profile);
    setShowMatchModal(true);
    
    // Animate match modal
    matchAnimation.setValue(0);
    Animated.timing(matchAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeMatch = () => {
    Animated.timing(matchAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMatchModal(false);
      setShowRelationshipPrompt(true);
      
      // Animate relationship prompt
      relationshipAnimation.setValue(0);
      Animated.timing(relationshipAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const selectRelationship = (type) => {
    setSelectedRelationship(type);
    
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // Close relationship prompt and proceed
    Animated.timing(relationshipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowRelationshipPrompt(false);
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
      
      // Navigate to chat with the matched profile
      setTimeout(() => {
        router.push({
          pathname: "/chat/[id]",
          params: { id: matchedProfile.id }
        });
      }, 500);
    });
  };

  const toggleGameMenu = () => {
    setShowGameMenu(!showGameMenu);
    
    Animated.timing(gameMenuAnimation, {
      toValue: showGameMenu ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const renderSwipeCards = () => {
    if (currentIndex >= profiles.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={[styles.noMoreCardsText, isDark && styles.noMoreCardsTextDark]}>No more profiles</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.cardsContainer}>
        {profiles
          .slice(currentIndex, currentIndex + 2)
          .reverse()
          .map((profile, index) => {
            const isFirstCard = index === 1;
            const isSecondCard = index === 0;
            
            const cardStyle = isFirstCard
              ? {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate },
                  ],
                }
              : { transform: [{ scale: nextCardScale }] };
            
            return (
              <Animated.View
                key={profile.id}
                style={[styles.card, cardStyle]}
                {...(isFirstCard ? panResponder.panHandlers : {})}
              >
                <Image source={{ uri: profile.photos[0] }} style={styles.cardImage} />
                
                {isFirstCard && (
                  <Animated.View
                    style={[
                      styles.likeLabel,
                      { opacity: likeOpacity },
                    ]}
                  >
                    <Text style={styles.likeLabelText}>LIKE</Text>
                  </Animated.View>
                )}
                
                {isFirstCard && (
                  <Animated.View
                    style={[
                      styles.nopeLabel,
                      { opacity: nopeOpacity },
                    ]}
                  >
                    <Text style={styles.nopeLabelText}>NOPE</Text>
                  </Animated.View>
                )}
                
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>
                      {profile.name}, {profile.age}
                    </Text>
                    <Text style={styles.cardBio}>{profile.bio}</Text>
                    
                    <View style={styles.interestsContainer}>
                      {profile.interests.map((interest, i) => (
                        <View key={i} style={styles.interestTag}>
                          <Text style={styles.interestText}>{interest}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Compatibility score */}
                    <View style={styles.compatibilityContainer}>
                      <Sparkles size={16} color="#FFD700" />
                      <Text style={styles.compatibilityText}>
                        {Math.floor(70 + Math.random() * 25)}% Compatible
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>
            );
          })}
      </View>
    );
  };
  
  const renderActionButtons = () => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.nopeButton]}
          onPress={swipeLeft}
        >
          <X size={30} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={() => {
            if (Platform.OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          }}
        >
          <Star size={30} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={swipeRight}
        >
          <Heart size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderSuggestedMatch = ({ item }) => (
    <TouchableOpacity 
      style={[styles.suggestedCard, isDark && styles.suggestedCardDark]}
      onPress={() => router.push("/chat/[id]", { id: item.id })}
    >
      <View style={styles.suggestedImageContainer}>
        <Image source={{ uri: item.photos[0] }} style={styles.suggestedImage} />
        <View style={styles.aiMatchBadge}>
          <Sparkles size={12} color="#fff" />
          <Text style={styles.aiMatchText}>95% Match</Text>
        </View>
      </View>
      <Text style={[styles.suggestedName, isDark && styles.suggestedNameDark]}>{item.name}, {item.age}</Text>
      <Text style={[styles.suggestedBio, isDark && styles.suggestedBioDark]} numberOfLines={2}>
        {item.bio}
      </Text>
      <View style={styles.suggestedInterests}>
        {item.interests.slice(0, 2).map((interest, i) => (
          <View key={i} style={[styles.suggestedInterestTag, isDark && styles.suggestedInterestTagDark]}>
            <Text style={[styles.suggestedInterestText, isDark && styles.suggestedInterestTextDark]}>{interest}</Text>
          </View>
        ))}
        {item.interests.length > 2 && (
          <Text style={[styles.moreInterests, isDark && styles.moreInterestsDark]}>+{item.interests.length - 2}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.connectButton}>
        <MessageCircle size={16} color="#fff" />
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderARView = () => (
    <Animated.View 
      style={[
        styles.arViewContainer,
        {
          opacity: arViewAnimation,
          transform: [
            {
              translateY: arViewAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        }
      ]}
    >
      <RNSafeAreaView style={{ flex: 1 }}>
        <View style={styles.arHeader}>
          <TouchableOpacity 
            style={styles.arCloseButton}
            onPress={toggleARView}
          >
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.arTitle}>AR Connect</Text>
        </View>
        
        <View style={styles.cameraContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1769&auto=format&fit=crop" }}
            style={styles.cameraPreview}
          />
          
          {/* AR Markers for nearby users */}
          {PROFILES.slice(0, 3).map((profile, index) => (
            <View 
              key={profile.id}
              style={[
                styles.arMarker,
                {
                  top: 100 + (index * 120) % 300,
                  left: 50 + (index * 70) % 250,
                },
              ]}
            >
              <View style={styles.arMarkerInner}>
                <Image source={{ uri: profile.photos[0] }} style={styles.arMarkerImage} />
              </View>
              <View style={styles.arMarkerInfo}>
                <Text style={styles.arMarkerName}>{profile.name}, {profile.age}</Text>
                <View style={styles.arMarkerDistance}>
                  <MapPin size={12} color="#fff" />
                  <Text style={styles.arMarkerDistanceText}>
                    {Math.floor(Math.random() * 500) + 50}m away
                  </Text>
                </View>
              </View>
            </View>
          ))}
          
          <View style={styles.arOverlay}>
            <Text style={styles.arOverlayText}>
              Look around to see nearby connections
            </Text>
          </View>
        </View>
      </RNSafeAreaView>
    </Animated.View>
  );

  const renderMatchModal = () => (
    <Modal
      visible={showMatchModal}
      transparent={true}
      animationType="none"
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.matchContainer,
            {
              opacity: matchAnimation,
              transform: [
                {
                  scale: matchAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1.1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={["#7C4DFF", "#448AFF"]}
            style={styles.matchGradient}
          >
            <Sparkles size={40} color="#fff" style={styles.matchIcon} />
            <Text style={styles.matchTitle}>It's a Match!</Text>
            <Text style={styles.matchSubtitle}>You and {matchedProfile?.name} liked each other</Text>
            
            <View style={styles.matchProfiles}>
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" }} 
                style={styles.matchProfileImage}
              />
              <Image 
                source={{ uri: matchedProfile?.photos[0] }} 
                style={styles.matchProfileImage}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.matchMessageButton}
              onPress={closeMatch}
            >
              <MessageCircle size={20} color="#fff" />
              <Text style={styles.matchMessageText}>Send a Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.matchContinueButton}
              onPress={closeMatch}
            >
              <Text style={styles.matchContinueText}>Continue Swiping</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );

  const renderRelationshipPrompt = () => (
    <Modal
      visible={showRelationshipPrompt}
      transparent={true}
      animationType="none"
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.relationshipContainer,
            {
              opacity: relationshipAnimation,
              transform: [
                {
                  translateY: relationshipAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.relationshipContent, isDark && styles.relationshipContentDark]}>
            <Text style={[styles.relationshipTitle, isDark && styles.relationshipTitleDark]}>
              What are you looking for with {matchedProfile?.name}?
            </Text>
            
            <TouchableOpacity 
              style={[styles.relationshipOption, isDark && styles.relationshipOptionDark]}
              onPress={() => selectRelationship("friendship")}
            >
              <View style={[styles.relationshipIcon, { backgroundColor: "#4CAF50" }]}>
                <UserRound size={24} color="#fff" />
              </View>
              <View style={styles.relationshipOptionContent}>
                <Text style={[styles.relationshipOptionTitle, isDark && styles.relationshipOptionTitleDark]}>
                  Friendship
                </Text>
                <Text style={[styles.relationshipOptionDesc, isDark && styles.relationshipOptionDescDark]}>
                  Looking to make new friends
                </Text>
              </View>
              <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.relationshipOption, isDark && styles.relationshipOptionDark]}
              onPress={() => selectRelationship("romantic")}
            >
              <View style={[styles.relationshipIcon, { backgroundColor: "#E91E63" }]}>
                <Heart size={24} color="#fff" />
              </View>
              <View style={styles.relationshipOptionContent}>
                <Text style={[styles.relationshipOptionTitle, isDark && styles.relationshipOptionTitleDark]}>
                  Romantic
                </Text>
                <Text style={[styles.relationshipOptionDesc, isDark && styles.relationshipOptionDescDark]}>
                  Interested in dating and romance
                </Text>
              </View>
              <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.relationshipOption, isDark && styles.relationshipOptionDark]}
              onPress={() => selectRelationship("casual")}
            >
              <View style={[styles.relationshipIcon, { backgroundColor: "#FF9800" }]}>
                <Coffee size={24} color="#fff" />
              </View>
              <View style={styles.relationshipOptionContent}>
                <Text style={[styles.relationshipOptionTitle, isDark && styles.relationshipOptionTitleDark]}>
                  Casual
                </Text>
                <Text style={[styles.relationshipOptionDesc, isDark && styles.relationshipOptionDescDark]}>
                  Just keeping it casual
                </Text>
              </View>
              <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.relationshipSkip, isDark && styles.relationshipSkipDark]}
              onPress={() => selectRelationship("undecided")}
            >
              <Text style={[styles.relationshipSkipText, isDark && styles.relationshipSkipTextDark]}>
                I'll decide later
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const renderGameMenu = () => (
    <Modal
      visible={showGameMenu}
      transparent={true}
      animationType="none"
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.gameMenuContainer,
            {
              opacity: gameMenuAnimation,
              transform: [
                {
                  translateY: gameMenuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.gameMenuContent, isDark && styles.gameMenuContentDark]}>
            <View style={styles.gameMenuHeader}>
              <Text style={[styles.gameMenuTitle, isDark && styles.gameMenuTitleDark]}>
                Interactive Games
              </Text>
              <TouchableOpacity onPress={toggleGameMenu}>
                <X size={24} color={isDark ? "#fff" : COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.gamesList}>
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/compatibility-quiz");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#E91E63" }]}>
                  <Sparkles size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Compatibility Quiz
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Discover how compatible you are with your matches
                  </Text>
                </View>
                <ArrowRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/truth-or-dare");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#9C27B0" }]}>
                  <Smile size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Truth or Dare
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Fun questions and dares to break the ice
                  </Text>
                </View>
                <ArrowRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/trivia");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#2196F3" }]}>
                  <Zap size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Trivia Challenge
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Test your knowledge together
                  </Text>
                </View>
                <ArrowRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/tic-tac-toe");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#4CAF50" }]}>
                  <Gamepad2 size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Tic-Tac-Toe
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Classic game to play with your match
                  </Text>
                </View>
                <ArrowRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/chess");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#FF9800" }]}>
                  <Gamepad2 size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Chess
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Strategic board game for two players
                  </Text>
                </View>
                <ArrowRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Connect</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "swipe" && styles.activeTab]}
            onPress={() => setActiveTab("swipe")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "swipe" && styles.activeTabText,
                isDark && styles.tabTextDark,
              ]}
            >
              Swipe Match
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "suggested" && styles.activeTab]}
            onPress={() => setActiveTab("suggested")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "suggested" && styles.activeTabText,
                isDark && styles.tabTextDark,
              ]}
            >
              AI Suggested
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "swipe" ? (
        <View style={styles.swipeContainer}>
          {renderSwipeCards()}
          {currentIndex < profiles.length && renderActionButtons()}
        </View>
      ) : (
        <View style={styles.suggestedContainer}>
          <View style={[styles.aiInfoBanner, isDark && styles.aiInfoBannerDark]}>
            <Sparkles size={16} color={COLORS.primary} />
            <Text style={[styles.aiInfoText, isDark && styles.aiInfoTextDark]}>
              Matches suggested based on your interests and preferences
            </Text>
          </View>
          <FlatList
            data={PROFILES}
            renderItem={renderSuggestedMatch}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.suggestedRow}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.suggestedList}
          />
        </View>
      )}

      <View style={styles.floatingButtonsContainer}>
        {!showARView && (
          <TouchableOpacity 
            style={styles.arButton}
            onPress={toggleARView}
          >
            <Camera size={24} color="#fff" />
            <Text style={styles.arButtonText}>AR View</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.gameButton}
          onPress={toggleGameMenu}
        >
          <Gamepad2 size={24} color="#fff" />
          <Text style={styles.gameButtonText}>Games</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.groupButton}
          onPress={() => router.push("/group-chats")}
        >
          <Users size={24} color="#fff" />
          <Text style={styles.groupButtonText}>Groups</Text>
        </TouchableOpacity>
      </View>

      {showARView && renderARView()}
      {renderMatchModal()}
      {renderRelationshipPrompt()}
      {renderGameMenu()}
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
    marginBottom: 16,
  },
  headerTitleDark: {
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textLight,
  },
  tabTextDark: {
    color: "#aaa",
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  swipeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: "flex-end",
    padding: 20,
  },
  cardInfo: {
    width: "100%",
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardBio: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  compatibilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  compatibilityText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  likeLabel: {
    position: "absolute",
    top: 50,
    right: 40,
    transform: [{ rotate: "30deg" }],
    zIndex: 10,
    borderWidth: 4,
    borderColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  likeLabelText: {
    color: COLORS.secondary,
    fontSize: 32,
    fontWeight: "bold",
  },
  nopeLabel: {
    position: "absolute",
    top: 50,
    left: 40,
    transform: [{ rotate: "-30deg" }],
    zIndex: 10,
    borderWidth: 4,
    borderColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  nopeLabelText: {
    color: COLORS.error,
    fontSize: 32,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  nopeButton: {
    backgroundColor: COLORS.error,
  },
  superLikeButton: {
    backgroundColor: COLORS.primary,
  },
  likeButton: {
    backgroundColor: COLORS.secondary,
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  noMoreCardsTextDark: {
    color: "#fff",
  },
  refreshButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  suggestedContainer: {
    flex: 1,
  },
  aiInfoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
  },
  aiInfoBannerDark: {
    backgroundColor: "#2a2a2a",
  },
  aiInfoText: {
    color: COLORS.text,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  aiInfoTextDark: {
    color: "#fff",
  },
  suggestedList: {
    padding: 10,
    paddingBottom: 80, // Extra padding for the AR button
  },
  suggestedRow: {
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  suggestedCard: {
    width: width / 2 - 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestedCardDark: {
    backgroundColor: "#2a2a2a",
  },
  suggestedImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  suggestedImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  aiMatchBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  aiMatchText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 4,
  },
  suggestedName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  suggestedNameDark: {
    color: "#fff",
  },
  suggestedBio: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
    height: 32,
  },
  suggestedBioDark: {
    color: "#aaa",
  },
  suggestedInterests: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  suggestedInterestTag: {
    backgroundColor: COLORS.lightBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  suggestedInterestTagDark: {
    backgroundColor: "#333",
  },
  suggestedInterestText: {
    color: COLORS.text,
    fontSize: 10,
  },
  suggestedInterestTextDark: {
    color: "#fff",
  },
  moreInterests: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  moreInterestsDark: {
    color: "#aaa",
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    flexDirection: "row",
    zIndex: 10,
  },
  arButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 10,
  },
  arButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  gameButton: {
    backgroundColor: "#9C27B0",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 10,
  },
  gameButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  groupButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  groupButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  arViewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 100,
  },
  arHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  arCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  arTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  cameraPreview: {
    width: "100%",
    height: "100%",
  },
  arMarker: {
    position: "absolute",
    alignItems: "center",
  },
  arMarkerInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  arMarkerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  arMarkerInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
    minWidth: 120,
  },
  arMarkerName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  arMarkerDistance: {
    flexDirection: "row",
    alignItems: "center",
  },
  arMarkerDistanceText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  arOverlay: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  arOverlayText: {
    color: "#fff",
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  matchContainer: {
    width: width * 0.85,
    borderRadius: 20,
    overflow: "hidden",
  },
  matchGradient: {
    padding: 24,
    alignItems: "center",
  },
  matchIcon: {
    marginBottom: 16,
  },
  matchTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  matchSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 24,
  },
  matchProfiles: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  matchProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginHorizontal: 10,
  },
  matchMessageButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
    marginBottom: 12,
  },
  matchMessageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  matchContinueButton: {
    paddingVertical: 12,
  },
  matchContinueText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
  },
  relationshipContainer: {
    width: width * 0.9,
    borderRadius: 20,
    overflow: "hidden",
  },
  relationshipContent: {
    backgroundColor: "#fff",
    padding: 24,
  },
  relationshipContentDark: {
    backgroundColor: "#1e1e1e",
  },
  relationshipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
  },
  relationshipTitleDark: {
    color: "#fff",
  },
  relationshipOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  relationshipOptionDark: {
    backgroundColor: "#2a2a2a",
  },
  relationshipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  relationshipOptionContent: {
    flex: 1,
  },
  relationshipOptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  relationshipOptionTitleDark: {
    color: "#fff",
  },
  relationshipOptionDesc: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  relationshipOptionDescDark: {
    color: "#aaa",
  },
  relationshipSkip: {
    alignItems: "center",
    paddingVertical: 16,
  },
  relationshipSkipDark: {
    backgroundColor: "#1e1e1e",
  },
  relationshipSkipText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  relationshipSkipTextDark: {
    color: "#aaa",
  },
  gameMenuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  gameMenuContent: {
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingBottom: 30,
    height: height * 0.7,
  },
  gameMenuContentDark: {
    backgroundColor: "#1e1e1e",
  },
  gameMenuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  gameMenuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  gameMenuTitleDark: {
    color: "#fff",
  },
  gamesList: {
    paddingHorizontal: 16,
  },
  gameItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  gameItemDark: {
    backgroundColor: "#2a2a2a",
  },
  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  gameNameDark: {
    color: "#fff",
  },
  gameDesc: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  gameDescDark: {
    color: "#aaa",
  },
});
