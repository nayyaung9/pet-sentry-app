import React, {useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  PermissionsAndroid,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleConstants} from '~utils/styles/constants';
import Button from './widgets/Button';
import ThemeText from './widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '~utils/styles/ThemeManager';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import apiInstance from '~utils/api/instance';
import axios from 'axios';

const PhotoUploader = ({petPhotos, setPetPhotos}: any) => {
  const {colors} = useTheme();
  const photoUploadRef = useRef<any>(null);

  const onPickFromImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result?.assets) {
      onPerformPhoto(result?.assets[0]);
    }
  };

  const onLaunchDeviceCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera({mediaType: 'photo'});

      if (result?.assets) {
        onPerformPhoto(result?.assets[0]);
      }
    }
  };

  const onPerformPhoto = async (image: any) => {
    if (photoUploadRef) {
      photoUploadRef?.current?.close();
    }

    const formData = new FormData();

    let localUri = image.uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : 'image';

    formData.append('photo', {uri: localUri, name: filename, type});

    try {
      const {data: response} = await apiInstance.post(
        '/pets/image-upload',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      if (response?.data) {
        const {url} = response?.data;
        setPetPhotos([...petPhotos, url]);
      }
    } catch (err) {
      console.log('UPload Error', err);
    }
  };

  const onRemovePickedImages = useCallback(
    (index: number) => {
      if (Array.isArray(petPhotos)) {
        const removeImages = petPhotos?.filter(
          (image, imgIndex) => imgIndex !== index,
        );

        setPetPhotos(removeImages);
      }
    },
    [petPhotos],
  );

  return (
    <View>
      {Array.isArray(petPhotos) && petPhotos?.length >= 1 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: StyleConstants.Spacing.M,
          }}>
          {petPhotos?.map((image, index) => (
            <View key={index}>
              <Image
                source={{uri: image?.uri}}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  marginRight: StyleConstants.Spacing.S,
                  backgroundColor: colors.textDisable,
                }}
              />
              <Pressable
                onPress={() => onRemovePickedImages(index)}
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  bottom: 0,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 100,
                }}
                children={() => (
                  <Ionicons name="md-close" size={18} color={'#000'} />
                )}
              />
            </View>
          ))}
        </View>
      )}
      <Button
        title="Upload Photo"
        icon="md-camera-outline"
        disabled={petPhotos?.length == 5}
        onPress={() => photoUploadRef?.current?.open()}
      />

      <RBSheet
        ref={photoUploadRef}
        height={180}
        customStyles={{
          container: styles.photoUploaderContainer,
        }}>
        <View style={styles.photoUploaderHeader}>
          <ThemeText>Upload Photo</ThemeText>
          <Pressable onPress={() => photoUploadRef?.current?.close()}>
            <Ionicons name="md-close" size={24} color={'#000'} />
          </Pressable>
        </View>
        <View style={styles.photoUploaderContent}>
          <View style={styles.photoUploaderView}>
            <Pressable
              style={styles.photoUploaderCard}
              onPress={onLaunchDeviceCamera}
              children={() => (
                <Ionicons
                  name="md-camera-outline"
                  size={32}
                  color={colors.primary}
                />
              )}
            />
            <ThemeText fontStyle={'XS'} color={colors.textSecondary}>
              Take photo
            </ThemeText>
          </View>
          <View style={styles.photoUploaderView}>
            <Pressable
              style={styles.photoUploaderCard}
              onPress={onPickFromImageLibrary}
              children={() => (
                <Ionicons
                  name="md-images-outline"
                  size={30}
                  color={colors.primary}
                />
              )}
            />
            <ThemeText fontStyle={'XS'} color={colors.textSecondary}>
              From gallery
            </ThemeText>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  photoUploaderContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: StyleConstants.Spacing.M,
  },
  photoUploaderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photoUploaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  photoUploaderView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  photoUploaderCard: {
    backgroundColor: 'rgba(236, 65, 122, 0.2)',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: StyleConstants.Spacing.M,
    borderRadius: 5,
    marginBottom: StyleConstants.Spacing.S,
  },
});
export default PhotoUploader;
