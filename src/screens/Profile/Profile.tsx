import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {useAppContext} from '../../AppContext';
const Profile = () => {
  const {user} = useAppContext();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={globalStyle.flexGrow} />
      <View style={style.profileImageContainer}>
        <View style={style.profileImageContent}>
          <Image
            source={require('../../assets/images/default_profile.png')}
            style={style.profileImage}
          />
        </View>
      </View>
      <Text style={style.userName}>{user?.user_metadata.fullName}</Text>
    </SafeAreaView>
  );
};
export default Profile;
