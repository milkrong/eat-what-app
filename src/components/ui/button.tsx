import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * 按钮文字
   */
  children?: React.ReactNode;
  /**
   * 按钮变体
   */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /**
   * 按钮大小
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * 加载状态
   */
  loading?: boolean;
  /**
   * 图标
   */
  icon?: React.ReactNode;
  /**
   * 图标位置
   */
  iconPosition?: 'left' | 'right';
  /**
   * 额外的样式类
   */
  className?: string;
}

/**
 * 按钮组件
 */
export const Button = React.forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'default',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // 基础样式
    const baseStyles = 'flex-row items-center justify-center rounded-lg';

    // 变体样式
    const variantStyles = {
      default: 'bg-primary hover:bg-primary/90',
      primary: 'bg-primary hover:bg-primary/90',
      secondary: 'bg-secondary hover:bg-secondary/90',
      outline: 'border border-input bg-background hover:bg-accent',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline',
    };

    // 尺寸样式
    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-12 px-8',
      icon: 'h-10 w-10',
    };

    // 禁用或加载状态样式
    const stateStyles = disabled || loading ? 'opacity-50' : '';

    // 文字颜色
    const textColorStyles = {
      default: 'text-white',
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-gray-900',
      ghost: 'text-gray-900',
      link: 'text-primary',
    };

    return (
      <TouchableOpacity
        ref={ref as React.LegacyRef<typeof TouchableOpacity>}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          stateStyles,
          className
        )}
        style={style}
        activeOpacity={0.7}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'outline' || variant === 'ghost' ? '#000' : '#fff'
            }
          />
        ) : (
          <View className="flex-row items-center">
            {icon && iconPosition === 'left' && (
              <View className="mr-2">{icon}</View>
            )}
            {typeof children === 'string' ? (
              <Text className={cn('font-medium', textColorStyles[variant])}>
                {children}
              </Text>
            ) : (
              children
            )}
            {icon && iconPosition === 'right' && (
              <View className="ml-2">{icon}</View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
