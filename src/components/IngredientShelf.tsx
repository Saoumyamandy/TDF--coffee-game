import React, { useState } from 'react';
import { Ingredient, INGREDIENTS } from '../data/coffeeData';
import { PixelIcon } from './PixelIcons';

interface IngredientShelfProps {
  onAddIngredient: (ingredient: Ingredient) => void;
  currentIngredients: Ingredient[];
  onDragStartIngredient: (e: React.DragEvent, ingredient: Ingredient) => void;
}

export const IngredientShelf: React.FC<IngredientShelfProps> = ({
  onAddIngredient,
  currentIngredients,
  onDragStartIngredient,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'world'>('basic');

  const filteredIngredients = INGREDIENTS.filter((item) => item.tab === activeTab);

  const getIngredientCount = (id: string) => {
    return currentIngredients.filter((item) => item.id === id).length;
  };

  return (
    <div className="flex flex-col h-full bg-[#130D1F] border-4 border-[#2D1B42] pixel-box p-4 sm:p-5 relative overflow-hidden">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-[#25173B] pb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 text-sm">☕</span>
          <h2 className="pixel-font text-xs text-amber-200">
            INGREDIENTS
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('basic')}
            className={`pixel-btn px-3 py-1.5 text-[9px] pixel-font flex items-center gap-1.5 border-2 border-black transition-all ${
              activeTab === 'basic'
                ? 'bg-amber-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#1E132E] text-purple-200/60 hover:text-white'
            }`}
          >
            <PixelIcon name="espresso_shot" size={14} />
            <span>BASIC (9)</span>
          </button>

          <button
            onClick={() => setActiveTab('world')}
            className={`pixel-btn px-3 py-1.5 text-[9px] pixel-font flex items-center gap-1.5 border-2 border-black transition-all ${
              activeTab === 'world'
                ? 'bg-amber-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#1E132E] text-purple-200/60 hover:text-white'
            }`}
          >
            <PixelIcon name="cardamom_pods" size={14} />
            <span>WORLD (10)</span>
          </button>
        </div>
      </div>

      {/* Grid of Pixel Icon Slots with Text at Bottom */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 overflow-y-auto max-h-[500px] p-1 z-10">
        {filteredIngredients.map((ingredient) => {
          const count = getIngredientCount(ingredient.id);

          return (
            <div
              key={ingredient.id}
              draggable
              onDragStart={(e) => onDragStartIngredient(e, ingredient)}
              onClick={() => onAddIngredient(ingredient)}
              className="group relative flex flex-col items-center justify-between p-2.5 sm:p-3 min-h-[116px] sm:min-h-[128px] bg-[#1B112B] border-2 border-black shadow-[3px_3px_0px_#000] hover:border-amber-400 hover:bg-[#281A3F] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all duration-75 cursor-grab active:cursor-grabbing select-none"
              title={`${ingredient.name} · Click or drag to add`}
            >
              {/* Corner Count Badge if added to cup */}
              {count > 0 && (
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-amber-400 text-black pixel-font text-[8px] font-bold border border-black shadow-[1px_1px_0px_#000] z-10">
                  x{count}
                </div>
              )}

              {/* Centered Large Pixel Icon */}
              <div className="flex-1 w-full flex items-center justify-center py-1 group-hover:scale-110 transition-transform">
                <PixelIcon name={ingredient.id} size={56} />
              </div>

              {/* Ingredient Text at the Bottom */}
              <div className="w-full text-center border-t border-[#2F1D4A] pt-1.5 mt-0.5">
                <span className="pixel-sub font-bold text-[10px] sm:text-[11px] text-amber-100 group-hover:text-amber-300 block truncate leading-tight">
                  {ingredient.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
