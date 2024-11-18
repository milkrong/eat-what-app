import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface TextProps extends RNTextProps {
  /**
   * 文本内容
   */
  children?: React.ReactNode;
  /**
   * 额外的tailwind类名
   */
  className?: string;
  /**
   * 文本变体样式
   */
  variant?: 'default' | 'heading' | 'subheading' | 'caption';
}

/**
 * 自定义文本组件，统一管理文本样式
 */
export const Text = React.forwardRef<RNText, TextProps>(
  ({ className, variant = 'default', style, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={cn(
          'text-base text-gray-900',
          {
            'text-2xl font-bold': variant === 'heading',
            'text-lg font-semibold': variant === 'subheading',
            'text-sm text-gray-500': variant === 'caption',
          },
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
