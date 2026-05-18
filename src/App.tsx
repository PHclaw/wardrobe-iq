import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shirt, Plus, Wand2, Calendar, BarChart3, 
  Heart, Sparkles
} from 'lucide-react';
import { useWardrobeStore } from './stores/wardrobeStore';
import { ClothingCard } from './components/ClothingCard';
import { OutfitCard } from './components/OutfitCard';
import { AddClothingModal } from './components/AddClothingModal';
import { WeatherSelector } from './components/WeatherSelector';
import { OccasionSelector } from './components/OccasionSelector';
import { RecommendationResult } from './components/RecommendationResult';
import { generateRecommendation, getDateLabel, getMoodEmoji } from './utils/weather';
import type { Occasion, ClothingItem } from './types';

type Tab = 'wardrobe' | 'outfits' | 'calendar' | 'stats';

function App() {
  const [tab, setTab] = useState<Tab>('wardrobe');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [recommendation, setRecommendation] = useState<ClothingItem[] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    clothes,
    outfits,
    dailyLogs,
    currentWeather,
    addClothing,
    removeClothing,
    addOutfit,
    removeOutfit,
    toggleLike,
    setWeather,
    logDailyOutfit,
  } = useWardrobeStore();

  const handleGetRecommendation = () => {
    if (!selectedOccasion || clothes.length < 3) return;
    const result = generateRecommendation(clothes, selectedOccasion, currentWeather);
    setRecommendation(result);
  };

  const handleSaveOutfit = () => {
    if (!recommendation) return;
    
    const occasionNames: Record<Occasion, string> = {
      work: '工作装',
      date: '约会装',
      sport: '运动装',
      casual: '休闲装',
      party: '派对装',
    };

    addOutfit({
      name: `${occasionNames[selectedOccasion!] || '今日穿搭'}`,
      items: recommendation.map((c) => c.id),
      occasion: selectedOccasion!,
      weather: currentWeather,
    });

    setRecommendation(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const tabs = [
    { id: 'wardrobe' as const, label: '衣柜', icon: Shirt },
    { id: 'outfits' as const, label: '搭配', icon: Heart },
    { id: 'calendar' as const, label: '打卡', icon: Calendar },
    { id: 'stats' as const, label: '统计', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              WardrobeIQ 👗
            </h1>
            <WeatherSelector current={currentWeather} onChange={setWeather} />
          </div>
          
          {/* Tab Navigation */}
          <nav className="flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === id
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
            >
              <Sparkles size={18} />
              搭配保存成功！
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wardrobe Tab */}
        {tab === 'wardrobe' && (
          <div className="space-y-6">
            {/* AI Recommendation Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="text-purple-500" size={20} />
                <h2 className="text-lg font-semibold">AI 智能搭配</h2>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-3">选择今天的场合：</p>
                <OccasionSelector selected={selectedOccasion} onChange={setSelectedOccasion} />
              </div>

              <button
                onClick={handleGetRecommendation}
                disabled={!selectedOccasion || clothes.length < 3}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Wand2 size={18} />
                {clothes.length < 3 ? `再添 ${3 - clothes.length} 件衣服` : '生成搭配'}
              </button>

              {clothes.length > 0 && clothes.length < 3 && (
                <p className="text-sm text-amber-500 mt-2 text-center">
                  💡 至少需要 3 件衣服才能生成搭配
                </p>
              )}
            </div>

            {/* Recommendation Result */}
            <AnimatePresence mode="wait">
              {recommendation && selectedOccasion && (
                <RecommendationResult
                  items={recommendation}
                  occasion={selectedOccasion}
                  weather={currentWeather}
                  onSaveOutfit={handleSaveOutfit}
                  onDismiss={() => setRecommendation(null)}
                />
              )}
            </AnimatePresence>

            {/* Clothing Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">我的衣柜 ({clothes.length})</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                >
                  <Plus size={16} />
                  添加衣服
                </button>
              </div>

              {clothes.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">👗</div>
                  <p className="text-gray-500 mb-4">你的衣柜是空的，快来添加第一件衣服吧！</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  >
                    添加衣服
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {clothes.map((item) => (
                    <ClothingCard
                      key={item.id}
                      item={item}
                      onDelete={removeClothing}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Outfits Tab */}
        {tab === 'outfits' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">我的搭配 ({outfits.length})</h2>
            
            {outfits.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">💝</div>
                <p className="text-gray-500">还没有保存的搭配，快去生成一套吧！</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {outfits.map((outfit) => (
                  <OutfitCard
                    key={outfit.id}
                    outfit={outfit}
                    clothes={clothes}
                    onLike={toggleLike}
                    onDelete={removeOutfit}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {tab === 'calendar' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">穿搭打卡</h2>
            
            {/* Today's Check-in */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium mb-4">今天 · {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}</h3>
              <TodayCheckIn onSubmit={logDailyOutfit} />
            </div>

            {/* Past Logs */}
            <div className="space-y-3">
              {dailyLogs.length > 0 ? (
                dailyLogs
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((log) => {
                    const outfit = outfits.find((o) => o.id === log.outfitId);
                    return (
                      <div key={log.id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{getDateLabel(log.date)}</span>
                          <span className="text-2xl">{getMoodEmoji(log.mood)}</span>
                        </div>
                        {outfit && (
                          <p className="text-sm text-gray-600">穿了一套：{outfit.name}</p>
                        )}
                        {log.notes && (
                          <p className="text-sm text-gray-500 mt-1">{log.notes}</p>
                        )}
                      </div>
                    );
                  })
              ) : (
                <p className="text-center text-gray-400 py-8">还没有打卡记录</p>
              )}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {tab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">穿搭统计</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-3xl font-bold text-purple-600">{clothes.length}</p>
                <p className="text-sm text-gray-500">衣服总数</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-3xl font-bold text-pink-600">{outfits.length}</p>
                <p className="text-sm text-gray-500">搭配套装</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">{dailyLogs.length}</p>
                <p className="text-sm text-gray-500">打卡天数</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-3xl font-bold text-green-600">
                  {clothes.reduce((sum, c) => sum + c.wearCount, 0)}
                </p>
                <p className="text-sm text-gray-500">总穿着次数</p>
              </div>
            </div>

            {/* Most Worn */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-medium mb-4">🏆 最常穿的衣服</h3>
              {clothes.length > 0 ? (
                <div className="space-y-3">
                  {[...clothes]
                    .sort((a, b) => b.wearCount - a.wearCount)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-400 w-6">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                        </span>
                        <ClothingCard item={item} compact />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400">穿了 {item.wearCount} 次</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <p className="text-gray-400">还没有数据</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add Clothing Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddClothingModal
            onClose={() => setShowAddModal(false)}
            onAdd={addClothing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Today's Check-in Component
function TodayCheckIn({ onSubmit }: { onSubmit: (outfitId: string, notes: string, mood: 'great' | 'good' | 'okay' | 'bad') => void }) {
  const { outfits, dailyLogs } = useWardrobeStore();
  const today = new Date().toISOString().split('T')[0];
  const todayLog = dailyLogs.find((l) => l.date === today);
  
  const [selectedOutfit, setSelectedOutfit] = useState(todayLog?.outfitId || '');
  const [notes, setNotes] = useState(todayLog?.notes || '');
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'bad'>(todayLog?.mood || 'good');

  const moods = [
    { id: 'great' as const, emoji: '🤩', label: '很棒' },
    { id: 'good' as const, emoji: '😊', label: '不错' },
    { id: 'okay' as const, emoji: '😐', label: '一般' },
    { id: 'bad' as const, emoji: '😔', label: '不好' },
  ];

  const handleSubmit = () => {
    onSubmit(selectedOutfit, notes, mood);
  };

  if (todayLog) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-2">✨</div>
        <p className="text-gray-600">今日穿搭已打卡！</p>
        <p className="text-sm text-gray-400 mt-1">
          {getMoodEmoji(todayLog.mood)} {todayLog.notes || '无备注'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-2">今天感觉怎么样？</p>
        <div className="flex justify-center gap-2">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={`p-3 rounded-xl text-center transition-all ${
                mood === m.id
                  ? 'bg-purple-100 scale-110'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl">{m.emoji}</div>
              <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            </button>
          ))}
        </div>
      </div>

      {outfits.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2">选择今天的搭配（可选）：</p>
          <select
            value={selectedOutfit}
            onChange={(e) => setSelectedOutfit(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">不选择搭配</option>
            {outfits.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="写点什么记录今天..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none"
          rows={2}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
      >
        打卡 ✨
      </button>
    </div>
  );
}

export default App;
