import React from 'react';
import { Search, ChefHat } from 'lucide-react';

interface EmptyStateProps {
  hasIngredients: boolean;
  onQuickSearch?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasIngredients, onQuickSearch }) => {
  if (hasIngredients) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="bg-amber-100 p-4 rounded-full mb-4">
          <Search className="w-8 h-8 text-amber-700" />
        </div>
        <h3 className="text-xl font-semibold text-amber-900 mb-2">No matching recipes found</h3>
        <p className="text-amber-700 mb-6 max-w-md">
          We couldn't find any recipes that match your ingredients and filters. Try removing some filters or adding more ingredients.
        </p>
        {onQuickSearch && (
          <button
            onClick={onQuickSearch}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors"
          >
            Show all recipes
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-amber-100 p-6 rounded-full mb-6 animate-pulse">
        <ChefHat className="w-12 h-12 text-amber-700" />
      </div>
      <h3 className="text-2xl font-semibold text-amber-900 mb-3">What's in your kitchen?</h3>
      <p className="text-amber-700 mb-8 max-w-lg">
        Add the ingredients you have, and we'll suggest delicious recipes you can make right now.
      </p>
      <div className="flex items-center justify-center text-amber-600">
        <div className="w-2 h-2 bg-amber-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default EmptyState;