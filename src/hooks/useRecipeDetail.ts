import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Recipe } from '@/types';

export function useRecipeDetail(id: string) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: async (): Promise<Recipe> => {
      const { data, error } = await supabase
        .from('recipes')
        .select(
          `
          *,
          profiles:created_by (
            username,
            avatar_url
          )
        `
        )
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });
}
