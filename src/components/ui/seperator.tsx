import React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

export interface SeparatorProps {
  /**
   * 分隔线方向
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 额外的样式类
   */
  className?: string;
}

/**
 * 分隔线组件
 */
export const Separator = React.forwardRef<View, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'shrink-0 bg-gray-200',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
