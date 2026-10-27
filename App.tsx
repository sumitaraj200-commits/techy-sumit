import React, { useState, useEffect, useMemo } from 'react';
import { 
  Instagram, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Terminal, 
  Download, 
  Layers, 
  MessageSquare, 
  Calendar, 
  Menu, 
  X, 
  Bookmark, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  LogOut,
  ShieldAlert,
  FolderGit2,
  Link as LinkIcon,
  Eye,
  FileCode,
  AlertTriangle,
  Upload,
  Globe,
  Compass
} from 'lucide-react';

// Authentic Google Play Vector Icon
export const PlayStoreIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M3.609 1.814L13.793 12 3.61 22.186A2.22 2.22 0 0 1 3 20.613V3.387c0-.6.22-1.168.609-1.573z" fill="#00C1A6"/>
    <path d="M17.37 8.423l-3.577 3.577 3.577 3.577 4.027-2.302a1.854 1.854 0 0 0 0-3.21l-4.027-2.302z" fill="#FFD400"/>
    <path d="M3.609 22.186l10.184-10.186 3.577 3.577-11.83 6.76a2.17 2.17 0 0 1-1.931-.151z" fill="#FF3A44"/>
    <path d="M3.609 1.814A2.17 2.17 0 0 1 5.54 1.663l11.83 6.76-3.577 3.577-10.184-10.186z" fill="#00E676"/>
  </svg>
);

/* =========================================================================
   TYPES & CONSTANTS
   ========================================================================= */
export interface AppTool {
  id?: string;
  name: string;
  description: string;
  url: string;
  category: 'AI' | 'Productivity' | 'Developer' | 'Design' | 'Utilities' | 'Android';
  platform?: 'PlayStore' | 'Web' | 'AppStore' | 'Desktop';
  playStorePackage?: string;
  rating?: string;
  downloads?: string;
}

export interface PromptItem {
  id?: string;
  title: string;
  text: string;
  category: 'AI' | 'Coding' | 'Design' | 'Productivity' | 'Developer';
}

export interface DownloadLink {
  id?: string;
  label: string;
  url: string;
  type?: 'GitHub' | 'Guide' | 'Download' | 'Website';
}

export interface Reel {
  id: string;
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  instagramUrl: string;
  description: string;
  keyword: string; // The DM trigger keyword (e.g., "AI2026")
  apps: AppTool[];
  prompts: PromptItem[];
  links: DownloadLink[];
}

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/techysumitofficial?vrfl=cDV3MmJya3d2d2V0";
const STORAGE_KEY_REELS = "techysumit_reels_store_v1";
const STORAGE_KEY_AUTH = "techysumit_admin_auth_v1";
const STORAGE_KEY_PASS = "techysumit_admin_pass_v1";
const DEFAULT_ADMIN_PASS = "sumit2026";

export const DEFAULT_REELS_DATA: Reel[] = [
  {
    id: "reel-01",
    slug: "ai-prompts-2026",
    title: "5 Crazy AI Prompts & Free Tools That Feel Illegal to Know",
    date: "October 20, 2026",
    thumbnail: "/src/assets/images/video_thumb_ai_tools_1793030209923.jpg",
    instagramUrl: INSTAGRAM_PROFILE_URL,
    description: "In this Reel, I broke down the 5 next-generation system prompts that turn basic LLMs into senior software architects, plus 3 brand new free AI tools for instant wireframing and automated web research.",
    keyword: "PROMPTS",
    apps: [
      {
        id: "app-1",
        name: "v0.dev by Vercel",
        description: "Generative UI system that creates production-ready React and Tailwind components from natural language instructions in seconds.",
        url: "https://v0.dev",
        category: "Developer"
      },
      {
        id: "app-2",
        name: "Perplexity Comet",
        description: "Real-time AI research assistant with live web synthesis, academic citations, and step-by-step code execution sandboxes.",
        url: "https://perplexity.ai",
        category: "AI"
      },
      {
        id: "app-3",
        name: "Raycast AI",
        description: "Ultra-fast desktop launcher for macOS and Windows with embedded multi-model AI, quick prompt snippets, and clipboard history.",
        url: "https://raycast.com",
        category: "Productivity"
      },
      {
        id: "app-4",
        name: "Napkin AI",
        description: "Turns plain explanatory text and markdown docs into visual infographics, flowcharts, and architecture diagrams automatically.",
        url: "https://napkin.ai",
        category: "Design"
      }
    ],
    prompts: [
      {
        id: "prompt-1",
        title: "Senior Software Architect Code Reviewer",
        category: "Coding",
        text: `You are an elite Staff Software Engineer and Security Auditor. Review the provided code snippet with extreme rigor.
1. Identify hidden edge cases, race conditions, memory leaks, or unhandled errors.
2. Flag any O(N^2) or suboptimal time/space complexity and provide the optimized algorithm with mathematical rationale.
3. Check for security vulnerabilities (injection, sanitized inputs, CSRF, insecure token storage).
4. Rewrite the implementation following modern clean architecture and TypeScript strict mode, explaining every architectural change.`
      },
      {
        id: "prompt-2",
        title: "1-Click Full Stack Feature Blueprint",
        category: "Developer",
        text: `Act as a Technical Lead specifying a production web feature. Given the user requirement: "[INSERT REQUIREMENT HERE]"
Generate:
- Database Schema: Normalized relational schema (PostgreSQL) with constraints, foreign keys, and indexes.
- REST/RPC API Contract: Exact endpoints, request payload schema, and error response codes.
- Frontend State & Component Tree: High-level component hierarchy, caching strategy, and optimistic UI updates.
- Edge Case Matrix: 5 realistic failure scenarios and how the system gracefully recovers.`
      },
      {
        id: "prompt-3",
        title: "High-Converting Viral Reel Script Engine",
        category: "AI",
        text: `You are a viral tech short-form video creator with over 1M followers. Write a high-retention 45-second Instagram Reel script on the topic: "[TOPIC]".
Structure:
- Hook (0-3s): Visually arresting visual cue + controversial or counter-intuitive verbal hook (no generic greetings).
- Problem & Intrigue (3-12s): The exact pain point everyone suffers from silently.
- The Reveal & Solution (12-32s): 3 rapid, punchy steps with on-screen text directions.
- Call to Action (32-45s): Low-friction comment automation trigger word to send resources via direct message.`
      }
    ],
    links: [
      {
        id: "link-1",
        label: "Sumit's Curated System Prompts GitHub Repo",
        url: "https://github.com/techysumit/awesome-ai-developer-prompts",
        type: "GitHub"
      },
      {
        id: "link-2",
        label: "Free PDF: 2026 AI Developer Cheat Sheet",
        url: "https://techysumit.gumroad.com/l/ai-cheatsheet",
        type: "Download"
      },
      {
        id: "link-3",
        label: "Official Claude 3.7 & DeepSeek Prompting Guide",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering",
        type: "Guide"
      }
    ]
  },
  {
    id: "reel-02",
    slug: "minimal-developer-setup",
    title: "The Ultimate Clean Tech & Coding Setup (Apps I Can't Live Without)",
    date: "October 14, 2026",
    thumbnail: "/src/assets/images/video_thumb_coding_workflow_1793030208248.jpg",
    instagramUrl: INSTAGRAM_PROFILE_URL,
    description: "Every app, terminal configuration, font, and window manager I use daily to write code 3x faster without clutter. Commented 'SETUP' on Instagram? Everything mentioned is organized below.",
    keyword: "SETUP",
    apps: [
      {
        id: "app-5",
        name: "Cursor AI",
        description: "The AI-native code editor built on VS Code. Multi-file editing, predictive tab completions, and codebase-wide indexing.",
        url: "https://cursor.com",
        category: "Developer"
      },
      {
        id: "app-6",
        name: "Ghostty Terminal",
        description: "Blazing fast, native GPU-accelerated terminal emulator designed for minimalism, crisp typography, and instant startup.",
        url: "https://ghostty.org",
        category: "Developer"
      },
      {
        id: "app-7",
        name: "Opal Focus",
        description: "Science-backed screen time and distraction blocker that locks doom-scrolling apps during scheduled deep work sessions.",
        url: "https://opal.so",
        category: "Productivity"
      },
      {
        id: "app-8",
        name: "Shottr",
        description: "Lightweight, pixel-perfect screenshot utility for Mac with instant text OCR, blur tools, and measurement calipers.",
        url: "https://shottr.cc",
        category: "Utilities"
      }
    ],
    prompts: [
      {
        id: "prompt-4",
        title: "Dotfiles & Terminal Auto-Configurator",
        category: "Coding",
        text: `Analyze my terminal shell environment (Zsh + Starship prompt). Recommend a hyper-minimal, zero-lag configuration:
1. Provide alias shortcuts for modern Git commands (worktrees, interactive rebase, pretty log graph).
2. Integrate fzf for fuzzy history search and zoxide for smart directory jumping.
3. Minimize startup execution time to under 30 milliseconds.`
      },
      {
        id: "prompt-5",
        title: "Deep Work Daily Time-Block Optimizer",
        category: "Productivity",
        text: `I am a software engineer with 6 available working hours today. My pending tasks are:
[LIST TASKS WITH ESTIMATED EFFORT]
Organize my day using ultradian rhythm time-blocking:
- 2 uninterrupted 90-minute Deep Work blocks for high-cognitive tasks.
- 1 consolidated 45-minute Shallow Admin/Email block.
- Exact break intervals with physical movement recommendations.`
      }
    ],
    links: [
      {
        id: "link-4",
        label: "Sumit's Public Dotfiles (Zsh, Ghostty, NeoVim)",
        url: "https://github.com/techysumit/dotfiles-clean-setup",
        type: "GitHub"
      },
      {
        id: "link-5",
        label: "VS Code / Cursor Theme: Tokyo Night Clean",
        url: "https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night",
        type: "Website"
      },
      {
        id: "link-6",
        label: "Free JetBrains Mono + Ligatures Font Pack",
        url: "https://www.jetbrains.com/lp/mono/",
        type: "Download"
      }
    ]
  },
  {
    id: "reel-03",
    slug: "productivity-secret-apps",
    title: "3 Aesthetic Productivity Apps That Replaced Notion & Todoist",
    date: "September 28, 2026",
    thumbnail: "/src/assets/images/video_thumb_productivity_apps_1793030207513.jpg",
    instagramUrl: INSTAGRAM_PROFILE_URL,
    description: "Stop spending 4 hours organizing your productivity system instead of doing actual work. Here are the 3 clean, zero-friction apps that keep my life and YouTube workflow entirely on track.",
    keyword: "FOCUS",
    apps: [
      {
        id: "app-9",
        name: "Cron (Notion Calendar)",
        description: "Next-generation calendar app with multi-timezone overlays, interactive scheduling links, and fluid keyboard navigation.",
        url: "https://cron.com",
        category: "Productivity"
      },
      {
        id: "app-10",
        name: "Linear",
        description: "The gold standard for project management and issue tracking. Lightning-fast keyboard shortcuts and zero bloated menus.",
        url: "https://linear.app",
        category: "Productivity"
      },
      {
        id: "app-11",
        name: "Craft Docs",
        description: "Native document and note-taking application designed with native Apple aesthetics, offline support, and silky-smooth markdown.",
        url: "https://craft.do",
        category: "Design"
      }
    ],
    prompts: [
      {
        id: "prompt-6",
        title: "Eisenhower Matrix Prioritization Filter",
        category: "Productivity",
        text: `Here is a raw brain dump of 10 tasks on my mind:
[INSERT LIST OF TASKS]
Categorize them strictly into the 4 Eisenhower Quadrants:
1. Urgent & Important (Do immediately)
2. Not Urgent but Important (Schedule on calendar)
3. Urgent but Not Important (Delegate or automate)
4. Not Urgent & Not Important (Eliminate ruthlessly)
For each task in Quadrant 2, suggest the single highest-leverage first step.`
      }
    ],
    links: [
      {
        id: "link-7",
        label: "Sumit's Weekly Creator Sprint Template",
        url: "https://craft.do/s/sumit-weekly-sprint-template",
        type: "Guide"
      },
      {
        id: "link-8",
        label: "Free Keyboard Shortcut Wallpaper",
        url: "https://techysumit.gumroad.com/l/shortcuts-wallpaper",
        type: "Download"
      }
    ]
  }
];

/* =========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================= */

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const CopyButton: React.FC<{
  textToCopy: string;
  label?: string;
  className?: string;
  onCopy?: () => void;
}> = ({ textToCopy, label = "Copy", className = "", onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 select-none ${
        copied ? 'bg-emerald-600 text-white shadow-sm' : 'gold-btn'
      } ${className}`}
      title={copied ? "Copied to clipboard!" : "Copy prompt text"}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export const AppCard: React.FC<{
  app: AppTool;
  featuredInSlug?: string;
  featuredInTitle?: string;
  onNavigate?: (path: string) => void;
}> = ({ app, featuredInSlug, featuredInTitle, onNavigate }) => {
  const isPlayStore = app.platform === 'PlayStore' || app.url.toLowerCase().includes('play.google.com');

  return (
    <GlassCard className="p-5 flex flex-col justify-between h-full group" hoverEffect>
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base shadow-sm shrink-0 border border-white/80 ${
              isPlayStore 
                ? 'bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50 text-emerald-800' 
                : 'bg-gradient-to-br from-[#F7E08A]/60 to-[#D4AF37]/30 text-[#996515]'
            }`}>
              {isPlayStore ? <PlayStoreIcon className="w-5 h-5" /> : app.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-base group-hover:text-[#B38728] transition-colors leading-tight flex items-center gap-1.5">
                <span>{app.name}</span>
                {isPlayStore && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded inline-flex items-center gap-1">
                    Play Store
                  </span>
                )}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] font-medium text-[#8A7335] bg-[#F7E08A]/25 border border-[#D4AF37]/20 px-2 py-0.5 rounded-md inline-block">
                  {app.category}
                </span>
                {app.rating && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                    ★ {app.rating}
                  </span>
                )}
                {app.downloads && (
                  <span className="text-[10px] text-[#777777] font-medium">
                    {app.downloads}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#555555] leading-relaxed mt-2.5 line-clamp-3">
          {app.description}
        </p>

        {featuredInSlug && featuredInTitle && onNavigate && (
          <button
            onClick={() => onNavigate(`/r/${featuredInSlug}`)}
            className="text-[11px] text-[#888888] hover:text-[#B38728] transition-colors mt-3 flex items-center gap-1 group/reel text-left"
          >
            <span className="truncate">Featured in: <span className="underline decoration-[#D4AF37]/50">{featuredInTitle}</span></span>
            <ChevronRight className="w-3 h-3 shrink-0 text-[#D4AF37]" />
          </button>
        )}
      </div>

      <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between">
        <span className="text-[11px] text-[#888888]">
          {isPlayStore ? 'Android App' : 'Direct Link'}
        </span>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl ${
            isPlayStore
              ? 'bg-[#111111] text-white hover:bg-black hover:scale-105 shadow-sm transition-all'
              : 'gold-btn'
          }`}
        >
          {isPlayStore ? (
            <>
              <PlayStoreIcon className="w-3.5 h-3.5" />
              <span>Get on Google Play</span>
            </>
          ) : (
            <>
              <span>Visit</span>
              <ExternalLink className="w-3 h-3 stroke-[2.2]" />
            </>
          )}
        </a>
      </div>
    </GlassCard>
  );
};

export const PromptCard: React.FC<{
  prompt: PromptItem;
  sourceSlug?: string;
  sourceTitle?: string;
  onNavigate?: (path: string) => void;
  onCopiedToast?: (title: string) => void;
}> = ({ prompt, sourceSlug, sourceTitle, onNavigate, onCopiedToast }) => {
  return (
    <GlassCard className="p-5 flex flex-col justify-between" hoverEffect>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-semibold tracking-wide uppercase text-[#996515] bg-[#F7E08A]/30 border border-[#D4AF37]/25 px-2 py-0.5 rounded-md">
              {prompt.category}
            </span>
            <h4 className="font-bold text-[#111111] text-base mt-2">
              {prompt.title}
            </h4>
          </div>
          <CopyButton
            textToCopy={prompt.text}
            label="Copy Prompt"
            onCopy={() => onCopiedToast && onCopiedToast(prompt.title)}
          />
        </div>

        <div className="relative mt-2 rounded-2xl bg-[#F7F6F2]/90 border border-[#D4AF37]/20 p-3.5 text-xs font-mono text-[#222222] overflow-x-auto max-h-48 leading-relaxed shadow-inner">
          <pre className="whitespace-pre-wrap break-words font-mono text-[12px]">{prompt.text}</pre>
        </div>
      </div>

      {sourceSlug && onNavigate && (
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#777777]">
          <span>Source Reel:</span>
          <button
            onClick={() => onNavigate(`/r/${sourceSlug}`)}
            className="text-[#996515] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View Reel Resources</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </GlassCard>
  );
};

export const ReelCard: React.FC<{
  reel: Reel;
  onNavigate: (path: string) => void;
}> = ({ reel, onNavigate }) => {
  return (
    <GlassCard
      onClick={() => onNavigate(`/r/${reel.slug}`)}
      className="overflow-hidden flex flex-col h-full group"
      hoverEffect
    >
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
        <img
          src={reel.thumbnail}
          alt={reel.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-md border border-white/90 text-[#8C650A] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
          <Instagram className="w-3 h-3 text-[#D4AF37]" />
          <span>Keyword: <strong>{reel.keyword}</strong></span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
          {reel.apps.length} Tools · {reel.prompts.length} Prompts
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="text-[11px] text-[#777777] font-medium mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#D4AF37]" />
            <span>{reel.date}</span>
          </div>

          <h3 className="font-bold text-[#111111] text-base group-hover:text-[#B38728] transition-colors leading-snug line-clamp-2">
            {reel.title}
          </h3>

          <p className="text-xs text-[#555555] mt-2 line-clamp-2 leading-relaxed">
            {reel.description}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between">
          <span className="text-[11px] text-[#888888] font-medium">Free Resources</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C650A] group-hover:translate-x-0.5 transition-transform">
            <span>Open Resources</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export const ResourceSection: React.FC<{
  title: string;
  badge?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  count?: number;
}> = ({ title, badge, icon, children, count }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F7E08A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#996515]">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-[#111111] tracking-tight">
            {title}
          </h2>
          {count !== undefined && (
            <span className="text-xs font-semibold text-[#8A7335] bg-[#F7E08A]/25 border border-[#D4AF37]/25 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {badge && (
          <span className="text-xs text-[#666666] hidden sm:inline-block">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  );
};

export const Navbar: React.FC<{
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdminLoggedIn?: boolean;
}> = ({ currentPath, onNavigate, isAdminLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Reels', path: '/#reels' },
    { label: 'Prompts', path: '/prompts' },
    { label: 'Apps', path: '/apps' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-navbar rounded-full px-5 py-3 flex items-center justify-between">
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F7E08A] flex items-center justify-center text-[#1A1303] font-black text-xs shadow-sm">
            TS
          </div>
          <span className="font-extrabold text-lg tracking-tight gold-gradient-text">
            Techy Sumit
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#444444]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/#reels' && currentPath === '/');
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors py-1 ${
                  isActive ? 'text-[#B38728] font-bold' : 'hover:text-[#111111]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {isAdminLoggedIn && (
            <button
              onClick={() => handleLinkClick('/admin')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                currentPath === '/admin' ? 'bg-[#111111] text-[#F7E08A]' : 'bg-white/80 text-[#8C650A] border border-[#D4AF37]/30'
              }`}
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Admin</span>
            </button>
          )}

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold gold-btn"
          >
            <Instagram className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Follow on Instagram</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white/70 border border-black/5 text-[#222222] hover:bg-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-navbar rounded-3xl p-4 shadow-xl border border-white/80 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#222222] hover:bg-[#F7E08A]/20 transition-colors"
              >
                {link.label}
              </button>
            ))}

            {isAdminLoggedIn && (
              <button
                onClick={() => handleLinkClick('/admin')}
                className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#8C650A] hover:bg-[#F7E08A]/20 transition-colors flex items-center justify-between"
              >
                <span>Admin Panel</span>
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            )}

            <div className="pt-2 mt-1 border-t border-black/5">
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold gold-btn"
              >
                <Instagram className="w-4 h-4 stroke-[2.2]" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Hero: React.FC<{
  onExploreReels: () => void;
}> = ({ onExploreReels }) => {
  return (
    <div className="relative pt-12 pb-10 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 border border-[#D4AF37]/30 shadow-sm text-xs font-medium text-[#775510] mb-5">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Landed from an Instagram DM? Your resources are ready</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight leading-[1.1]">
        Tech, AI & Apps — <br className="hidden sm:inline" />
        <span className="gold-gradient-text">explained simply.</span>
      </h1>

      <p className="mt-4 text-base sm:text-lg text-[#555555] max-w-xl mx-auto font-normal leading-relaxed">
        The official link-in-bio resource hub by <strong>Techy Sumit</strong>. Find every AI tool, developer prompt, download link, and setup shortcut shown in my Instagram Reels.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onExploreReels}
          className="px-6 py-3 rounded-2xl text-sm font-semibold gold-btn inline-flex items-center gap-2 shadow-md"
        >
          <span>Explore All Reel Resources</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl text-sm font-semibold glass-btn inline-flex items-center gap-2"
        >
          <Instagram className="w-4 h-4 text-[#D4AF37]" />
          <span>Follow @techysumitofficial</span>
        </a>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-2 max-w-md mx-auto pt-4 border-t border-[#D4AF37]/20 text-center">
        <div>
          <div className="text-lg font-black text-[#111111]">350K+</div>
          <div className="text-[11px] text-[#777777] font-medium">Reel Community</div>
        </div>
        <div>
          <div className="text-lg font-black text-[#111111]">100% Free</div>
          <div className="text-[11px] text-[#777777] font-medium">Direct Links</div>
        </div>
        <div>
          <div className="text-lg font-black text-[#111111]">Updated</div>
          <div className="text-[11px] text-[#777777] font-medium">Every Reel</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE COMPONENTS
   ========================================================================= */

// 1. HOME PAGE
const HomePage: React.FC<{
  reels: Reel[];
  onNavigate: (path: string) => void;
}> = ({ reels, onNavigate }) => {
  const reelsSectionRef = React.useRef<HTMLDivElement>(null);

  const scrollToReels = () => {
    reelsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <Hero onExploreReels={scrollToReels} />

      <div ref={reelsSectionRef} id="reels" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 px-1">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] tracking-tight">
              Latest Instagram Reels
            </h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Click any Reel card to copy its prompts and visit its featured apps
            </p>
          </div>
          <div className="text-xs text-[#8A7335] font-semibold bg-[#F7E08A]/25 border border-[#D4AF37]/20 px-3 py-1 rounded-full self-start sm:self-auto">
            {reels.length} Available Guides
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <GlassCard
          onClick={() => onNavigate('/prompts')}
          className="p-6 cursor-pointer group flex flex-col justify-between"
          hoverEffect
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#F7E08A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#996515] mb-3">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#B38728] transition-colors">
              Prompts Library
            </h3>
            <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
              Explore all master system prompts, coding assistants, and viral script formulas featured across all Reels with one-click copy.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#8C650A]">
            <span>Search & Filter Prompts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </GlassCard>

        <GlassCard
          onClick={() => onNavigate('/apps')}
          className="p-6 cursor-pointer group flex flex-col justify-between"
          hoverEffect
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#F7E08A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#996515] mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#B38728] transition-colors">
              Apps & Tools Catalog
            </h3>
            <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
              Browse all recommended AI tools, developer software, Mac/Windows utilities, and productivity apps organized by category.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#8C650A]">
            <span>Browse All Apps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// Smart Reel Finder: Matches by slug, comment keyword, ID, or fuzzy match
export function findReel(reels: Reel[], querySlugOrKeyword: string): Reel | undefined {
  if (!querySlugOrKeyword) return undefined;
  
  // Clean query: strip trailing slashes, query params, hash, whitespace
  const clean = decodeURIComponent(querySlugOrKeyword)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .split('?')[0]
    .split('#')[0]
    .trim();

  if (!clean || clean === '404' || clean === '444') return undefined;

  // 1. Match by slug (case-insensitive)
  const bySlug = reels.find((r) => r.slug.toLowerCase() === clean);
  if (bySlug) return bySlug;

  // 2. Match by Instagram comment keyword (e.g. "prompts", "setup", "focus")
  const byKeyword = reels.find((r) => r.keyword.toLowerCase() === clean);
  if (byKeyword) return byKeyword;

  // 3. Match by ID (e.g. "reel-01")
  const byId = reels.find((r) => r.id.toLowerCase() === clean);
  if (byId) return byId;

  // 4. Fuzzy match: title contains or slug contains
  const byFuzzy = reels.find((r) => 
    r.slug.toLowerCase().includes(clean) || 
    clean.includes(r.slug.toLowerCase()) ||
    r.title.toLowerCase().includes(clean)
  );
  return byFuzzy;
}

// 2. REEL RESOURCE PAGE (/r/:slug)
const ReelResourcePage: React.FC<{
  slug: string;
  reels: Reel[];
  onNavigate: (path: string) => void;
  showToast: (msg: string) => void;
}> = ({ slug, reels, onNavigate, showToast }) => {
  const reel = useMemo(() => {
    return findReel(reels, slug);
  }, [reels, slug]);

  if (!reel) {
    const cleanSlug = slug.split('?')[0].split('#')[0].replace(/\/+$/, '');
    return (
      <div className="max-w-3xl mx-auto py-8 text-center space-y-8">
        <GlassCard className="p-8">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#F7E08A]/30 border border-[#D4AF37]/40 flex items-center justify-center text-[#996515] mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C650A] bg-[#F7E08A]/30 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            Resource Page Not Found
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-3">
            Looking for Reel Resources?
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 max-w-lg mx-auto">
            The link for <code className="font-mono text-xs bg-white/80 px-2 py-0.5 rounded border border-[#D4AF37]/30 text-[#8C650A]">/r/{cleanSlug}</code> might have a typo or the reel was updated. Choose any reel below to get its tools, prompts, and links:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('/')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => onNavigate('/prompts')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold glass-btn"
            >
              Browse Prompts Library
            </button>
            <button
              onClick={() => onNavigate('/apps')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold glass-btn"
            >
              Browse Apps Catalog
            </button>
          </div>
        </GlassCard>

        {/* Suggest All Available Reels */}
        <div className="text-left">
          <h3 className="text-base font-bold text-[#111111] mb-4 px-1">
            Available Reels & Resources ({reels.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reels.map((r) => (
              <ReelCard key={r.id} reel={r} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `${reel.title} - Techy Sumit Resources`,
      text: `Resources, apps and prompts from Techy Sumit's Reel: ${reel.title}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard!");
      } catch {
        showToast("Link copied!");
      }
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between text-xs font-semibold">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-[#666666] hover:text-[#111111] transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Reels</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-btn text-xs font-medium"
        >
          <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Share Resources</span>
        </button>
      </div>

      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-semibold text-[#8C650A] bg-[#F7E08A]/30 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Instagram className="w-3 h-3 text-[#D4AF37]" />
            <span>Keyword: <strong>{reel.keyword}</strong></span>
          </span>
          <span className="text-xs text-[#777777]">
            {reel.date}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight leading-tight">
          {reel.title}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-[#444444] leading-relaxed">
          {reel.description}
        </p>

        <div className="mt-6 pt-5 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#666666]">
            Missed a detail or visual demo?
          </div>
          <a
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold gold-btn shadow-sm"
          >
            <Instagram className="w-4 h-4 stroke-[2.2]" />
            <span>Watch Original Reel on Instagram</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
          </a>
        </div>
      </GlassCard>

      <div className="bg-[#F7E08A]/15 border border-[#D4AF37]/25 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-[#7A5B0B]">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>Tap <strong>•••</strong> in your browser menu to bookmark this page for later.</span>
        </div>
      </div>

      {reel.apps && reel.apps.length > 0 && (
        <ResourceSection
          title="Apps & Tools Shown in Reel"
          count={reel.apps.length}
          icon={<Layers className="w-4 h-4" />}
          badge="Direct verified links"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reel.apps.map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
          </div>
        </ResourceSection>
      )}

      {reel.prompts && reel.prompts.length > 0 && (
        <ResourceSection
          title="Prompts & Formulas"
          count={reel.prompts.length}
          icon={<Terminal className="w-4 h-4" />}
          badge="Ready to paste"
        >
          <div className="space-y-4">
            {reel.prompts.map((prompt) => (
              <PromptCard
                key={prompt.title}
                prompt={prompt}
                onCopiedToast={(title) => showToast(`Copied "${title}" to clipboard!`)}
              />
            ))}
          </div>
        </ResourceSection>
      )}

      {reel.links && reel.links.length > 0 && (
        <ResourceSection
          title="Links & Downloads"
          count={reel.links.length}
          icon={<Download className="w-4 h-4" />}
        >
          <GlassCard className="p-2 sm:p-3 divide-y divide-black/5">
            {reel.links.map((link) => (
              <div
                key={link.label}
                className="p-3 sm:p-4 flex items-center justify-between gap-4 hover:bg-white/40 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F7E08A]/25 border border-[#D4AF37]/25 flex items-center justify-center text-[#996515] shrink-0">
                    {link.type === 'GitHub' ? (
                      <Github className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111111] text-xs sm:text-sm">
                      {link.label}
                    </h4>
                    <span className="text-[11px] text-[#888888] font-mono">
                      {link.type || 'Resource'}
                    </span>
                  </div>
                </div>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-1.5 shrink-0"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </GlassCard>
        </ResourceSection>
      )}

      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-btn text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Instagram Reel Resources</span>
        </button>
      </div>
    </div>
  );
};

// 3. PROMPTS LIBRARY PAGE (/prompts)
const PromptsPage: React.FC<{
  reels: Reel[];
  onNavigate: (path: string) => void;
  showToast: (msg: string) => void;
}> = ({ reels, onNavigate, showToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allPrompts = useMemo(() => {
    const list: Array<{ prompt: PromptItem; sourceSlug: string; sourceTitle: string }> = [];
    reels.forEach((reel) => {
      reel.prompts.forEach((p) => {
        list.push({
          prompt: p,
          sourceSlug: reel.slug,
          sourceTitle: reel.title
        });
      });
    });
    return list;
  }, [reels]);

  const categories = ['All', 'AI', 'Coding', 'Developer', 'Design', 'Productivity'];

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.prompt.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.prompt.title.toLowerCase().includes(q) ||
        item.prompt.text.toLowerCase().includes(q) ||
        item.sourceTitle.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allPrompts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Prompts Library
        </h1>
        <p className="text-sm text-[#555555] mt-1.5">
          Every system prompt, coding agent blueprint, and viral script formula from all Reels.
        </p>
      </div>

      <GlassCard className="p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts by keyword, coding task, or LLM topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#111111]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#777777] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'gold-btn'
                    : 'bg-white/60 hover:bg-white text-[#444444] border border-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="space-y-5">
        {filteredPrompts.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <p className="text-sm text-[#666666]">
              No prompts found matching "{searchQuery}". Try a different keyword or category.
            </p>
          </GlassCard>
        ) : (
          filteredPrompts.map(({ prompt, sourceSlug, sourceTitle }) => (
            <PromptCard
              key={`${prompt.title}-${sourceSlug}`}
              prompt={prompt}
              sourceSlug={sourceSlug}
              sourceTitle={sourceTitle}
              onNavigate={onNavigate}
              onCopiedToast={(title) => showToast(`Copied "${title}" to clipboard!`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// 4. APPS LIBRARY PAGE (/apps)
const AppsPage: React.FC<{
  reels: Reel[];
  onNavigate: (path: string) => void;
}> = ({ reels, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allApps = useMemo(() => {
    const list: Array<{ app: AppTool; sourceSlug: string; sourceTitle: string }> = [];
    reels.forEach((reel) => {
      reel.apps.forEach((a) => {
        list.push({
          app: a,
          sourceSlug: reel.slug,
          sourceTitle: reel.title
        });
      });
    });
    return list;
  }, [reels]);

  const categories = ['All', 'Play Store (Android)', 'AI', 'Productivity', 'Developer', 'Design', 'Utilities'];

  const filteredApps = useMemo(() => {
    return allApps.filter((item) => {
      const isPlayStoreItem =
        item.app.platform === 'PlayStore' ||
        item.app.category === 'Android' ||
        item.app.url.includes('play.google.com');

      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Play Store (Android)'
          ? isPlayStoreItem
          : item.app.category.toLowerCase() === selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.app.name.toLowerCase().includes(q) ||
        item.app.description.toLowerCase().includes(q) ||
        item.sourceTitle.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allApps, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Apps & Tools Catalog
        </h1>
        <p className="text-sm text-[#555555] mt-1.5">
          Curated software, developer tools, and productivity gems recommended by Techy Sumit.
        </p>
      </div>

      <GlassCard className="p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps by name, description, or workflow..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#111111]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#777777] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'gold-btn'
                    : 'bg-white/60 hover:bg-white text-[#444444] border border-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredApps.length === 0 ? (
          <div className="col-span-2">
            <GlassCard className="p-8 text-center">
              <p className="text-sm text-[#666666]">
                No apps found matching "{searchQuery}".
              </p>
            </GlassCard>
          </div>
        ) : (
          filteredApps.map(({ app, sourceSlug, sourceTitle }) => (
            <AppCard
              key={`${app.name}-${sourceSlug}`}
              app={app}
              featuredInSlug={sourceSlug}
              featuredInTitle={sourceTitle}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
};

// 5. ABOUT PAGE (/about)
const AboutPage: React.FC<{
  onNavigate: (path: string) => void;
}> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-white/90 shadow-md">
              <img
                src="/src/assets/images/creator_sumit_avatar_1793030207541.jpg"
                alt="Techy Sumit"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80";
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#D4AF37] to-[#F7E08A] text-[#1A1303] text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              CREATOR
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Hey, I'm Sumit 👋
            </h1>
            <p className="text-xs font-semibold text-[#8C650A] mt-1">
              Tech Creator · Software Builder · AI Explorer
            </p>
            <p className="text-xs sm:text-sm text-[#555555] mt-3 leading-relaxed">
              I create bite-sized tech videos on Instagram and YouTube breaking down artificial intelligence, developer workflows, and aesthetic productivity setups. My goal is simple: explain complex tech without fluff so you can build and work 10x faster.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
            <div className="text-xl font-black text-[#111111]">350K+</div>
            <div className="text-[11px] text-[#777777]">Followers</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
            <div className="text-xl font-black text-[#111111]">45M+</div>
            <div className="text-[11px] text-[#777777]">Video Views</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
            <div className="text-xl font-black text-[#111111]">180+</div>
            <div className="text-[11px] text-[#777777]">Reels Created</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/40 border border-white/60">
            <div className="text-xl font-black text-[#111111]">99.4%</div>
            <div className="text-[11px] text-[#777777]">Helpful Rating</div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-black/5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl gold-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4 stroke-[2.2]" />
            <span>Instagram</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>YouTube</span>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            <span>X (Twitter)</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
          How do the Instagram DM Links Work?
        </h3>
        <p className="text-xs text-[#555555] leading-relaxed">
          Whenever I post a short Reel detailing software, prompts, or workflows, I set up a dedicated comment automation (powered by ManyChat). When you comment the secret keyword shown in the Reel (like <strong>PROMPTS</strong> or <strong>SETUP</strong>), an instant direct message is sent to your inbox containing the unique link to that Reel's resource hub page.
        </p>

        <div className="mt-4 p-3 rounded-xl bg-[#F7E08A]/20 border border-[#D4AF37]/25 text-xs text-[#7A5B0B] flex items-center justify-between gap-3">
          <span>Looking for resources from an earlier Reel?</span>
          <button
            onClick={() => onNavigate('/')}
            className="font-bold underline hover:text-[#111111]"
          >
            Browse All Reels
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

/* =========================================================================
   6. SECURE ADMIN PANEL (/admin)
   ========================================================================= */
const AdminPanel: React.FC<{
  reels: Reel[];
  onUpdateReels: (newReels: Reel[]) => void;
  onNavigate: (path: string) => void;
  showToast: (msg: string) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}> = ({ reels, onUpdateReels, onNavigate, showToast, isAuthenticated, onLogin, onLogout }) => {
  // Passcode entry state
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState<'reels' | 'prompts' | 'apps' | 'links' | 'settings'>('reels');

  // Change password modal
  const [showPassModal, setShowPassModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  // Selected reel for upload/attach
  const [selectedReelId, setSelectedReelId] = useState<string>(reels[0]?.id || '');

  // Add Reel Form State
  const [reelTitle, setReelTitle] = useState('');
  const [reelSlug, setReelSlug] = useState('');
  const [reelKeyword, setReelKeyword] = useState('');
  const [reelDescription, setReelDescription] = useState('');
  const [reelThumbnail, setReelThumbnail] = useState('/src/assets/images/video_thumb_ai_tools_1793030209923.jpg');
  const [reelInstagramUrl, setReelInstagramUrl] = useState(INSTAGRAM_PROFILE_URL);

  // Add Prompt Form State
  const [promptTitle, setPromptTitle] = useState('');
  const [promptCategory, setPromptCategory] = useState<'AI' | 'Coding' | 'Developer' | 'Design' | 'Productivity'>('AI');
  const [promptText, setPromptText] = useState('');

  // Add App Form State
  const [appName, setAppName] = useState('');
  const [appCategory, setAppCategory] = useState<'AI' | 'Productivity' | 'Developer' | 'Design' | 'Utilities' | 'Android'>('Android');
  const [appUrl, setAppUrl] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appPlatform, setAppPlatform] = useState<'PlayStore' | 'Web' | 'AppStore' | 'Desktop'>('PlayStore');
  const [appRating, setAppRating] = useState('4.8');
  const [appDownloads, setAppDownloads] = useState('1M+');
  const [playStoreLinkInput, setPlayStoreLinkInput] = useState('');

  // Quick Play Store Link parser function
  const handleParsePlayStoreUrl = (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    setPlayStoreLinkInput(trimmed);
    if (!trimmed) return;

    try {
      const match = trimmed.match(/[?&]id=([a-zA-Z0-9._]+)/);
      const pkg = match ? match[1] : '';

      setAppUrl(trimmed);
      setAppPlatform('PlayStore');
      setAppCategory('Android');

      if (pkg) {
        const parts = pkg.split('.');
        const lastPart = parts[parts.length - 1];
        const formattedName = lastPart
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        if (!appName) {
          setAppName(formattedName);
        }
        if (!appDescription) {
          setAppDescription(`Official Android app on Google Play (${pkg}). Recommended in this Reel.`);
        }
        showToast(`Parsed Play Store package: ${pkg}!`);
      } else {
        showToast("Set as Play Store link!");
      }
    } catch {
      // ignore
    }
  };

  // Add Link Form State
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState<'GitHub' | 'Guide' | 'Download' | 'Website'>('Download');

  // Quick edit mode state
  const [editingReelId, setEditingReelId] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setReelTitle(val);
    if (!editingReelId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setReelSlug(generated);
    }
  };

  // Login handler
  const handleCheckPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_ADMIN_PASS;
    if (passInput === storedPass || passInput === DEFAULT_ADMIN_PASS) {
      onLogin();
      setPassError(false);
      setPassInput('');
      showToast("Welcome back, Sumit! Admin panel unlocked.");
    } else {
      setPassError(true);
      showToast("Incorrect password. Please try again.");
    }
  };

  // Change password handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim().length >= 4) {
      localStorage.setItem(STORAGE_KEY_PASS, newPass.trim());
      setShowPassModal(false);
      setNewPass('');
      showToast("Admin passcode updated successfully!");
    } else {
      showToast("Password must be at least 4 characters.");
    }
  };

  // Save / Add Reel
  const handleSaveReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelTitle || !reelSlug || !reelKeyword) {
      showToast("Please fill in Title, Slug, and Trigger Keyword.");
      return;
    }

    if (editingReelId) {
      // Update existing
      const updated = reels.map((r) => {
        if (r.id === editingReelId) {
          return {
            ...r,
            title: reelTitle,
            slug: reelSlug,
            keyword: reelKeyword.toUpperCase().trim(),
            description: reelDescription,
            thumbnail: reelThumbnail,
            instagramUrl: reelInstagramUrl,
          };
        }
        return r;
      });
      onUpdateReels(updated);
      setEditingReelId(null);
      showToast(`Updated Reel "${reelTitle}" successfully!`);
    } else {
      // Create new
      const newReel: Reel = {
        id: `reel-${Date.now()}`,
        title: reelTitle,
        slug: reelSlug.trim().toLowerCase(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        keyword: reelKeyword.toUpperCase().trim(),
        description: reelDescription,
        thumbnail: reelThumbnail,
        instagramUrl: reelInstagramUrl || INSTAGRAM_PROFILE_URL,
        apps: [],
        prompts: [],
        links: []
      };
      onUpdateReels([newReel, ...reels]);
      setSelectedReelId(newReel.id);
      showToast(`New Reel "${reelTitle}" uploaded! Now attach prompts and apps below.`);
    }

    // Reset fields
    setReelTitle('');
    setReelSlug('');
    setReelKeyword('');
    setReelDescription('');
  };

  // Delete Reel
  const handleDeleteReel = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete Reel "${title}"? This cannot be undone.`)) {
      const updated = reels.filter((r) => r.id !== id);
      onUpdateReels(updated);
      showToast(`Deleted Reel "${title}".`);
    }
  };

  // Edit Reel trigger
  const handleStartEditReel = (r: Reel) => {
    setEditingReelId(r.id);
    setReelTitle(r.title);
    setReelSlug(r.slug);
    setReelKeyword(r.keyword);
    setReelDescription(r.description);
    setReelThumbnail(r.thumbnail);
    setReelInstagramUrl(r.instagramUrl);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Add Prompt
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTitle || !promptText) {
      showToast("Please provide both Prompt Title and Prompt Text.");
      return;
    }

    const targetReel = reels.find((r) => r.id === selectedReelId) || reels[0];
    if (!targetReel) {
      showToast("Please create a Reel first to attach this prompt.");
      return;
    }

    const newPrompt: PromptItem = {
      id: `prompt-${Date.now()}`,
      title: promptTitle,
      category: promptCategory,
      text: promptText
    };

    const updated = reels.map((r) => {
      if (r.id === targetReel.id) {
        return {
          ...r,
          prompts: [newPrompt, ...r.prompts]
        };
      }
      return r;
    });

    onUpdateReels(updated);
    setPromptTitle('');
    setPromptText('');
    showToast(`Uploaded prompt "${promptTitle}" to Reel "${targetReel.title}"!`);
  };

  // Delete Prompt
  const handleDeletePrompt = (reelId: string, promptTitleToDelete: string) => {
    if (window.confirm(`Delete prompt "${promptTitleToDelete}"?`)) {
      const updated = reels.map((r) => {
        if (r.id === reelId) {
          return {
            ...r,
            prompts: r.prompts.filter((p) => p.title !== promptTitleToDelete)
          };
        }
        return r;
      });
      onUpdateReels(updated);
      showToast(`Removed prompt "${promptTitleToDelete}".`);
    }
  };

  // Add App
  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appUrl) {
      showToast("Please provide App Name and URL / Play Store link.");
      return;
    }

    const targetReel = reels.find((r) => r.id === selectedReelId) || reels[0];
    if (!targetReel) {
      showToast("Please create a Reel first to attach this app.");
      return;
    }

    const isPlayStoreUrl = appUrl.includes('play.google.com') || appPlatform === 'PlayStore';
    const pkgMatch = appUrl.match(/[?&]id=([a-zA-Z0-9._]+)/);

    const newApp: AppTool = {
      id: `app-${Date.now()}`,
      name: appName,
      category: appCategory,
      url: appUrl.startsWith('http') ? appUrl : `https://${appUrl}`,
      description: appDescription,
      platform: isPlayStoreUrl ? 'PlayStore' : appPlatform,
      playStorePackage: pkgMatch ? pkgMatch[1] : undefined,
      rating: appRating.trim() || undefined,
      downloads: appDownloads.trim() || undefined
    };

    const updated = reels.map((r) => {
      if (r.id === targetReel.id) {
        return {
          ...r,
          apps: [...r.apps, newApp]
        };
      }
      return r;
    });

    onUpdateReels(updated);
    setAppName('');
    setAppUrl('');
    setAppDescription('');
    setPlayStoreLinkInput('');
    setAppRating('4.8');
    setAppDownloads('1M+');
    showToast(`Added ${isPlayStoreUrl ? 'Play Store app' : 'app'} "${appName}" to Reel "${targetReel.title}"!`);
  };

  // Delete App
  const handleDeleteApp = (reelId: string, appNameToDelete: string) => {
    if (window.confirm(`Delete app "${appNameToDelete}"?`)) {
      const updated = reels.map((r) => {
        if (r.id === reelId) {
          return {
            ...r,
            apps: r.apps.filter((a) => a.name !== appNameToDelete)
          };
        }
        return r;
      });
      onUpdateReels(updated);
      showToast(`Removed app "${appNameToDelete}".`);
    }
  };

  // Add Link
  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkLabel || !linkUrl) {
      showToast("Please provide Link Label and URL.");
      return;
    }

    const targetReel = reels.find((r) => r.id === selectedReelId) || reels[0];
    if (!targetReel) {
      showToast("Please create a Reel first.");
      return;
    }

    const newLink: DownloadLink = {
      id: `link-${Date.now()}`,
      label: linkLabel,
      url: linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`,
      type: linkType
    };

    const updated = reels.map((r) => {
      if (r.id === targetReel.id) {
        return {
          ...r,
          links: [...r.links, newLink]
        };
      }
      return r;
    });

    onUpdateReels(updated);
    setLinkLabel('');
    setLinkUrl('');
    showToast(`Added download link "${linkLabel}" to "${targetReel.title}"!`);
  };

  // Delete Link
  const handleDeleteLink = (reelId: string, linkLabelToDelete: string) => {
    const updated = reels.map((r) => {
      if (r.id === reelId) {
        return {
          ...r,
          links: r.links.filter((l) => l.label !== linkLabelToDelete)
        };
      }
      return r;
    });
    onUpdateReels(updated);
    showToast(`Removed link "${linkLabelToDelete}".`);
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reels, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `techysumit_reels_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded complete JSON backup!");
  };

  // Reset to default data
  const handleResetDefaults = () => {
    if (window.confirm("Reset all Reels, Prompts, and Apps to original factory defaults? Any custom added items will be wiped.")) {
      onUpdateReels(DEFAULT_REELS_DATA);
      showToast("Restored original demo data!");
    }
  };

  // Locked Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <GlassCard className="p-8 text-center shadow-2xl border border-white/90">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#F7E08A]/30 border border-[#D4AF37]/50 flex items-center justify-center text-[#996515] mb-5 shadow-sm">
            <Lock className="w-8 h-8 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl font-black text-[#111111] tracking-tight">
            Creator Admin Panel
          </h2>
          <p className="text-xs text-[#666666] mt-2 mb-6">
            Private management suite for Techy Sumit. Enter your creator passcode to upload new reels, prompts, and app links.
          </p>

          <form onSubmit={handleCheckPassword} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-[#555555] mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="Enter passcode (default: sumit2026)"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border text-xs text-[#111111] focus:outline-none focus:ring-2 ${
                    passError
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-[#D4AF37]/40 focus:ring-[#D4AF37]/50'
                  }`}
                  autoFocus
                />
              </div>
              {passError && (
                <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Passcode incorrect. (Default is: sumit2026)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-semibold gold-btn shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between text-xs text-[#777777]">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#111111] flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Site</span>
            </button>
            <span className="text-[10px] text-[#999999] font-mono">Protected Mode</span>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Admin Top Bar */}
      <GlassCard className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F7E08A] flex items-center justify-center text-[#1A1303] shadow-sm">
            <Lock className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#111111]">
                Techy Sumit Control Panel
              </h1>
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-[#666666]">
              Instant uploads & real-time updates for Instagram DM automations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-3 py-1.5 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={() => setShowPassModal(true)}
            className="px-3 py-1.5 rounded-xl glass-btn text-xs font-semibold inline-flex items-center gap-1.5"
            title="Change Passcode"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Change PIN</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </GlassCard>

      {/* Change Password Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#D4AF37]/30">
            <h3 className="text-base font-bold text-[#111111] mb-2">Change Admin Passcode</h3>
            <p className="text-xs text-[#666666] mb-4">
              Set a new passcode to prevent unauthorized access to your resource uploader.
            </p>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="text"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="New passcode (min 4 characters)"
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-[#D4AF37]/40 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#666666] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold gold-btn"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <GlassCard className="p-3.5">
          <div className="text-2xl font-black text-[#111111]">{reels.length}</div>
          <div className="text-[11px] text-[#777777] font-medium">Active Reels</div>
        </GlassCard>
        <GlassCard className="p-3.5">
          <div className="text-2xl font-black text-[#111111]">
            {reels.reduce((acc, r) => acc + r.prompts.length, 0)}
          </div>
          <div className="text-[11px] text-[#777777] font-medium">Uploaded Prompts</div>
        </GlassCard>
        <GlassCard className="p-3.5">
          <div className="text-2xl font-black text-[#111111]">
            {reels.reduce((acc, r) => acc + r.apps.length, 0)}
          </div>
          <div className="text-[11px] text-[#777777] font-medium">Cataloged Apps</div>
        </GlassCard>
        <GlassCard className="p-3.5">
          <div className="text-2xl font-black text-[#111111]">
            {reels.reduce((acc, r) => acc + r.links.length, 0)}
          </div>
          <div className="text-[11px] text-[#777777] font-medium">Download Links</div>
        </GlassCard>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 glass-navbar rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('reels')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'reels' ? 'gold-btn' : 'text-[#555555] hover:text-[#111111]'
          }`}
        >
          1. Upload & Manage Reels
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'prompts' ? 'gold-btn' : 'text-[#555555] hover:text-[#111111]'
          }`}
        >
          2. Upload Prompts
        </button>
        <button
          onClick={() => setActiveTab('apps')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'apps' ? 'gold-btn' : 'text-[#555555] hover:text-[#111111]'
          }`}
        >
          3. Upload Apps & Tools
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'links' ? 'gold-btn' : 'text-[#555555] hover:text-[#111111]'
          }`}
        >
          4. Upload Links
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'settings' ? 'gold-btn' : 'text-[#555555] hover:text-[#111111]'
          }`}
        >
          Backup & Settings
        </button>
      </div>

      {/* TAB 1: REELS UPLOAD & EDIT */}
      {activeTab === 'reels' && (
        <div className="space-y-8">
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111111] mb-1 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#D4AF37]" />
              {editingReelId ? 'Edit Instagram Reel' : 'Upload New Instagram Reel Resource Page'}
            </h2>
            <p className="text-xs text-[#666666] mb-5">
              Fill out this form to publish a new destination page for viewers who comment a keyword on your Reel.
            </p>

            <form onSubmit={handleSaveReel} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Reel Title *
                  </label>
                  <input
                    type="text"
                    value={reelTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 5 Crazy AI Prompts & Free Tools"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    URL Slug (used for ManyChat link: /r/slug) *
                  </label>
                  <input
                    type="text"
                    value={reelSlug}
                    onChange={(e) => setReelSlug(e.target.value)}
                    placeholder="e.g. ai-prompts-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs font-mono text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Comment Trigger Keyword (e.g. PROMPTS, SETUP) *
                  </label>
                  <input
                    type="text"
                    value={reelKeyword}
                    onChange={(e) => setReelKeyword(e.target.value)}
                    placeholder="e.g. PROMPTS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs font-bold text-[#8C650A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    value={reelInstagramUrl}
                    onChange={(e) => setReelInstagramUrl(e.target.value)}
                    placeholder="https://www.instagram.com/techysumitofficial?vrfl=..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Reel Thumbnail URL or Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reelThumbnail}
                    onChange={(e) => setReelThumbnail(e.target.value)}
                    placeholder="/src/assets/images/... or https://..."
                    className="flex-grow px-3.5 py-2 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setReelThumbnail('/src/assets/images/video_thumb_ai_tools_1793030209923.jpg')}
                    className="px-2.5 py-1.5 rounded-xl text-[11px] glass-btn"
                  >
                    Preset AI
                  </button>
                  <button
                    type="button"
                    onClick={() => setReelThumbnail('/src/assets/images/video_thumb_coding_workflow_1793030208248.jpg')}
                    className="px-2.5 py-1.5 rounded-xl text-[11px] glass-btn"
                  >
                    Preset Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setReelThumbnail('/src/assets/images/video_thumb_productivity_apps_1793030207513.jpg')}
                    className="px-2.5 py-1.5 rounded-xl text-[11px] glass-btn"
                  >
                    Preset Apps
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Reel Description / Video Breakdown
                </label>
                <textarea
                  value={reelDescription}
                  onChange={(e) => setReelDescription(e.target.value)}
                  rows={3}
                  placeholder="Summarize what this reel covers and why viewers should bookmark it..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                />
              </div>

              {/* Automation Preview */}
              {reelSlug && (
                <div className="p-3 rounded-xl bg-[#F7E08A]/20 border border-[#D4AF37]/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#7A5B0B]">Automation Link for ManyChat DM:</span>
                    <div className="font-mono text-[11px] text-[#111111] mt-0.5">
                      {window.location.origin}/r/{reelSlug}
                    </div>
                  </div>
                  <CopyButton
                    textToCopy={`${window.location.origin}/r/${reelSlug}`}
                    label="Copy Link"
                    onCopy={() => showToast("Copied automation link to clipboard!")}
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingReelId ? 'Save Changes' : 'Publish Reel Page'}</span>
                </button>

                {editingReelId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingReelId(null);
                      setReelTitle('');
                      setReelSlug('');
                      setReelKeyword('');
                      setReelDescription('');
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium glass-btn"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </GlassCard>

          {/* Current Reels List */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#111111] px-1 flex items-center justify-between">
              <span>All Active Reels ({reels.length})</span>
              <span className="text-xs font-normal text-[#777777]">Manage or delete</span>
            </h3>

            {reels.map((r) => (
              <GlassCard key={r.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-black/5">
                    <img src={r.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-[#F7E08A]/35 text-[#8C650A] px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                        {r.keyword}
                      </span>
                      <h4 className="font-bold text-sm text-[#111111] line-clamp-1">
                        {r.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-[#777777] font-mono mt-1">
                      /r/{r.slug} · {r.prompts.length} prompts · {r.apps.length} apps · {r.links.length} links
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-black/5">
                  <button
                    onClick={() => onNavigate(`/r/${r.slug}`)}
                    className="p-2 rounded-xl glass-btn text-[#555555] hover:text-[#111111]"
                    title="View Resource Page"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleStartEditReel(r)}
                    className="p-2 rounded-xl glass-btn text-[#555555] hover:text-[#111111]"
                    title="Edit Reel Details"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <CopyButton
                    textToCopy={`${window.location.origin}/r/${r.slug}`}
                    label="Copy DM Link"
                    onCopy={() => showToast(`Copied /r/${r.slug} link!`)}
                  />

                  <button
                    onClick={() => handleDeleteReel(r.id, r.title)}
                    className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    title="Delete Reel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROMPTS UPLOAD & MANAGE */}
      {activeTab === 'prompts' && (
        <div className="space-y-8">
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111111] mb-1 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#D4AF37]" />
              Upload New System Prompt or Formula
            </h2>
            <p className="text-xs text-[#666666] mb-5">
              Prompts uploaded here will show up on both the Reel's dedicated resource page and the searchable Prompts Library.
            </p>

            <form onSubmit={handleSavePrompt} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Prompt Title *
                  </label>
                  <input
                    type="text"
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                    placeholder="e.g. DeepSeek Architectural Code Reviewer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Category *
                  </label>
                  <select
                    value={promptCategory}
                    onChange={(e) => setPromptCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  >
                    <option value="AI">AI</option>
                    <option value="Coding">Coding</option>
                    <option value="Developer">Developer</option>
                    <option value="Design">Design</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Assign to Reel *
                </label>
                <select
                  value={selectedReelId}
                  onChange={(e) => setSelectedReelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 font-medium"
                >
                  {reels.map((r) => (
                    <option key={r.id} value={r.id}>
                      Reel: {r.title} (Keyword: {r.keyword})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1 flex items-center justify-between">
                  <span>Prompt Text (Ready-to-copy code block) *</span>
                  <span className="text-[10px] text-[#888888] font-mono">{promptText.length} chars</span>
                </label>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  rows={6}
                  placeholder="Paste your prompt text here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#D4AF37]/30 font-mono text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Prompt</span>
              </button>
            </form>
          </GlassCard>

          {/* List of prompts grouped by Reel */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#111111] px-1">
              Existing Prompts
            </h3>

            {reels.map((r) => (
              <GlassCard key={r.id} className="p-4">
                <div className="font-bold text-xs text-[#8C650A] pb-2 border-b border-black/5 flex items-center justify-between">
                  <span>Reel: {r.title}</span>
                  <span className="font-mono text-[10px]">{r.prompts.length} Prompts</span>
                </div>

                <div className="divide-y divide-black/5 mt-2">
                  {r.prompts.length === 0 ? (
                    <p className="text-xs text-[#888888] py-2">No prompts attached yet.</p>
                  ) : (
                    r.prompts.map((p) => (
                      <div key={p.title} className="py-2.5 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold bg-stone-100 text-[#555555] px-1.5 py-0.5 rounded">
                              {p.category}
                            </span>
                            <span className="font-bold text-xs text-[#111111]">{p.title}</span>
                          </div>
                          <p className="text-[11px] text-[#666666] line-clamp-1 font-mono mt-1">
                            {p.text}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <CopyButton textToCopy={p.text} label="Copy" />
                          <button
                            onClick={() => handleDeletePrompt(r.id, p.title)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                            title="Delete prompt"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APPS & TOOLS UPLOAD */}
      {activeTab === 'apps' && (
        <div className="space-y-8">
          {/* Quick Play Store Link Upload & Parser Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-white/70 border border-emerald-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold mb-2">
                  <PlayStoreIcon className="w-3.5 h-3.5" />
                  <span>Google Play Store Integration</span>
                </div>
                <h2 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                  <span>⚡ Quick Play Store App Upload</span>
                </h2>
                <p className="text-xs text-[#555555] mt-1 max-w-2xl leading-relaxed">
                  Paste any Android app's Google Play Store URL. The system will automatically parse the package ID, populate the app title, configure the official Play Store badge, and enable the high-converting <strong>"Get on Google Play"</strong> button for your Instagram viewers.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-grow">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <PlayStoreIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={playStoreLinkInput}
                  onChange={(e) => setPlayStoreLinkInput(e.target.value)}
                  placeholder="https://play.google.com/store/apps/details?id=com.example.app"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-emerald-500/40 text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleParsePlayStoreUrl(playStoreLinkInput)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Parse & Fill Form</span>
              </button>
            </div>

            {/* Quick Presets for Sumit */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px] text-[#555555]">
              <span className="font-semibold text-emerald-800">Quick Test Links:</span>
              <button
                type="button"
                onClick={() => handleParsePlayStoreUrl('https://play.google.com/store/apps/details?id=com.openai.chatgpt')}
                className="px-2 py-0.5 rounded-md bg-white/80 hover:bg-white text-emerald-700 border border-emerald-300 font-mono text-[10px] transition-all"
              >
                + ChatGPT Android
              </button>
              <button
                type="button"
                onClick={() => handleParsePlayStoreUrl('https://play.google.com/store/apps/details?id=com.anthropic.claude')}
                className="px-2 py-0.5 rounded-md bg-white/80 hover:bg-white text-emerald-700 border border-emerald-300 font-mono text-[10px] transition-all"
              >
                + Claude Android
              </button>
              <button
                type="button"
                onClick={() => handleParsePlayStoreUrl('https://play.google.com/store/apps/details?id=com.termux')}
                className="px-2 py-0.5 rounded-md bg-white/80 hover:bg-white text-emerald-700 border border-emerald-300 font-mono text-[10px] transition-all"
              >
                + Termux Linux Terminal
              </button>
            </div>
          </div>

          {/* Complete App Details Form */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111111] mb-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              App & Tool Configuration
            </h2>
            <p className="text-xs text-[#666666] mb-5">
              Review or customize the details below before publishing to the Reel resource page.
            </p>

            <form onSubmit={handleSaveApp} className="space-y-4">
              {/* Platform selector */}
              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1.5">
                  Platform / Store Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'PlayStore', label: 'Google Play Store', icon: PlayStoreIcon },
                    { id: 'Web', label: 'Web App / Website', icon: ExternalLink },
                    { id: 'AppStore', label: 'Apple App Store', icon: Sparkles },
                    { id: 'Desktop', label: 'Desktop / CLI', icon: Layers }
                  ].map((plat) => {
                    const IconComp = plat.icon;
                    const isSelected = appPlatform === plat.id;
                    return (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => {
                          setAppPlatform(plat.id as any);
                          if (plat.id === 'PlayStore') {
                            setAppCategory('Android');
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-[#F7E08A]/40 border-[#D4AF37] text-[#8C650A] shadow-sm'
                            : 'bg-white/60 border-black/5 text-[#555555] hover:bg-white'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{plat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    App Name *
                  </label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="e.g. ChatGPT, Termux, Cursor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Category *
                  </label>
                  <select
                    value={appCategory}
                    onChange={(e) => setAppCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  >
                    <option value="Android">Android / Mobile</option>
                    <option value="AI">AI</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Developer">Developer</option>
                    <option value="Design">Design</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    {appPlatform === 'PlayStore' ? 'Google Play Store Link *' : 'Direct Link / URL *'}
                  </label>
                  <input
                    type="url"
                    value={appUrl}
                    onChange={(e) => {
                      setAppUrl(e.target.value);
                      if (e.target.value.includes('play.google.com')) {
                        setAppPlatform('PlayStore');
                        setAppCategory('Android');
                      }
                    }}
                    placeholder={
                      appPlatform === 'PlayStore'
                        ? 'https://play.google.com/store/apps/details?id=...'
                        : 'https://example.com'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Optional Play Store Meta: Rating & Downloads */}
              {appPlatform === 'PlayStore' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-500/20">
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                      Play Store Rating (Optional)
                    </label>
                    <input
                      type="text"
                      value={appRating}
                      onChange={(e) => setAppRating(e.target.value)}
                      placeholder="e.g. 4.8"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-emerald-500/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                      Downloads Count (Optional)
                    </label>
                    <input
                      type="text"
                      value={appDownloads}
                      onChange={(e) => setAppDownloads(e.target.value)}
                      placeholder="e.g. 10M+ downloads"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-emerald-500/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Assign to Reel *
                </label>
                <select
                  value={selectedReelId}
                  onChange={(e) => setSelectedReelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 font-medium"
                >
                  {reels.map((r) => (
                    <option key={r.id} value={r.id}>
                      Reel: {r.title} (Keyword: {r.keyword})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Short Description / Verdict
                </label>
                <textarea
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  rows={2}
                  placeholder="Why viewers need this app and what makes it special..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-2"
              >
                {appPlatform === 'PlayStore' ? (
                  <>
                    <PlayStoreIcon className="w-4 h-4" />
                    <span>Publish Play Store App</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Upload App to Catalog</span>
                  </>
                )}
              </button>
            </form>
          </GlassCard>

          {/* List of apps grouped by Reel */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#111111] px-1">
              Currently Cataloged Apps ({reels.reduce((acc, r) => acc + r.apps.length, 0)})
            </h3>

            {reels.map((r) => (
              <GlassCard key={r.id} className="p-4">
                <div className="font-bold text-xs text-[#8C650A] pb-2 border-b border-black/5 flex items-center justify-between">
                  <span>Reel: {r.title}</span>
                  <span className="font-mono text-[10px]">{r.apps.length} Apps</span>
                </div>

                <div className="divide-y divide-black/5 mt-2">
                  {r.apps.length === 0 ? (
                    <p className="text-xs text-[#888888] py-2">No apps added yet.</p>
                  ) : (
                    r.apps.map((a) => {
                      const isPlay = a.platform === 'PlayStore' || a.url.includes('play.google.com');
                      return (
                        <div key={a.name} className="py-2.5 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {isPlay ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                                  <PlayStoreIcon className="w-2.5 h-2.5" />
                                  <span>Play Store</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold bg-[#F7E08A]/30 text-[#8C650A] px-1.5 py-0.5 rounded">
                                  {a.category}
                                </span>
                              )}
                              <span className="font-bold text-xs text-[#111111]">{a.name}</span>
                              {a.rating && (
                                <span className="text-[10px] text-amber-600 font-semibold">
                                  ★ {a.rating}
                                </span>
                              )}
                              {a.downloads && (
                                <span className="text-[10px] text-stone-500 font-mono">
                                  {a.downloads}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#666666] line-clamp-1 mt-0.5">
                              {a.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg glass-btn text-[#555555] hover:text-[#111111]"
                              title="Test Link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteApp(r.id, a.name)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                              title="Delete app"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOWNLOAD LINKS & RESOURCES */}
      {activeTab === 'links' && (
        <div className="space-y-8">
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111111] mb-1 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#D4AF37]" />
              Upload Download Link, Cheat Sheet, or GitHub Repo
            </h2>
            <p className="text-xs text-[#666666] mb-5">
              Add templates, PDF downloads, wallpaper links, or open-source repositories to any Reel.
            </p>

            <form onSubmit={handleSaveLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="e.g. Free 2026 AI Developer Cheat Sheet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Resource Type
                  </label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  >
                    <option value="Download">Download / PDF</option>
                    <option value="GitHub">GitHub Repository</option>
                    <option value="Guide">Guide / Docs</option>
                    <option value="Website">Website Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                    Destination URL *
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://github.com/... or https://gumroad..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">
                  Assign to Reel *
                </label>
                <select
                  value={selectedReelId}
                  onChange={(e) => setSelectedReelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 font-medium"
                >
                  {reels.map((r) => (
                    <option key={r.id} value={r.id}>
                      Reel: {r.title} (Keyword: {r.keyword})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Download Link</span>
              </button>
            </form>
          </GlassCard>

          {/* List of links grouped by Reel */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#111111] px-1">
              Active Links & Downloads
            </h3>

            {reels.map((r) => (
              <GlassCard key={r.id} className="p-4">
                <div className="font-bold text-xs text-[#8C650A] pb-2 border-b border-black/5 flex items-center justify-between">
                  <span>Reel: {r.title}</span>
                  <span className="font-mono text-[10px]">{r.links.length} Links</span>
                </div>

                <div className="divide-y divide-black/5 mt-2">
                  {r.links.length === 0 ? (
                    <p className="text-xs text-[#888888] py-2">No links attached yet.</p>
                  ) : (
                    r.links.map((l) => (
                      <div key={l.label} className="py-2.5 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold bg-stone-100 text-[#555555] px-1.5 py-0.5 rounded font-mono">
                              {l.type || 'Link'}
                            </span>
                            <span className="font-bold text-xs text-[#111111]">{l.label}</span>
                          </div>
                          <span className="text-[11px] text-[#777777] font-mono mt-0.5 block truncate max-w-md">
                            {l.url}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg glass-btn text-[#555555] hover:text-[#111111]"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteLink(r.id, l.label)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                            title="Delete link"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#D4AF37]" />
              Data Backup & Sync
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              All your uploads are saved in local state and synchronized across the website. You can export a full JSON backup to keep your database safely stored.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Full JSON Backup</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-[#444444] inline-flex items-center gap-2 border border-black/5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              Custom Domain & Publishing (techysumit.com)
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Your website is configured for <strong>techysumit.com</strong>. Point your domain DNS records from your registrar (GoDaddy, Namecheap, Cloudflare, Hostinger) to complete the connection:
            </p>

            <div className="overflow-x-auto rounded-xl border border-[#D4AF37]/30 bg-white/70 p-3 mb-4">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-black/10 text-[#8C650A] text-[11px] font-sans font-bold">
                    <th className="pb-1.5">Record Type</th>
                    <th className="pb-1.5">Host / Name</th>
                    <th className="pb-1.5">Target / Value</th>
                    <th className="pb-1.5">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-[#222222]">
                  <tr>
                    <td className="py-1.5 font-bold">A Record</td>
                    <td className="py-1.5">@</td>
                    <td className="py-1.5 text-[#111111]">76.76.21.21</td>
                    <td className="py-1.5 text-[#888888]">Automatic / 3600</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold">CNAME</td>
                    <td className="py-1.5">www</td>
                    <td className="py-1.5 text-[#111111]">cname.vercel-dns.com</td>
                    <td className="py-1.5 text-[#888888]">Automatic / 3600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-[#F7E08A]/20 border border-[#D4AF37]/30 text-xs text-[#7A5B0B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>All Instagram DM automation links will format as: <code className="font-mono font-bold">https://techysumit.com/r/slug</code></span>
              <CopyButton textToCopy="https://techysumit.com" label="Copy techysumit.com" onCopy={() => showToast("Copied techysumit.com")} />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#111111] mb-2 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#D4AF37]" />
              Admin Security
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Only you have access to this control panel. Default passcode is <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#D4AF37]/30 text-[#8C650A]">sumit2026</code>.
            </p>
            <button
              onClick={() => setShowPassModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-btn inline-flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-[#D4AF37]" />
              <span>Update Admin Passcode</span>
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

// 7. DEDICATED 404 / NOT FOUND PAGE
const NotFoundPage: React.FC<{
  reels: Reel[];
  onNavigate: (path: string) => void;
}> = ({ reels, onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return reels;
    const q = search.toLowerCase();
    return reels.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.keyword.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [reels, search]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8 text-center">
      <GlassCard className="p-8 sm:p-10">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-[#F7E08A]/30 border border-[#D4AF37]/50 flex items-center justify-center text-[#996515] mb-4 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C650A] bg-[#F7E08A]/30 px-3 py-1 rounded-full border border-[#D4AF37]/30">
          Error 404 / Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-3">
          Lost in Tech? Let's get you back on track.
        </h1>
        <p className="text-xs sm:text-sm text-[#555555] mt-2 max-w-md mx-auto">
          The link you visited may have expired, has a typo, or moved. Explore any of Techy Sumit's tools and prompts below:
        </p>

        {/* Quick Search */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all reels, tools, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border border-[#D4AF37]/40 text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
          />
        </div>

        {/* Primary shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 pt-5 border-t border-black/5">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl text-xs font-semibold gold-btn inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go to Home</span>
          </button>
          <button
            onClick={() => onNavigate('/prompts')}
            className="px-4 py-2 rounded-xl text-xs font-semibold glass-btn"
          >
            Prompts Library
          </button>
          <button
            onClick={() => onNavigate('/apps')}
            className="px-4 py-2 rounded-xl text-xs font-semibold glass-btn"
          >
            Apps Catalog
          </button>
          <button
            onClick={() => onNavigate('/about')}
            className="px-4 py-2 rounded-xl text-xs font-semibold glass-btn"
          >
            About Sumit
          </button>
        </div>
      </GlassCard>

      {/* Suggested Reels */}
      <div className="text-left space-y-4">
        <h2 className="text-lg font-bold text-[#111111] px-1">
          Explore Available Reels & Resource Pages ({filtered.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((reel) => (
            <ReelCard key={reel.id} reel={reel} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Route Parser helper
function parseRoute(rawPath: string): { page: string; slug?: string } {
  const searchParams = new URLSearchParams(window.location.search);
  const qReel = searchParams.get('r') || searchParams.get('reel');
  if (qReel) {
    return { page: 'reel', slug: qReel };
  }
  const qPage = searchParams.get('page') || searchParams.get('p');
  if (qPage) {
    const cleanQ = qPage.toLowerCase().trim();
    if (cleanQ === 'admin') return { page: 'admin' };
    if (cleanQ === 'prompts') return { page: 'prompts' };
    if (cleanQ === 'apps') return { page: 'apps' };
    if (cleanQ === 'about') return { page: 'about' };
    if (cleanQ === 'reels') return { page: 'home' };
  }

  const hash = window.location.hash;
  if (hash.startsWith('#/r/')) {
    const slugFromHash = hash.replace('#/r/', '').split('?')[0].trim();
    return { page: 'reel', slug: slugFromHash };
  }
  if (hash.startsWith('#/')) {
    const cleanHash = hash.replace('#/', '').split('?')[0].trim().toLowerCase();
    if (cleanHash === 'admin') return { page: 'admin' };
    if (cleanHash === 'prompts') return { page: 'prompts' };
    if (cleanHash === 'apps') return { page: 'apps' };
    if (cleanHash === 'about') return { page: 'about' };
  }

  const clean = rawPath
    .split('?')[0]
    .split('#')[0]
    .toLowerCase()
    .replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/home' || clean === '/index.html' || clean === '/reels' || clean === '/videos') {
    return { page: 'home' };
  }

  if (clean.startsWith('/r/')) {
    const slug = clean.replace('/r/', '').trim();
    return { page: 'reel', slug };
  }

  if (clean.startsWith('/reel/')) {
    const slug = clean.replace('/reel/', '').trim();
    return { page: 'reel', slug };
  }

  if (clean === '/prompts' || clean === '/prompt' || clean === '/prompts-library') {
    return { page: 'prompts' };
  }

  if (clean === '/apps' || clean === '/app' || clean === '/tools') {
    return { page: 'apps' };
  }

  if (clean === '/about' || clean === '/bio' || clean === '/sumit') {
    return { page: 'about' };
  }

  if (clean === '/admin' || clean === '/login' || clean === '/dashboard' || clean === '/control') {
    return { page: 'admin' };
  }

  return { page: '404', slug: clean };
}

/* =========================================================================
   MAIN APP ROUTER & LAYOUT
   ========================================================================= */
export default function App() {
  const [reels, setReels] = useState<Reel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REELS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_REELS_DATA;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });

  const handleAdminLogin = () => {
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    setIsAdminLoggedIn(false);
    showToast("Admin session locked.");
  };

  const updateReels = (newReels: Reel[]) => {
    setReels(newReels);
    try {
      localStorage.setItem(STORAGE_KEY_REELS, JSON.stringify(newReels));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const routeInfo = useMemo(() => {
    return parseRoute(currentPath);
  }, [currentPath]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (routeInfo.page === 'home') {
      document.title = "Techy Sumit - Tech & AI Reel Resource Hub";
    } else if (routeInfo.page === 'reel' && routeInfo.slug) {
      const found = findReel(reels, routeInfo.slug);
      if (found) {
        document.title = `${found.title} - Techy Sumit Resources`;
      } else {
        document.title = "Reel Resources - Techy Sumit";
      }
    } else if (routeInfo.page === 'prompts') {
      document.title = "Prompts Library - Techy Sumit";
    } else if (routeInfo.page === 'apps') {
      document.title = "Apps & Tools Catalog - Techy Sumit";
    } else if (routeInfo.page === 'about') {
      document.title = "About Sumit - Tech Creator & Builder";
    } else if (routeInfo.page === 'admin') {
      document.title = "Creator Admin Panel - Techy Sumit";
    } else {
      document.title = "Page Not Found - Techy Sumit";
    }
  }, [routeInfo, reels]);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      if (routeInfo.page !== 'home') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const renderCurrentPage = () => {
    switch (routeInfo.page) {
      case 'home':
        return <HomePage reels={reels} onNavigate={navigate} />;

      case 'reel':
        return (
          <ReelResourcePage
            slug={routeInfo.slug || ''}
            reels={reels}
            onNavigate={navigate}
            showToast={showToast}
          />
        );

      case 'prompts':
        return <PromptsPage reels={reels} onNavigate={navigate} showToast={showToast} />;

      case 'apps':
        return <AppsPage reels={reels} onNavigate={navigate} />;

      case 'about':
        return <AboutPage onNavigate={navigate} />;

      case 'admin':
        return (
          <AdminPanel
            reels={reels}
            onUpdateReels={updateReels}
            onNavigate={navigate}
            showToast={showToast}
            isAuthenticated={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
          />
        );

      default:
        return <NotFoundPage reels={reels} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen liquid-glass-canvas flex flex-col justify-between selection:bg-[#F7E08A]/40 selection:text-[#111111]">
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#111111] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <Navbar currentPath={currentPath} onNavigate={navigate} isAdminLoggedIn={isAdminLoggedIn} />

      <main className="flex-grow pt-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {renderCurrentPage()}
      </main>

      <footer className="mt-16 border-t border-black/5 bg-white/40 backdrop-blur-md py-8 px-4 text-center text-xs text-[#777777]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold gold-gradient-text">Techy Sumit</span>
            <span>· All rights reserved © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <button onClick={() => navigate('/')} className="hover:text-[#111111]">Home</button>
            <button onClick={() => navigate('/prompts')} className="hover:text-[#111111]">Prompts</button>
            <button onClick={() => navigate('/apps')} className="hover:text-[#111111]">Apps</button>
            <button onClick={() => navigate('/about')} className="hover:text-[#111111]">About</button>
            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-[#8C650A] hover:underline">
              Instagram
            </a>
            {/* Discreet Admin Lock Icon in Footer */}
            <button
              onClick={() => navigate('/admin')}
              className="p-1 rounded-full text-stone-400 hover:text-[#B38728] transition-colors"
              title="Creator Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
