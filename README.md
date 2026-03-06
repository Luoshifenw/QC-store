# Livra Lingerie - 跨境电商独立站

> 欧美女装内衣品牌独立站，基于 Next.js + Shopify Storefront API 构建
***重要：你必须在开发过程中维护这个文档，记录开发现状和开发指导，让小白也能按照这个文档的指导上手开发***

## 📋 项目概述

| 项目 | 说明 |
|------|------|
| **品牌名称** | Livra |
| **目标市场** | 欧美女性 |
| **产品类型** | 内衣裤 |
| **技术栈** | Next.js 16 + TypeScript + Tailwind CSS |
| **后端** | Shopify (Headless 模式) |

---

## 🚀 快速开始

### 环境要求

- Node.js 18+ (当前使用 v25.2.1)
- npm 9+ (当前使用 v11.6.2)

### 安装与运行

```bash
# 进入项目目录
cd /Users/wusu/Desktop/MyProjects/IndependentSite_UnderWear_v0.0.2/livra-lingerie

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
npm run build
npm start
```

---

## 📁 项目结构

```
livra-lingerie/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx               # 全局布局（Header + Footer）
│   ├── page.tsx                 # 首页
│   ├── globals.css              # 全局样式
│   ├── products/[handle]/       # 产品详情页（动态路由）
│   │   └── page.tsx
│   ├── collection/[handle]/     # 产品列表页（动态路由）
│   │   └── page.tsx
│   ├── cart/                    # 购物车页面
│   │   └── page.tsx
│   └── pages/                   # 静态页面
│       ├── shipping/            # 配送与退换货
│       ├── size-guide/          # 尺码指南
│       ├── faq/                 # 常见问题
│       └── contact/             # 联系我们
├── components/                   # React 组件
│   ├── Header.tsx               # 导航栏（含购物车数量徽章）
│   ├── Footer.tsx               # 页脚
│   ├── Hero.tsx                 # 首页大图区域
│   ├── ProductCard.tsx          # 产品卡片
│   ├── ProductGrid.tsx          # 产品网格
│   ├── FeaturedSection.tsx      # 分类入口
│   ├── AboutSection.tsx         # 品牌故事
│   └── AddToCartButton.tsx      # 加购按钮
├── lib/                          # 工具库
│   ├── shopify.ts               # Shopify API 封装
│   ├── cart.ts                  # 购物车状态管理
│   └── CartContext.tsx          # React Context
├── public/                       # 静态资源
├── .env.local                    # 环境变量
├── next.config.ts               # Next.js 配置
├── tailwind.config.ts           # Tailwind 配置
└── README.md                    # 本文档
```

---

## 🔧 核心功能说明

### 1. Shopify API 集成（已完成）

项目已接入 Shopify Storefront API，商品数据实时获取。

**文件位置：**
- `lib/shopify.ts` - Shopify API 封装

**主要函数：**
```typescript
getProducts(first)      // 获取产品列表
getProduct(handle)      // 获取单个产品
getCollection(handle)   // 获取分类及产品
createCart()            // 创建购物车
addToCart(cartId, variantId, quantity)  // 添加到购物车
```

### 2. 购物车系统（纯前端）

购物车数据存储在浏览器的 `localStorage` 中，刷新页面不会丢失。

**文件位置：**
- `lib/cart.ts` - 购物车数据结构和操作函数
- `lib/CartContext.tsx` - React Context，用于全局状态共享
- `components/AddToCartButton.tsx` - 加购按钮组件

**数据结构：**
```typescript
interface CartItem {
  id: string;           // 产品ID
  title: string;        // 产品名称
  handle: string;       // URL 句柄
  price: number;        // 单价
  currencyCode: string; // 货币代码
  image: string;        // 图片URL
  quantity: number;     // 数量
  variantId: string;    // 变体ID
  variantTitle: string; // 变体名称
  color?: string;       // 颜色
  size?: string;        // 尺寸
}
```

### 3. 产品数据

当前使用 Shopify Storefront API 获取真实商品数据。

**商品分类：**
- Women: 8 款女款内衣
- Men: 2 款男款内裤
- Featured: 精选推荐

---

## 🎨 样式指南

### 颜色系统

| 用途 | Tailwind 类 | 说明 |
|------|-------------|------|
| 主文字 | `text-neutral-900` | #171717 |
| 次要文字 | `text-neutral-500` | #737373 |
| 边框 | `border-neutral-200` | #e5e5e5 |
| 背景 | `bg-white` / `bg-neutral-50` | 白色/浅灰 |
| 强调按钮 | `bg-neutral-900` | 黑色 |

### 字体

- 当前使用系统字体栈（无额外远程字体依赖）

### 间距规范

- 页面内边距：`px-4 sm:px-6 lg:px-8`
- 区块间距：`py-12` / `py-16`
- 组件间距：`mt-4` / `mt-8`

---

## 🔐 环境变量

创建 `.env.local` 文件：

```env
# Shopify 配置
NEXT_PUBLIC_STORE_DOMAIN=dhppw0-di.myshopify.com
NEXT_PUBLIC_STOREFRONT_API_TOKEN=your_storefront_api_token

# 品牌信息
NEXT_PUBLIC_STORE_NAME=Livra
NEXT_PUBLIC_STORE_DESCRIPTION=Elegant Lingerie for the Modern Woman
```

---

## 🔗 相关链接

| 项目 | 链接 |
|------|------|
| **网站** | https://wearlivra.com |
| **GitHub** | https://github.com/Luoshifenw/QC-store |
| **Shopify 后台** | https://admin.shopify.com/store/dhppw0-di |

---

## 📱 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero + 产品展示 + 品牌故事 |
| `/collection/women` | Women 分类 | 女款产品列表 |
| `/collection/men` | Men 分类 | 男款产品列表 |
| `/collection/featured` | Featured 分类 | 精选产品列表 |
| `/products/[handle]` | 产品详情 | 单个产品详情页 |
| `/cart` | 购物车 | 购物车页面 |
| `/pages/shipping` | 配送说明 | Shipping & Returns |
| `/pages/size-guide` | 尺码指南 | Size Guide |
| `/pages/faq` | 常见问题 | FAQ |
| `/pages/contact` | 联系我们 | Contact Us |

---

## 🐛 常见问题

### Q: 修改代码后页面没有更新？
A: Next.js 支持热更新，如果没更新，尝试刷新浏览器或重启开发服务器。

### Q: 购物车数据丢失？
A: 购物车数据存储在 localStorage，清除浏览器缓存会丢失数据。

### Q: 图片无法显示？
A: 检查 `next.config.ts` 中的 `images.remotePatterns` 是否包含图片域名。

### Q: 如何添加新的产品分类？
A: 1) 在 `app/collection/[handle]/page.tsx` 的 `collections` 对象中添加新分类
   2) 在 `components/Header.tsx` 和 `Footer.tsx` 中添加导航链接

---

## 📦 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 设置环境变量
4. 部署完成

### 手动部署

```bash
npm run build
npm start
```

---

## 📝 开发日志

### 2026-03-06
- ✅ **代码质量与安全修复**
  - 修复 ESLint 全部错误与警告（21 项）
  - `lib/shopify.ts` 去除硬编码 token，改为仅使用环境变量
  - Shopify API 层补充完整 TypeScript 类型，移除 `any`
- ✅ **构建稳定性**
  - 移除 `next/font/google` 远程字体依赖，避免构建时外网拉取失败
  - 修复 `metadataBase` 警告
- ✅ **搜索功能升级**
  - Header 搜索弹窗从本地 mock 数据改为 Shopify 实时搜索
  - 增加输入防抖与加载状态

### 2026-03-05
- ✅ **Shopify 后台欧美市场配置完成**
  - Markets: 北美市场（美国+加拿大）、欧盟市场（27国）
  - 语言: English 设为默认
  - 单位: Imperial system（英制）
  - 时区: Pacific Time (US & Canada)
  - 货币: 启用 USD/CAD/EUR 本地货币
  - 商店名称: Livra
  - 域名: wearlivra.com 已连接
- ✅ **商品管理**
  - 上架 10 个产品
  - 创建 Collections: Women（8款）、Men（2款）、Featured
  - 商品分类导航更新: Women / Men / Featured
- ✅ **前端开发**
  - Collection 页面接入真实 Shopify API
  - 产品详情页接入真实 Shopify API
  - 品牌素材替换完成（Hero、分类封面、About、Logo、Favicon）
- ✅ **飞书机器人配置完成**
  - OpenClaw 飞书插件启用
  - WebSocket 长连接模式（无需公网暴露）
  - 用户配对授权完成
  - 可通过飞书与 AI 助手交互
- ✅ **部署**
  - Vercel 自动部署已配置
  - 域名 wearlivra.com 已指向 Vercel

### 2026-03-01
- ✅ 创建 Next.js 项目
- ✅ 完成首页、产品列表、产品详情页
- ✅ 完成购物车功能（纯前端）
- ✅ 完成帮助页面
- ✅ 图片切换功能
- ✅ 颜色/尺寸选择功能
- ⏳ Shopify API 连接（需要升级计划）

---

## 📞 联系方式

- 开发者：OpenClaw AI Assistant
- 项目位置：`/Users/wusu/Desktop/MyProjects/IndependentSite_UnderWear_v0.0.2/livra-lingerie`

---

## 📱 移动端适配说明

### 响应式断点

| 断点 | 说明 | Tailwind 类 |
|------|------|-------------|
| 默认 | 手机端 (< 640px) | 无前缀 |
| `sm:` | 大手机 (≥ 640px) | `sm:text-sm` |
| `md:` | 平板 (≥ 768px) | `md:text-base` |
| `lg:` | 桌面 (≥ 1024px) | `lg:grid-cols-4` |

### 已优化的组件

| 组件 | 优化内容 |
|------|---------|
| `Hero.tsx` | 标题字号、内边距、按钮布局 |
| `ProductCard.tsx` | 字号、Quick Add 按钮隐藏 |
| `ProductGrid.tsx` | 间距、标题字号 |
| `cart/page.tsx` | 布局、字号、图片尺寸 |
| `Header.tsx` | 移动端菜单 |

### 移动端测试方法

1. 打开 Chrome DevTools (F12)
2. 点击设备工具栏图标
3. 选择 iPhone 或其他设备
4. 刷新页面测试

---

## 🔧 待优化项目

### 🔴 高优先级
- [ ] 支付配置 - Shopify Payments
- [ ] 物流配置 - 欧美运费模板
- [ ] 税费设置 - 欧盟 IOSS、加拿大 GST

### 🟡 中优先级
- [ ] 政策页面 - Privacy Policy、Terms、Refund Policy
- [ ] SEO 元数据 - 各页面独立 title/description
- [x] 搜索功能 - 接入 Shopify API（2026-03-06 已完成）

### 🟢 低优先级
- [ ] PWA 支持
- [ ] 国际化 - 多语言支持
- [ ] 骨架屏加载
