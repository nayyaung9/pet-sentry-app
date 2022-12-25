import {StyleConstants} from '~utils/styles/constants';
import React, {useMemo} from 'react';
import {Pressable} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {useTheme} from '~utils/styles/ThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface Props {
  type?: 'icon' | 'text';
  content?: string;
  native?: boolean;
  background?: boolean;

  onPress: () => void;
}

const HeaderLeft: React.FC<Props> = ({
  type = 'icon',
  content,
  native = true,
  background = false,
  onPress,
}) => {
  const {colors, theme} = useTheme();

  const children = useMemo(() => {
    switch (type) {
      case 'icon':
        return (
          <Ionicons name={content || 'md-arrow-back'} size={24} color={colors.primary} />
        );
      case 'text':
        return (
          <ThemeText
            fontStyle="M"
            style={{color: colors.primary}}
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
        backgroundColor: background ? colors.background : undefined,
        minHeight: 44,
        minWidth: 44,
        marginLeft: native
          ? -StyleConstants.Spacing.S
          : StyleConstants.Spacing.S,
        ...(type === 'text' && {
          paddingHorizontal: StyleConstants.Spacing.S,
        }),
      }}
    />
  );
};

export default HeaderLeft;
