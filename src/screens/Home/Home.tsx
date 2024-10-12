import React, {useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import styles from './style';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {
  const handleBackButton = useCallback(() => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, [handleBackButton]),
  );

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
