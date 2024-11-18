import React from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock, Flame } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types';
import { formatDuration } from '@/utils/format';

interface Props {
  meal?: Recipe;
  isLoading?: boolean;
}

export function MealRecommendation({ meal, isLoading }: Props) {
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View className="animate-pulse">
        <View className="h-48 bg-gray-200 rounded-lg" />
        <View className="h-6 bg-gray-200 rounded mt-4 w-3/4" />
        <View className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View className="items-center py-8">
        <Text className="text-gray-500">暂无推荐</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={{ uri: meal.image_url || '/api/placeholder/400/300' }}
        className="h-48 w-full rounded-lg"
        resizeMode="cover"
      />
      <View className="mt-4">
        <Text className="text-xl font-semibold">{meal.name}</Text>
        <Text className="text-gray-500 mt-1" numberOfLines={2}>
          {meal.description}
        </Text>

        <View className="flex-row mt-4 space-x-4">
          <View className="flex-row items-center">
            <Clock size={16} className="text-gray-500" />
            <Text className="text-gray-500 ml-1">
              {formatDuration(meal.cooking_time)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Flame size={16} className="text-gray-500" />
            <Text className="text-gray-500 ml-1">{meal.calories} 千卡</Text>
          </View>
        </View>

        <View className="flex-row mt-4 space-x-2">
          <Button
            className="flex-1"
            onPress={() => navigation.navigate('RecipeDetail', { id: meal.id })}
          >
            查看详情
          </Button>
        </View>
      </View>
    </View>
  );
}
