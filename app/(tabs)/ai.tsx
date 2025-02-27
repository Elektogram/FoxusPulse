// Move AI chat screen content here
import type React from "react"
import { useState } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native"
import {
  Text,
  Surface,
  Appbar,
  useTheme,
  MD3Colors,
} from "react-native-paper"
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Message {
  id: string
  text: string
  isUser: boolean
}

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const theme = useTheme()

  const sendMessage = () => {
    if (inputText.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputText("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `AI response to: "${inputText}"`,
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, aiResponse])
    }, 1000)
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <Surface
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble,
        { elevation: 1 }
      ]}
    >
      <Text
        variant="bodyLarge"
        style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.aiMessageText
        ]}
      >
        {item.text}
      </Text>
    </Surface>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Appbar.Header>
        <Appbar.Content title="AI Chat" />
      </Appbar.Header>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <FontAwesome name="send" size={20} color={!inputText.trim() ? "#999" : "#fff"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageList: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: MD3Colors.primary50,
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    backgroundColor: MD3Colors.primary50,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#f0f0f0",
  },
})