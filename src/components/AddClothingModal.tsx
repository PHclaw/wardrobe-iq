import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Upload } from 'lucide-react';
import type { ClothingCategory, Weather } from '../types';
import { getCategoryLabel, getWeatherIcon, getWeatherLabel } from '../utils/weather';

interface Props {
  onClose: () => void;
  onAdd: (item: {
    name: string;
    category: ClothingCategory;
    color: string;
    season: Weather[];
    imageUrl: string;
    tags: string[];
  }) => void;
}

const CATEGORIES: ClothingCategory[] = ['top', 'bottom', 'outer', 'shoes', 'accessory'];
const WEATHER_OPTIONS: Weather[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
const COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6',
  '#3B82F6', '#8B5CF6', '#EC4899', '#000000', '#FFFFFF',
  '#6B7280', '#78716C',
];

export function AddClothingModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('top');
  const [color, setColor] = useState('#3B82F6');
  const [season, setSeason] = useState<Weather[]>(['sunny', 'cloudy']);
  const [imageUrl, setImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({
      name: name.trim(),
      category,
      color,
      season,
      imageUrl,
      tags,
    });
    onClose();
  };

  const toggleSeason = (w: Weather) => {
    setSeason((prev) =>
      prev.includes(w) ? prev.filter((s) => s !== w) : [...prev, w]
    );
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold">添加衣服 👗</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">衣服名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：蓝色条纹衬衫"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    category === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">
                    {cat === 'top' && '👕'}
                    {cat === 'bottom' && '👖'}
                    {cat === 'outer' && '🧥'}
                    {cat === 'shoes' && '👟'}
                    {cat === 'accessory' && '👜'}
                  </span>
                  <p className="text-xs mt-1">{getCategoryLabel(cat)}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">颜色</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    color === c ? 'border-blue-500 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">适合季节</label>
            <div className="flex flex-wrap gap-2">
              {WEATHER_OPTIONS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => toggleSeason(w)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    season.includes(w)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getWeatherIcon(w)} {getWeatherLabel(w)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">图片链接（可选）</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="button" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Camera size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="添加标签后回车"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="button" onClick={addTag} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Upload size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            添加到衣柜
          </button>
        </form>
      </motion.div>
    </div>
  );
}
