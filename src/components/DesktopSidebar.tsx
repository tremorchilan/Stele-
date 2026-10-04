import React from 'react';
import { NavTab } from './Ribbon';
import { getRoleRibbonItems } from './NavBar';
import { Role } from '../types';
import { ROLE_PROFILES } from '../data/roleProfiles';
import {
  Sliders,
  Smartphone,
  Flame,
} from 'lucide-react';

interface DesktopSidebarProps {
  activeTab: NavTab;
  ribbonTab: NavTab;
  ribbonOpen: boolean;
  onNavClick: (tab: NavTab) => void;
  onSelectRibbonItem: (item: string) => void;
  onOpenSettings: () => void;
  onOpenProfile?: () => void;
  profileScore?: number;
  dailyStreak?: number;
  currentRole?: Role;
  onOpenExclusiveConsole?: () => void;
  isDark?: boolean;
  onSwitchToDeviceFrame?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  ribbonTab,
  ribbonOpen,
  onNavClick,
  onSelectRibbonItem,
  onOpenSettings,
  onOpenProfile,
  profileScore = 185,
  dailyStreak = 3,
  currentRole = 'aspirant',
  onSwitchToDeviceFrame,
}) => {
  const roleProfile = ROLE_PROFILES[currentRole];
  const currentItems = getRoleRibbonItems(currentRole, ribbonTab || activeTab);
  const initials = roleProfile.name
    .split(' ')
    .filter((p) => !p.includes('.'))
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="h-full flex flex-col justify-between items-center py-4 px-2 sm:px-3 select-none relative z-40 w-[78px] sm:w-[84px] shrink-0">
      {/* 1. TOP-LEFT: Exact Mobile Navigation Bar, Vertically Positioned */}
      <div className="relative">
        <div
          className="clay-nav-vertical"
          id="desktopTopNav"
          role="navigation"
          aria-label="Primary Navigation"
        >
          {/* The 4 Clay Nav Buttons exactly matching mobile */}
          <div className="flex flex-col items-center gap-1.5 p-1.5 w-full">
            {/* Home */}
            <button
              id="desktop-nav-home"
              type="button"
              onClick={() => onNavClick('home')}
              className={`clay-nav-btn ${
                (ribbonOpen ? ribbonTab === 'home' : activeTab === 'home') ? 'active' : ''
              }`}
              title="Home (Daily Overview & Bento)"
              aria-label="Home"
            >
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
                <path d="M3 10.5L12 3l9 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 9.5V20h13V9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-bold tracking-tight">Home</span>
            </button>

            {/* Radar */}
            <button
              id="desktop-nav-radar"
              type="button"
              onClick={() => onNavClick('radar')}
              className={`clay-nav-btn relative ${
                (ribbonOpen ? ribbonTab === 'radar' : activeTab === 'radar') ? 'active' : ''
              }`}
              title="Opportunity Radar"
              aria-label="Opportunity Radar"
            >
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
              <span className="text-[10px] font-bold tracking-tight">Radar</span>
              <div
                className="radar-dot"
                style={{ top: '8px', right: '14px', position: 'absolute' }}
              />
            </button>

            {/* Board */}
            <button
              id="desktop-nav-board"
              type="button"
              onClick={() => onNavClick('board')}
              className={`clay-nav-btn ${
                (ribbonOpen ? ribbonTab === 'board' : activeTab === 'board') ? 'active' : ''
              }`}
              title="Commitments Board"
              aria-label="Commitments Board"
            >
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
                <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 9h18M9 9v11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-bold tracking-tight">Board</span>
            </button>

            {/* Campus */}
            <button
              id="desktop-nav-campus"
              type="button"
              onClick={() => onNavClick('campus')}
              className={`clay-nav-btn ${
                (ribbonOpen ? ribbonTab === 'campus' : activeTab === 'campus') ? 'active' : ''
              }`}
              title="Campus Hub"
              aria-label="Campus Hub"
            >
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
                <path d="M12 3L2 9l10 6 10-6-10-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11.5V17c0 0 2.5 3 6 3s6-3 6-3v-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-bold tracking-tight">Campus</span>
            </button>
          </div>
        </div>

        {/* 2-Tap Unrolling Ribbon Flyout beside Top-Left Nav */}
        {ribbonOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => onNavClick(ribbonTab)}
              aria-label="Close ribbon menu"
            />
            <div className="absolute left-[84px] top-0 w-[248px] z-50 clay-ribbon-flyout animate-in fade-in zoom-in-95 duration-200">
              <div
                className="p-2.5 rounded-[22px] border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.12)]"
                style={{
                  background: 'rgba(26, 26, 32, 0.90)',
                  backdropFilter: 'blur(26px) saturate(185%)',
                  WebkitBackdropFilter: 'blur(26px) saturate(185%)',
                }}
              >
                <div className="px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] flex items-center justify-between border-b border-white/8 pb-1.5 mb-1.5">
                  <span className="capitalize">{ribbonTab} Quick Access</span>
                  <span className="text-[10.5px] font-mono text-[var(--meta)]">
                    {currentRole.replace('_', ' ')}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  {currentItems.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => onSelectRibbonItem(item.title)}
                      className={`w-full px-2.5 py-2 rounded-[13px] hover:bg-white/10 active:bg-white/15 text-left text-[12.5px] font-semibold text-[var(--text)] flex items-center gap-2.5 transition-colors cursor-pointer ${
                        item.isExclusive ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-[8px] flex items-center justify-center text-[12px] font-bold shadow-xs shrink-0"
                        style={{ background: item.bg, color: item.color || '#FFFFFF' }}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="truncate block leading-tight">{item.title}</span>
                        {item.isExclusive && (
                          <span className="text-[10px] text-[var(--meta)] font-normal block leading-tight mt-0.5">
                            {currentRole.replace('_', ' ')} workspace
                          </span>
                        )}
                      </div>
                      <span className="text-[var(--meta)] text-[14px] shrink-0">&rsaquo;</span>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-1.5 border-t border-white/8">
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="w-full px-2.5 py-1.5 rounded-[12px] hover:bg-white/10 text-left text-[12px] font-medium text-[var(--meta)] hover:text-[var(--text)] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Role Calibration &amp; Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 2. BOTTOM-LEFT: Vertically Positioned Pill-Like Bar, Detached from Top-Left */}
      <div
        className="clay-nav-vertical"
        id="desktopBottomPill"
        role="complementary"
        aria-label="Account and Settings"
      >
        <div className="flex flex-col items-center gap-1.5 p-1.5 w-full">
          {/* Account Profile Button */}
          <button
            id="desktop-bottom-profile"
            type="button"
            onClick={onOpenProfile}
            className="clay-nav-btn group"
            title={`Your Sovereign Profile (${roleProfile.name} · ${profileScore} pts)`}
            aria-label="Your Profile"
          >
            <div className="w-7 h-7 rounded-[10px] bg-[var(--accent)] text-white flex items-center justify-center text-[10.5px] font-bold shadow-xs group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <span className="text-[9.5px] font-bold text-[var(--text-secondary)] group-hover:text-white transition-colors">
              {profileScore}
            </span>
          </button>

          {/* Daily Streak Button */}
          <button
            id="desktop-bottom-streak"
            type="button"
            onClick={onOpenProfile}
            className="clay-nav-btn text-[#F59E0B] group"
            title={`Daily Consistency Streak: ${dailyStreak} days · Tap to inspect`}
            aria-label="Daily Streak"
          >
            <Flame className="w-5 h-5 text-[#F59E0B] group-hover:scale-110 transition-transform fill-[#F59E0B]/20" />
            <span className="text-[9.5px] font-bold text-[#F59E0B]">
              {dailyStreak}d
            </span>
          </button>

          {/* System Settings & Calibration */}
          <button
            id="desktop-bottom-settings"
            type="button"
            onClick={onOpenSettings}
            className="clay-nav-btn text-[var(--text-secondary)] hover:text-[var(--accent)]"
            title="Role Calibration & System Settings"
            aria-label="Settings"
          >
            <Sliders className="w-[20px] h-[20px]" />
            <span className="text-[9.5px] font-medium">Config</span>
          </button>

          {/* Switch to Reference Device Frame */}
          {onSwitchToDeviceFrame && (
            <button
              id="desktop-bottom-frame-toggle"
              type="button"
              onClick={onSwitchToDeviceFrame}
              className="clay-nav-btn text-[var(--text-muted)] hover:text-white"
              title="Switch to Reference Mobile Frame (390x844)"
              aria-label="Switch to Mobile Frame"
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-[9px]">Frame</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
