import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CoffeeCup } from './components/CoffeeCup';
import { IngredientShelf } from './components/IngredientShelf';
import { HeaderBar } from './components/HeaderBar';
import { DiscoveryModal } from './components/DiscoveryModal';
import { RecipeBookModal } from './components/RecipeBookModal';
import { PosterModal } from './components/PosterModal';
import { ParticleCanvas, ParticleTrigger } from './components/ParticleCanvas';
import { Ingredient, CoffeeDrink, INGREDIENTS, COFFEE_DRINKS } from './data/coffeeData';
import { coffeeAudio } from './utils/audio';

export default function App() {
  const [discoveredDrinkIds, setDiscoveredDrinkIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('coffee_craft_discovered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('coffee_craft_score');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [isMusicOn, setIsMusicOn] = useState(false);
  const [currentIngredients, setCurrentIngredients] = useState<Ingredient[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeDiscovery, setActiveDiscovery] = useState<{
    drink: CoffeeDrink;
    isNew: boolean;
    scoreBonus: number;
  } | null>(null);
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [lastBrewMessage, setLastBrewMessage] = useState<string | null>(null);

  const [particleTrigger, setParticleTrigger] = useState<ParticleTrigger | null>(null);
  const [floatingBonus, setFloatingBonus] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('coffee_craft_discovered', JSON.stringify(discoveredDrinkIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [discoveredDrinkIds]);

  useEffect(() => {
    try {
      localStorage.setItem('coffee_craft_score', String(score));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [score]);

  const baristaTitle = useMemo(() => {
    const count = discoveredDrinkIds.length;
    if (count >= 20) return 'GRAND MASTER 👑';
    if (count >= 16) return 'MASTER ROASTER 🌟';
    if (count >= 12) return 'CONNOISSEUR 🏆';
    if (count >= 8) return 'SENIOR BARISTA ✨';
    if (count >= 4) return 'APPRENTICE 🌿';
    return 'NOVICE ☕';
  }, [discoveredDrinkIds.length]);

  // Compute matched drink based on current ingredients in cup
  const matchedDrink = useMemo<CoffeeDrink | null>(() => {
    if (currentIngredients.length === 0) return null;

    const currentIds = Array.from(new Set(currentIngredients.map((i) => i.id))).sort();

    for (const drink of COFFEE_DRINKS) {
      const drinkRecipe = [...drink.ingredients].sort();
      if (
        currentIds.length === drinkRecipe.length &&
        currentIds.every((id, idx) => id === drinkRecipe[idx])
      ) {
        return drink;
      }
    }
    return null;
  }, [currentIngredients]);

  const playIngredientSound = useCallback((item: Ingredient) => {
    if (item.id === 'ice_cubes') {
      coffeeAudio.playIceSound();
    } else if (item.layerType === 'foam' || item.id === 'hot_water') {
      coffeeAudio.playSteamSound();
    } else {
      coffeeAudio.playDropSound();
    }
  }, []);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (currentIngredients.length >= 5) {
      setLastBrewMessage('Glass is full! Click Brew to test your mix.');
      return;
    }
    playIngredientSound(ingredient);
    setCurrentIngredients((prev) => [...prev, ingredient]);
    setLastBrewMessage(null);
  };

  const handleRemoveIngredient = (index: number) => {
    coffeeAudio.playClickSound();
    setCurrentIngredients((prev) => prev.filter((_, idx) => idx !== index));
    setLastBrewMessage(null);
  };

  const handleClearCup = () => {
    if (currentIngredients.length > 0) {
      coffeeAudio.playPourOutSound();
      setCurrentIngredients([]);
      setLastBrewMessage(null);
    }
  };

  const handleDragStartIngredient = (e: React.DragEvent, ingredient: Ingredient) => {
    e.dataTransfer.setData('text/plain', ingredient.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const ingredientId = e.dataTransfer.getData('text/plain');
    if (!ingredientId) return;

    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId);
    if (ingredient) {
      handleAddIngredient(ingredient);
    }
  };

  const handleToggleMusic = () => {
    const newState = coffeeAudio.toggleMusic();
    setIsMusicOn(newState);
  };

  const handleResetGame = () => {
    if (window.confirm('Reset score and discoveries?')) {
      coffeeAudio.playPourOutSound();
      setDiscoveredDrinkIds([]);
      setScore(0);
      setCurrentIngredients([]);
      setLastBrewMessage(null);
      localStorage.removeItem('coffee_craft_discovered');
      localStorage.removeItem('coffee_craft_score');
    }
  };

  // Educational Brew Action - Drink is strictly evaluated and revealed HERE only!
  const handleBrewDrink = () => {
    if (currentIngredients.length === 0) return;

    if (matchedDrink) {
      const isNew = !discoveredDrinkIds.includes(matchedDrink.id);
      const bonus = isNew ? (matchedDrink.category === 'World' ? 150 : 100) : 25;

      coffeeAudio.playDiscoverySound();
      if (isNew) {
        setTimeout(() => coffeeAudio.playCoinSound(), 320);
      }

      setParticleTrigger({
        type: isNew ? 'discovery' : 'brew',
        amount: isNew ? 100 : 50,
      });

      setFloatingBonus(`+${bonus} PTS! ${isNew ? '★ NEW DISCOVERY ★' : 'CRAFTED'}`);
      setTimeout(() => setFloatingBonus(null), 2200);

      if (isNew) {
        setDiscoveredDrinkIds((prev) => [...prev, matchedDrink.id]);
      }
      setScore((prev) => prev + bonus);

      // Open discovery card revealing the drink name and educational fact!
      setActiveDiscovery({
        drink: matchedDrink,
        isNew,
        scoreBonus: bonus,
      });

      setLastBrewMessage(null);
    } else {
      coffeeAudio.playClickSound();
      setLastBrewMessage('Not a recognized recipe! Keep experimenting or check the recipe log.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0710] text-[#F8EFE4] flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Particle Effect Burst on Discovery */}
      <ParticleCanvas trigger={particleTrigger} onFinished={() => setParticleTrigger(null)} />

      {/* Top Bar Header */}
      <HeaderBar
        score={score}
        discoveredCount={discoveredDrinkIds.length}
        totalCount={COFFEE_DRINKS.length}
        isMusicOn={isMusicOn}
        onToggleMusic={handleToggleMusic}
        onOpenRecipeBook={() => setIsRecipeBookOpen(true)}
        onResetGame={handleResetGame}
        onOpenArtPoster={() => setIsPosterOpen(true)}
        baristaTitle={baristaTitle}
      />

      {/* Main Midnight Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Floating Score Toast */}
        {floatingBonus && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 bg-[#F59E0B] border-4 border-black text-black pixel-font text-xs shadow-[4px_4px_0px_#000] animate-bounce">
            {floatingBonus}
          </div>
        )}

        {/* Small Notice / Alert if unmatched mix */}
        {lastBrewMessage && (
          <div className="py-2 px-3 bg-[#1A1024] border-2 border-black text-[#FDE047] pixel-sub text-xs flex items-center justify-between">
            <span>{lastBrewMessage}</span>
            <button
              onClick={() => setIsRecipeBookOpen(true)}
              className="pixel-btn px-2 py-0.5 bg-amber-600 text-white border border-black pixel-font text-[8px]"
            >
              CLUES
            </button>
          </div>
        )}

        {/* TOP SECTION: Ingredients Shelf (At the top as requested) */}
        <section className="w-full">
          <IngredientShelf
            onAddIngredient={handleAddIngredient}
            currentIngredients={currentIngredients}
            onDragStartIngredient={handleDragStartIngredient}
          />
        </section>

        {/* BOTTOM SECTION: Transparent Glass Crafting Vessel & Brew Controls */}
        <section className="w-full flex justify-center">
          <CoffeeCup
            currentIngredients={currentIngredients}
            onRemoveIngredient={handleRemoveIngredient}
            onClearCup={handleClearCup}
            onBrewDrink={handleBrewDrink}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        </section>

        {/* Quick Collection Tracker Bar */}
        <section className="p-3 bg-[#130D1F] border-4 border-[#2D1B42] pixel-box">
          <div className="flex items-center justify-between mb-2">
            <span className="pixel-font text-[9px] text-[#FDE047]">
              DRINKS ({discoveredDrinkIds.length}/20)
            </span>
            <button
              onClick={() => setIsRecipeBookOpen(true)}
              className="pixel-sub text-[10px] text-purple-300 hover:text-white"
            >
              [ RECIPES → ]
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {COFFEE_DRINKS.map((drink) => {
              const isDiscovered = discoveredDrinkIds.includes(drink.id);
              return (
                <button
                  key={drink.id}
                  onClick={() => {
                    if (isDiscovered) {
                      setActiveDiscovery({
                        drink,
                        isNew: false,
                        scoreBonus: 0,
                      });
                    } else {
                      setIsRecipeBookOpen(true);
                    }
                  }}
                  className={`pixel-btn px-2 py-1 text-[9px] flex items-center gap-1 border border-black ${
                    isDiscovered
                      ? 'bg-[#25173B] text-[#FDE047] shadow-[1px_1px_0px_#000]'
                      : 'bg-[#0E0817] text-purple-400/40 hover:text-purple-300'
                  }`}
                  title={isDiscovered ? drink.name : `Locked: ${drink.hint}`}
                >
                  <span>{isDiscovered ? drink.flag : '🔒'}</span>
                  <span className="pixel-sub truncate max-w-[100px]">{drink.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Discovery Modal - Shows name and educational cultural fact on successful brew! */}
      <DiscoveryModal
        drink={activeDiscovery?.drink || null}
        isNewDiscovery={activeDiscovery?.isNew || false}
        scoreBonus={activeDiscovery?.scoreBonus || 0}
        totalDiscovered={discoveredDrinkIds.length}
        onClose={() => {
          setActiveDiscovery(null);
          handleClearCup();
        }}
        onOpenRecipeBook={() => {
          setActiveDiscovery(null);
          setIsRecipeBookOpen(true);
        }}
      />

      {/* Recipe Book Modal */}
      <RecipeBookModal
        discoveredDrinkIds={discoveredDrinkIds}
        isOpen={isRecipeBookOpen}
        onClose={() => setIsRecipeBookOpen(false)}
      />

      {/* Midnight Arcade Poster Modal */}
      <PosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="mt-4 border-t-2 border-black bg-[#0D0817] py-2.5 px-4 text-center pixel-sub text-[9px] text-purple-400/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>🌙 MIDNIGHT CAFÉ</span>
          <div className="flex items-center gap-2">
            <button onClick={handleToggleMusic} className="text-purple-300 hover:text-white">
              MUSIC: {isMusicOn ? 'ON' : 'OFF'}
            </button>
            <span>·</span>
            <button onClick={() => setIsPosterOpen(true)} className="text-amber-400 hover:text-white">
              POSTER
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
