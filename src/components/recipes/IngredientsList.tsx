import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <Card className="bg-white p-4 rounded-xl">
      <View className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <View
            key={`${ingredient.name}-${index}`}
            className="flex-row justify-between items-center"
          >
            <Text className="text-gray-900">{ingredient.name}</Text>
            <Text className="text-gray-500">
              {ingredient.amount} {ingredient.unit}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
