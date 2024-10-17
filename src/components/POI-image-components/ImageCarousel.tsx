import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ImageCarouselProps {
  images: string[]; // Define the type for the images array
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const FIXED_IMAGE_HEIGHT = 250; // Fixed height for the image

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // To manage loading state

  // Open the ImageGalleryScreen when tapping on the image
  const openGallery = () => {
    navigation.navigate('ImageGalleryScreen', { images });
  };

  return (
      <View style={styles.imageContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={openGallery}>
            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={styles.loadingIndicator}
                />
            )}
            <Image
                source={{ uri: images[0] }} // Display the first image as the thumbnail
                style={styles.imageThumbnail}
                onLoadEnd={() => setLoading(false)} // Hide loading spinner when image loads
                onError={() => setLoading(false)} // Hide spinner if an error occurs
                resizeMode="contain" // Ensure the image fits the height and maintains aspect ratio
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: FIXED_IMAGE_HEIGHT, // Set fixed height for the image container
    backgroundColor: '#ddd', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageThumbnail: {
    width: SCREEN_WIDTH, // This is ignored with `resizeMode="contain"`
    height: FIXED_IMAGE_HEIGHT, // Image will fit within this height
  },
  loadingIndicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ImageCarousel;
