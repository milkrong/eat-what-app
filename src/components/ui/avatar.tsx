import React from 'react';
import { Image, View, ImageProps } from 'react-native';
import { User } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export interface AvatarProps extends Omit<ImageProps, 'source'> {
  /**
   * 图片URL
   */
  source?: string;
  /**
   * 大小
   */
  size?: 'sm' | 'md' | 'lg' | number;
  /**
   * 额外的样式类
   */
  className?: string;
}

/**
 * 头像组件
 */
export const Avatar = React.forwardRef<Image, AvatarProps>(
  ({ source, size = 'md', className, ...props }, ref) => {
    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 48,
    };

    const dimension = typeof size === 'number' ? size : sizeMap[size];

    if (!source) {
      return (
        <View
          className={cn(
            'bg-gray-100 rounded-full items-center justify-center',
            className
          )}
          style={{ width: dimension, height: dimension }}
        >
          <User size={dimension * 0.6} color="#9CA3AF" />
        </View>
      );
    }

    return (
      <Image
        ref={ref}
        source={{ uri: source }}
        className={cn('rounded-full', className)}
        style={{ width: dimension, height: dimension }}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
