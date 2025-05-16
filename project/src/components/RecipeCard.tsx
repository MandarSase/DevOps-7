import React from 'react';
import { Clock, ThumbsUp } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-amber-900 mb-2 line-clamp-1">{recipe.title}</h3>
        
        <div className="flex justify-between items-center text-amber-700 text-sm mt-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.usedIngredientCount} matched</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span>{recipe.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;