import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleConstants} from '~utils/styles/constants';
import Button from './widgets/Button';
import ThemeText from './widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '~utils/styles/ThemeManager';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PhotoUploader = () => {
  const {colors} = useTheme();
  const photoUploadRef = useRef<RBSheet>(null);
  const [dummyImages, setDummyImage] = useState<string | string[]>([]);

  const onPickFromImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result?.assets) {
      const {uri} = result?.assets[0];
      onPerformPhoto(uri);
    }
  };

  const onLaunchDeviceCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});

    if (result?.assets) {
      const {uri} = result?.assets[0];
      onPerformPhoto(uri);
    }
  };

  const onPerformPhoto = (imageUrl: string) => {
    if (photoUploadRef) {
      photoUploadRef?.current?.close();
    }

    setDummyImage([...dummyImages, imageUrl]);
  };

  const onRemovePickedImages = useCallback(
    (index: number) => {
      if (Array.isArray(dummyImages)) {
        const removeImages = dummyImages?.filter(
          (image, imgIndex) => imgIndex !== index,
        );

        setDummyImage(removeImages);
      }
    },
    [dummyImages],
  );
  return (
    <View>
      {Array.isArray(dummyImages) && dummyImages?.length >= 1 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: StyleConstants.Spacing.M,
          }}>
          {dummyImages?.map((image, index) => (
            <View>
              <Image
                key={index}
                source={{uri: image}}
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
        disabled={dummyImages?.length == 5}
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
  },
  photoUploaderCard: {
    backgroundColor: 'rgba(236, 65, 122, 0.2)',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: StyleConstants.Spacing.M,
    borderRadius: 5,
    marginBottom: StyleConstants.Spacing.M,
  },
});
export default PhotoUploader;
