import React from 'react';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Home = () => {
  const data = [
    {id: 1, text: 'https://google.com'},
    {id: 2, text: 'Item 2'},
    {id: 3, text: 'Item 3'},
  ];

  // const deleteItem = (id: number) => {
  //   setData(prevData => prevData.filter(item => item.id !== id));
  // };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <Text onPress={() => Linking.openURL(item.text)}>{item.text}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('delete item');
              }}>
              <FontAwesomeIcon icon={faTrash} />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Home;
