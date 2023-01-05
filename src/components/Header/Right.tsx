import React, {CSSProperties, useMemo} from 'react';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import {AccessibilityProps, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface Props {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityProps['accessibilityState'];

  type?: 'icon' | 'text';
  content: string;
  native?: boolean;
  background?: boolean;

  loading?: boolean;
  disabled?: boolean;

  onPress: () => void;

  color?: CSSProperties['color']
}

const HeaderRight: React.FC<Props> = ({
  // Accessibility - Start
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  // Accessibility - End
  type = 'icon',
  content,
  native = true,
  background = false,
  loading,
  disabled,
  onPress,
  color,
}) => {
  const {colors, theme} = useTheme();

  // const loadingSpinkit = useMemo(
  //   () => (
  //     <View style={{ position: 'absolute' }}>
  //       <Flow
  //         size={StyleConstants.Font.Size.M * 1.25}
  //         color={colors.secondary}
  //       />
  //     </View>
  //   ),
  //   [theme]
  // )

  const children = useMemo(() => {
    switch (type) {
      case 'icon':
        return (
          <>
            <Ionicons name={content} size={24} color={color || colors.primary} />
          </>
        );
      case 'text':
        return (
          <>
            <ThemeText
              fontStyle="M"
              style={{
                color: disabled ? '#f0f2f5' : colors.primary,
                opacity: loading ? 0 : 1,
              }}
              children={content}
            />
          </>
        );
    }
  }, [theme, loading, disabled]);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={onPress}
      children={children}
      disabled={disabled || loading}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 44,
        minWidth: 44,
        marginRight: native
          ? -StyleConstants.Spacing.S
          : StyleConstants.Spacing.S,
        ...(type === 'icon' && {
          borderRadius: 100,
        }),
        ...(type === 'text' && {
          paddingHorizontal: StyleConstants.Spacing.S,
        }),
      }}
    />
  );
};

export default HeaderRight;
