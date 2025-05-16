import React from 'react';
import { X, Clock, Users } from 'lucide-react';
import { RecipeDetails } from '../types';

interface RecipeModalProps {
  recipe: RecipeDetails;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-amber-900" />
        </button>
        
        <div className="h-72 w-full relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {recipe.cuisines.map((cuisine) => (
                <span key={cuisine} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  {cuisine}
                </span>
              ))}
              {recipe.diets.map((diet) => (
                <span key={diet} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {diet}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
            <p className="text-white/90 text-sm mt-1" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </div>
        </div>
        
        <div className="flex justify-center gap-6 py-4 border-b border-amber-100">
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-amber-700 mb-1" />
            <span className="text-sm font-medium text-amber-900">{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-5 h-5 text-amber-700 mb-1" />
            <span className="text-sm font-medium text-amber-900">{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-center gap-2 text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Instructions</h3>
              <div 
                className="prose prose-amber"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;