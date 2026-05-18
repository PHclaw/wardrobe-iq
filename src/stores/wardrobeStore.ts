import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ClothingItem, Outfit, DailyLog, Weather, Occasion } from '../types';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

interface WardrobeState {
  clothes: ClothingItem[];
  outfits: Outfit[];
  dailyLogs: DailyLog[];
  currentWeather: Weather;
  addClothing: (item: Omit<ClothingItem, 'id' | 'createdAt' | 'wearCount'>) => void;
  removeClothing: (id: string) => void;
  addOutfit: (outfit: Omit<Outfit, 'id' | 'createdAt' | 'likes' | 'isLiked'>) => void;
  removeOutfit: (id: string) => void;
  logDailyOutfit: (outfitId: string, notes: string, mood: DailyLog['mood']) => void;
  toggleLike: (outfitId: string) => void;
  setWeather: (weather: Weather) => void;
  getRecommendation: (occasion: Occasion) => Outfit | null;
}

export const useWardrobeStore = create<WardrobeState>()(
  persist(
    (set, get) => ({
      clothes: [],
      outfits: [],
      dailyLogs: [],
      currentWeather: 'sunny',

      addClothing: (item) => {
        const newItem: ClothingItem = {
          ...item,
          id: generateId(),
          createdAt: Date.now(),
          wearCount: 0,
        };
        set((state) => ({ clothes: [...state.clothes, newItem] }));
      },

      removeClothing: (id) => {
        set((state) => ({ clothes: state.clothes.filter((c) => c.id !== id) }));
      },

      addOutfit: (outfit) => {
        const newOutfit: Outfit = {
          ...outfit,
          id: generateId(),
          createdAt: Date.now(),
          likes: 0,
          isLiked: false,
        };
        set((state) => ({ outfits: [...state.outfits, newOutfit] }));
        
        // Increment wear count for each clothing item
        const state = get();
        const updatedClothes = state.clothes.map((c) => {
          if (outfit.items.includes(c.id)) {
            return { ...c, wearCount: c.wearCount + 1 };
          }
          return c;
        });
        set({ clothes: updatedClothes });
      },

      removeOutfit: (id) => {
        set((state) => ({ outfits: state.outfits.filter((o) => o.id !== id) }));
      },

      logDailyOutfit: (outfitId, notes, mood) => {
        const today = new Date().toISOString().split('T')[0];
        const existingLog = get().dailyLogs.find((l) => l.date === today);
        
        if (existingLog) {
          set((state) => ({
            dailyLogs: state.dailyLogs.map((l) =>
              l.date === today ? { ...l, outfitId, notes, mood } : l
            ),
          }));
        } else {
          const newLog: DailyLog = {
            id: generateId(),
            date: today,
            outfitId,
            notes,
            mood,
            createdAt: Date.now(),
          };
          set((state) => ({ dailyLogs: [...state.dailyLogs, newLog] }));
        }
      },

      toggleLike: (outfitId) => {
        set((state) => ({
          outfits: state.outfits.map((o) => {
            if (o.id === outfitId) {
              return {
                ...o,
                isLiked: !o.isLiked,
                likes: o.isLiked ? o.likes - 1 : o.likes + 1,
              };
            }
            return o;
          }),
        }));
      },

      setWeather: (weather) => {
        set({ currentWeather: weather });
      },

      getRecommendation: (occasion) => {
        const { outfits, currentWeather } = get();
        const suitable = outfits.filter(
          (o) => o.occasion === occasion && o.weather === currentWeather
        );
        if (suitable.length === 0) return null;
        return suitable[Math.floor(Math.random() * suitable.length)];
      },
    }),
    {
      name: 'wardrobe-storage',
    }
  )
);
