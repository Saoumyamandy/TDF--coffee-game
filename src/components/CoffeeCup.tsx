import React, { useState } from 'react';
import { Sparkles, Trash2, CheckCircle2 } from 'lucide-react';
import { Ingredient, CoffeeDrink } from '../data/coffeeData';
import { PixelIcon } from './PixelIcons';

export type CupStyle = 'mug' | 'glass' | 'clay' | 'demitasse';

interface CoffeeCupProps {
  currentIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
  onClearCup: () => void;
  onBrewDrink: () => void;
  matchedDrink: CoffeeDrink | null;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  selectedCup: CupStyle;
  onSelectCup: (cup: CupStyle) => void;
}

const CUP_OPTIONS: { id: CupStyle; label: string; icon: string }[] = [
  { id: 'mug', label: 'MIDNIGHT MUG', icon: '☕' },
  { id: 'glass', label: 'NEON GLASS', icon: '🥃' },
  { id: 'clay', label: 'CLAY OLLA', icon: '🏺' },
  { id: 'demitasse', label: 'DEMITASSE', icon: '✨' },
];

export const CoffeeCup: React.FC<CoffeeCupProps> = ({
  currentIngredients,
  onRemoveIngredient,
  onClearCup,
  onBrewDrink,
  matchedDrink,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  selectedCup,
  onSelectCup,
}) => {
  const [isBrewingAnim, setIsBrewingAnim] = useState(false);

  const hasEspresso = currentIngredients.some((i) => i.id === 'espresso_shot');
  const hasMilk = currentIngredients.some((i) => i.id === 'steamed_milk');
  const hasCondensedMilk = currentIngredients.some((i) => i.id === 'condensed_milk');
  const hasEggYolk = currentIngredients.some((i) => i.id === 'egg_yolk');
  const hasFoam = currentIngredients.some((i) => i.id === 'milk_foam');
  const hasWhippedCream = currentIngredients.some((i) => i.id === 'whipped_cream');
  const hasIce = currentIngredients.some((i) => i.id === 'ice_cubes');
  const hasCocoa = currentIngredients.some((i) => i.id === 'cocoa_powder');
  const hasCaramel = currentIngredients.some((i) => i.id === 'caramel_sauce');
  const hasCinnamon = currentIngredients.some((i) => i.id === 'cinnamon_stick');
  const hasOrange = currentIngredients.some((i) => i.id === 'orange_peel');
  const hasCardamom = currentIngredients.some((i) => i.id === 'cardamom_pods');
  const hasHotWater = currentIngredients.some((i) => i.id === 'hot_water');
  const hasTea = currentIngredients.some((i) => i.id === 'black_tea');

  const handleBrewClick = () => {
    setIsBrewingAnim(true);
    setTimeout(() => {
      setIsBrewingAnim(false);
      onBrewDrink();
    }, 320);
  };

  // Flat solid color for liquid inside the glass (Zero gradient - simple clean look)
  const getLiquidColor = () => {
    if (currentIngredients.length === 0) return 'transparent';
    if (hasEggYolk) return '#EAB308'; // flat golden custard
    if (hasTea && hasCondensedMilk) return '#854D0E'; // flat milk tea tone
    if (hasEspresso && hasMilk) return '#966345'; // flat latte brown
    if (hasEspresso && hasHotWater) return '#3B1A08'; // flat Americano
    if (hasEspresso) return '#241006'; // flat bold espresso
    if (hasMilk) return '#F5EBE1'; // flat milk
    if (hasHotWater) return '#93C5FD'; // flat clear water
    return '#6B3818';
  };

  const fillPercentage = Math.min(100, Math.max(0, currentIngredients.length * 20));

  // Determine Cup Dimensions & Style Classes (Transparent glass look, no white fill)
  const getCupVesselClasses = () => {
    switch (selectedCup) {
      case 'glass':
        // Pure transparent glass - no white background, transparent with subtle glass outline
        return 'w-44 sm:w-48 h-64 sm:h-72 border-4 border-white/25 bg-transparent';
      case 'clay':
        return 'w-52 sm:w-56 h-60 sm:h-64 border-4 border-[#5E2B1D] bg-[#2E1610] shadow-[inset_4px_4px_0px_#1B0C08]';
      case 'demitasse':
        return 'w-44 sm:w-48 h-48 sm:h-52 border-4 border-[#3D2952] bg-[#1E1428]';
      case 'mug':
      default:
        return 'w-48 sm:w-54 h-60 sm:h-68 border-4 border-black bg-[#281A38] shadow-[inset_-12px_0px_0px_#170D24]';
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative flex flex-col items-center justify-between p-4 sm:p-6 pixel-box transition-all duration-150 ${
        isDragOver
          ? 'bg-[#1D142E] border-4 border-[#FDE047] ring-4 ring-[#FDE047]/40 scale-[1.01]'
          : 'bg-[#130D1F] border-4 border-[#2D1B42]'
      }`}
    >
      {/* Crescent Moon & Star Ambient Decors */}
      <div className="absolute top-3 left-4 text-amber-200/40 pixel-font text-[10px] pointer-events-none select-none flex items-center gap-1.5">
        <span>🌙</span>
        <span className="text-[8px] text-amber-300/60">MIDNIGHT VIBES</span>
      </div>

      {/* Cup Style Selector (Player Selects Cup) */}
      <div className="w-full flex items-center justify-center gap-1.5 my-1 z-10 pt-4">
        {CUP_OPTIONS.map((cup) => (
          <button
            key={cup.id}
            onClick={() => onSelectCup(cup.id)}
            className={`pixel-btn px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] pixel-font flex items-center gap-1 border-2 border-black transition-colors ${
              selectedCup === cup.id
                ? 'bg-[#F59E0B] text-black font-bold shadow-[2px_2px_0px_#000]'
                : 'bg-[#1F1433] text-purple-200/70 hover:text-white'
            }`}
          >
            <span>{cup.icon}</span>
            <span>{cup.label}</span>
          </button>
        ))}
      </div>

      {/* The Central Coffee Glass / Vessel */}
      <div className="relative my-3 flex items-center justify-center">
        {/* Steam Puffs */}
        {(hasEspresso || hasHotWater || hasMilk) && currentIngredients.length > 0 && (
          <div className="absolute -top-12 flex justify-center gap-5 pointer-events-none z-20">
            <div className="w-3 h-3 bg-amber-100/70 animate-steam-1 shadow-[2px_2px_0px_#000]" />
            <div className="w-3.5 h-3.5 bg-amber-100/80 animate-steam-2 shadow-[2px_2px_0px_#000]" />
            <div className="w-2.5 h-2.5 bg-amber-100/60 animate-steam-3 shadow-[2px_2px_0px_#000]" />
          </div>
        )}

        {/* Garnishes */}
        {hasOrange && (
          <div className="absolute -top-4 -right-3 z-30 transform rotate-12 drop-shadow-[2px_2px_0px_#000]">
            <PixelIcon name="orange_peel" size={28} />
          </div>
        )}

        {hasCinnamon && (
          <div className="absolute -top-6 -left-3 z-25 transform -rotate-20 drop-shadow-[2px_2px_0px_#000]">
            <PixelIcon name="cinnamon_stick" size={28} />
          </div>
        )}

        {/* Selected Cup Vessel */}
        <div
          className={`relative ${getCupVesselClasses()} shadow-[6px_6px_0px_#000] p-2 flex flex-col justify-end overflow-hidden`}
        >
          {/* Rim border line */}
          <div className="absolute top-0 inset-x-0 border-b border-black/40" />

          {/* Liquid Fill Stack (Simple flat pixel color - no gradients, no white overlay) */}
          <div
            className={`relative w-full transition-all duration-300 flex flex-col justify-end overflow-hidden border-t-2 border-black ${
              isBrewingAnim ? 'scale-y-105 filter brightness-125' : ''
            }`}
            style={{
              height: `${Math.max(14, fillPercentage)}%`,
              backgroundColor: getLiquidColor(),
              opacity: currentIngredients.length > 0 ? 1 : 0,
            }}
          >
            {/* If condensed milk + espresso: clean solid dual-layer (Café Bombón style) */}
            {hasCondensedMilk && hasEspresso && (
              <div className="absolute bottom-0 inset-x-0 h-2/5 bg-[#FEEFBD] border-t-2 border-black" />
            )}

            {/* Ice Cubes */}
            {hasIce && (
              <div className="absolute inset-0 flex items-center justify-around pointer-events-none p-2">
                <div className="w-5 h-5 bg-cyan-200 border-2 border-black shadow-[2px_2px_0px_#0891B2] animate-float-subtle" />
                <div className="w-4 h-4 bg-cyan-100 border-2 border-black shadow-[2px_2px_0px_#0891B2] animate-float-subtle" />
              </div>
            )}

            {/* Whipped Cream */}
            {hasWhippedCream && (
              <div className="absolute top-0 inset-x-0 h-9 bg-[#FFFDF8] border-b-2 border-black flex items-center justify-center">
                <span className="pixel-font text-[8px] text-amber-950 font-bold">WHIP</span>
              </div>
            )}

            {/* Egg Yolk Custard */}
            {hasEggYolk && (
              <div className="absolute top-0 inset-x-0 h-10 bg-[#FACC15] border-b-2 border-black flex items-center justify-center">
                <span className="pixel-font text-[8px] text-amber-950 font-bold">CUSTARD</span>
              </div>
            )}

            {/* Milk Foam */}
            {hasFoam && !hasWhippedCream && !hasEggYolk && (
              <div className="absolute top-0 inset-x-0 h-7 bg-[#FFFDF9] border-b-2 border-black flex items-center justify-center">
                <span className="pixel-font text-[7px] text-stone-700">FOAM</span>
              </div>
            )}

            {/* Cocoa Powder */}
            {hasCocoa && (
              <div className="absolute top-0 inset-x-0 h-2.5 bg-[#451A03] border-b border-black" />
            )}

            {/* Caramel Drizzle */}
            {hasCaramel && (
              <div className="absolute top-1 inset-x-3 h-2 bg-[#D97706] border-y border-black" />
            )}

            {/* Cardamom Pods */}
            {hasCardamom && (
              <div className="absolute top-2 inset-x-4 flex justify-between pointer-events-none">
                <div className="w-1.5 h-1.5 bg-lime-500 border border-black" />
                <div className="w-1.5 h-1.5 bg-lime-400 border border-black" />
              </div>
            )}
          </div>

          {/* Empty Vessel State */}
          {currentIngredients.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xl mb-1">☕</span>
              <p className="pixel-font text-[9px] text-amber-200">
                DROP INGREDIENTS
              </p>
            </div>
          )}
        </div>

        {/* Cup Handle (for Mug or Demitasse) */}
        {(selectedCup === 'mug' || selectedCup === 'demitasse') && (
          <div
            className={`border-4 border-l-0 border-black bg-[#2A1D3B] shadow-[4px_4px_0px_#000] ${
              selectedCup === 'demitasse' ? 'w-4 h-16' : 'w-5 sm:w-6 h-20 sm:h-24'
            }`}
          />
        )}
      </div>

      {/* Solid Pixel Coaster (No gradient) */}
      <div className="w-56 sm:w-64 h-3 bg-[#241738] border-2 border-black shadow-[2px_2px_0px_#000] -mt-1 mb-2" />

      {/* Compact Cup Ingredients Bar */}
      <div className="w-full">
        <div className="flex items-center justify-between text-xs text-amber-300 mb-1.5">
          <span className="pixel-font text-[8px] text-purple-200">
            CUP ({currentIngredients.length}/5)
          </span>
          {currentIngredients.length > 0 && (
            <button
              onClick={onClearCup}
              className="pixel-btn px-2 py-0.5 bg-red-950 hover:bg-red-900 text-red-200 text-[8px] pixel-font flex items-center gap-1 border border-black"
            >
              <Trash2 className="w-2.5 h-2.5" />
              <span>EMPTY</span>
            </button>
          )}
        </div>

        {currentIngredients.length === 0 ? (
          <div className="py-2 px-3 bg-black/40 border border-dashed border-purple-900/60 text-center pixel-sub text-[10px] text-purple-400/50">
            [ CUP EMPTY ]
          </div>
        ) : (
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {currentIngredients.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-1.5 py-1 px-2 bg-[#201533] border border-black text-[9px] text-amber-100 shadow-[1px_1px_0px_#000]"
              >
                <PixelIcon name={item.id} size={16} />
                <span className="pixel-sub truncate max-w-[95px]">{item.name}</span>
                <button
                  onClick={() => onRemoveIngredient(idx)}
                  className="w-4 h-4 text-red-400 hover:text-red-200 flex items-center justify-center text-xs ml-0.5"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brew Button */}
      <div className="w-full mt-3">
        <button
          onClick={handleBrewClick}
          disabled={currentIngredients.length === 0}
          className={`w-full py-3 px-4 font-bold text-xs pixel-font pixel-btn flex items-center justify-center gap-2 border-2 border-black ${
            currentIngredients.length === 0
              ? 'bg-[#1E132E] text-purple-400/30 cursor-not-allowed'
              : matchedDrink
              ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-[4px_4px_0px_#000] ring-2 ring-emerald-300'
              : 'bg-amber-600 hover:bg-amber-500 text-white shadow-[4px_4px_0px_#000]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>{matchedDrink ? `BREW: ${matchedDrink.name}!` : 'BREW COFFEE'}</span>
        </button>
      </div>
    </div>
  );
};
