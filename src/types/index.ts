export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  diet_type: string[];
  restrictions: string[];
  allergies: string[];
  calories_min: number;
  calories_max: number;
  max_cooking_time: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  steps: string[];
  calories: number;
  cooking_time: number;
  nutrition_facts: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  cuisine_type: string;
  diet_type: string[];
  image_url?: string;
  created_by: string;
}

export interface MealPlan {
  id: string;
  user_id: string;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe_id: string;
}

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Planner: undefined;
  Profile: undefined;
  RecipeDetail: { id: string };
  Settings: undefined;
};
