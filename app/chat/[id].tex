import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { MESSAGES } from "@/mocks/messages";
import { CHAT_PREVIEWS } from "@/mocks/chat-previews";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Send,
  Smile,
  Paperclip,
  Mic,
  Camera,
  Image as ImageIcon,
  CheckCheck,
  Check,
  Clock,
  Info,
  Search,
  Star,
  Trash2,
  Bell,
  BellOff,
  Gamepad2,
  X,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  Heart,
  Coffee,
  Dice,
  MessageCircle,
  FileImage,
  FileVideo,
  File,
  MapPin,
  Calendar,
  Gif,
  Sticker,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/theme-context";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function ChatScreen() {
  const { isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState(null);
  
  const flatListRef = useRef(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;
  const optionsAnimation = useRef(new Animated.Value(0)).current;
  const attachmentsAnimation = useRef(new Animated.Value(0)).current;
  const gameMenuAnimation = useRef(new Animated.Value(0)).current;
  const callOptionsAnimation = useRef(new Animated.Value(0)).current;
  const callAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Simulate loading chat data
    setTimeout(() => {
      if (!id) {
        router.replace("/messages");
        return;
      }
      
      const chatData = CHAT_PREVIEWS.find(c => c.id.toString() === id);
      
      if (!chatData) {
        router.replace("/messages");
        return;
      }
      
      setChat(chatData);
      
      // Filter messages for this chat
      const chatMessages = MESSAGES.filter(m => m.chatId.toString() === id);
      setMessages(chatMessages);
      
      setIsLoading(false);
    }, 500);
    
    // Simulate typing indicator
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        simulateTyping();
      }
    }, 5000);
    
    return () => clearInterval(typingInterval);
  }, [id]);
  
  const simulateTyping = () => {
    if (!chat) return;
    
    setIsTyping(true);
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(typingAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    ).start();
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulate receiving a message
      if (Math.random() > 0.3) {
        const newMessage = {
          id: Date.now().toString(),
          chatId: id,
          senderId: chat.id,
          text: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toISOString(),
          status: "delivered",
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }, 3000);
  };
  
  const toggleOptions = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setShowOptions(!showOptions);
    
    Animated.timing(optionsAnimation, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleAttachments = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setShowAttachments(!showAttachments);
    
    Animated.timing(attachmentsAnimation, {
      toValue: showAttachments ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleGameMenu = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setShowGameMenu(!showGameMenu);
    
    Animated.timing(gameMenuAnimation, {
      toValue: showGameMenu ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleCallOptions = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setShowCallOptions(!showCallOptions);
    
    Animated.timing(callOptionsAnimation, {
      toValue: showCallOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startCall = (type) => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    setCallType(type);
    setIsCallActive(true);
    setShowCallOptions(false);
    
    // Animate call screen
    callAnimation.setValue(0);
    Animated.timing(callAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const endCall = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    Animated.timing(callAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsCallActive(false);
      setCallType(null);
    });
  };
  
  const sendMessage = () => {
    if (inputText.trim() === "") return;
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const newMessage = {
      id: Date.now().toString(),
      chatId: id,
      senderId: "me",
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      status: "sent",
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
    
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 2000);
  };
  
  const renderMessageStatus = (status) => {
    switch (status) {
      case "sent":
        return <Check size={14} color={isDark ? "#aaa" : COLORS.textLight} />;
      case "delivered":
        return <CheckCheck size={14} color={isDark ? "#aaa" : COLORS.textLight} />;
      case "read":
        return <CheckCheck size={14} color={COLORS.primary} />;
      case "pending":
        return <Clock size={14} color={isDark ? "#aaa" : COLORS.textLight} />;
      default:
        return null;
    }
  };
  
  const renderMessage = ({ item, index }) => {
    const isMe = item.senderId === "me";
    const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== item.senderId);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}
      >
        {!isMe && showAvatar && chat && (
          <Image source={{ uri: chat.avatar }} style={styles.messageAvatar} />
        )}
        
        {!isMe && !showAvatar && <View style={styles.avatarSpacer} />}
        
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessageBubble : styles.theirMessageBubble,
            isDark && isMe ? styles.myMessageBubbleDark : null,
            isDark && !isMe ? styles.theirMessageBubbleDark : null,
          ]}
        >
          <Text style={[
            styles.messageText,
            isMe ? styles.myMessageText : styles.theirMessageText,
            isDark && !isMe ? styles.theirMessageTextDark : null,
          ]}>
            {item.text}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              isMe ? styles.myMessageTime : styles.theirMessageTime,
              isDark && !isMe ? styles.theirMessageTimeDark : null,
            ]}>
              {messageTime}
            </Text>
            {isMe && renderMessageStatus(item.status)}
          </View>
        </View>
      </View>
    );
  };
  
  const renderTypingIndicator = () => {
    if (!chat) return null;
    
    return (
      <View style={styles.typingContainer}>
        <Image source={{ uri: chat.avatar }} style={styles.typingAvatar} />
        <View style={[styles.typingBubble, isDark && styles.typingBubbleDark]}>
          <View style={styles.typingDots}>
            <Animated.View
              style={[
                styles.typingDot,
                isDark && styles.typingDotDark,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.typingDot,
                isDark && styles.typingDotDark,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.typingDot,
                isDark && styles.typingDotDark,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };
  
  const renderDateSeparator = (date) => (
    <View style={styles.dateSeparator}>
      <View style={[styles.dateSeparatorLine, isDark && styles.dateSeparatorLineDark]} />
      <Text style={[styles.dateSeparatorText, isDark && styles.dateSeparatorTextDark]}>{date}</Text>
      <View style={[styles.dateSeparatorLine, isDark && styles.dateSeparatorLineDark]} />
    </View>
  );
  
  const renderChatOptions = () => (
    <Animated.View
      style={[
        styles.optionsOverlay,
        {
          opacity: optionsAnimation,
          transform: [
            {
              translateY: optionsAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.optionsBackdrop} onPress={toggleOptions} />
      
      <View style={[styles.optionsContainer, isDark && styles.optionsContainerDark]}>
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#4CAF50" }]}>
            <Search size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>Search in conversation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#FFC107" }]}>
            <Star size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>Add to favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#2196F3" }]}>
            <Info size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>View contact info</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#9C27B0" }]}>
            <BellOff size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>Mute notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#FF9800" }]}>
            <Gamepad2 size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>Play games together</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={[styles.optionIcon, { backgroundColor: "#F44336" }]}>
            <Trash2 size={20} color="#fff" />
          </View>
          <Text style={[styles.optionText, isDark && styles.optionTextDark]}>Delete conversation</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderAttachments = () => (
    <Animated.View
      style={[
        styles.attachmentsOverlay,
        {
          opacity: attachmentsAnimation,
          transform: [
            {
              translateY: attachmentsAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity 
        style={styles.attachmentsBackdrop} 
        onPress={toggleAttachments}
        activeOpacity={1}
      />
      
      <View style={[styles.attachmentsContainer, isDark && styles.attachmentsContainerDark]}>
        <View style={styles.attachmentsGrid}>
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#4CAF50" }]}>
              <Camera size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#2196F3" }]}>
              <FileImage size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Photos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#9C27B0" }]}>
              <FileVideo size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Videos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#FF9800" }]}>
              <File size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Files</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#F44336" }]}>
              <MapPin size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#795548" }]}>
              <Calendar size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#00BCD4" }]}>
              <Gif size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>GIF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachmentItem}>
            <View style={[styles.attachmentIcon, { backgroundColor: "#E91E63" }]}>
              <Sticker size={24} color="#fff" />
            </View>
            <Text style={[styles.attachmentText, isDark && styles.attachmentTextDark]}>Sticker</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
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
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.gameMenuContent, isDark && styles.gameMenuContentDark]}>
            <View style={styles.gameMenuHeader}>
              <Text style={[styles.gameMenuTitle, isDark && styles.gameMenuTitleDark]}>
                Play Together
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
                    Discover how compatible you are with each other
                  </Text>
                </View>
                <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
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
                <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
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
                <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
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
                <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.gameItem, isDark && styles.gameItemDark]}
                onPress={() => {
                  toggleGameMenu();
                  router.push("/games/dice");
                }}
              >
                <View style={[styles.gameIcon, { backgroundColor: "#FF9800" }]}>
                  <Dice size={24} color="#fff" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameName, isDark && styles.gameNameDark]}>
                    Dice Roll
                  </Text>
                  <Text style={[styles.gameDesc, isDark && styles.gameDescDark]}>
                    Roll dice and play simple games
                  </Text>
                </View>
                <ChevronRight size={20} color={isDark ? "#aaa" : COLORS.textLight} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const renderCallOptions = () => (
    <Animated.View
      style={[
        styles.callOptionsOverlay,
        {
          opacity: callOptionsAnimation,
          transform: [
            {
              translateY: callOptionsAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity 
        style={styles.callOptionsBackdrop} 
        onPress={toggleCallOptions}
        activeOpacity={1}
      />
      
      <View style={[styles.callOptionsContainer, isDark && styles.callOptionsContainerDark]}>
        <TouchableOpacity 
          style={styles.callOptionItem}
          onPress={() => startCall("audio")}
        >
          <View style={[styles.callOptionIcon, { backgroundColor: "#4CAF50" }]}>
            <Phone size={24} color="#fff" />
          </View>
          <Text style={[styles.callOptionText, isDark && styles.callOptionTextDark]}>Audio Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.callOptionItem}
          onPress={() => startCall("video")}
        >
          <View style={[styles.callOptionIcon, { backgroundColor: "#2196F3" }]}>
            <Video size={24} color="#fff" />
          </View>
          <Text style={[styles.callOptionText, isDark && styles.callOptionTextDark]}>Video Call</Text>
        </TouchableOpacity>
        
        {chat && chat.isGroup && (
          <TouchableOpacity 
            style={styles.callOptionItem}
            onPress={() => startCall("group")}
          >
            <View style={[styles.callOptionIcon, { backgroundColor: "#9C27B0" }]}>
              <Users size={24} color="#fff" />
            </View>
            <Text style={[styles.callOptionText, isDark && styles.callOptionTextDark]}>Group Call</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  const renderActiveCall = () => {
    if (!isCallActive) return null;
    
    return (
      <Animated.View
        style={[
          styles.activeCallContainer,
          {
            opacity: callAnimation,
            transform: [
              {
                translateY: callAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={callType === "video" ? ["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)"] : ["#1e1e1e", "#121212"]}
          style={styles.activeCallContent}
        >
          {callType === "video" && (
            <Image 
              source={{ uri: chat?.avatar }}
              style={styles.videoCallBackground}
              blurRadius={Platform.OS === "ios" ? 10 : 5}
            />
          )}
          
          <View style={styles.callHeader}>
            <Text style={styles.callStatus}>
              {callType === "audio" ? "Audio Call" : "Video Call"}
            </Text>
            <Text style={styles.callTimer}>00:05</Text>
          </View>
          
          <View style={styles.callUserInfo}>
            <Image source={{ uri: chat?.avatar }} style={styles.callUserImage} />
            <Text style={styles.callUserName}>{chat?.name}</Text>
            <Text style={styles.callUserStatus}>Connected</Text>
          </View>
          
          <View style={styles.callControls}>
            <TouchableOpacity style={[styles.callControl, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
              <Mic size={24} color="#fff" />
            </TouchableOpacity>
            
            {callType === "video" && (
              <TouchableOpacity style={[styles.callControl, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                <Video size={24} color="#fff" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.callControl, { backgroundColor: "#F44336" }]}
              onPress={endCall}
            >
              <Phone size={24} color="#fff" style={{ transform: [{ rotate: "135deg" }] }} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.callControl, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
              <Smile size={24} color="#fff" />
            </TouchableOpacity>
            
            {callType === "video" && (
              <TouchableOpacity style={[styles.callControl, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                <Camera size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  if (isLoading || !chat) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <TouchableOpacity
              style={styles.headerTitle}
              onPress={() => router.push(`/profile/${chat.id}`)}
            >
              <Image source={{ uri: chat.avatar }} style={styles.headerAvatar} />
              <View>
                <Text style={[styles.headerName, isDark && styles.headerNameDark]}>{chat.name}</Text>
                <Text style={[styles.headerStatus, isDark && styles.headerStatusDark]}>
                  {chat.isOnline ? "Online" : "Last seen recently"}
                </Text>
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={toggleCallOptions}
              >
                <Phone size={22} color={isDark ? "#fff" : COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={() => startCall("video")}
              >
                <Video size={22} color={isDark ? "#fff" : COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerAction} 
                onPress={toggleOptions}
              >
                <MoreVertical size={22} color={isDark ? "#fff" : COLORS.text} />
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
      
      <KeyboardAvoidingView
        style={[styles.container, isDark && styles.containerDark]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderDateSeparator("Today")}
          ListFooterComponent={isTyping ? renderTypingIndicator() : null}
          onLayout={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
        />
        
        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={toggleAttachments}
          >
            <Paperclip size={22} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          
          <View style={[styles.textInputContainer, isDark && styles.textInputContainerDark]}>
            <TextInput
              style={[styles.textInput, isDark && styles.textInputDark]}
              placeholder="Type a message..."
              placeholderTextColor={isDark ? "#aaa" : "#999"}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={22} color={isDark ? "#aaa" : COLORS.textLight} />
            </TouchableOpacity>
          </View>
          
          {inputText.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Send size={22} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.micButton, isDark && styles.micButtonDark]}>
              <Mic size={22} color={isDark ? "#fff" : COLORS.text} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.quickActionsContainer, isDark && styles.quickActionsContainerDark]}>
          <TouchableOpacity 
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
          >
            <Camera size={20} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
          >
            <ImageIcon size={20} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
          >
            <Mic size={20} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, isDark && styles.quickActionDark]}
            onPress={toggleGameMenu}
          >
            <Gamepad2 size={20} color={isDark ? "#fff" : COLORS.text} />
          </TouchableOpacity>
        </View>
        
        {showOptions && renderChatOptions()}
        {showAttachments && renderAttachments()}
        {renderGameMenu()}
        {showCallOptions && renderCallOptions()}
        {renderActiveCall()}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingContainerDark: {
    backgroundColor: "#121212",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  headerNameDark: {
    color: "#fff",
  },
  headerStatus: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  headerStatusDark: {
    color: "#aaa",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerAction: {
    marginLeft: 16,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  theirMessageContainer: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarSpacer: {
    width: 40,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 2,
  },
  myMessageBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  myMessageBubbleDark: {
    backgroundColor: COLORS.primary,
  },
  theirMessageBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
  },
  theirMessageBubbleDark: {
    backgroundColor: "#2a2a2a",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  myMessageText: {
    color: "#fff",
  },
  theirMessageText: {
    color: COLORS.text,
  },
  theirMessageTextDark: {
    color: "#fff",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  messageTime: {
    fontSize: 12,
    marginRight: 4,
  },
  myMessageTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  theirMessageTime: {
    color: COLORS.textLight,
  },
  theirMessageTimeDark: {
    color: "#aaa",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputContainerDark: {
    backgroundColor: "#1e1e1e",
    borderTopColor: "#333",
  },
  attachButton: {
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  textInputContainerDark: {
    backgroundColor: "#333",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: COLORS.text,
  },
  textInputDark: {
    color: "#fff",
  },
  emojiButton: {
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  micButtonDark: {
    backgroundColor: "#333",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  quickActionsContainerDark: {
    backgroundColor: "#1e1e1e",
    borderTopColor: "#333",
  },
  quickAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  quickActionDark: {
    backgroundColor: "#333",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },
  typingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  typingBubble: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  typingBubbleDark: {
    backgroundColor: "#2a2a2a",
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
    marginRight: 4,
  },
  typingDotDark: {
    backgroundColor: "#aaa",
  },
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dateSeparatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dateSeparatorLineDark: {
    backgroundColor: "#333",
  },
  dateSeparatorText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginHorizontal: 8,
  },
  dateSeparatorTextDark: {
    color: "#aaa",
  },
  optionsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 10,
  },
  optionsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  optionsContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionTextDark: {
    color: "#fff",
  },
  attachmentsOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  attachmentsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  attachmentsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  attachmentsContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  attachmentsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  attachmentItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 20,
  },
  attachmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  attachmentText: {
    fontSize: 12,
    color: COLORS.text,
  },
  attachmentTextDark: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameMenuContainer: {
    width: width * 0.9,
    maxHeight: height * 0.7,
    borderRadius: 20,
    overflow: "hidden",
  },
  gameMenuContent: {
    backgroundColor: "#fff",
    padding: 20,
  },
  gameMenuContentDark: {
    backgroundColor: "#1e1e1e",
  },
  gameMenuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
    maxHeight: height * 0.6,
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
  callOptionsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  callOptionsBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  callOptionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
  },
  callOptionsContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  callOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  callOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  callOptionText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.text,
  },
  callOptionTextDark: {
    color: "#fff",
  },
  activeCallContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  activeCallContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  videoCallBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  callHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  callStatus: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  callTimer: {
    color: "#fff",
    fontSize: 16,
  },
  callUserInfo: {
    alignItems: "center",
  },
  callUserImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
  callUserName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  callUserStatus: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
  },
  callControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  callControl: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
