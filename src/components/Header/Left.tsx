import {StyleConstants} from '~utils/styles/constants';
import React, {CSSProperties, useMemo} from 'react';
import {Pressable} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {useTheme} from '~utils/styles/ThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface Props {
  type?: 'icon' | 'text';
  content?: string;
  native?: boolean;
  background?: string;
  rounded?: boolean;
  onPress: () => void;
  color?: CSSProperties["color"]
}

const HeaderLeft: React.FC<Props> = ({
  type = 'icon',
  content,
  native = true,
  background,
  rounded = false,
  onPress,
  color,
}) => {
  const {colors, theme} = useTheme();

  const children = useMemo(() => {
    switch (type) {
      case 'icon':
        return (
          <Ionicons
            name={content || 'md-arrow-back'}
            size={24}
            color={color || colors.primary}
          />
        );
      case 'text':
        return (
          <ThemeText
            fontStyle="M"
            style={{color: color || colors.primary}}
            children={content}
          />
        );
    }
  }, [theme]);

  return (
    <Pressable
      onPress={onPress}
      children={children}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: background ? background : 'transparent',
        minHeight: 44,
        minWidth: 44,
        marginLeft: native
          ? -StyleConstants.Spacing.S
          : StyleConstants.Spacing.S,
        ...(type === 'text' && {
          paddingHorizontal: StyleConstants.Spacing.S,
        }),
        ...(rounded && {borderRadius: 100}),
      }}
    />
  );
};

export default HeaderLeft;
