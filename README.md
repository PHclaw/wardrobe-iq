# 👗 WardrobeIQ

> AI 穿搭助手 - 拍照录入衣服，智能推荐搭配

![Status](https://img.shields.io/badge/status-v0.1-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-purple)

## ✨ 功能特色

### 🏠 智能衣柜管理
- 拍照/上传衣服照片
- 按分类整理（上装/下装/外套/鞋履/配饰）
- 自定义标签和颜色
- 追踪穿着次数

### 🤖 AI 搭配推荐
- 根据**天气**智能推荐
- 根据**场合**（工作/约会/运动/休闲/派对）定制
- 一键保存喜欢的搭配

### 📅 每日穿搭打卡
- 记录每天的穿搭
- 记录心情和备注
- 穿搭历史一目了然

### 📊 穿搭统计
- 哪件衣服最常穿
- 搭配次数分析
- 打卡天数统计

## 🎨 界面预览

```
┌─────────────────────────────┐
│  WardrobeIQ 👗              │
│  ☀️ 今天天气：晴天           │
├─────────────────────────────┤
│  [衣柜] [搭配] [打卡] [统计] │
├─────────────────────────────┤
│                             │
│  🤖 AI 智能搭配              │
│  选择场合：💼 🏃 💕 🎉 😎    │
│                             │
│  [    生成搭配    ]          │
│                             │
│  👗 我的衣柜 (12)            │
│  ┌────┐ ┌────┐ ┌────┐       │
│  │ 👕 │ │ 👖 │ │ 🧥 │       │
│  └────┘ └────┘ └────┘       │
│                             │
└─────────────────────────────┘
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 8
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **状态管理**: Zustand
- **图标**: Lucide React
- **数据存储**: LocalStorage（v0.1 纯前端，后续支持云端）

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/PHclaw/wardrobe-iq.git
cd wardrobe-iq

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📱 访问

开发服务器运行在: http://localhost:5173

## 🤝 未来规划

- [ ] 后端 API 支持云端同步
- [ ] 社交功能（点赞、评论、关注）
- [ ] 微信小程序版本
- [ ] AR 虚拟试衣
- [ ] 天气 API 自动获取

## 📝 License

MIT

---

Made with 💜 by [PHclaw](https://github.com/PHclaw)
