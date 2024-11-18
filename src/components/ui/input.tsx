import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text } from './text';
import { Eye, EyeOff } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export interface InputProps extends TextInputProps {
  /**
   * 输入框标签
   */
  label?: string;
  /**
   * 错误信息
   */
  error?: string;
  /**
   * 左侧图标
   */
  leftIcon?: React.ReactNode;
  /**
   * 右侧图标
   */
  rightIcon?: React.ReactNode;
  /**
   * 额外的容器样式
   */
  containerClassName?: string;
  /**
   * 额外的输入框样式
   */
  className?: string;
}

/**
 * 输入框组件
 */
export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(!secureTextEntry);

    // 处理密码显示/隐藏
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </Text>
        )}
        <View className="relative">
          {leftIcon && (
            <View className="absolute left-3 h-full justify-center">
              {leftIcon}
            </View>
          )}
          <TextInput
            ref={ref}
            className={cn(
              'w-full bg-white rounded-lg border border-gray-300 px-4 py-2.5',
              'focus:border-primary focus:ring-1 focus:ring-primary',
              error && 'border-red-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureTextEntry && !showPassword}
            {...props}
          />
          {secureTextEntry ? (
            <TouchableOpacity
              className="absolute right-3 h-full justify-center"
              onPress={handleTogglePassword}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          ) : (
            rightIcon && (
              <View className="absolute right-3 h-full justify-center">
                {rightIcon}
              </View>
            )
          )}
        </View>
        {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
