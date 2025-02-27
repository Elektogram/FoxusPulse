import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider, Appbar, Surface, Text, List, ProgressBar } from 'react-native-paper';

export default function App() {
  // Örnek uygulama verileri
  const appData = [
    { name: 'Sosyal Medya', time: 120, color: '#4285F4' },
    { name: 'Verimlilik', time: 90, color: '#34A853' },
    { name: 'Eğlence', time: 60, color: '#FBBC05' },
    { name: 'Haberler', time: 30, color: '#EA4335' },
  ];

  const totalTime = appData.reduce((sum, app) => sum + app.time, 0);
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
        <Appbar.Header>
          <Appbar.Content title="Ekran Süresi" />
        </Appbar.Header>
        <ScrollView>
          <Surface style={styles.surface}>
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTimeText}>{`${hours}s ${minutes}d`}</Text>
              <Text style={styles.totalTimeLabel}>Toplam</Text>
            </View>
            <View style={styles.chartContainer}>
              {appData.map((app, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={[styles.colorIndicator, { backgroundColor: app.color }]} />
                  <View style={styles.barWrapper}>
                    <ProgressBar
                      progress={app.time / totalTime}
                      color={app.color}
                      style={styles.progressBar}
                    />
                  </View>
                </View>
              ))}
            </View>
          </Surface>

          <Text style={styles.sectionTitle}>Uygulama Kullanımı</Text>
          {appData.map((app, index) => (
            <List.Item
              key={index}
              title={app.name}
              description={`${Math.floor(app.time / 60)}s ${app.time % 60}d`}
              left={props => <List.Icon {...props} icon="clock-outline" color={app.color} />}
              titleStyle={styles.listItemTitle}
              descriptionStyle={styles.listItemDescription}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    elevation: 4,
    borderRadius: 8,
  },
  totalTimeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  totalTimeText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  totalTimeLabel: {
    fontSize: 16,
    color: '#757575',
  },
  chartContainer: {
    marginTop: 16,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  barWrapper: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#333'
    },
  listItemTitle: {
    fontWeight: 'bold',  // Başlığı kalın yap
    color: '#333'
  },
  listItemDescription: {
    fontWeight: '600',  // Açıklamayı biraz daha kalın yap
    color: '#333',  // Açıklama rengini biraz daha koyu yap
  },
});
