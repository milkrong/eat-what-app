import { TouchableOpacityProps, TextInputProps } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  className?: string;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}
