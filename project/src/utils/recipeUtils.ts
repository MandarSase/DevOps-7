import { Recipe, RecipeFilter } from '../types';

export const findRecipesByIngredients = (
  availableIngredients: string[],
  allRecipes: Recipe[],
  filters?: RecipeFilter
): Recipe[] => {
  if (!availableIngredients.length) return [];

  // Convert ingredients to lowercase for case-insensitive matching
  const normalizedIngredients = availableIngredients.map(ing => ing.toLowerCase());

  // Filter recipes based on ingredient match
  return allRecipes.filter(recipe => {
    // Calculate how many of the recipe's ingredients we have
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    
    // Count matching ingredients
    const matchingCount = recipeIngredients.filter(ingredient => 
      normalizedIngredients.some(userIngredient => 
        ingredient.includes(userIngredient) || userIngredient.includes(ingredient)
      )
    ).length;
    
    // Recipe is a match if we have at least 60% of ingredients
    const matchPercentage = (matchingCount / recipeIngredients.length) * 100;
    const isIngredientMatch = matchPercentage >= 60;
    
    // Apply additional filters if provided
    let isFilterMatch = true;
    
    if (filters) {
      if (filters.cuisine && recipe.cuisine !== filters.cuisine) {
        isFilterMatch = false;
      }
      
      if (filters.category && recipe.category !== filters.category) {
        isFilterMatch = false;
      }
      
      if (filters.dietary && filters.dietary.length > 0) {
        const hasDietary = filters.dietary.every(diet => 
          recipe.dietary.includes(diet)
        );
        if (!hasDietary) {
          isFilterMatch = false;
        }
      }
    }
    
    return isIngredientMatch && isFilterMatch;
  });
};

export const getUniqueCuisines = (recipes: Recipe[]): string[] => {
  const cuisines = new Set(recipes.map(recipe => recipe.cuisine));
  return Array.from(cuisines).sort();
};

export const getUniqueCategories = (recipes: Recipe[]): string[] => {
  const categories = new Set(recipes.map(recipe => recipe.category));
  return Array.from(categories).sort();
};

export const getUniqueDietary = (recipes: Recipe[]): string[] => {
  const dietary = new Set(recipes.flatMap(recipe => recipe.dietary));
  return Array.from(dietary).sort();
};