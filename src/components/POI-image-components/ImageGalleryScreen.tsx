import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ImageGalleryScreen = ({ route }) => {
  const { images } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderImageItem = ({ item }) => (
      <TouchableOpacity onPress={() => openImageModal(item)}>
        <FastImage source={{ uri: item }} style={styles.gridImage} />
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderImageItem}
            numColumns={3}
            initialNumToRender={9}
            windowSize={5}
            removeClippedSubviews
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
        />

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <FastImage source={{ uri: selectedImage }} style={styles.fullImage} />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
  );
};

export default ImageGalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridImage: {
    width: SCREEN_WIDTH / 3 - 10,
    height: SCREEN_WIDTH / 3 - 10,
    margin: 5,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
