import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';

const UpcomingEvents: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>

          {/* List of 6 mock events */}
          <Text style={styles.eventItem}>
            • Outdoor Movie Night - October 10
          </Text>
          <Text style={styles.eventItem}>
            • Food Truck Festival - October 12
          </Text>
          <Text style={styles.eventItem}>• Family Picnic Day - October 14</Text>
          <Text style={styles.eventItem}>
            • Halloween Costume Contest - October 31
          </Text>
          <Text style={styles.eventItem}>
            • Thanksgiving Parade - November 25
          </Text>
          <Text style={styles.eventItem}>• Christmas Market - December 5</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  eventItem: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
});

export default UpcomingEvents;
