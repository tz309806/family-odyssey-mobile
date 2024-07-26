import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/route-types.ts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')} // Navigate to Signup
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/user-icon.png')} // Adjust the path to your user icon image
            style={styles.userIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    marginRight: 10,
  },
  userIcon: {
    width: 24,
    height: 24,
  },
});

export default Home;
