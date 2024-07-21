import 'react-native-gesture-handler'; // Ensure this is at the top
import React, { useEffect, useState } from "react";
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

import Screens from './src/navigation/Screens';
import { Images, articles, nowTheme } from './src/constants';

const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground,
];

articles.forEach(article => assetImages.push(article.image));

function cacheImages(images: any[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App: React.FC = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResourcesAsync = async () => {
      await Font.loadAsync({
        'montserrat-regular': require('./src/assets/font/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./src/assets/font/Montserrat-Bold.ttf'),
      });

      setFontLoaded(true);
      await Promise.all([...cacheImages(assetImages)]);
    };

    loadResourcesAsync().catch(handleLoadingError);
  }, []);

  const handleLoadingError = (error: any) => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    if (fontLoaded) {
      setIsLoadingComplete(true);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
};

export default App;
