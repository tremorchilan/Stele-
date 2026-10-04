import React, { useState, useEffect } from 'react';
import { SteleItem, Commitment, NoticeItem, Role } from '../types';
import { WeekStrip } from '../components/WeekStrip';
import { Sparkles, ArrowRight, Zap, ChevronRight, ShieldCheck } from 'lucide-react';
import { ROLE_HOME_CONFIG, ROLE_PROFILES } from '../data/roleProfiles';

interface HomeViewProps {
  items: SteleItem[];
  commitments: Commitment[];
  notices: NoticeItem[];
  currentRole: Role;
  onSelectItem: (item: SteleItem) => void;
  onOpenCommitment: (commitment: Commitment) => void;
  onNavigateTab: (tab: 'radar' | 'board' | 'campus') => void;
  onOpenExclusiveConsole?: () => void;
  onFlashNotch?: () => void;
  onShowToast?: (msg: string) => void;
  onOpenDetailSheet?: () => void;
  onOpenUnconventionalFeatures?: () => void;
  onOpenProfile?: () => void;
  onInspectNotice?: () => void;
  onFulfillSlip?: () => void;
  onOpenCatchupDigest?: () => void;
  onOpenDispatches?: () => void;
  onOpenUnifiedCalendar?: () => void;
  onOpenNoticesDrawer?: () => void;
  onOpenClosingDrawer?: () => void;
  streakCount?: number;
  score?: number;
}

const WEEK_DAYS = [
  { label: 'Wed', date: '12', count: 3 },
  { label: 'Thu', date: '13', count: 2 },
  { label: 'Fri', date: '14', count: 1 },
  { label: 'Sat', date: '15', count: 4 },
  { label: 'Sun', date: '16', count: 0 },
  { label: 'Mon', date: '17', count: 1 },
  { label: 'Tue', date: '18', count: 2 },
];

export const HomeView: React.FC<HomeViewProps> = ({
  items,
  commitments,
  currentRole,
  onSelectItem,
  onOpenCommitment,
  onNavigateTab,
  onOpenExclusiveConsole,
  onFlashNotch,
  onShowToast,
  onOpenDetailSheet,
  onOpenUnconventionalFeatures,
  onInspectNotice,
  onFulfillSlip,
  onOpenCatchupDigest,
  onOpenUnifiedCalendar,
  onOpenNoticesDrawer,
  onOpenClosingDrawer,
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const [ringProgress, setRingProgress] = useState(40);

  // Dynamic bar breathing animation
  const [barOrangeWidth, setBarOrangeWidth] = useState(30);
  const [barAmberWidth, setBarAmberWidth] = useState(70);

  useEffect(() => {
    let t = 0;
    let animId: number;
    const renderLoop = () => {
      t += 0.02;
      setBarOrangeWidth(30 + Math.sin(t * 1.5) * 4);
      setBarAmberWidth(70 + Math.cos(t * 1.2) * 5);
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const currentDayData = WEEK_DAYS[selectedDay] || WEEK_DAYS[0];
  const roleConfig = ROLE_HOME_CONFIG[currentRole] || ROLE_HOME_CONFIG.aspirant;
  const roleProfile = ROLE_PROFILES[currentRole] || ROLE_PROFILES.aspirant;

  const primaryCommitment = commitments.find((c) => c.status === 'active') || commitments[0];

  const handleTileClick = () => {
    onFlashNotch?.();
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      {/* 7-Day Calendar Strip */}
      <WeekStrip
        selectedDay={selectedDay}
        onSelectDay={(day) => {
          setSelectedDay(day);
          onShowToast?.(`Day selected: ${WEEK_DAYS[day].label} ${WEEK_DAYS[day].date}`);
        }}
        onFlashNotch={onFlashNotch}
        onOpenUnifiedCalendar={onOpenUnifiedCalendar}
      />

      <div className="main" id="homeMain">
        <div className="w-full max-w-7xl mx-auto pb-8">
          {/* Header Row Calibrated to Active Role */}
          <div className="header-row">
            <div>
              <div className="app-title-wrap">
                <div className="app-title">
                  St<em>e</em>le
                </div>
                <div className="live-dot" />
                <span
                  className="ml-1.5 px-2 py-0.5 rounded-[7px] text-[10px] font-extrabold uppercase tracking-wider"
                  style={{
                    backgroundColor: roleConfig.exclusiveFeature.bg,
                    color: roleConfig.exclusiveFeature.color,
                  }}
                >
                  {currentRole.replace('_', ' ')}
                </span>
              </div>
              <div className="app-sub" id="appSub">
                <b>
                  {currentDayData.count} {roleConfig.subtitlePrefix}
                </b>{' '}
                · {roleProfile.name} · {currentDayData.label} {currentDayData.date}
              </div>
            </div>
            <div className="header-actions">
              <button
                className="icon-btn"
                id="unconventionalInfoBtn"
                aria-label="Unconventional Features & PRD Invariants"
                title="Unconventional Features (PRD & White Paper)"
                type="button"
                onClick={() => onOpenUnconventionalFeatures?.()}
              >
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[var(--accent)] text-[var(--accent)] flex items-center justify-center text-[12px] font-bold font-serif italic leading-none shadow-xs">
                  i
                </div>
              </button>
              <button
                className="icon-btn"
                id="searchBtn"
                aria-label="Open Calendar"
                title="Open Unified Schedule & Calendar"
                type="button"
                onClick={() => onOpenUnifiedCalendar?.()}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
              <button
                className="icon-btn"
                id="bellBtn"
                aria-label="Role Status"
                type="button"
                onClick={() => onShowToast?.(roleConfig.hero.toastMessage)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 01-3.4 0" />
                </svg>
                {currentRole !== 'dweller' && <span className="ping" />}
              </button>
            </div>
          </div>

          {/* Role-Calibrated Bento Grid */}
          <div className="bento">
            {/* Hero 2×2 Tile */}
            <div
              className="tile hero relative overflow-hidden"
              id="tileHero"
              onClick={() => {
                handleTileClick();
                if (onOpenDetailSheet) {
                  onOpenDetailSheet();
                } else if (primaryCommitment) {
                  onOpenCommitment(primaryCommitment);
                }
              }}
            >
              <div className="pill urgent relative z-1">
                <i />
                {roleConfig.hero.pill}
              </div>
              <div className="hero-title relative z-1">{roleConfig.hero.title}</div>
              <div className="hero-source relative z-1">{roleConfig.hero.source}</div>

              <div className="hero-avatars relative z-1">
                {roleConfig.hero.avatars.map((av, idx) => (
                  <div key={idx} className="ava" style={{ background: av.bg }}>
                    {av.initials}
                  </div>
                ))}
                <span className="ava-more">{roleConfig.hero.moreLabel}</span>
              </div>

              <div className="hero-bottom relative z-1">
                <div className="deadline-fig">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span id="heroTime">{roleConfig.hero.timeLeft}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill orange"
                    id="barOrange"
                    style={{ width: `${barOrangeWidth.toFixed(1)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Wide Ring 2×1 Tile */}
            <div
              className="tile wide-ring"
              id="tileRing"
              onClick={() => {
                handleTileClick();
                setRingProgress((prev) => (prev === 40 ? 80 : 40));
                onShowToast?.(roleConfig.ringTile.toastMessage);
              }}
            >
              <div className="ring-wrap">
                <svg viewBox="0 0 52 52">
                  <defs>
                    <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFDB8A" />
                      <stop offset="100%" stopColor="#E0A83A" />
                    </linearGradient>
                  </defs>
                  <circle className="ring-bg" cx="26" cy="26" r="22" />
                  <circle
                    className="ring-fg"
                    id="ringFg"
                    cx="26"
                    cy="26"
                    r="22"
                    style={{ strokeDashoffset: ringProgress }}
                  />
                </svg>
                <div className="ring-label">{roleConfig.ringTile.label}</div>
              </div>
              <div className="ring-text">
                <b>{roleConfig.ringTile.title}</b>
                <span>{roleConfig.ringTile.subtitle}</span>
              </div>
            </div>

            {/* Wide Check 2×1 Tile */}
            <div
              className={`tile wide-check ${isChecked ? 'done' : ''}`}
              id="tileCheck"
              onClick={() => {
                handleTileClick();
                const next = !isChecked;
                setIsChecked(next);
                if (next) {
                  onFulfillSlip?.();
                  onShowToast?.(roleConfig.checkTile.toastDone);
                } else {
                  onShowToast?.(roleConfig.checkTile.toastPending);
                }
              }}
            >
              <div className="check-icon">
                <svg viewBox="0 0 28 28" fill="none">
                  <path
                    d="M6 15.5L11.5 21L22 8"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="check-text">
                <b>{isChecked ? roleConfig.checkTile.doneTitle : roleConfig.checkTile.pendingTitle}</b>
                <span>{isChecked ? roleConfig.checkTile.doneSub : roleConfig.checkTile.pendingSub}</span>
              </div>
            </div>

            {/* Row 3 Wide Role Action / Club Commitment Tile (4×1 Native Bento Tile) */}
            <div
              className="tile club-commitment-tile"
              id="tileClubCommitment"
              onClick={() => {
                handleTileClick();
                if (
                  currentRole === 'steward' ||
                  currentRole === 'teacher' ||
                  currentRole === 'authority' ||
                  currentRole === 'loyal_core' ||
                  currentRole === 'alumni' ||
                  currentRole === 'dweller'
                ) {
                  onOpenExclusiveConsole?.();
                } else if (primaryCommitment) {
                  onOpenCommitment(primaryCommitment);
                } else {
                  onNavigateTab('board');
                }
                onShowToast?.(roleConfig.wideBannerTile.toastMessage);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTileClick();
                  onOpenExclusiveConsole ? onOpenExclusiveConsole() : onNavigateTab('board');
                }
              }}
            >
              <div className="club-commitment-inner">
                <div className="ring-wrap">
                  <svg viewBox="0 0 52 52">
                    <defs>
                      <linearGradient id="clubOrangeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFB46B" />
                        <stop offset="100%" stopColor="#E87A3D" />
                      </linearGradient>
                    </defs>
                    <circle className="ring-bg" cx="26" cy="26" r="22" />
                    <circle
                      className="ring-fg club-ring-fg"
                      cx="26"
                      cy="26"
                      r="22"
                      style={{ strokeDashoffset: 32 }}
                    />
                  </svg>
                  <div className="ring-label" style={{ color: 'var(--orange)' }}>
                    {roleConfig.wideBannerTile.timeLabel}
                  </div>
                </div>

                <div className="club-commitment-content">
                  <div className="club-commitment-top">
                    <div className="pill urgent" style={{ marginBottom: 0 }}>
                      <i />
                      {roleConfig.wideBannerTile.pill}
                    </div>
                    <span className="club-commitment-meta">{roleConfig.wideBannerTile.meta}</span>
                  </div>

                  <div className="ring-text" style={{ marginTop: '6px' }}>
                    <b>{roleConfig.wideBannerTile.title}</b>
                    <span>{roleConfig.wideBannerTile.subtitle}</span>
                  </div>

                  <div className="bar-track" style={{ marginTop: '10px' }}>
                    <div
                      className="bar-fill orange"
                      style={{ width: `${barOrangeWidth.toFixed(1)}%` }}
                    />
                  </div>
                </div>

                <div className="notice-link club-commitment-link" style={{ marginTop: 0 }}>
                  {roleConfig.wideBannerTile.linkLabel} <span>&rarr;</span>
                </div>
              </div>
            </div>

            {/* Standard Notice 1×1 Tile */}
            <div
              className="tile std-notice"
              id="tileNotice"
              onClick={() => {
                handleTileClick();
                if (onOpenNoticesDrawer) {
                  onOpenNoticesDrawer();
                } else {
                  onInspectNotice?.();
                  onShowToast?.(roleConfig.noticeTile.toastMessage);
                }
              }}
            >
              <div className="notice-title">{roleConfig.noticeTile.title}</div>
              <div className="notice-ctx">{roleConfig.noticeTile.summary}</div>
              <div className="notice-link">
                {roleConfig.noticeTile.linkText} <span>&rarr;</span>
              </div>
            </div>

            {/* Standard Deadline 1×1 Tile */}
            <div
              className="tile std-deadline"
              id="tileDeadline"
              onClick={() => {
                handleTileClick();
                if (onOpenClosingDrawer) {
                  onOpenClosingDrawer();
                } else {
                  onShowToast?.(roleConfig.deadlineTile.toastMessage);
                }
              }}
            >
              <div className="deadline-amber" id="amberTime">
                {roleConfig.deadlineTile.timeLabel}
              </div>
              <div
                className="notice-ctx"
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginTop: '5px',
                  lineHeight: 1.3,
                }}
              >
                {roleConfig.deadlineTile.title}
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill amber"
                  id="barAmber"
                  style={{ width: `${barAmberWidth.toFixed(1)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Exclusive Role Feature Banner (Direct Link to Steward Console, Teacher Console, Authority Console, etc.) */}
          <div
            onClick={() => {
              handleTileClick();
              onOpenExclusiveConsole?.();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTileClick();
                onOpenExclusiveConsole?.();
              }
            }}
            className="w-full mt-3 p-3.5 sm:p-4 rounded-[18px] sm:rounded-[20px] bg-[var(--tile)] border transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer group active:scale-[0.98]"
            style={{ borderColor: `${roleConfig.exclusiveFeature.bg}55` }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] flex items-center justify-center font-bold text-[16px] shrink-0 shadow-xs"
                style={{
                  backgroundColor: roleConfig.exclusiveFeature.bg,
                  color: roleConfig.exclusiveFeature.color,
                }}
              >
                {roleConfig.exclusiveFeature.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[13.5px] sm:text-[14px] font-extrabold text-[var(--text)]">
                    {roleConfig.exclusiveFeature.label}
                  </h4>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${roleConfig.exclusiveFeature.bg}25`,
                      color: roleConfig.exclusiveFeature.bg,
                    }}
                  >
                    Exclusive to {currentRole.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-[12px] text-[var(--text-secondary)] mt-0.5 truncate">
                  {roleConfig.exclusiveFeature.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[var(--accent)] shrink-0 group-hover:translate-x-0.5 transition-all text-[12px] font-extrabold">
              <span className="hidden sm:inline">Launch</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Role-Oriented Messenger & Digest Full-Width Banner */}
          <div
            className="w-full mt-2.5 p-3.5 sm:p-4 rounded-[18px] sm:rounded-[20px] bg-[var(--tile)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(56,189,248,0.35)] transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer group active:scale-[0.98]"
            id="tileCatchupDigest"
            onClick={() => {
              handleTileClick();
              onOpenCatchupDigest?.();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTileClick();
                onOpenCatchupDigest?.();
              }
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] bg-[var(--track)] flex items-center justify-center border border-[var(--rule)] text-[var(--text)] shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[13.5px] sm:text-[14px] font-extrabold text-[var(--text)] transition-colors">
                    {roleConfig.digestBanner.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--track)] text-[var(--text)] text-[10.5px] font-bold border border-[var(--rule)]">
                    {roleConfig.digestBanner.badge}
                  </span>
                  <span className="text-[11px] text-[var(--meta)] font-medium hidden sm:inline">
                    {roleConfig.digestBanner.scopeLabel}
                  </span>
                </div>
                <p className="text-[11.5px] sm:text-[12px] text-[var(--text-secondary)] mt-0.5 truncate">
                  {roleConfig.digestBanner.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[var(--text-sub)] group-hover:text-[var(--text)] shrink-0 group-hover:translate-x-0.5 transition-all text-[12px] font-semibold">
              <span className="hidden sm:inline">Review</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Role-Specific Active Mandates / Opportunities Preview Tiles */}
          <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-[var(--text)] tracking-tight">
                  {currentRole === 'authority'
                    ? 'Institutional Governance & Node Feed'
                    : currentRole === 'teacher'
                    ? 'Supervised Academic & Olympiad Feed'
                    : currentRole === 'steward'
                    ? 'Club Delegation & District Radar Feed'
                    : 'Federated Opportunities'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--track)] text-[var(--meta)] text-[10.5px] font-bold border border-[var(--rule)]">
                  {items.length} Active
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('radar')}
                className="text-[12px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <span>Explore All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="home-opportunities-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.slice(0, 4).map((item, idx) => {
                const isFirst = idx === 0;
                return (
                  <div
                    key={item.id}
                    id={`home-opp-${item.id}`}
                    onClick={() => {
                      handleTileClick();
                      onSelectItem(item);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTileClick();
                        onSelectItem(item);
                      }
                    }}
                    className="tile flex flex-col justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <div className={isFirst ? 'pill urgent' : 'pill'} style={{ marginBottom: 0 }}>
                            {isFirst && <i />}
                            {item.scope} · {item.provenance}
                          </div>
                          {item.tags[0] && (
                            <span className="text-[11px] font-semibold text-[var(--meta)]">
                              #{item.tags[0]}
                            </span>
                          )}
                        </div>
                        <span
                          className="text-[11.5px] font-extrabold tabular-nums shrink-0"
                          style={{ color: isFirst ? 'var(--orange)' : 'var(--amber)' }}
                        >
                          {currentRole === 'authority' || currentRole === 'steward'
                            ? `${item.reachCount || 120} reached`
                            : isFirst
                            ? '6h left'
                            : idx === 1
                            ? '2d left'
                            : idx === 2
                            ? '3d left'
                            : '7d left'}
                        </span>
                      </div>

                      <div className="notice-title">{item.title}</div>
                      <div className="notice-ctx line-clamp-2">{item.originalMessage}</div>
                    </div>

                    <div className="pt-1">
                      <div className="bar-track" style={{ marginTop: 0, marginBottom: '10px' }}>
                        <div
                          className={`bar-fill ${isFirst ? 'orange' : 'amber'}`}
                          style={{ width: isFirst ? '28%' : idx === 1 ? '58%' : idx === 2 ? '68%' : '82%' }}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11.5px] text-[var(--meta)] font-medium truncate">
                          {item.sourceInstitution} · {item.stewardName}
                        </span>
                        <div className="notice-link" style={{ marginTop: 0, flexShrink: 0 }}>
                          {currentRole === 'authority'
                            ? 'Audit'
                            : currentRole === 'teacher'
                            ? 'Supervise'
                            : currentRole === 'steward'
                            ? 'Curate'
                            : 'Inspect'}{' '}
                          <span>&rarr;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explore Radar Feed Shortcut */}
          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.07)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--orange)]" />
              <span className="text-[13px] font-semibold text-[var(--text)]">
                All Opportunity Radar Feed
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('radar')}
              className="text-[12px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <span>Open Radar View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
