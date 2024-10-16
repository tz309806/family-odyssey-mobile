import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import styles from './style';

const Home = () => {
  // useFocusEffect(
  //   useCallback(() => {
  //     const logUserSession = async () => {
  //       const session = await getSession();
  //       console.log('Logged in user:', user);
  //     };

  //     logUserSession();
  //   }, []),
  // );

  const data = [
    {id: 1, text: 'https://google.com'},
    {id: 2, text: 'Item 2'},
    {id: 3, text: 'Item 3'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text onPress={() => Linking.openURL(item.text)}>{item.text}</Text>
            <TouchableOpacity
              onPress={() => {
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
