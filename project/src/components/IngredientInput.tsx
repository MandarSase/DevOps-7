import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientInputProps {
  ingredients: Ingredient[];
  selectedIngredients: string[];
  onAddIngredient: (ingredientName: string) => void;
  onRemoveIngredient: (ingredientName: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Ingredient[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedIngredients.includes(ingredient.name)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients, selectedIngredients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddIngredient = (ingredientName: string) => {
    if (ingredientName.trim() && !selectedIngredients.includes(ingredientName)) {
      onAddIngredient(ingredientName);
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleAddIngredient(inputValue);
    }
  };

  const handleSuggestionClick = (ingredientName: string) => {
    handleAddIngredient(ingredientName);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 p-2 border-b border-amber-200">
        <Search className="text-amber-700 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setShowSuggestions(true)}
          placeholder="Add ingredients you have..."
          className="flex-1 bg-transparent outline-none text-amber-900"
          aria-label="Add ingredient"
        />
        <button
          onClick={() => handleAddIngredient(inputValue)}
          disabled={!inputValue.trim()}
          className="p-1 rounded-full bg-amber-100 text-amber-800 disabled:opacity-50 transition-colors hover:bg-amber-200"
          aria-label="Add ingredient"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-md shadow-lg border border-amber-200"
        >
          {filteredSuggestions.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => handleSuggestionClick(ingredient.name)}
              className="px-4 py-2 cursor-pointer hover:bg-amber-50 transition-colors"
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected ingredients */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedIngredients.map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium group hover:bg-amber-200 transition-colors"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => onRemoveIngredient(ingredient)}
              className="ml-1 rounded-full p-0.5 hover:bg-amber-300 transition-colors"
              aria-label={`Remove ${ingredient}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;