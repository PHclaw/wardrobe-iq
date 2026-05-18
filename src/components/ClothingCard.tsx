import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ClothingItem } from '../types';
import { getCategoryLabel } from '../utils/weather';

interface Props {
  item: ClothingItem;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

export function ClothingCard({ item, onDelete, compact }: Props) {
  if (compact) {
    return (
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl" style={{ backgroundColor: item.color + '20' }}>
            👕
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="aspect-square relative">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{ backgroundColor: item.color + '20' }}
          >
            👕
          </div>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{getCategoryLabel(item.category)}</span>
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-gray-400">穿 {item.wearCount} 次</span>
        </div>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
