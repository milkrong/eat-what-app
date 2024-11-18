import React from 'react';
import { ActivityIndicator, View, ViewProps } from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends ViewProps {
  /**
   * 加载文本
   */
  text?: string;
  /**
   * 大小
   */
  size?: 'small' | 'large';
  /**
   * 颜色
   */
  color?: string;
  /**
   * 额外的样式类
   */
  className?: string;
}

/**
 * 加载器组件
 */
export const Spinner = React.forwardRef<View, SpinnerProps>(
  ({ text, size = 'small', color = '#4F46E5', className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('items-center justify-center', className)}
        {...props}
      >
        <ActivityIndicator size={size} color={color} />
        {text && <Text className="text-sm text-gray-500 mt-2">{text}</Text>}
      </View>
    );
  }
);

Spinner.displayName = 'Spinner';
