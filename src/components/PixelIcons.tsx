import React from 'react';

interface PixelIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const PixelIcon: React.FC<PixelIconProps> = ({ name, className = '', size = 24 }) => {
  // SVG grid base: 16x16 or 24x24 pixel grid
  const pixelStyle = { imageRendering: 'pixelated' as const, shapeRendering: 'crispEdges' as const };

  switch (name) {
    case 'espresso_shot':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Cup body */}
          <rect x="3" y="5" width="8" height="7" fill="#8B4513" />
          <rect x="4" y="6" width="6" height="6" fill="#3D1D11" />
          {/* Espresso crema surface */}
          <rect x="4" y="6" width="6" height="2" fill="#D97706" />
          <rect x="5" y="6" width="2" height="1" fill="#FDE047" />
          {/* Cup handle */}
          <rect x="11" y="6" width="2" height="4" fill="#8B4513" />
          <rect x="11" y="7" width="1" height="2" fill="#120A07" />
          {/* Saucer */}
          <rect x="2" y="12" width="10" height="2" fill="#5E2C17" />
          <rect x="1" y="13" width="12" height="1" fill="#2E1408" />
          {/* Pixel steam */}
          <rect x="5" y="2" width="1" height="2" fill="#FEF3C7" opacity="0.8" />
          <rect x="7" y="1" width="1" height="2" fill="#FEF3C7" opacity="0.8" />
        </svg>
      );

    case 'hot_water':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Steaming water drop / kettle drop */}
          <rect x="7" y="2" width="2" height="2" fill="#93C5FD" />
          <rect x="6" y="4" width="4" height="2" fill="#60A5FA" />
          <rect x="5" y="6" width="6" height="4" fill="#3B82F6" />
          <rect x="4" y="8" width="8" height="4" fill="#2563EB" />
          <rect x="5" y="12" width="6" height="2" fill="#1D4ED8" />
          {/* Pixel shine */}
          <rect x="6" y="6" width="2" height="3" fill="#DBEAFE" />
          {/* Steam puffs */}
          <rect x="4" y="1" width="2" height="1" fill="#BAE6FD" />
          <rect x="10" y="1" width="2" height="1" fill="#BAE6FD" />
        </svg>
      );

    case 'steamed_milk':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Milk Bottle */}
          <rect x="6" y="1" width="4" height="2" fill="#9CA3AF" />
          <rect x="5" y="3" width="6" height="2" fill="#E5E7EB" />
          <rect x="4" y="5" width="8" height="9" fill="#F9FAFB" />
          {/* Milk level */}
          <rect x="5" y="6" width="6" height="7" fill="#FFFDF8" />
          {/* Milk label heart */}
          <rect x="6" y="8" width="4" height="3" fill="#93C5FD" />
          <rect x="7" y="9" width="2" height="1" fill="#DBEAFE" />
          {/* Shadow */}
          <rect x="11" y="6" width="1" height="8" fill="#D1D5DB" />
        </svg>
      );

    case 'milk_foam':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Puffy Pixel Cloud Foam */}
          <rect x="5" y="3" width="6" height="3" fill="#FFFDF9" />
          <rect x="3" y="6" width="10" height="4" fill="#FFFDF9" />
          <rect x="2" y="8" width="12" height="4" fill="#F8FAFC" />
          <rect x="3" y="12" width="10" height="2" fill="#E2E8F0" />
          {/* Cloud shadow highlights */}
          <rect x="6" y="4" width="2" height="2" fill="#FFFFFF" />
          <rect x="4" y="8" width="2" height="2" fill="#FFFFFF" />
          <rect x="10" y="10" width="3" height="2" fill="#CBD5E1" />
        </svg>
      );

    case 'ice_cubes':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Pixel Cube 1 */}
          <rect x="2" y="4" width="6" height="6" fill="#A5F3FC" />
          <rect x="3" y="5" width="4" height="4" fill="#67E8F9" />
          <rect x="3" y="5" width="2" height="2" fill="#ECFEFF" />
          <rect x="2" y="9" width="6" height="1" fill="#0891B2" />
          {/* Pixel Cube 2 */}
          <rect x="7" y="7" width="7" height="7" fill="#CFFAFE" />
          <rect x="8" y="8" width="5" height="5" fill="#22D3EE" />
          <rect x="8" y="8" width="2" height="2" fill="#FFFFFF" />
          <rect x="7" y="13" width="7" height="1" fill="#06B6D4" />
        </svg>
      );

    case 'vanilla_syrup':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Glass dropper bottle */}
          <rect x="6" y="1" width="4" height="2" fill="#78350F" />
          <rect x="7" y="3" width="2" height="2" fill="#D97706" />
          <rect x="4" y="5" width="8" height="9" fill="#FDE047" />
          <rect x="5" y="6" width="6" height="7" fill="#EAB308" />
          {/* Sweet liquid core */}
          <rect x="6" y="8" width="4" height="4" fill="#CA8A04" />
          <rect x="5" y="6" width="2" height="2" fill="#FEF08A" />
          {/* Flower petal icon */}
          <rect x="7" y="9" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'whipped_cream':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Fluffy Sundae Swirl */}
          <rect x="7" y="2" width="2" height="2" fill="#FFFDF8" />
          <rect x="6" y="4" width="4" height="2" fill="#FFFDF8" />
          <rect x="5" y="6" width="6" height="3" fill="#FFFDF8" />
          <rect x="3" y="9" width="10" height="4" fill="#FDF6E9" />
          <rect x="4" y="13" width="8" height="2" fill="#F3E6D0" />
          {/* Cream Highlights */}
          <rect x="6" y="5" width="2" height="2" fill="#FFFFFF" />
          <rect x="8" y="10" width="3" height="2" fill="#E8D5BA" />
        </svg>
      );

    case 'cocoa_powder':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Shaker tin */}
          <rect x="5" y="2" width="6" height="2" fill="#9CA3AF" />
          <rect x="4" y="4" width="8" height="9" fill="#78350F" />
          <rect x="5" y="5" width="6" height="7" fill="#451A03" />
          {/* Dust holes */}
          <rect x="6" y="2" width="1" height="1" fill="#374151" />
          <rect x="8" y="2" width="1" height="1" fill="#374151" />
          {/* Falling cocoa grains */}
          <rect x="3" y="14" width="2" height="2" fill="#78350F" />
          <rect x="7" y="14" width="2" height="2" fill="#451A03" />
          <rect x="11" y="14" width="2" height="2" fill="#92400E" />
        </svg>
      );

    case 'caramel_sauce':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Jar of Golden Caramel */}
          <rect x="5" y="2" width="6" height="2" fill="#B45309" />
          <rect x="4" y="4" width="8" height="9" fill="#D97706" />
          <rect x="5" y="5" width="6" height="7" fill="#F59E0B" />
          <rect x="6" y="6" width="3" height="2" fill="#FEF3C7" />
          {/* Caramel drip */}
          <rect x="7" y="13" width="2" height="2" fill="#B45309" />
          <rect x="8" y="15" width="1" height="1" fill="#D97706" />
        </svg>
      );

    // World Ingredients
    case 'condensed_milk':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Metal Can */}
          <rect x="4" y="2" width="8" height="2" fill="#9CA3AF" />
          <rect x="4" y="4" width="8" height="9" fill="#FEF08A" />
          <rect x="4" y="6" width="8" height="4" fill="#2563EB" />
          <rect x="5" y="7" width="6" height="2" fill="#FFFFFF" />
          <rect x="4" y="13" width="8" height="1" fill="#6B7280" />
        </svg>
      );

    case 'cardamom_pods':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Green Cardamom Seed Pod */}
          <rect x="7" y="2" width="2" height="2" fill="#4D7C0F" />
          <rect x="5" y="4" width="6" height="7" fill="#65A30D" />
          <rect x="6" y="5" width="4" height="5" fill="#84CC16" />
          <rect x="7" y="6" width="1" height="4" fill="#365314" />
          <rect x="7" y="11" width="2" height="2" fill="#4D7C0F" />
        </svg>
      );

    case 'cinnamon_stick':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Dual Cinnamon Quills */}
          <rect x="3" y="3" width="3" height="11" fill="#92400E" />
          <rect x="4" y="4" width="1" height="9" fill="#D97706" />
          <rect x="8" y="2" width="3" height="12" fill="#78350F" />
          <rect x="9" y="3" width="1" height="10" fill="#B45309" />
          {/* Rolled top curl */}
          <rect x="3" y="2" width="2" height="1" fill="#451A03" />
          <rect x="8" y="1" width="2" height="1" fill="#451A03" />
        </svg>
      );

    case 'brown_sugar':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Piloncillo / Sugar block */}
          <rect x="5" y="2" width="6" height="4" fill="#B45309" />
          <rect x="4" y="6" width="8" height="5" fill="#92400E" />
          <rect x="3" y="11" width="10" height="3" fill="#78350F" />
          {/* Sugar grains */}
          <rect x="5" y="7" width="2" height="2" fill="#FBBF24" />
          <rect x="9" y="9" width="2" height="2" fill="#FBBF24" />
        </svg>
      );

    case 'egg_yolk':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Golden Custard Yolk */}
          <rect x="5" y="3" width="6" height="2" fill="#FACC15" />
          <rect x="3" y="5" width="10" height="6" fill="#F59E0B" />
          <rect x="4" y="6" width="8" height="4" fill="#EAB308" />
          <rect x="5" y="4" width="2" height="2" fill="#FEF08A" />
          <rect x="4" y="11" width="8" height="2" fill="#D97706" />
        </svg>
      );

    case 'chicory_root':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Earthy root */}
          <rect x="5" y="2" width="6" height="3" fill="#78350F" />
          <rect x="6" y="5" width="4" height="6" fill="#582F19" />
          <rect x="7" y="11" width="2" height="3" fill="#3D1D11" />
          {/* Root branches */}
          <rect x="3" y="6" width="3" height="2" fill="#78350F" />
          <rect x="10" y="8" width="3" height="2" fill="#78350F" />
        </svg>
      );

    case 'sparkling_tonic':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Tonic Bottle with Fizz */}
          <rect x="7" y="1" width="2" height="3" fill="#0284C7" />
          <rect x="5" y="4" width="6" height="9" fill="#BAE6FD" />
          <rect x="6" y="5" width="4" height="7" fill="#E0F2FE" />
          {/* Rising bubbles */}
          <rect x="7" y="6" width="1" height="1" fill="#FFFFFF" />
          <rect x="8" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="6" y="10" width="1" height="1" fill="#FFFFFF" />
          <rect x="5" y="13" width="6" height="1" fill="#0369A1" />
        </svg>
      );

    case 'orange_peel':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Orange Slice */}
          <rect x="3" y="3" width="10" height="2" fill="#EA580C" />
          <rect x="2" y="5" width="12" height="6" fill="#F97316" />
          <rect x="4" y="6" width="8" height="4" fill="#FED7AA" />
          <rect x="5" y="7" width="2" height="2" fill="#FB923C" />
          <rect x="9" y="7" width="2" height="2" fill="#FB923C" />
          <rect x="3" y="11" width="10" height="2" fill="#EA580C" />
        </svg>
      );

    case 'butter_ghee':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Block of Butter */}
          <rect x="3" y="4" width="10" height="7" fill="#FDE047" />
          <rect x="4" y="5" width="8" height="5" fill="#FACC15" />
          <rect x="4" y="5" width="3" height="2" fill="#FEF08A" />
          <rect x="3" y="11" width="10" height="2" fill="#CA8A04" />
        </svg>
      );

    case 'black_tea':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          {/* Teapot */}
          <rect x="6" y="1" width="4" height="2" fill="#991B1B" />
          <rect x="4" y="3" width="8" height="8" fill="#B91C1C" />
          <rect x="2" y="5" width="2" height="4" fill="#991B1B" />
          <rect x="12" y="4" width="2" height="3" fill="#991B1B" />
          <rect x="5" y="11" width="6" height="2" fill="#7F1D1D" />
          <rect x="6" y="5" width="3" height="3" fill="#DC2626" />
        </svg>
      );

    case 'pixel_cup':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          <rect x="3" y="4" width="8" height="8" fill="#F5EBE1" />
          <rect x="4" y="5" width="6" height="6" fill="#3D1D11" />
          <rect x="11" y="5" width="2" height="5" fill="#F5EBE1" />
          <rect x="11" y="6" width="1" height="3" fill="#120A07" />
          <rect x="2" y="12" width="10" height="2" fill="#D4A373" />
        </svg>
      );

    case 'pixel_star':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          <rect x="7" y="1" width="2" height="14" fill="#FDE047" />
          <rect x="1" y="7" width="14" height="2" fill="#FDE047" />
          <rect x="5" y="3" width="6" height="10" fill="#F59E0B" />
          <rect x="3" y="5" width="10" height="6" fill="#F59E0B" />
          <rect x="6" y="6" width="4" height="4" fill="#FFFFFF" />
        </svg>
      );

    case 'pixel_coin':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          <rect x="4" y="2" width="8" height="12" fill="#F59E0B" />
          <rect x="2" y="4" width="12" height="8" fill="#F59E0B" />
          <rect x="5" y="4" width="6" height="8" fill="#FDE047" />
          <rect x="7" y="5" width="2" height="6" fill="#B45309" />
          <rect x="5" y="5" width="2" height="2" fill="#FEF08A" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={pixelStyle}>
          <rect x="4" y="4" width="8" height="8" fill="#F59E0B" />
          <rect x="6" y="6" width="4" height="4" fill="#78350F" />
        </svg>
      );
  }
};
