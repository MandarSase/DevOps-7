import React from 'react';
import { Filter } from 'lucide-react';
import { RecipeFilter } from '../types';

interface FiltersProps {
  cuisines: string[];
  categories: string[];
  dietaryOptions: string[];
  filters: RecipeFilter;
  onFilterChange: (newFilters: RecipeFilter) => void;
}

const Filters: React.FC<FiltersProps> = ({
  cuisines,
  categories,
  dietaryOptions,
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCuisineChange = (cuisine: string) => {
    onFilterChange({
      ...filters,
      cuisine: filters.cuisine === cuisine ? undefined : cuisine,
    });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleDietaryChange = (dietary: string) => {
    const currentDietary = filters.dietary || [];
    const newDietary = currentDietary.includes(dietary)
      ? currentDietary.filter((d) => d !== dietary)
      : [...currentDietary, dietary];
    
    onFilterChange({
      ...filters,
      dietary: newDietary.length ? newDietary : undefined,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = !!filters.cuisine || !!filters.category || (filters.dietary && filters.dietary.length > 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
          isOpen || hasActiveFilters 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="ml-1 w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">
            {(filters.cuisine ? 1 : 0) + 
             (filters.category ? 1 : 0) + 
             (filters.dietary?.length || 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-10 border border-amber-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-amber-900">Filters</h3>
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-amber-600 hover:text-amber-800"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Cuisine Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-amber-800 mb-2">Cuisine</h4>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineChange(cuisine)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.cuisine === cuisine
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-amber-800 mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.category === category
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Filter */}
          {dietaryOptions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-amber-800 mb-2">Dietary</h4>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((dietary) => (
                  <button
                    key={dietary}
                    onClick={() => handleDietaryChange(dietary)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      filters.dietary?.includes(dietary)
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {dietary}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;