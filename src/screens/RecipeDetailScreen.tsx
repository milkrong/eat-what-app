import React from 'react';
import { View, ScrollView, Image, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Clock,
  Flame,
  Heart,
  Share as ShareIcon,
  ChevronLeft,
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { NutritionFacts } from '@/components/recipes/NutritionFacts';
import { IngredientsList } from '@/components/recipes/IngredientsList';
import { CookingSteps } from '@/components/recipes/CookingSteps';
import { useRecipeDetail } from '@/hooks/useRecipeDetail';
import { useFavorites } from '@/hooks/useFavorites';
import { formatDuration } from '@/utils/format';
import type { Recipe } from '@/types';

export default function RecipeDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const recipeId = (route.params as { id: string }).id;

  const { data: recipe, isLoading } = useRecipeDetail(recipeId);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `查看美味食谱：${recipe?.name}`,
        url: `app://recipe/${recipe?.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading || !recipe) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="animate-pulse px-4 py-6">
          <View className="h-64 bg-gray-200 rounded-lg" />
          <View className="h-8 bg-gray-200 rounded mt-6 w-3/4" />
          <View className="h-4 bg-gray-200 rounded mt-4 w-1/2" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 顶部导航栏 */}
        <View className="absolute z-10 w-full flex-row justify-between items-center px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-md"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft className="text-gray-900" />
          </Button>
          <View className="flex-row space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 backdrop-blur-md"
              onPress={() => toggleFavorite(recipe.id)}
            >
              <Heart
                className={
                  isFavorite(recipe.id) ? 'text-red-500' : 'text-gray-900'
                }
                fill={isFavorite(recipe.id) ? '#ef4444' : 'none'}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 backdrop-blur-md"
              onPress={handleShare}
            >
              <ShareIcon className="text-gray-900" />
            </Button>
          </View>
        </View>

        {/* 封面图片 */}
        <Image
          source={{ uri: recipe.image_url || '/api/placeholder/400/300' }}
          className="h-72 w-full"
          resizeMode="cover"
        />

        {/* 基本信息 */}
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold">{recipe.name}</Text>
          <Text className="text-gray-500 mt-2">{recipe.description}</Text>

          <View className="flex-row mt-4 space-x-4">
            <View className="flex-row items-center">
              <Clock size={16} className="text-gray-500" />
              <Text className="text-gray-500 ml-1">
                {formatDuration(recipe.cooking_time)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Flame size={16} className="text-gray-500" />
              <Text className="text-gray-500 ml-1">{recipe.calories} 千卡</Text>
            </View>
          </View>

          {/* 营养成分 */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-4">营养成分</Text>
            <NutritionFacts facts={recipe.nutrition_facts} />
          </View>

          {/* 食材清单 */}
          <View className="mt-8">
            <Text className="text-lg font-semibold mb-4">食材清单</Text>
            <IngredientsList ingredients={recipe.ingredients} />
          </View>

          {/* 烹饪步骤 */}
          <View className="mt-8">
            <Text className="text-lg font-semibold mb-4">烹饪步骤</Text>
            <CookingSteps steps={recipe.steps} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
