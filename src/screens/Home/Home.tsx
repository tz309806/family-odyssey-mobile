import React, {useLayoutEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/route-types.ts';
import {clearSession, getSession} from '../../services/authService';
import {supabase} from '../../supabaseClient';
import {useAppContext} from "../../AppContext.tsx";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {

  const {user, setUser} = useAppContext()
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handle sign out functionality
  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      await clearSession();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const logUserSession = async () => {
        const session = await getSession();
        console.log('Logged in user:', user);
      };

      logUserSession();
    }, []),
  );

  const data = [
    {id: 1, text: 'https://google.com'},
    {id: 2, text: 'Item 2'},
    {id: 3, text: 'Item 3'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
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
