import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MealRecommendation } from '@/components/meals/MealRecommendation';
import { getRecommendations } from '@/services/api';
import { usePreferences } from '@/hooks/usePreferences';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { preferences } = usePreferences();
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data: recommendations,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['recommendations', preferences],
    queryFn: () => getRecommendations(preferences),
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 今日推荐 */}
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold mb-4">今日推荐</Text>
          <Card className="bg-white p-4 rounded-xl shadow-sm">
            <MealRecommendation
              meal={recommendations?.today}
              isLoading={isLoading}
            />
            <Button
              onPress={() => refetch()}
              className="mt-4"
              variant="outline"
            >
              换一个
            </Button>
          </Card>
        </View>

        {/* 快捷操作 */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold mb-3">快捷操作</Text>
          <View className="flex-row justify-between">
            <Card
              onPress={() => navigation.navigate('Planner')}
              className="bg-white p-4 rounded-xl w-[48%]"
            >
              <Text className="font-medium">生成周计划</Text>
              <Text className="text-gray-500 text-sm mt-1">
                一键生成本周食谱
              </Text>
            </Card>
            <Card
              onPress={() => navigation.navigate('Preferences')}
              className="bg-white p-4 rounded-xl w-[48%]"
            >
              <Text className="font-medium">调整偏好</Text>
              <Text className="text-gray-500 text-sm mt-1">个性化你的推荐</Text>
            </Card>
          </View>
        </View>

        {/* 收藏的食谱 */}
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">收藏的食谱</Text>
            <Button
              variant="ghost"
              onPress={() =>
                navigation.navigate('Recipes', { filter: 'favorites' })
              }
            >
              查看全部
            </Button>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {/* 收藏的食谱卡片 */}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
