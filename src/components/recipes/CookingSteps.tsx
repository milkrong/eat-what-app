import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

interface CookingStepsProps {
  steps: string[];
}

export function CookingSteps({ steps }: CookingStepsProps) {
  return (
    <View className="space-y-4">
      {steps.map((step, index) => (
        <Card key={index} className="bg-white p-4 rounded-xl">
          <View className="flex-row">
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Text className="text-white font-medium">{index + 1}</Text>
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-900 leading-6">{step}</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
