import type { Weather } from '../types';
import { getWeatherIcon, getWeatherLabel } from '../utils/weather';

interface Props {
  current: Weather;
  onChange: (weather: Weather) => void;
}

const WEATHER_OPTIONS: Weather[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];

export function WeatherSelector({ current, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">今日天气：</span>
      <div className="flex gap-1">
        {WEATHER_OPTIONS.map((w) => (
          <button
            key={w}
            onClick={() => onChange(w)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              current === w
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={getWeatherLabel(w)}
          >
            {getWeatherIcon(w)}
          </button>
        ))}
      </div>
    </div>
  );
}
