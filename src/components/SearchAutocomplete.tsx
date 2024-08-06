import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchAutocomplete = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`, {
        params: {
          access_token: process.env.MAPBOX_TOKEN,
          autocomplete: true,
        },
      });
      setSuggestions(response.data.features);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  return (
      <View style={styles.autocompleteContainer}>
        <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={handleInputChange}
            placeholder="Search for a location"
        />
        {suggestions.length > 0 && (
            <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectLocation(item)}>
                      <Text style={styles.suggestionItem}>{item.place_name}</Text>
                    </TouchableOpacity>
                )}
            />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: 'relative',
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchAutocomplete;
