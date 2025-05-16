import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Recipe, RecipeDetails } from './types';
import { searchRecipesByIngredients, getRecipeDetails } from './utils/api';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import EmptyState from './components/EmptyState';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = (ingredientName: string) => {
    if (!selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
      toast.success(`Added ${ingredientName}`);
    }
  };

  const handleRemoveIngredient = (ingredientName: string) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredientName));
    toast(`Removed ${ingredientName}`, {
      icon: '🗑️',
    });
  };

  const handleSearch = async () => {
    if (selectedIngredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    try {
      const results = await searchRecipesByIngredients(selectedIngredients);
      setRecipes(results);
    } catch (error) {
      toast.error('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipeId: number) => {
    try {
      const details = await getRecipeDetails(recipeId);
      setSelectedRecipe(details);
    } catch (error) {
      toast.error('Failed to fetch recipe details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#FFFBEB',
            color: '#92400E',
          },
        }}
      />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">What ingredients do you have?</h2>
            <div className="space-y-4">
              <IngredientInput
                ingredients={[]}
                selectedIngredients={selectedIngredients}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
              />
              <button
                onClick={handleSearch}
                disabled={loading || selectedIngredients.length === 0}
                className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg transition-colors"
              >
                {loading ? 'Searching...' : 'Find Recipes'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-900 mb-6">
            {recipes.length > 0 
              ? `${recipes.length} Recipe${recipes.length !== 1 ? 's' : ''} Found`
              : 'Discover Recipes'}
          </h2>
          
          {recipes.length === 0 ? (
            <EmptyState hasIngredients={selectedIngredients.length > 0} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default App;