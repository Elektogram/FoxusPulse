// Move your Profile screen content here
import React from "react"
import { StyleSheet, ScrollView } from "react-native"
import {
  Surface,
  Text,
  Avatar,
  Card,
  List,
  Divider,
  useTheme,
  Button,
} from "react-native-paper"

export default function ProfileScreen() {
  const theme = useTheme()

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <Avatar.Image
          size={100}
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text variant="headlineMedium" style={styles.name}>
          John Doe
        </Text>
        <Text variant="titleMedium" style={styles.title}>
          Software Developer
        </Text>
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
      </Surface>

      <Card style={{ ...styles.section, backgroundColor: "#6b6274" }}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Contact Information
          </Text>
          <List.Item
            title="Email"
            description="john.doe@example.com"
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="Phone"
            description="+1 (555) 123-4567"
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title="Location"
            description="New York, NY"
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
        </Card.Content>
      </Card>

      <Card style={{ ...styles.section, backgroundColor: "#6b6274" }}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About Me
          </Text>
          <Text variant="bodyMedium" style={styles.bio}>
            I'm a passionate software developer with 5 years of experience in
            mobile app development. I love creating user-friendly applications
            and solving complex problems.
          </Text>
        </Card.Content>
      </Card>

      <Card style={{ ...styles.section, backgroundColor: "#6b6274" }}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Skills
          </Text>
          <List.Item
            title="React Native"
            left={props => <List.Icon {...props} icon="react" />}
          />
          <Divider />
          <List.Item
            title="TypeScript"
            left={props => <List.Icon {...props} icon="language-typescript" />}
          />
          <Divider />
          <List.Item
            title="Mobile Development"
            left={props => <List.Icon {...props} icon="cellphone" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    color: "#666",
    marginBottom: 16,
  },
  editButton: {
    marginTop: 8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  bio: {
    lineHeight: 22,
  },
})