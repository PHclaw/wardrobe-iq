import type { Weather, Occasion, ClothingItem } from '../types';

export function getWeatherIcon(weather: Weather): string {
  const icons: Record<Weather, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '💨',
  };
  return icons[weather];
}

export function getWeatherLabel(weather: Weather): string {
  const labels: Record<Weather, string> = {
    sunny: '晴天',
    cloudy: '多云',
    rainy: '雨天',
    snowy: '雪天',
    windy: '大风',
  };
  return labels[weather];
}

export function getOccasionIcon(occasion: Occasion): string {
  const icons: Record<Occasion, string> = {
    work: '💼',
    date: '💕',
    sport: '🏃',
    casual: '😎',
    party: '🎉',
  };
  return icons[occasion];
}

export function getOccasionLabel(occasion: Occasion): string {
  const labels: Record<Occasion, string> = {
    work: '工作',
    date: '约会',
    sport: '运动',
    casual: '休闲',
    party: '派对',
  };
  return labels[occasion];
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    top: '上装',
    bottom: '下装',
    outer: '外套',
    shoes: '鞋履',
    accessory: '配饰',
  };
  return labels[category] || category;
}

export function generateRecommendation(
  clothes: ClothingItem[],
  occasion: Occasion,
  weather: Weather
): ClothingItem[] {
  const suitable = clothes.filter((c) => c.season.includes(weather));
  
  const tops = suitable.filter((c) => c.category === 'top');
  const bottoms = suitable.filter((c) => c.category === 'bottom');
  const outers = suitable.filter((c) => c.category === 'outer');
  const shoes = suitable.filter((c) => c.category === 'shoes');
  const accessories = suitable.filter((c) => c.category === 'accessory');

  const pick = <T>(arr: T[]): T | undefined => 
    arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : undefined;

  const result: ClothingItem[] = [];
  
  if (occasion === 'sport') {
    pick(shoes) && result.push(pick(shoes)!);
    pick(tops) && result.push(pick(tops)!);
    pick(bottoms) && result.push(pick(bottoms)!);
  } else {
    pick(tops) && result.push(pick(tops)!);
    pick(bottoms) && result.push(pick(bottoms)!);
    if (weather === 'rainy' || weather === 'snowy' || weather === 'cloudy') {
      pick(outers) && result.push(pick(outers)!);
    }
    pick(shoes) && result.push(pick(shoes)!);
    if (Math.random() > 0.5) {
      pick(accessories) && result.push(pick(accessories)!);
    }
  }

  return result;
}

export function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    great: '🤩',
    good: '😊',
    okay: '😐',
    bad: '😔',
  };
  return emojis[mood] || '😊';
}

export function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateStr === today.toISOString().split('T')[0]) return '今天';
  if (dateStr === yesterday.toISOString().split('T')[0]) return '昨天';
  
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
