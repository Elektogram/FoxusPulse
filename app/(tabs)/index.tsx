import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Card, List, FAB, useTheme } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";

export default function CalendarScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState<{ [key: string]: { id: string; title: string; time: string }[] }>({});

  // 🛠 API'den verileri çekme fonksiyonu
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/'); // Backend API URL
      const data = await response.json();

      let newEvents: any = {};
      data.forEach((event: any) => {
        if (!newEvents[event.date]) {
          newEvents[event.date] = [];
        }
        newEvents[event.date].push({ id: event.id, title: event.title, time: event.time });
      });

      setEvents(newEvents); // Gelen veriyi state'e kaydet
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 🔄 Bileşen yüklendiğinde etkinlikleri çek
  useEffect(() => {
    fetchEvents();
  }, []);

  // 🆕 Yeni etkinlik eklendiğinde takvimi güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEvents();
    }, 5000); // Her 5 saniyede bir API'den verileri çek

    return () => clearInterval(interval); // Temizleme işlemi
  }, []);

  return (
    <Surface style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: theme.colors.primary };
            return acc;
          }, {} as { [date: string]: { marked: boolean; dotColor: string } }),
          ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: theme.colors.primary } } : {}),
        }}
        theme={{
          selectedDayBackgroundColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
          arrowColor: theme.colors.primary,
        }}
      />

      <Card style={styles.eventsCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
            {selectedDate || 'Select a Date'}
          </Text>
          {selectedDate && events[selectedDate] ? (
            events[selectedDate].map((event) => (
              <List.Item
                key={event.id}
                title={event.title}
                description={`Time: ${event.time}`}
                left={(props) => <List.Icon {...props} icon="calendar" color={theme.colors.primary} />}
              />
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this day.</Text>
          )}
        </Card.Content>
      </Card>

      <FAB icon="plus" style={styles.fab} onPress={() => router.push("/pages/add-event")} label="Add Event" />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventsCard: {
    margin: 16,
    elevation: 2,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
