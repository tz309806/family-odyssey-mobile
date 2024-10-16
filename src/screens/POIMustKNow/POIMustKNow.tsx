import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const MustKnowDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {

    if (route.params?.title) {
      navigation.setOptions({title: route.params.title}); // Dynamically set the title
    }
  }, [route.params?.title, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Must Know Before You Go</Text>
        <Text style={styles.content}>
          • Parking available on site{'\n'}• Free Wi-Fi throughout the property
          {'\n'}• Complimentary breakfast included{'\n'}• Nearby public
          transportation available{'\n'}• Swimming pool is seasonal{'\n'}• No
          pets allowed{'\n'}• Late check-out options available{'\n'}• Close
          proximity to shopping centers
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

export default MustKnowDetails;
