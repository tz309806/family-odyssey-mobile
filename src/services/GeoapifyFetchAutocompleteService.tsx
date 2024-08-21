import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const geoapifyKey = process.env.GEOAPIFY_KEY;

const GeoapifyAutocomplete: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchAutocomplete = async (searchText: string) => {
    console.log('Fetching suggestions for:', searchText);

    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
        params: {
          text: searchText,
          apiKey: geoapifyKey,
          limit: 5, // Limit the number of results
        },
      });

      console.log('Response data:', response.data);

      const suggestions = response.data.features.map((feature: any) => ({
        name: feature.properties.city || feature.properties.name || 'Unknown Place',
        address: feature.properties.formatted,
        coordinates: feature.geometry.coordinates,
      }));

      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear the previous timeout if it exists
    }

    if (text.length > 0) {
      debounceTimeout.current = setTimeout(() => {
        fetchAutocomplete(text);
      }, 300); // 300ms delay
    } else {
      setSuggestions([]);
    }
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={query}
            onChangeText={handleInputChange}
            placeholder="Search for a location"
        />
        {suggestions.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                  data={suggestions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => console.log('Selected:', item)}>
                        <View style={styles.suggestionItem}>
                          <Text style={styles.suggestionName}>{item.name}</Text>
                          <Text style={styles.suggestionAddress}>{item.address}</Text>
                        </View>
                      </TouchableOpacity>
                  )}
              />
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust this value based on the input height and margin
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    zIndex: 1000, // Ensure the dropdown appears above other elements
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  suggestionName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestionAddress: {
    color: 'gray',
    fontSize: 14,
  },
});

export default GeoapifyAutocomplete;
