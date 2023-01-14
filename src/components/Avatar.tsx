import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';

export interface AvatarProps {
  src: string;
  size?: 'S' | 'M' | 'L';
}
const Avatar = ({src, size = "M"}: AvatarProps) => {
  const avatarSize = useMemo(() => {
    switch (size) {
      case 'S':
        return {width: 30, height: 30};
      case 'M':
        return {width: 42, height: 42};
      case 'L':
        return {width: 54, height: 54};
      default:
        return {width: 42, height: 42};
    }
  }, [size]);
  return (
    <FastImage
      style={{
        ...avatarSize,
        borderRadius: 100,
      }}
      source={{
        uri: src,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default Avatar;
