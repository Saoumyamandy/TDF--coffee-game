import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { PixelIcon } from './PixelIcons';

interface HeaderBarProps {
  score: number;
  discoveredCount: number;
  totalCount: number;
  isMusicOn: boolean;
  onToggleMusic: () => void;
  onOpenRecipeBook: () => void;
  onResetGame: () => void;
  onOpenArtPoster?: () => void;
  baristaTitle: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  score,
  discoveredCount,
  totalCount,
  isMusicOn,
  onToggleMusic,
  onOpenRecipeBook,
  onResetGame,
  onOpenArtPoster,
  baristaTitle,
}) => {
  return (
    <header className="w-full bg-[#0D0817] border-b-4 border-black px-4 sm:px-6 py-2.5 sticky top-0 z-40 shadow-[0_4px_0_0_#1B102B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-6">
        {/* Brand: Midnight Café */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1F1433] border-2 border-black flex items-center justify-center shrink-0">
              <span className="text-base">🌙</span>
            </div>
            <div>
              <h1 className="pixel-font text-xs sm:text-sm text-[#FDE047] tracking-wider whitespace-nowrap">
                MIDNIGHT CAFÉ
              </h1>
              <div className="pixel-sub text-[9px] text-purple-300">
                {baristaTitle}
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onToggleMusic}
              className={`pixel-btn p-1.5 text-xs border-2 border-black ${
                isMusicOn ? 'bg-amber-600 text-white' : 'bg-[#1F1433] text-purple-300'
              }`}
              aria-label="Toggle music"
            >
              {isMusicOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenRecipeBook}
              className="pixel-btn p-1.5 bg-[#1F1433] text-amber-200 border-2 border-black"
              aria-label="Open Recipes"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scoreboard HUD */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 w-full md:w-auto py-1 px-4 bg-[#090510] border-2 border-black">
          <div className="flex items-center gap-2">
            <PixelIcon name="pixel_coin" size={14} />
            <div className="flex flex-col">
              <span className="pixel-font text-[7px] text-purple-400 leading-none">
                SCORE
              </span>
              <span className="pixel-font text-xs text-[#FDE047] tabular-nums">
                {String(score).padStart(6, '0')}
              </span>
            </div>
          </div>

          <div className="h-5 w-0.5 bg-[#25173B]" />

          <div className="flex items-center gap-2">
            <PixelIcon name="pixel_star" size={14} />
            <div className="flex flex-col">
              <span className="pixel-font text-[7px] text-purple-400 leading-none">
                DISCOVERED
              </span>
              <span className="pixel-font text-xs text-emerald-400 tabular-nums">
                {String(discoveredCount).padStart(2, '0')}
                <span className="text-purple-400/60">/{totalCount}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {onOpenArtPoster && (
            <button
              onClick={onOpenArtPoster}
              className="pixel-btn px-2.5 py-1.5 text-[9px] pixel-font bg-[#24173D] hover:bg-[#342257] text-purple-200 border-2 border-black flex items-center gap-1.5"
              title="Midnight Arcade Poster"
            >
              <ImageIcon className="w-3 h-3 text-[#FDE047]" />
              <span>POSTER</span>
            </button>
          )}

          <button
            onClick={onToggleMusic}
            className={`pixel-btn px-2.5 py-1.5 text-[9px] pixel-font flex items-center gap-1.5 border-2 border-black ${
              isMusicOn
                ? 'bg-amber-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#1C122E] text-purple-300'
            }`}
          >
            {isMusicOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span>MUSIC: {isMusicOn ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={onOpenRecipeBook}
            className="pixel-btn px-2.5 py-1.5 text-[9px] pixel-font bg-[#1C122E] hover:bg-[#2A1B45] text-amber-100 border-2 border-black flex items-center gap-1.5"
          >
            <BookOpen className="w-3 h-3 text-amber-400" />
            <span>RECIPES ({discoveredCount}/{totalCount})</span>
          </button>

          <button
            onClick={onResetGame}
            className="pixel-btn p-1.5 bg-[#140C21] hover:bg-[#25173B] text-purple-400 hover:text-white border-2 border-black"
            title="Reset Game"
            aria-label="Reset game"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
