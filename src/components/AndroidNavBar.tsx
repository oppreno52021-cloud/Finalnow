import React from 'react';
import { ActiveTab, UserProfile } from '../types';
import {
  Home,
  Users,
  CalendarCheck,
  Package,
  Settings,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { getFormattedTodayArabic, getCurrentMonthWeek, getCurrentArabicWorkDay } from '../utils/planHelper';

interface AndroidNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: UserProfile;
  todayVisitsCount: number;
  todayScheduledCount?: number;
  todayCompletedCount?: number;
  todayAreaLabel?: string;
  totalDoctorsCount: number;
  onOpenAddDoctorToToday: () => void;
  showTopHeader?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  todayVisitsCount,
  todayScheduledCount,
  todayCompletedCount,
  todayAreaLabel,
  showTopHeader = true,
  theme = 'light',
  onToggleTheme,
}) => {
  const currentWeek = getCurrentMonthWeek();
  const weekLabel = `الأسبوع ${
    currentWeek === 1 ? 'الأول' : currentWeek === 2 ? 'الثاني' : currentWeek === 3 ? 'الثالث' : 'الرابع'
  }`;

  const arabicDayName = new Date().toLocaleDateString('ar-EG', { weekday: 'long' });
  const arabicDayAndMonth = new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' });

  // Total scheduled visits today (fallback to 0 or todayVisitsCount)
  const totalVisitsToday = todayScheduledCount ?? todayVisitsCount ?? 0;
  const completedVisitsToday = todayCompletedCount ?? 0;
  const completionPercentage =
    totalVisitsToday > 0 ? Math.min(100, Math.round((completedVisitsToday / totalVisitsToday) * 100)) : 0;

  const displayArea = todayAreaLabel && todayAreaLabel.trim().length > 0 ? todayAreaLabel : userProfile.territory;

  return (
    <>
      {/* Top Application Bar - Shows only on Home screen (Slim single-row matching footer height ~56px) */}
      {showTopHeader && activeTab === 'home' && (
        <header
          id="app-header"
          className="sticky top-0 z-30 h-14 bg-white dark:bg-[#152337] border-b border-[#E2E8F0] dark:border-[#26384D] shadow-xs transition-colors flex items-center"
        >
          <div className="max-w-md sm:max-w-xl w-full mx-auto px-3.5 sm:px-4 flex items-center justify-between gap-2.5">
            {/* الجانب الأيمن: الأسبوع واليوم والمنطقة بتنسيق مدمج ومتناسق وخطوط سوداء واضحة */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1976D2]/20 text-black dark:text-[#42A5F5] flex items-center justify-center shrink-0 border border-slate-300 dark:border-[#1976D2]/35">
                <Calendar className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-right leading-tight min-w-0">
                <span className="text-xs font-black text-black dark:text-[#F5F7FA] truncate">
                  {weekLabel} • {arabicDayName}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-black text-black dark:text-[#9AA8B8] truncate">
                  <MapPin className="w-3 h-3 text-black dark:text-[#42A5F5] shrink-0 stroke-[2.5]" />
                  <span className="truncate text-black dark:text-[#9AA8B8]">{displayArea}</span>
                </div>
              </div>
            </div>

            {/* الجانب الأيسر: كبسولة إنجاز الزيارات وزر التبديل الفوري للثيم بخطوط سوداء واضحة */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1B2A3D] text-black dark:text-[#F5F7FA] border border-slate-300 dark:border-[#26384D] text-xs font-black shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-[#2E9B72] shrink-0 stroke-[2.5]" />
                <span className="text-[11px] font-black text-black dark:text-[#9AA8B8]">المنجز:</span>
                <span className="text-xs font-black tracking-tight text-black dark:text-[#F5F7FA]">{completedVisitsToday}/{totalVisitsToday}</span>
                {totalVisitsToday > 0 && (
                  <span className="mr-0.5 px-1.5 py-0.5 rounded-md bg-black dark:bg-[#1976D2] text-[10px] font-black text-white shadow-2xs">
                    {completionPercentage}%
                  </span>
                )}
              </div>

              {onToggleTheme && (
                <button
                  id="btn-header-theme-toggle"
                  type="button"
                  onClick={onToggleTheme}
                  title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح الأبيض ☀️' : 'التبديل إلى الوضع الليلي 🌙'}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-[#1B2A3D] text-black dark:text-amber-400 border border-slate-300 dark:border-[#26384D] flex items-center justify-center transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-[#223348] active:scale-95 shadow-xs"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  ) : (
                    <Moon className="w-4 h-4 text-black stroke-[2.5]" />
                  )}
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Bottom Android Navigation Bar (5 Approved Tabs - Matching Height ~56px) */}
      <nav
        id="bottom-navigation-bar"
        className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-white dark:bg-[#152337] border-t border-[#E2E8F0] dark:border-[#26384D] shadow-xs flex items-center"
      >
        <div className="max-w-md w-full mx-auto grid grid-cols-5 px-1">
          {/* 1. الرئيسية */}
          <button
            id="nav-tab-home"
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer relative"
          >
            <div className={`w-5 h-1 rounded-full mb-1 transition-all ${
              activeTab === 'home'
                ? 'bg-[#0A3D62] dark:bg-[#42A5F5]'
                : 'bg-transparent'
            }`} />
            <Home className={`w-5 h-5 mb-0.5 transition-colors ${
              activeTab === 'home'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] stroke-[2.6]'
                : 'text-[#94A3B8] dark:text-slate-400 stroke-[2]'
            }`} />
            <span className={`text-[11px] transition-colors ${
              activeTab === 'home'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] font-black'
                : 'text-[#94A3B8] dark:text-slate-400 font-bold'
            }`}>الرئيسية</span>
          </button>

          {/* 2. الأطباء */}
          <button
            id="nav-tab-doctors"
            onClick={() => setActiveTab('doctors')}
            className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer relative"
          >
            <div className={`w-5 h-1 rounded-full mb-1 transition-all ${
              activeTab === 'doctors'
                ? 'bg-[#0A3D62] dark:bg-[#42A5F5]'
                : 'bg-transparent'
            }`} />
            <Users className={`w-5 h-5 mb-0.5 transition-colors ${
              activeTab === 'doctors'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] stroke-[2.6]'
                : 'text-[#94A3B8] dark:text-slate-400 stroke-[2]'
            }`} />
            <span className={`text-[11px] transition-colors ${
              activeTab === 'doctors'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] font-black'
                : 'text-[#94A3B8] dark:text-slate-400 font-bold'
            }`}>الأطباء</span>
          </button>

          {/* 3. الزيارات */}
          <button
            id="nav-tab-visits"
            onClick={() => setActiveTab('visits')}
            className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer relative"
          >
            <div className={`w-5 h-1 rounded-full mb-1 transition-all ${
              activeTab === 'visits'
                ? 'bg-[#0A3D62] dark:bg-[#42A5F5]'
                : 'bg-transparent'
            }`} />
            <CalendarCheck className={`w-5 h-5 mb-0.5 transition-colors ${
              activeTab === 'visits'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] stroke-[2.6]'
                : 'text-[#94A3B8] dark:text-slate-400 stroke-[2]'
            }`} />
            <span className={`text-[11px] transition-colors ${
              activeTab === 'visits'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] font-black'
                : 'text-[#94A3B8] dark:text-slate-400 font-bold'
            }`}>الزيارات</span>
          </button>

          {/* 4. المنتجات */}
          <button
            id="nav-tab-products"
            onClick={() => setActiveTab('products')}
            className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer relative"
          >
            <div className={`w-5 h-1 rounded-full mb-1 transition-all ${
              activeTab === 'products'
                ? 'bg-[#0A3D62] dark:bg-[#42A5F5]'
                : 'bg-transparent'
            }`} />
            <Package className={`w-5 h-5 mb-0.5 transition-colors ${
              activeTab === 'products'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] stroke-[2.6]'
                : 'text-[#94A3B8] dark:text-slate-400 stroke-[2]'
            }`} />
            <span className={`text-[11px] transition-colors ${
              activeTab === 'products'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] font-black'
                : 'text-[#94A3B8] dark:text-slate-400 font-bold'
            }`}>المنتجات</span>
          </button>

          {/* 5. الإعدادات */}
          <button
            id="nav-tab-settings"
            onClick={() => setActiveTab('settings')}
            className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer relative"
          >
            <div className={`w-5 h-1 rounded-full mb-1 transition-all ${
              activeTab === 'settings'
                ? 'bg-[#0A3D62] dark:bg-[#42A5F5]'
                : 'bg-transparent'
            }`} />
            <Settings className={`w-5 h-5 mb-0.5 transition-colors ${
              activeTab === 'settings'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] stroke-[2.6]'
                : 'text-[#94A3B8] dark:text-slate-400 stroke-[2]'
            }`} />
            <span className={`text-[11px] transition-colors ${
              activeTab === 'settings'
                ? 'text-[#0A3D62] dark:text-[#42A5F5] font-black'
                : 'text-[#94A3B8] dark:text-slate-400 font-bold'
            }`}>الإعدادات</span>
          </button>
        </div>
      </nav>
    </>
  );
};
