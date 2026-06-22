# 👗 WardrobeIQ — AI 穿搭助手，拍照录入衣服智能推荐搭配

<div align="center">

![WardrobeIQ](https://img.shields.io/badge/WardrobeIQ-v0.1-ec4899?style=for-the-badge&logo=shirt&logoColor=white)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-FF6B6B?style=flat-square)](LICENSE)

**拍照录入衣服 · 按场合/天气 AI 推荐搭配 · 每日穿搭打卡**

[快速开始](#-5-分钟快速开始) · [核心功能](#-核心功能有哪些) · [常见问题](#-常见问题)

</div>

---

## WardrobeIQ 是什么？解决什么问题？

WardrobeIQ 是一个**AI 穿搭管理工具**。把衣服拍照录入虚拟衣柜，选择场合（工作 / 约会 / 运动 / 休闲 / 派对），AI 根据天气和搭配规则推荐当天穿什么。每日打卡记录，形成穿搭习惯。

**一句话总结**：不知道今天穿什么？拍照入库，AI 帮你选。

**适合谁：**
- 每天纠结穿什么的人
- 想优化衣柜利用率、减少乱买的人
- 追求穿搭品质但缺乏搭配知识的人

---

## 📋 目录

- [核心功能有哪些？](#-核心功能有哪些)
- [5 分钟快速开始](#-5-分钟快速开始)
- [AI 搭配规则是什么？](#-ai搭配规则是什么)
- [技术架构](#-技术架构)
- [常见问题](#-常见问题)

---

## ✨ 核心功能有哪些？

| 功能 | 说明 |
|:-----|:-----|
| 📸 **拍照录入** | 拍照或上传衣服照片，自动存档到虚拟衣柜 |
| 🏠 **智能衣柜** | 按分类（上装/下装/外套/鞋履/配饰）整理，追踪穿着次数 |
| 🤖 **AI 搭配推荐** | 根据天气 + 场合 + 已有衣物生成搭配方案 |
| 📅 **每日打卡** | 记录每天穿搭 + 心情，形成穿搭数据分析 |
| 📊 **穿搭统计** | 哪件衣服最常穿、搭配次数、打卡天数 |

---

## 🤖 AI 搭配规则是什么？

AI 根据以下维度生成推荐：

| 维度 | 规则 |
|:-----|:-----|
| **天气** | 晴天 → 轻薄 / 阴天 → 保暖 / 下雨 → 防泼水 |
| **场合** | 工作 → 商务休闲 / 约会 → 精致 / 运动 → 功能性 |
| **颜色** | 同色系或互补色搭配，避免全身超过 3 色 |
| **场合频率** | 约会少撞款、工作多备几套循环 |

---

## 🚀 5 分钟快速开始

### 环境要求

| 依赖 | 版本 |
|:-----|:-----|
| Node.js | 18+ |
| npm | 9+ |

### 本地运行

```bash
git clone https://github.com/PHclaw/wardrobe-iq.git
cd wardrobe-iq
npm install
npm run dev
```

访问 http://localhost:5173，拍照录入第一件衣服即可开始。

---

## 🏗️ 技术架构

| 技术 | 用途 |
|:-----|:-----|
| React 18 + TypeScript | UI 框架 |
| Vite 8 | 构建工具 |
| Tailwind CSS v4 | 样式框架 |
| Framer Motion | 交互动画 |
| Zustand | 状态管理 |
| Lucide React | 图标库 |
| LocalStorage | v0.1 本地数据存储（后续支持云端） |

---

## ❓ 常见问题

### 数据保存在哪里？

当前版本使用 localStorage 本地存储，不上传任何服务器。后续版本规划云端同步。

### 支持天气 API 自动获取吗？

是的，AI 搭配会结合天气情况推荐。天气数据通过浏览器定位获取，无需手动输入。

### 可以识别衣服颜色和款式吗？

当前版本基于用户手动录入的分类和标签。AI 搭配基于已有衣物组合规则，不依赖图像识别。

### 有微信小程序版吗？

暂无，小程序版在 Roadmap 中。

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

## 📄 License

MIT © [PHclaw](https://github.com/PHclaw)

<!-- JSON-LD 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WardrobeIQ",
  "description": "AI穿搭助手应用，拍照录入衣服到虚拟衣柜，根据天气和场合（工作/约会/运动/休闲/派对）智能推荐搭配，每日穿搭打卡，支持穿搭统计。",
  "url": "https://github.com/PHclaw/wardrobe-iq",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "programmingLanguage": ["TypeScript", "React"],
  "license": "https://opensource.org/licenses/MIT",
  "author": { "@type": "Person", "name": "PHclaw", "url": "https://github.com/PHclaw" }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "WardrobeIQ 的数据保存在哪里？",
      "acceptedAnswer": { "@type": "Answer", "text": "当前版本使用localStorage本地存储，不上传任何服务器。后续版本规划云端同步功能。" }
    },
    {
      "@type": "Question",
      "name": "WardrobeIQ 可以自动获取天气吗？",
      "acceptedAnswer": { "@type": "Answer", "text": "是的，AI搭配会结合天气情况推荐。天气数据通过浏览器定位自动获取，无需手动输入。" }
    },
    {
      "@type": "Question",
      "name": "WardrobeIQ 有微信小程序版吗？",
      "acceptedAnswer": { "@type": "Answer", "text": "暂无，小程序版在Roadmap中，后续版本规划。" }
    }
  ]
}
</script>
