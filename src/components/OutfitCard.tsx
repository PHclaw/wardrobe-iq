import { motion } from 'framer-motion';
import { Heart, Share2, Trash2 } from 'lucide-react';
import type { Outfit, ClothingItem } from '../types';
import { getOccasionIcon, getOccasionLabel, getWeatherIcon } from '../utils/weather';

interface Props {
  outfit: Outfit;
  clothes: ClothingItem[];
  onLike: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (outfit: Outfit) => void;
}

export function OutfitCard({ outfit, clothes, onLike, onDelete, onShare }: Props) {
  const outfitClothes = clothes.filter((c) => outfit.items.includes(c.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">{outfit.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{getOccasionIcon(outfit.occasion)} {getOccasionLabel(outfit.occasion)}</span>
            <span>{getWeatherIcon(outfit.weather)}</span>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {outfitClothes.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color + '20' }}
                >
                  <span className="text-2xl">👕</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={() => onLike(outfit.id)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
            outfit.isLiked 
              ? 'bg-red-50 text-red-500' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Heart size={16} fill={outfit.isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm">{outfit.likes}</span>
        </button>
        
        <div className="flex items-center gap-2">
          {onShare && (
            <button
              onClick={() => onShare(outfit)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Share2 size={18} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(outfit.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
