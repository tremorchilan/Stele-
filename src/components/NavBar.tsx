import React from 'react';
import { NavTab } from './Ribbon';
import { Role } from '../types';
import { ROLE_HOME_CONFIG, ROLE_PROFILES } from '../data/roleProfiles';

interface NavBarProps {
  activeTab: NavTab;
  ribbonTab: NavTab;
  ribbonOpen: boolean;
  currentRole?: Role;
  onNavClick: (tab: NavTab) => void;
  onSelectRibbonItem: (item: string) => void;
  onOpenSettings: () => void;
  onOpenProfile?: () => void;
  onOpenExclusiveConsole?: () => void;
  profileScore?: number;
  profileName?: string;
  isDark?: boolean;
}

interface RibbonItemData {
  title: string;
  icon: string;
  bg: string;
  color?: string;
  isExclusive?: boolean;
}

export const getRoleRibbonItems = (role: Role, tab: NavTab): RibbonItemData[] => {
  const exclusive = ROLE_HOME_CONFIG[role]?.exclusiveFeature || ROLE_HOME_CONFIG.aspirant.exclusiveFeature;

  const exclusiveRow: RibbonItemData = {
    title: exclusive.label,
    icon: exclusive.icon,
    bg: exclusive.bg,
    color: exclusive.color,
    isExclusive: true,
  };

  if (tab === 'home') {
    return [
      exclusiveRow,
      { title: 'Weekly Schedule', icon: '📅', bg: '#F59E0B', color: '#0F172A' },
      {
        title:
          role === 'authority'
            ? 'Official Circulars'
            : role === 'teacher'
            ? 'Section Notices & Rubrics'
            : 'Recent Notices',
        icon: '◍',
        bg: '#0284C7',
        color: '#FFFFFF',
      },
      {
        title:
          role === 'steward'
            ? 'Witness Sign-Off Queue'
            : role === 'teacher'
            ? 'Pending Lab Logbooks'
            : role === 'authority'
            ? 'Pending Charter Grants'
            : 'Closing Soon',
        icon: '⬢',
        bg: '#EF4444',
        color: '#FFFFFF',
      },
    ];
  }

  if (tab === 'board') {
    if (role === 'steward') {
      return [
        { title: 'Steward Console', icon: '⚡', bg: '#E0A83A', color: '#0F172A', isExclusive: true },
        { title: 'Executive Witness Queue', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
        { title: 'Historical Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      ];
    }
    if (role === 'teacher') {
      return [
        { title: 'Teacher Console', icon: '🎓', bg: '#E87A3D', color: '#FFFFFF', isExclusive: true },
        { title: 'Section Logbook Queue', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
        { title: 'Signed Academic Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      ];
    }
    if (role === 'authority') {
      return [
        { title: 'Authority Console', icon: '🏛️', bg: '#EF4444', color: '#FFFFFF', isExclusive: true },
        { title: 'Governance Mandates', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
        { title: 'Ratified Decrees Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      ];
    }
    if (role === 'loyal_core') {
      return [
        { title: 'Core Wiki & Retro Studio', icon: '📘', bg: '#10B981', color: '#FFFFFF', isExclusive: true },
        { title: 'Active Commitments', icon: '⬣', bg: '#0284C7', color: '#FFFFFF' },
        { title: 'Historical Archive', icon: '◍', bg: '#8B5CF6', color: '#FFFFFF' },
      ];
    }
    if (role === 'dweller') {
      return [
        { title: 'Observer Orientation Deck', icon: '👁️', bg: '#64748B', color: '#FFFFFF', isExclusive: true },
        { title: 'Public Watched List', icon: '✦', bg: '#F59E0B', color: '#0F172A' },
        { title: 'Public Verification Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      ];
    }
    if (role === 'alumni') {
      return [
        { title: 'Alumni Sovereign Archive', icon: '🏛️', bg: '#8B5CF6', color: '#FFFFFF', isExclusive: true },
        { title: 'Mentorship & Reviews', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
        { title: 'Historical Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      ];
    }
    return [
      exclusiveRow,
      { title: 'Active Commitments', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
      { title: 'Watched List', icon: '✦', bg: '#F59E0B', color: '#0F172A' },
      { title: 'Historical Archive', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
    ];
  }

  if (tab === 'campus') {
    const baseCampus: RibbonItemData[] = [
      exclusiveRow,
      { title: 'Messenger', icon: '💬', bg: '#0284C7', color: '#FFFFFF' },
      { title: 'Clubs & Societies', icon: '✦', bg: '#8B5CF6', color: '#FFFFFF' },
      { title: 'Classes & Timetable', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
      { title: 'Resources & Syllabi', icon: '⬢', bg: '#EF4444', color: '#FFFFFF' },
    ];
    if (role === 'aspirant' || role === 'loyal_core' || role === 'member' || role === 'steward') {
      baseCampus.splice(2, 0, { title: 'Physical Perks Bazaar', icon: '☕', bg: '#F59E0B', color: '#0F172A' });
    }
    return baseCampus;
  }

  if (tab === 'radar') {
    return [
      exclusiveRow,
      { title: 'Federation Feed', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      { title: 'My Tracked Keywords', icon: '✦', bg: '#F59E0B', color: '#0F172A' },
      { title: 'Saved Discovery Tasks', icon: '⬣', bg: '#10B981', color: '#FFFFFF' },
    ];
  }

  if (tab === 'dispatches') {
    if (role === 'authority' || role === 'teacher') {
      return [
        exclusiveRow,
        { title: 'Official Channels', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
        { title: 'Catch-up Digest', icon: '⚡', bg: '#F59E0B', color: '#0F172A' },
      ];
    }
    return [
      { title: 'Common Channels', icon: '◍', bg: '#0284C7', color: '#FFFFFF' },
      { title: 'Private DMs', icon: '🔒', bg: '#8B5CF6', color: '#FFFFFF' },
      { title: 'Friend Index & QR', icon: '👥', bg: '#10B981', color: '#FFFFFF' },
      { title: 'Catch-up Digest', icon: '⚡', bg: '#F59E0B', color: '#0F172A' },
    ];
  }

  return [
    { title: 'All Physical Perks', icon: '☕', bg: '#F59E0B', color: '#0F172A' },
    { title: 'My Claimed Vouchers', icon: '🎟️', bg: '#0284C7', color: '#FFFFFF' },
  ];
};

export const NavBar: React.FC<NavBarProps> = ({
  activeTab,
  ribbonTab,
  ribbonOpen,
  currentRole = 'aspirant',
  onNavClick,
  onSelectRibbonItem,
  onOpenSettings,
  onOpenProfile,
  profileScore = 640,
}) => {
  const currentItems = getRoleRibbonItems(currentRole, ribbonTab || activeTab);
  const roleProfile = ROLE_PROFILES[currentRole] || ROLE_PROFILES.aspirant;
  const initials = roleProfile.name
    .split(' ')
    .filter((p) => !p.includes('.'))
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase() || 'SS';

  const getProfileRowLabel = (role: Role) => {
    switch (role) {
      case 'steward':
        return `${roleProfile.name} · Steward Standing`;
      case 'teacher':
        return `${roleProfile.name} · Faculty Ledger`;
      case 'authority':
        return `${roleProfile.name} · Node Signatory`;
      case 'loyal_core':
        return `${roleProfile.name} · Core Standing`;
      case 'dweller':
        return `${roleProfile.name} · Visitor Pass`;
      case 'alumni':
        return `${roleProfile.name} · Fellow Seal`;
      default:
        return `${roleProfile.name} · Profile & Perks`;
    }
  };

  return (
    <div className="nav-area" id="navArea">
      <div className={`clay-nav ${ribbonOpen ? 'open' : ''}`} id="clayNav">
        {/* Unrolling Ribbon Section */}
        <div className="clay-ribbon" id="clayRibbon">
          <div className="ribbon-inner">
            <div className="ribbon-glass">
              {currentItems.map((item) => (
                <div
                  key={item.title}
                  className={`ribbon-row ${
                    item.isExclusive ? 'bg-white/[0.04]' : ''
                  }`}
                  onClick={() => onSelectRibbonItem(item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectRibbonItem(item.title)}
                >
                  <div
                    className="ribbon-ico font-bold shadow-xs"
                    style={{ background: item.bg, color: item.color || '#FFFFFF' }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="truncate font-semibold text-[13.5px] text-[var(--text)] leading-tight">
                      {item.title}
                    </span>
                    {item.isExclusive && (
                      <span className="text-[10.5px] text-[var(--meta)] font-medium leading-tight mt-0.5">
                        {currentRole.replace('_', ' ')} workspace
                      </span>
                    )}
                  </div>
                  <span className="chev">&rsaquo;</span>
                </div>
              ))}

              <hr className="ribbon-rule" />

              <div
                className="ribbon-settings"
                id="settingsBtn"
                onClick={onOpenSettings}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenSettings()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                <span>Role Calibration &amp; Settings</span>
                <span className="ml-auto text-[11px] font-mono text-[var(--meta)] uppercase">
                  {currentRole.replace('_', ' ')}
                </span>
              </div>

              {/* Active Persona Profile & Standing Row */}
              {onOpenProfile && (
                <div
                  className="ribbon-settings"
                  id="yourProfileRibbonBtn"
                  onClick={onOpenProfile}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenProfile()}
                  style={{
                    marginTop: '2px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '9px',
                  }}
                >
                  <div className="w-5 h-5 rounded-[7px] bg-[var(--accent)] text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0">
                    {initials}
                  </div>
                  <span className="font-medium truncate">{getProfileRowLabel(currentRole)}</span>
                  <span className="ml-auto text-[11px] font-mono text-[var(--accent)] font-semibold shrink-0 tabular-nums">
                    {currentRole === 'dweller' ? 'Observer' : `${profileScore} pts`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The 4 Clay Nav Buttons */}
        <div className="nav-items">
          {/* Home */}
          <button
            className={`nav-item ${(ribbonOpen ? ribbonTab === 'home' : activeTab === 'home') ? 'active' : ''}`}
            data-tab="home"
            type="button"
            onClick={() => onNavClick('home')}
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5.5 9.5V20h13V9.5" />
            </svg>
            <span>Home</span>
          </button>

          {/* Radar */}
          <button
            className={`nav-item ${(ribbonOpen ? ribbonTab === 'radar' : activeTab === 'radar') ? 'active' : ''}`}
            data-tab="radar"
            type="button"
            onClick={() => onNavClick('radar')}
          >
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
            <span>Radar</span>
            <div className="radar-dot" />
          </button>

          {/* Board */}
          <button
            className={`nav-item ${(ribbonOpen ? ribbonTab === 'board' : activeTab === 'board') ? 'active' : ''}`}
            data-tab="board"
            type="button"
            onClick={() => onNavClick('board')}
          >
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18M9 9v11" />
            </svg>
            <span>Board</span>
          </button>

          {/* Campus */}
          <button
            className={`nav-item ${(ribbonOpen ? ribbonTab === 'campus' : activeTab === 'campus') ? 'active' : ''}`}
            data-tab="campus"
            type="button"
            onClick={() => onNavClick('campus')}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 3L2 9l10 6 10-6-10-6z" />
              <path d="M6 11.5V17c0 0 2.5 3 6 3s6-3 6-3v-5.5" />
            </svg>
            <span>Campus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
