import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageCarousel from '../../components/POI-image-components/ImageCarousel';
import AWS from 'aws-sdk';
import Config from 'react-native-config';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FIXED_IMAGE_SECTION_HEIGHT = 250;

interface PoiDetailsProps {
  route: {
    params: {
      place: {
        name: string;
        formatted: string;
        contact: {phone?: string};
        website?: string;
        lat: number;
        lon: number;
        postcode?: string;
        state: string;
        country: string;
        place_id: string;
        name_other?: {official_name?: string};
      };
    };
  };
}

const PoiDetails: React.FC<PoiDetailsProps> = ({route}) => {
  const {place} = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchImagesFromS3 = async (placeId: string) => {
    setLoading(true);
    const s3 = new AWS.S3({
      accessKeyId: Config.AWS_ACCESS_KEY,
      secretAccessKey: Config.AWS_SECRET_KEY,
      region: Config.AWS_REGION,
    });

    const params = {
      Bucket: 'family-odyssey',
      Prefix: `poi-images/${placeId}/`,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();

      if (data.Contents.length === 0) {
        setImages([]);
        return;
      }

      const validFiles = data.Contents.filter(item => !item.Key.endsWith('/'));

      const fetchedImages = await Promise.all(
        validFiles.map(async item => {
          const fileKey = item.Key;
          const imageUrl = await s3.getSignedUrlPromise('getObject', {
            Bucket: 'family-odyssey',
            Key: fileKey,
            Expires: 600000,
          });
          return imageUrl;
        }),
      );

      setImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images from S3:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesFromS3(place.place_id);
  }, [place]);

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, FIXED_IMAGE_SECTION_HEIGHT * 2],
    outputRange: [0, -FIXED_IMAGE_SECTION_HEIGHT / 3],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, FIXED_IMAGE_SECTION_HEIGHT],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const placeName =
    place.name || place.name_other?.official_name || 'No Name Available';

  const openWebsite = () => {
    if (place.website) {
      Linking.openURL(place.website);
    }
  };

  const onSeeMorePress = () => {
    navigation.navigate('MustKnowDetails', {title: place.name});
  };

  const onSeeMoreEventsPress = () => {
    navigation.navigate('UpcomingEvents'); // Navigate to the UpcomingEvents screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{translateY: imageTranslate}],
              opacity: imageOpacity,
            },
          ]}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ImageCarousel
              images={images}
              height={FIXED_IMAGE_SECTION_HEIGHT}
            />
          )}
        </Animated.View>

        <View style={styles.detailsContainer}>
          <Text style={styles.placeName}>{placeName}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.starRating}>★★★★★</Text>
            <Text style={styles.reviewsCount}>(544 Reviews)</Text>
          </View>

          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.gridItem}>
              <Text style={styles.gridText}>Share Your Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <Text style={styles.gridText}>Add to Favorite</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Must Know Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Must Know Before You Go:</Text>
            <Text style={styles.sectionContent}>
              • Parking available on site{'\n'}• Free Wi-Fi throughout the
              property{'\n'}• Complimentary breakfast included
            </Text>
            <TouchableOpacity onPress={onSeeMorePress}>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Upcoming Events Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events:</Text>
            <Text style={styles.sectionContent}>
              • Outdoor Movie Night - October 10{'\n'}• Food Truck Festival -
              October 12{'\n'}• Family Picnic Day - October 14
            </Text>
            <TouchableOpacity onPress={onSeeMoreEventsPress}>
              <Text style={styles.seeMoreLink}>See more events</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information:</Text>
            <Text style={styles.sectionContent}>
              Phone: {place.contact?.phone || 'No phone available'}
            </Text>

            {place.website && (
              <TouchableOpacity onPress={openWebsite}>
                <Text style={styles.websiteLink}>Visit Website</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location:</Text>
            <Text style={styles.sectionContent}>
              {place.formatted || 'No Address Available'}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: FIXED_IMAGE_SECTION_HEIGHT,
    backgroundColor: '#ddd',
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
    zIndex: 2,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  starRating: {
    fontSize: 20,
    color: '#f1c40f',
    marginRight: 10,
  },
  reviewsCount: {
    fontSize: 16,
    color: '#777',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridItem: {
    width: '45%',
    paddingVertical: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  gridText: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  seeMoreLink: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'right',
  },
  websiteLink: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
});

export default PoiDetails;
