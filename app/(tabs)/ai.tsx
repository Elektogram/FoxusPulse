import React, { useState } from "react"
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
  ActivityIndicator,
} from "react-native-paper"
import FontAwesome from "@expo/vector-icons/FontAwesome"

interface Message {
  id: string
  text: string
  isUser: boolean
}

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const sendMessage = async () => {
    if (inputText.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputText("")
    setLoading(true)

    try {
      
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newUserMessage.text }),
      })

      if (!response.ok) {
        const errorData = await response.json(); // Hata mesajını al
        console.error("API Hatası:", errorData);
        return;
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.chat_response,
        isUser: false,
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse])
    } catch (error) {
    console.error("Network veya JSON Hatası:", error);
      } finally {
      setLoading(false)
    }
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <Surface
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={item.isUser ? styles.userMessageText : styles.aiMessageText}>
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
          placeholder="Mesajınızı yazın..."
          placeholderTextColor="#999"
        />
        {loading ? (
          <ActivityIndicator animating={true} size="small" color="#6200ea" />
        ) : (
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <FontAwesome
              name="send"
              size={20}
              color={!inputText.trim() ? "#999" : "#fff"}
            />
          </TouchableOpacity>
        )}
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
    backgroundColor: "#6200ea",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: "#6200ea",
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
