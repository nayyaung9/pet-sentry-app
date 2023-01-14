import React, { useState } from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { Blurhash } from "react-native-blurhash";
import FastImage, { ImageStyle } from "react-native-fast-image";

export interface Props {
  uri: { original?: string; remote?: string; static?: string };
  blurHash?: string;
  hidden?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  setImageDimensions?: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}

const NeatlyImage = ({
  uri,
  blurHash,
  hidden = false,
  imageStyle,
  containerStyle,
  setImageDimensions,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const source = {
    uri: uri.remote,
  };

  const imageOnLoad = () => {
    setImageLoaded(true);
    if (setImageDimensions && source.uri) {
      Image.getSize(source.uri, (width, height) =>
        setImageDimensions({ width, height })
      );
    }
  };

  const blurhashView = () => {
    if (hidden || !imageLoaded) {
      if (blurHash) {
        return (
          <View style={[containerStyle]}> 
            <Blurhash decodeAsync blurhash={blurHash} style={{ flex: 1 }} />
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <FastImage
        source={{
          uri: uri.remote,
        }}
        style={[{ flex: 1 }, imageStyle]}
        onLoad={imageOnLoad}
      />
      {blurhashView()}
    </>
  );
};

export default NeatlyImage;
