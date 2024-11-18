import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';

export interface BadgeProps extends ViewProps {
  /**
   * 徽章内容
   */
  children: React.ReactNode;
  /**
   * 变体样式
   */
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  /**
   * 额外的样式类
   */
  className?: string;
}

/**
 * 徽章组件
 */
export const Badge = React.forwardRef<View, BadgeProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-primary',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      outline: 'border border-primary',
    };

    const textStyles = {
      default: 'text-white',
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-primary',
    };

    return (
      <View
        ref={ref}
        className={cn(
          'px-2.5 py-0.5 rounded-full items-center justify-center',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text className={cn('text-xs font-medium', textStyles[variant])}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

Badge.displayName = 'Badge';
