import type { Occasion } from '../types';
import { getOccasionIcon, getOccasionLabel } from '../utils/weather';

interface Props {
  selected: Occasion | null;
  onChange: (occasion: Occasion) => void;
}

const OCCASIONS: Occasion[] = ['work', 'date', 'sport', 'casual', 'party'];

export function OccasionSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {OCCASIONS.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-full transition-all ${
            selected === o
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1">{getOccasionIcon(o)}</span>
          {getOccasionLabel(o)}
        </button>
      ))}
    </div>
  );
}
