import React from 'react';
import { X } from 'lucide-react';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-sm w-full bg-[#0D0817] border-4 border-[#F59E0B] p-4 pixel-box shadow-[8px_8px_0px_#000] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 pixel-btn w-7 h-7 bg-[#25173B] hover:bg-[#3D2561] text-purple-200 border-2 border-black flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pixel-font text-[9px] text-[#FDE047] mb-2 tracking-wider">
          🌙 MIDNIGHT ARCADE POSTER 🌙
        </div>

        <div className="border-4 border-black shadow-[4px_4px_0px_#000] overflow-hidden max-h-[70vh]">
          <img
            src="/public/assets/aistudio/image_c67b825e.png"
            alt="Midnight Cafe Game Over Coffee to Continue"
            className="w-full h-auto object-contain image-rendering-pixelated"
          />
        </div>

        <button
          onClick={onClose}
          className="mt-3 pixel-btn px-4 py-2 pixel-font text-[9px] bg-amber-600 hover:bg-amber-500 text-white border-2 border-black"
        >
          DRINK COFFEE TO CONTINUE
        </button>
      </div>
    </div>
  );
};
