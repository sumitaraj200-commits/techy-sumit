# Techy Sumit — Tech & AI Reel Resource Hub

A high-performance, single-page application built with **React**, **Vite**, and **Tailwind CSS** featuring an **iOS 26 Liquid Glass** design aesthetic.

Designed as a direct destination hub for Instagram Reel viewers who receive direct messages (via ManyChat or Chatfuel comment automations) from [@techysumitofficial](https://www.instagram.com/techysumitofficial?vrfl=cDV3MmJya3d2d2V0).

---

## 🚀 Key Features

- **iOS 26 Liquid Glass UI**: Frosted glass cards (`backdrop-filter: blur(20px) saturate(180%)`), soft gold gradient blobs, subtle inner highlights, layered shadows, and large rounded corners (24px).
- **Mobile First & In-App Browser Optimized**: Crafted specifically for Instagram's in-app web browser on mobile phones with instant load time and zero lag.
- **Dedicated Reel Resource Pages (`/r/:slug`)**:
  - Reel title, description, and comment keyword badge.
  - "Watch on Instagram" direct button linking to the original Reel.
  - "Apps & Tools" section with direct visit links.
  - "Prompts" section with code boxes and instant 1-click gold "Copy" button with "Copied!" toast feedback.
  - "Links & Downloads" section for cheat sheets, templates, and dotfiles.
  - Web Share API integration with automatic clipboard fallback.
- **Global Prompts Library (`/prompts`)**: Searchable and filterable by category (AI, Coding, Design, Productivity) with direct backlinks to each source Reel.
- **Apps Catalog (`/apps`)**: Interactive directory of all tools featured across all videos.
- **About Page (`/about`)**: Sumit's creator bio, real stats, and social links.
- **Protected Creator Admin Panel (`/admin`)**:
  - Passcode protected (default: `sumit2026`, customizable inside the panel).
  - Upload and edit Reels with auto-generated slugs and ManyChat automation links.
  - Upload prompts directly with category tags and copyable code boxes.
  - Upload apps and tools with direct visit URLs and descriptions.
  - Upload links, PDFs, templates, and GitHub repositories.
  - Export full JSON backups and instant live preview.

---

## 🛠️ How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📦 How to Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework preset: **Vite** (default).
5. The included `vercel.json` ensures that all dynamic routes (like `/r/ai-prompts-2026`) route through `index.html`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
6. Click **Deploy**. Your custom domain or `*.vercel.app` domain will be live immediately.

---

## ✍️ How to Add a New Reel

All content is managed in the `REELS_DATA` array inside `src/App.tsx`. Simply append a new object to `REELS_DATA`:

```typescript
{
  id: "reel-04",
  slug: "my-new-reel-slug",
  title: "Top 3 New AI Tools in 2026",
  date: "October 26, 2026",
  thumbnail: "/src/assets/images/your-thumbnail.jpg",
  instagramUrl: "https://www.instagram.com/reels/YOUR_REEL_ID",
  description: "Detailed description of the reel and tools mentioned...",
  keyword: "TOOLS", // The trigger keyword viewers comment
  apps: [
    {
      name: "App Name",
      description: "What the app does...",
      url: "https://example.com",
      category: "AI" // 'AI' | 'Productivity' | 'Developer' | 'Design' | 'Utilities'
    }
  ],
  prompts: [
    {
      title: "Prompt Title",
      category: "Coding",
      text: "The full prompt text to copy..."
    }
  ],
  links: [
    {
      label: "Download Link or Resource",
      url: "https://example.com",
      type: "Download"
    }
  ]
}
```

### Automation Link for Instagram DM:
When setting up your ManyChat or Instagram automation for the keyword:
- Send your viewers the URL: `https://yourdomain.com/r/my-new-reel-slug`
