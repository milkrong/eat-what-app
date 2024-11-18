import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

interface NutritionFactsProps {
  facts: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export function NutritionFacts({ facts }: NutritionFactsProps) {
  const nutritionItems = [
    { label: '蛋白质', value: facts.protein, unit: 'g' },
    { label: '碳水', value: facts.carbs, unit: 'g' },
    { label: '脂肪', value: facts.fat, unit: 'g' },
    { label: '膳食纤维', value: facts.fiber, unit: 'g' },
  ];

  return (
    <View className="flex-row justify-between">
      {nutritionItems.map((item) => (
        <Card key={item.label} className="bg-white p-3 items-center w-[23%]">
          <Text className="text-lg font-semibold">
            {item.value}
            <Text className="text-sm font-normal text-gray-500">
              {item.unit}
            </Text>
          </Text>
          <Text className="text-xs text-gray-500 mt-1">{item.label}</Text>
        </Card>
      ))}
    </View>
  );
}
