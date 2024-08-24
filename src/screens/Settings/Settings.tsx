import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyle from '../../assets/styles/globalStyle';
import {RootStackParamList} from '../../navigation/route-types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import style from './style';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faLock,
  faBell,
  faFlag,
  faSignOut,
  faCreditCard,
  faQuestionCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {Alert, Text, View} from 'react-native';
import {supabase} from '../../supabaseClient';
import {useAppContext} from '../../AppContext';
type SettingscreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

type Props = {
  navigation: SettingscreenNavigationProp;
};
const Settings = ({navigation}: Props) => {
  const {setUser} = useAppContext();
  const navigateToEditProfile = () => {
    navigation.navigate('Edit Profile');
  };

  const navigateToSecurity = () => {
    console.log('navigateToSecurity');
  };

  const navigateToNotifications = () => {
    console.log('navigateToNotifications');
  };

  const logOutUser = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', 'Something went wrong');
    } else {
      setUser(null);
      navigation.navigate('Login');
    }
  };
  const accountItems = [
    {icon: faUser, text: 'Edit Profile', action: navigateToEditProfile},
    {icon: faBell, text: 'Notifications', action: navigateToNotifications},
    {icon: faLock, text: 'Security', action: navigateToSecurity},
  ];

  const supportItems = [
    {
      icon: faCreditCard,
      text: 'Manage Subscription',
      action: navigateToEditProfile,
    },
    {
      icon: faQuestionCircle,
      text: 'Help and Support',
      action: navigateToNotifications,
    },
    {
      icon: faInfoCircle,
      text: 'Terms and Policies',
      action: navigateToSecurity,
    },
  ];

  const actionItems = [
    {icon: faFlag, text: 'Report a problem', action: navigateToEditProfile},
    {icon: faSignOut, text: 'Log out', action: logOutUser, color: 'red'},
  ];
  const renderSettingsItems = ({
    icon,
    text,
    action,
    color,
  }: {
    icon: IconProp;
    text: string;
    action: () => void;
    color?: string;
  }) => (
    <TouchableOpacity onPress={action} style={style.settingsItem}>
      <FontAwesomeIcon icon={icon} color={color} />
      <Text style={style.settingsText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyle.flex}>
      <View style={style.section}>
        <Text style={style.sectionText}>Account</Text>
        {accountItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderSettingsItems(item)}
          </React.Fragment>
        ))}
        <Text style={style.sectionText}>Account</Text>
        {supportItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderSettingsItems(item)}
          </React.Fragment>
        ))}
        <Text style={style.sectionText}>Account</Text>
        {actionItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderSettingsItems(item)}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
