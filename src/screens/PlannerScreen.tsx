import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, addDays, startOfWeek } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MealPlanDay } from '@/components/meals/MealPlanDay';
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan';

export default function PlannerScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startDate = startOfWeek(selectedDate, { locale: zhCN });

  const { plan, isLoading, generatePlan } = useWeeklyPlan(startDate);

  const weekDays = [...Array(7)].map((_, i) => {
    const date = addDays(startDate, i);
    return {
      date,
      dayName: format(date, 'E', { locale: zhCN }),
      dayNumber: format(date, 'd'),
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">膳食计划</Text>
          <Button onPress={generatePlan}>生成计划</Button>
        </View>

        {/* 日期选择器 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
        >
          <View className="flex-row space-x-2">
            {weekDays.map((day) => (
              <Card
                key={day.date.toISOString()}
                onPress={() => setSelectedDate(day.date)}
                className={`p-3 w-14 items-center ${
                  format(selectedDate, 'yyyy-MM-dd') ===
                  format(day.date, 'yyyy-MM-dd')
                    ? 'bg-primary'
                    : 'bg-white'
                }`}
              >
                <Text
                  className={`font-medium ${
                    format(selectedDate, 'yyyy-MM-dd') ===
                    format(day.date, 'yyyy-MM-dd')
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {day.dayName}
                </Text>
                <Text
                  className={`text-lg mt-1 ${
                    format(selectedDate, 'yyyy-MM-dd') ===
                    format(day.date, 'yyyy-MM-dd')
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {day.dayNumber}
                </Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4">
        <MealPlanDay
          date={selectedDate}
          meals={plan?.[format(selectedDate, 'yyyy-MM-dd')]}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
