import React, { useState } from 'react';
import { X, Search, CheckCircle2, Lock, BookOpen } from 'lucide-react';
import { CoffeeDrink, COFFEE_DRINKS, INGREDIENTS } from '../data/coffeeData';
import { PixelIcon } from './PixelIcons';

interface RecipeBookModalProps {
  discoveredDrinkIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeBookModal: React.FC<RecipeBookModalProps> = ({
  discoveredDrinkIds,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'discovered' | 'undiscovered' | 'classic' | 'world'>('all');

  if (!isOpen) return null;

  const totalDiscovered = discoveredDrinkIds.length;
  const progressPercent = Math.round((totalDiscovered / COFFEE_DRINKS.length) * 100);

  const filteredDrinks = COFFEE_DRINKS.filter((drink) => {
    const isDiscovered = discoveredDrinkIds.includes(drink.id);

    if (filterType === 'discovered' && !isDiscovered) return false;
    if (filterType === 'undiscovered' && isDiscovered) return false;
    if (filterType === 'classic' && drink.category !== 'Classic') return false;
    if (filterType === 'world' && drink.category !== 'World') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = drink.name.toLowerCase().includes(q);
      const matchOrigin = drink.origin.toLowerCase().includes(q);
      const matchHint = drink.hint.toLowerCase().includes(q);
      const matchFact = isDiscovered && drink.fact.toLowerCase().includes(q);
      return matchName || matchOrigin || matchHint || matchFact;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#140D21] border-4 border-[#2D1B42] pixel-box p-4 sm:p-5 flex flex-col overflow-hidden shadow-[8px_8px_0px_#000]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#25173B]">
          <div className="flex items-center gap-2">
            <span className="text-base">🌙</span>
            <h2 className="pixel-font text-xs sm:text-sm text-[#FDE047]">
              RECIPE ARCHIVE ({totalDiscovered}/20)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="pixel-btn w-7 h-7 bg-[#25173B] hover:bg-[#3D2561] text-purple-200 border-2 border-black flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 20 Segmented Progress Bar */}
        <div className="py-2.5 border-b-2 border-[#25173B]">
          <div className="flex items-center justify-between text-[9px] pixel-font text-purple-300 mb-1.5">
            <span>UNLOCKED: {totalDiscovered} / 20</span>
            <span className="text-[#FDE047]">{progressPercent}%</span>
          </div>

          <div className="grid grid-cols-20 gap-1 h-3 bg-black/70 p-1 border border-black">
            {COFFEE_DRINKS.map((d, index) => {
              const isFound = discoveredDrinkIds.includes(d.id);
              return (
                <div
                  key={index}
                  className={`h-full border border-black ${
                    isFound ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' : 'bg-[#201533]'
                  }`}
                  title={`${d.name}: ${isFound ? 'Discovered' : 'Locked'}`}
                />
              );
            })}
          </div>
        </div>

        {/* Minimal Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 py-2.5 border-b-2 border-[#25173B]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full pl-8 pr-2.5 py-1 bg-[#0E071A] border-2 border-black pixel-sub text-xs text-amber-100 placeholder-purple-400/40 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'discovered', label: `UNLOCKED (${totalDiscovered})` },
              { id: 'undiscovered', label: `LOCKED (${20 - totalDiscovered})` },
              { id: 'classic', label: 'CLASSIC' },
              { id: 'world', label: 'WORLD' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as typeof filterType)}
                className={`pixel-btn px-2 py-1 text-[8px] pixel-font whitespace-nowrap border-2 border-black ${
                  filterType === tab.id
                    ? 'bg-amber-600 text-white shadow-[2px_2px_0px_#000]'
                    : 'bg-[#1E132E] text-purple-300/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of Drinks */}
        <div className="flex-1 overflow-y-auto py-2.5 grid grid-cols-1 md:grid-cols-2 gap-2 pr-1">
          {filteredDrinks.map((drink) => {
            const isDiscovered = discoveredDrinkIds.includes(drink.id);
            const recipeIngredients = drink.ingredients
              .map((id) => INGREDIENTS.find((i) => i.id === id))
              .filter(Boolean);

            return (
              <div
                key={drink.id}
                className={`p-3 border-2 border-black shadow-[2px_2px_0px_#000] flex flex-col justify-between ${
                  isDiscovered ? 'bg-[#1D122E]' : 'bg-[#0E0817] opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{isDiscovered ? drink.flag : '☕'}</span>
                      <div>
                        <h3 className="pixel-sub font-bold text-xs text-amber-100 flex items-center gap-1">
                          <span>{drink.name}</span>
                          {isDiscovered && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </h3>
                        <span className="pixel-sub text-[9px] text-purple-300">
                          {isDiscovered ? drink.origin : 'Secret Recipe'}
                        </span>
                      </div>
                    </div>

                    <span className="pixel-font text-[7px] px-1 bg-black text-[#FDE047]">
                      {drink.category}
                    </span>
                  </div>

                  {isDiscovered ? (
                    <>
                      <p className="pixel-sub text-[11px] text-amber-100/90 leading-tight mb-2 bg-[#120A1F] p-1.5 border border-[#2B1B40]">
                        "{drink.fact}"
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {recipeIngredients.map((ing) => (
                          <span
                            key={ing?.id}
                            className="pixel-sub text-[9px] px-1.5 py-0.5 bg-[#0A0512] border border-black text-amber-200 flex items-center gap-1.5"
                          >
                            <PixelIcon name={ing?.id || ''} size={14} />
                            <span>{ing?.name}</span>
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="my-1.5 p-2 bg-black/50 border border-[#2B1B40]">
                      <div className="flex items-center gap-1 pixel-font text-[7px] text-[#FDE047] mb-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>CLUE:</span>
                      </div>
                      <p className="pixel-sub text-[10px] text-purple-200/80 italic">
                        "{drink.hint}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t-2 border-[#25173B] flex items-center justify-end">
          <button
            onClick={onClose}
            className="pixel-btn px-3 py-1.5 pixel-font text-[9px] bg-amber-600 hover:bg-amber-500 text-white border-2 border-black"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
