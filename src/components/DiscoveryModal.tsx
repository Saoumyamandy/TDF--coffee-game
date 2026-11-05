import React from 'react';
import { X, ArrowRight, BookOpen } from 'lucide-react';
import { CoffeeDrink, INGREDIENTS } from '../data/coffeeData';
import { PixelIcon } from './PixelIcons';

interface DiscoveryModalProps {
  drink: CoffeeDrink | null;
  isNewDiscovery: boolean;
  scoreBonus: number;
  totalDiscovered: number;
  onClose: () => void;
  onOpenRecipeBook: () => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({
  drink,
  isNewDiscovery,
  scoreBonus,
  totalDiscovered,
  onClose,
  onOpenRecipeBook,
}) => {
  if (!drink) return null;

  const recipeIngredients = drink.ingredients
    .map((id) => INGREDIENTS.find((i) => i.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      {/* Midnight RPG Dialogue Window */}
      <div className="relative w-full max-w-md bg-[#160E24] border-4 border-[#F59E0B] shadow-[8px_8px_0px_#000] p-5 sm:p-6 overflow-hidden">
        {/* Pixel Corner Accents */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-[#FDE047]" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-[#FDE047]" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#FDE047]" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#FDE047]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 pixel-btn w-7 h-7 bg-[#2A1647] hover:bg-[#4E2A7A] text-purple-200 border-2 border-black flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Banner */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="pixel_star" size={16} className="animate-spin" />
          <span className="pixel-font text-[9px] text-[#FDE047]">
            {isNewDiscovery ? '★ NEW DISCOVERY! ★' : '★ RECIPE CRAFTED ★'}
          </span>
          <div className="ml-auto pixel-font text-[9px] px-2 py-0.5 bg-amber-500 text-black border border-black font-bold">
            +{scoreBonus} PTS
          </div>
        </div>

        {/* Drink Header */}
        <div className="flex items-center gap-3 my-2 border-b-2 border-[#2B1B40] pb-2.5">
          <div className="w-12 h-12 bg-[#0D0717] border-2 border-black flex items-center justify-center text-2xl shrink-0">
            {drink.flag}
          </div>
          <div>
            <h2 className="pixel-font text-sm sm:text-base text-white">
              {drink.name}
            </h2>
            <p className="pixel-sub text-[10px] text-amber-300 mt-0.5">
              {drink.nativeName || drink.origin}
            </p>
          </div>
        </div>

        {/* Required One Short Fact */}
        <div className="my-3 p-3 bg-[#0E071A] border-2 border-[#3D2561]">
          <div className="pixel-font text-[8px] text-[#FDE047] mb-1">
            FACT:
          </div>
          <p className="text-xs text-amber-100/90 leading-relaxed pixel-sub">
            "{drink.fact}"
          </p>
        </div>

        {/* Formula */}
        <div className="mb-4">
          <div className="pixel-font text-[8px] text-purple-300 mb-1.5 uppercase">
            RECIPE:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recipeIngredients.map((ing) => (
              <div
                key={ing?.id}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1F1433] border border-black text-[9px] text-amber-200"
              >
                <PixelIcon name={ing?.id || ''} size={16} />
                <span className="pixel-sub font-semibold">{ing?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 pixel-btn bg-amber-600 hover:bg-amber-500 text-white border-2 border-black pixel-font text-[9px] flex items-center justify-center gap-1.5"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRecipeBook();
            }}
            className="py-2.5 px-3 pixel-btn bg-[#25173B] hover:bg-[#382359] text-purple-200 border-2 border-black pixel-font text-[9px] flex items-center justify-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>LOG ({totalDiscovered}/20)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
