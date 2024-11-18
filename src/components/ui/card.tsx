import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';
import { cn } from '@/lib/utils';

export interface CardProps extends ViewProps {
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
  /**
   * 额外的tailwind类名
   */
  className?: string;
  /**
   * 点击事件
   */
  onPress?: TouchableOpacityProps['onPress'];
  /**
   * 是否禁用点击
   */
  disabled?: boolean;
}

/**
 * 卡片组件，可以是可点击的或静态的
 */
export const Card = React.forwardRef<View, CardProps>(
  ({ className, children, onPress, disabled, style, ...props }, ref) => {
    const Wrapper = onPress ? TouchableOpacity : View;

    return (
      <Wrapper
        ref={ref}
        className={cn(
          'bg-white rounded-xl shadow-sm overflow-hidden',
          disabled && 'opacity-50',
          className
        )}
        style={style}
        onPress={disabled ? undefined : onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </Wrapper>
    );
  }
);

Card.displayName = 'Card';
