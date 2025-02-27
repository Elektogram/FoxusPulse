import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddEventScreen() {
  const theme = useTheme();
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<{ hours: number; minutes: number } | undefined>(undefined);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 📌 Tarih seçme işlemi
  const onConfirmDate = (params: { date?: Date; startDate?: Date; endDate?: Date }) => {
    setShowDatePicker(false);

    // Seçilen tarihi yerel saat dilimine göre düzelt
    if (params.date) {
      const localDate = new Date(params.date.getTime() + Math.abs(params.date.getTimezoneOffset() * 60000));
      setDate(localDate);
    } else if (params.startDate) {
      const localDate = new Date(params.startDate.getTime() + Math.abs(params.startDate.getTimezoneOffset() * 60000));
      setDate(localDate);
    }
  };

  // 📌 Saat seçme işlemi
  const onConfirmTime = (params: { hours: number; minutes: number }) => {
    setShowTimePicker(false);
    setTime({ hours: params.hours, minutes: params.minutes });
  };

  // 📌 Event ekleme fonksiyonu (Backend'e gönderme)
  const handleAddEvent = async () => {
    if (!title || !date || !time) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    const formattedDate = date
      ? new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
          .toISOString()
          .split("T")[0]
      : "";

    const formattedTime = `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date: formattedDate, time: formattedTime }),
      });

      if (!response.ok) {
        throw new Error("Etkinlik eklenirken bir hata oluştu.");
      }

      Alert.alert("Başarılı", "Etkinlik başarıyla eklendi!");
      router.back(); // 📌 Takvim sayfasına geri dön
    } catch (error) {
      console.error("API Hatası:", error);
      Alert.alert("Hata", "Etkinlik eklenemedi!");
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Etkinlik Başlığı */}
        <TextInput
          label="Etkinlik Başlığı"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />

        {/* Tarih Seçici */}
        <Text style={styles.label}>Tarih Seç:</Text>
        <Button mode="contained" onPress={() => setShowDatePicker(true)}>
          {date ? date.toISOString().split("T")[0] : "Tarih Seç"}
        </Button>
        <DatePickerModal
          locale="tr"
          mode="single"
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          date={date}
          onConfirm={onConfirmDate}
        />

        {/* Saat Seçici */}
        <Text style={styles.label}>Saat Seç:</Text>
        <Button mode="contained" onPress={() => setShowTimePicker(true)}>
          {time ? `${time.hours}:${time.minutes}` : "Saat Seç"}
        </Button>
        <div style={styles.modalFix}>

        
        <TimePickerModal
          visible={showTimePicker}
          onDismiss={() => setShowTimePicker(false)}
          onConfirm={onConfirmTime}
          hours={time?.hours || 12}
          minutes={time?.minutes || 0}
        />
</div>



        {/* Etkinliği Ekle Butonu */}
        <Button mode="contained" onPress={handleAddEvent} style={styles.submitButton}>
          Etkinliği Ekle
        </Button>
      </View>
    </SafeAreaProvider>
  );
}

// Stil Dosyaları


const styles = StyleSheet.create({
  modalFix: {
    alignSelf: "center",
    width: "90%", // Web için daha geniş alan
    maxWidth: 400,
    backgroundColor: "white", // Mobil için arka plan rengi
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Android için gölge
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 15,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
  submitButton: {
    marginTop: 20,
  },

});

