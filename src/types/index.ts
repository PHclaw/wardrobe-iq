export type ClothingCategory = 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory';

export type Occasion = 'work' | 'date' | 'sport' | 'casual' | 'party';

export type Weather = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  season: Weather[];
  imageUrl: string;
  tags: string[];
  createdAt: number;
  wearCount: number;
}

export interface Outfit {
  id: string;
  name: string;
  items: string[]; // ClothingItem IDs
  occasion: Occasion;
  weather: Weather;
  createdAt: number;
  likes: number;
  isLiked: boolean;
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  outfitId?: string;
  notes: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
}
