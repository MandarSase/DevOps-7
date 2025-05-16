import React from 'react';
import { Utensils } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-amber-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">PantryChef</h1>
        </div>
        <div className="text-white text-sm font-medium">
          Find recipes with what you have
        </div>
      </div>
    </header>
  );
};

export default Header;