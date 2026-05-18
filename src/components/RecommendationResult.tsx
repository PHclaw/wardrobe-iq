import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import type { ClothingItem, Occasion, Weather } from '../types';
import { getOccasionIcon, getOccasionLabel, getWeatherIcon } from '../utils/weather';

interface Props {
  items: ClothingItem[];
  occasion: Occasion;
  weather: Weather;
  onSaveOutfit: () => void;
  onDismiss: () => void;
}

export function RecommendationResult({ items, occasion, weather, onSaveOutfit, onDismiss }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-500" size={24} />
        <h3 className="text-lg font-semibold text-gray-900">AI 推荐搭配</h3>
        <span className="text-sm text-gray-500 ml-auto">
          {getOccasionIcon(occasion)} {getOccasionLabel(occasion)} · {getWeatherIcon(weather)}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm min-w-[100px]"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: item.color + '20' }}
              >
                <span className="text-3xl">👕</span>
              </div>
            )}
            <p className="text-xs text-gray-600 mt-2 truncate">{item.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSaveOutfit}
          className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
        >
          <Check size={18} />
          保存搭配
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-3 bg-white text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          再换一套
        </button>
      </div>
    </motion.div>
  );
}
