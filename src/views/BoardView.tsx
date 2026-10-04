import React, { useState, useMemo, useEffect } from 'react';
import {
  Commitment,
  StudentProfile,
  Role,
  WikiPage,
  MemberPipelinePerson,
  SteleItem,
  NoticeItem,
} from '../types';
import { CountdownRing } from '../components/CountdownRing';
import { calculateTimeStatus } from '../utils/time';
import {
  CheckCircle2,
  Bookmark,
  Eye,
  Check,
  BarChart3,
  Flame,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PieChart,
  Layers,
  BookOpen,
  Lock,
  FileCheck,
  Plus,
} from 'lucide-react';
import { TaskAnalytics } from '../components/TaskAnalytics';
import { StewardsConsole } from '../components/StewardsConsole';
import { TeacherConsole } from '../components/TeacherConsole';
import { AuthorityConsole } from '../components/AuthorityConsole';
import { getSolidTagStyle } from '../utils/colorPills';
import { ROLE_HOME_CONFIG } from '../data/roleProfiles';

export type BoardSectionType = 'all' | 'console' | 'active' | 'watched' | 'past' | 'analytics';

interface BoardViewProps {
  commitments: Commitment[];
  currentRole?: Role;
  wikiPages?: WikiPage[];
  pipeline?: MemberPipelinePerson[];
  onAddTask?: (task: Partial<SteleItem>) => void;
  onAddWikiPage?: (page: Partial<WikiPage>) => void;
  onNominateSuccessor?: (name: string, date: string) => void;
  onAddNotice?: (notice: NoticeItem) => void;
  onShowToast?: (msg: string) => void;
  onSelectCommitment: (commitment: Commitment) => void;
  onCompleteCommitment: (commitment: Commitment) => void;
  onUnwatchCommitment: (commitmentId: string) => void;
  onOpenUnconventionalFeatures?: () => void;
  onOpenLedger?: () => void;
  initialSection?: BoardSectionType;
  onSectionChange?: (section: BoardSectionType) => void;
  profile?: StudentProfile;
  onOpenProfile?: () => void;
  isDeviceFrame?: boolean;
}

export const BoardView: React.FC<BoardViewProps> = ({
  commitments,
  currentRole = 'aspirant',
  wikiPages = [],
  pipeline = [],
  onAddTask = () => {},
  onAddWikiPage = () => {},
  onNominateSuccessor = () => {},
  onAddNotice,
  onShowToast,
  onSelectCommitment,
  onCompleteCommitment,
  onUnwatchCommitment,
  onOpenUnconventionalFeatures,
  onOpenLedger,
  initialSection = 'all',
  onSectionChange,
  profile,
  onOpenProfile,
  isDeviceFrame,
}) => {
  const [boardSection, setBoardSection] = useState<BoardSectionType>(initialSection);

  // Core Wiki Studio state (for loyal_core)
  const [coreWikiTitle, setCoreWikiTitle] = useState('');
  const [coreWikiContent, setCoreWikiContent] = useState('');
  const [coreWikiSaved, setCoreWikiSaved] = useState(false);

  useEffect(() => {
    if (initialSection) {
      setBoardSection(initialSection);
    }
  }, [initialSection]);

  const handleSetSection = (sec: BoardSectionType) => {
    setBoardSection(sec);
    onSectionChange?.(sec);
  };

  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = isDeviceFrame !== undefined ? isDeviceFrame : isMobileScreen;

  const roleConfig = ROLE_HOME_CONFIG[currentRole] || ROLE_HOME_CONFIG.aspirant;
  const hasExclusiveConsole =
    currentRole === 'steward' ||
    currentRole === 'teacher' ||
    currentRole === 'authority' ||
    currentRole === 'loyal_core' ||
    currentRole === 'dweller' ||
    currentRole === 'alumni';

  const activeItems = commitments.filter((c) => c.status === 'active');
  const watchedItems = commitments.filter((c) => c.status === 'watched');
  const pastItems = commitments.filter((c) => c.status === 'completed' || c.status === 'missed');

  // Urgency distribution for active items
  const urgencyStats = useMemo(() => {
    let critical = 0;
    let impending = 0;
    let relaxed = 0;

    activeItems.forEach((item) => {
      const status = calculateTimeStatus(item.deadline);
      const hoursRemaining = status.totalMsRemaining / (3600 * 1000);
      if (status.isCritical || status.tier === 'critical' || hoursRemaining <= 24) {
        critical++;
      } else if (status.tier === 'urgent' || hoursRemaining <= 72) {
        impending++;
      } else {
        relaxed++;
      }
    });

    return { critical, impending, relaxed };
  }, [activeItems]);

  const isCompetition = (title: string) => {
    const t = title.toLowerCase();
    return (
      t.includes('olympiad') ||
      t.includes('championship') ||
      t.includes('hackathon') ||
      t.includes('debate') ||
      t.includes('debating') ||
      t.includes('contest') ||
      t.includes('competition')
    );
  };

  const [phases, setPhases] = useState<Record<string, 'registered' | 'in_progress' | 'results_pending'>>({
    'commit-1': 'in_progress',
    'commit-2': 'in_progress',
  });

  const getPhase = (id: string) => {
    return phases[id] || 'in_progress';
  };

  const handleAdvancePhaseOrComplete = (item: Commitment) => {
    if (currentRole === 'dweller') {
      onShowToast?.('Observer Mode: Switch to Aspirant in Settings to claim or complete tasks.');
      return;
    }
    if (!isCompetition(item.title) || currentRole === 'steward' || currentRole === 'teacher' || currentRole === 'authority') {
      onCompleteCommitment(item);
      return;
    }

    const current = getPhase(item.id);
    if (current === 'registered') {
      setPhases((prev) => ({ ...prev, [item.id]: 'in_progress' }));
    } else if (current === 'in_progress') {
      setPhases((prev) => ({ ...prev, [item.id]: 'results_pending' }));
    } else if (current === 'results_pending') {
      onCompleteCommitment(item);
    }
  };

  const sortedActive = useMemo(() => {
    return [...activeItems].sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
  }, [activeItems]);

  const institutionList = useMemo(() => {
    const map: Record<string, number> = {};
    commitments.forEach((c) => {
      const inst = c.sourceInstitution || 'Springfield Sovereign';
      map[inst] = (map[inst] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [commitments]);

  const currentScore = profile?.score ?? 640;
  const currentStreak = profile?.dailyStreak ?? 6;

  // --- ROLE-EXCLUSIVE CONSOLE RENDERER ---
  // Strictly isolated: Each role ONLY renders its own console, never another role's!
  const renderRoleExclusiveConsole = () => {
    if (currentRole === 'steward') {
      return (
        <div className="w-full">
          <StewardsConsole
            clubName="Robotics & Debating Societies"
            wikiPages={wikiPages}
            pipeline={pipeline}
            onAddTask={(t) => {
              onAddTask(t);
              onShowToast?.('Steward commitment broadcasted to student radar feeds ✓');
            }}
            onAddWikiPage={onAddWikiPage}
            onNominateSuccessor={(name, date) => {
              onNominateSuccessor(name, date);
              onShowToast?.(`Succession protocol inscribed for ${name} (${date}) ✓`);
            }}
            isDark={true}
          />
        </div>
      );
    }

    if (currentRole === 'teacher') {
      return (
        <div className="w-full">
          <TeacherConsole
            facultyName={profile?.name || 'Prof. M. Kaykobad'}
            department={profile?.institution || 'Dept. of Physics & CS'}
            onAddTask={onAddTask}
            onShowToast={onShowToast}
            isDark={true}
          />
        </div>
      );
    }

    if (currentRole === 'authority') {
      return (
        <div className="w-full">
          <AuthorityConsole
            authorityName={profile?.name || 'Dr. Farhana Yasmin'}
            titleRole={profile?.section || 'Principal & Institutional Board · Springfield Sovereign Node'}
            onAddTask={onAddTask}
            onAddNotice={onAddNotice}
            onShowToast={onShowToast}
            isDark={true}
          />
        </div>
      );
    }

    if (currentRole === 'loyal_core') {
      return (
        <div
          id="core-wiki-studio-console"
          className="w-full rounded-[20px] bg-[var(--card)] border border-[#10B981]/40 shadow-lg overflow-hidden my-4 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--rule-default)]/60">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#10B981] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Loyal Core Exclusive · Club Wiki & Retrospective Studio</span>
              </span>
              <h2 className="text-[19px] font-extrabold text-[var(--text-primary)] mt-1">
                Institutional Memory & Playbook Authorship Desk
              </h2>
              <p className="text-[12.5px] text-[var(--text-secondary)]">
                Core members edit club playbooks and inscribe retrospectives (Delegation requires Steward clearance).
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[11px] font-extrabold self-start sm:self-center">
              {wikiPages.length} Active Playbooks
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!coreWikiTitle.trim()) return;
              onAddWikiPage({
                title: coreWikiTitle.trim(),
                type: 'Playbook',
                visibility: 'core',
                content: coreWikiContent.trim() || `# ${coreWikiTitle.trim()}\n\nAuthored by Tahmid Hasan (Core Editor).`,
              });
              setCoreWikiSaved(true);
              setCoreWikiTitle('');
              setCoreWikiContent('');
              onShowToast?.('New Club Playbook inscribed into permanent Wiki ✓');
              setTimeout(() => setCoreWikiSaved(false), 3000);
            }}
            className="mt-4 flex flex-col gap-3"
          >
            {coreWikiSaved && (
              <div className="p-2.5 rounded-[10px] bg-[#10B981]/15 text-[#10B981] text-[12.5px] font-bold">
                ✓ Playbook revision saved to Robotics & Debating Wiki!
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                value={coreWikiTitle}
                onChange={(e) => setCoreWikiTitle(e.target.value)}
                placeholder="Playbook or Retrospective Title (e.g. PID Sensor Calibration v8)"
                className="sm:col-span-2 p-2.5 rounded-[10px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13px] text-[var(--text-primary)]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-[10px] bg-[#10B981] text-white text-[12.5px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Inscribe Playbook</span>
              </button>
            </div>
            <textarea
              value={coreWikiContent}
              onChange={(e) => setCoreWikiContent(e.target.value)}
              rows={2}
              placeholder="Document calibration steps, what went well, or equipment locker instructions for incoming trialists..."
              className="w-full p-2.5 rounded-[10px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13px] text-[var(--text-primary)]"
            />
          </form>
        </div>
      );
    }

    if (currentRole === 'dweller') {
      return (
        <div
          id="dweller-observer-console"
          className="w-full rounded-[20px] bg-[var(--card)] border border-[#64748B]/40 shadow-md overflow-hidden my-4 p-4 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-[12px] bg-[#64748B]/20 text-[#94A3B8] shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#94A3B8] block">
                Dweller Stage · Read-Only Observer Deck
              </span>
              <h2 className="text-[18px] font-extrabold text-[var(--text-primary)] mt-0.5">
                Zero-Pressure Public Charter & Fixture Observation
              </h2>
              <p className="text-[12.5px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                As a Dweller (Observer Stage), you can freely inspect public club charters, watch campus exhibitions, and browse timetables with zero notification pings or task-claiming pressure.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (currentRole === 'alumni') {
      return (
        <div
          id="alumni-archive-console"
          className="w-full rounded-[20px] bg-[var(--card)] border border-[#8B5CF6]/40 shadow-md overflow-hidden my-4 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#A78BFA] block">
                Alumni Sovereign Fellow · Permanent Seat
              </span>
              <h2 className="text-[18px] font-extrabold text-[var(--text-primary)] mt-0.5">
                Cryptographic Ledger Seal & Historical Lineage Archive
              </h2>
              <p className="text-[12.5px] text-[var(--text-secondary)] mt-1">
                48 witnessed acts from Class of 2024 preserved with SHA-256 verification. Read-only access to 2024–2026 club playbooks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenLedger?.()}
              className="px-4 py-2 rounded-[12px] bg-[#8B5CF6] text-white text-[12.5px] font-extrabold shrink-0 cursor-pointer self-start sm:self-center"
            >
              Verify SHA-256 Ledger Pack &rarr;
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  // 1. Role-Specific Sovereign Pulse Metrics
  const renderSovereignPulse = () => {
    const p = roleConfig.pulseTiles;
    const containerClasses = isMobile
      ? 'flex overflow-x-auto gap-3 mb-4 no-scrollbar pb-1 snap-x snap-mandatory w-full'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6 w-full';

    const tileClasses = isMobile
      ? 'w-[84vw] max-w-[310px] shrink-0 snap-center p-4 rounded-[18px] bg-[var(--card)] border border-[rgba(255,255,255,0.07)] shadow-md flex flex-col justify-between cursor-pointer'
      : 'p-4 sm:p-5 rounded-[20px] bg-[var(--card)] border border-[rgba(255,255,255,0.07)] shadow-md flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out cursor-pointer';

    return (
      <div className={containerClasses}>
        {/* Tile 1 */}
        <div className={tileClasses} onClick={onOpenProfile} title={p.tile1.label}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{p.tile1.label}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
              {p.tile1.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-[var(--text-primary)]">
              {currentRole === 'aspirant' || currentRole === 'loyal_core' || currentRole === 'member'
                ? currentScore
                : p.tile1.value}
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-[var(--accent)]">
              {p.tile1.unit}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] ml-auto font-medium">
              {p.tile1.subRight}
            </span>
          </div>

          <div className="w-full bg-[var(--track)] h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-[var(--orange)] to-[var(--accent)] h-full rounded-full transition-all duration-500"
              style={{ width: `${p.tile1.progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] text-[var(--text-secondary)] font-medium pt-1">
            <span>{p.tile1.footerLeft}</span>
            <span className="text-[var(--accent)] font-bold flex items-center gap-0.5">
              {p.tile1.footerRight}
            </span>
          </div>
        </div>

        {/* Tile 2 */}
        <div className={tileClasses} onClick={onOpenProfile} title={p.tile2.label}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20" />
              <span>{p.tile2.label}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
              {p.tile2.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-[var(--text-primary)]">
              {currentRole === 'aspirant' || currentRole === 'loyal_core' || currentRole === 'member'
                ? currentStreak
                : p.tile2.value}
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-[#F59E0B]">
              {p.tile2.unit}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] ml-auto font-mono">
              {p.tile2.subRight}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2 py-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
              const isActive = idx < Math.min(7, currentStreak);
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-full h-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-[#F59E0B]' : 'bg-[var(--track)]'
                    }`}
                  />
                  <span className="text-[9.5px] font-bold text-[var(--text-muted)]">
                    {day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] text-[var(--text-secondary)] font-medium pt-0.5">
            <span>{p.tile2.footerLeft}</span>
            <span className="text-[#F59E0B] font-bold">{p.tile2.footerRight}</span>
          </div>
        </div>

        {/* Tile 3 */}
        <div
          className={
            isMobile
              ? 'w-[84vw] max-w-[310px] shrink-0 snap-center p-4 rounded-[18px] bg-[var(--card)] border border-[var(--rule-default)]/70 shadow-md flex flex-col justify-between'
              : 'p-4 sm:p-5 rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)]/70 shadow-md flex flex-col justify-between sm:col-span-2 lg:col-span-1'
          }
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{p.tile3.label}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {p.tile3.badge}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-1.5 text-center">
            <div className="p-2 rounded-[12px] bg-[var(--track)] border border-[var(--rule-default)]/60">
              <span className="text-[18px] sm:text-[20px] font-black text-[#10B981] block leading-tight">
                {p.tile3.stat1.val}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {p.tile3.stat1.label}
              </span>
            </div>
            <div className="p-2 rounded-[12px] bg-[var(--track)] border border-[var(--rule-default)]/60">
              <span className="text-[18px] sm:text-[20px] font-black text-[#F59E0B] block leading-tight">
                {p.tile3.stat2.val}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {p.tile3.stat2.label}
              </span>
            </div>
            <div className="p-2 rounded-[12px] bg-[var(--track)] border border-[var(--rule-default)]/60">
              <span className="text-[18px] sm:text-[20px] font-black text-[#0284C7] block leading-tight">
                {p.tile3.stat3.val}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {p.tile3.stat3.label}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-[11.5px] text-[var(--text-secondary)] font-medium pt-1">
            <span className="truncate">{p.tile3.footerLeft}</span>
            <span className="text-[#10B981] font-bold flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" /> {p.tile3.footerRight}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // 2. Role-Specific Active Obligations / Mandates Section
  const getActiveSectionHeading = () => {
    switch (currentRole) {
      case 'steward':
        return 'Executive Delegation & Witnessing Queue';
      case 'teacher':
        return 'Faculty Supervision & Verification Queue';
      case 'authority':
        return 'Institutional Governance Mandates';
      case 'loyal_core':
        return 'Core Editorial & Mentorship Commitments';
      case 'dweller':
        return 'Public Exhibitions (Read-Only Mode)';
      case 'alumni':
        return 'Alumni Mentorship & Archival Reviews';
      default:
        return 'Active Trialist Obligations';
    }
  };

  const getActionButtonLabel = (item: Commitment, isComp: boolean, compPhase: string) => {
    if (currentRole === 'steward') return 'Witness & Sign';
    if (currentRole === 'teacher') return 'Verify & Stamp';
    if (currentRole === 'authority') return 'Ratify Decree';
    if (currentRole === 'alumni') return 'Endorse Review';
    if (!isComp) return 'Complete';
    if (compPhase === 'registered') return 'Check In';
    if (compPhase === 'in_progress') return 'Submit';
    return 'Claim';
  };

  const renderActiveSection = () => (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] sm:text-[16px] font-bold text-[var(--text-primary)] tracking-tight">
            {getActiveSectionHeading()}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-[#10B981] text-white">
            {activeItems.length} Active
          </span>
        </div>
        <span className="text-[11.5px] sm:text-[12px] text-[var(--text-muted)] font-medium">
          Sorted by absolute deadline
        </span>
      </div>

      {sortedActive.length > 0 ? (
        sortedActive.map((item) => {
          const status = calculateTimeStatus(item.deadline);
          const isComp = isCompetition(item.title);
          const compPhase = getPhase(item.id);

          return (
            <div
              key={item.id}
              id={`commitment-row-${item.id}`}
              className="commitment-card w-full p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[rgba(255,255,255,0.07)] shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <div
                className="commitment-header flex items-start gap-3 sm:gap-3.5 flex-1 cursor-pointer min-w-0"
                onClick={() => onSelectCommitment(item)}
              >
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="commitment-thumb w-12 h-12 sm:w-16 sm:h-16 rounded-[12px] sm:rounded-[14px] object-cover shrink-0 border border-white/10 shadow-xs group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="commitment-body min-w-0 flex-1">
                  <div className="commitment-badges flex items-center gap-1.5 flex-wrap mb-1">
                    <span
                      className={`text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-[6px] font-bold uppercase tracking-wider ${
                        item.type === 'delegated'
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'bg-[var(--track)] text-[var(--text-secondary)] border border-[var(--rule)]'
                      }`}
                    >
                      {currentRole === 'authority'
                        ? 'Governance Mandate'
                        : currentRole === 'teacher'
                        ? 'Faculty Verification'
                        : currentRole === 'steward'
                        ? 'Executive Duty'
                        : item.type === 'delegated'
                        ? 'Witnessed Task'
                        : 'Self-Chosen'}
                    </span>

                    <span className="text-[11px] sm:text-[12px] text-[var(--text-muted)] font-medium truncate">
                      {item.sourceInstitution}
                    </span>
                  </div>

                  <h3 className="commitment-title text-[15px] sm:text-[17px] font-bold text-[var(--text-primary)] leading-[1.3] group-hover:text-[var(--accent)] transition-colors break-words">
                    {item.title}
                  </h3>

                  {item.witnessName && (
                    <p className="text-[11.5px] sm:text-[12px] text-[var(--text-secondary)] mt-0.5 break-words">
                      Co-Signatory / Witness: <strong className="text-[var(--text-primary)]">{item.witnessName}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Deadline Visualizer & Action Button */}
              <div className="commitment-actions w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[var(--rule-default)]/40 mt-0.5 sm:mt-0 shrink-0">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <CountdownRing deadlineISO={item.deadline} size="sm" isEngaged={true} />
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold leading-tight">
                      Deadline
                    </span>
                    <span
                      className={`tabular-nums font-bold leading-tight ${
                        status.isCritical ? 'text-[13.5px] sm:text-[14px]' : 'text-[12.5px] sm:text-[13px]'
                      }`}
                      style={{
                        color: status.isMissed
                          ? 'var(--text-muted)'
                          : status.isRed
                          ? 'var(--urgent)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {currentRole !== 'dweller' && (
                  <button
                    id={`complete-btn-${item.id}`}
                    type="button"
                    onClick={() => handleAdvancePhaseOrComplete(item)}
                    className="pill pill-sm success font-bold text-[12px] px-3.5 py-1.5 sm:px-3 sm:py-1 min-h-[34px] flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{getActionButtonLabel(item, isComp, compPhase)}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-6 sm:p-8 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)] text-center w-full">
          <p className="text-[13.5px] sm:text-[14px] text-[var(--text-secondary)] font-medium">
            {currentRole === 'dweller'
              ? 'Observer Stage has zero active task obligations — browse Watched Public Exhibitions below.'
              : 'All active obligations fulfilled for your current role.'}
          </p>
        </div>
      )}
    </div>
  );

  // 3. Watched Queue Section
  const renderWatchedSection = () => (
    <div className="flex flex-col gap-3 pt-1 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] sm:text-[16px] font-bold text-[var(--text-primary)] tracking-tight">
            {currentRole === 'dweller' ? 'Observed Public Fixtures' : 'Watched Queue'}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-[#F59E0B] text-black">
            {watchedItems.length} Observed
          </span>
        </div>
        <span className="text-[11.5px] sm:text-[12px] text-[var(--text-muted)] font-medium">
          Silent observation mode
        </span>
      </div>

      {watchedItems.length > 0 ? (
        watchedItems.map((item) => (
          <div
            key={item.id}
            className="w-full p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[rgba(255,255,255,0.07)] shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onSelectCommitment(item)}>
              <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
                Observing · {item.sourceInstitution}
              </span>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[var(--text-primary)] mt-0.5 break-words sm:truncate group-hover:text-[#F59E0B] transition-colors">
                {item.title}
              </h3>
              <p className="text-[11.5px] sm:text-[12px] text-[var(--text-muted)] mt-0.5">
                Target Date: {new Date(item.deadline).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[var(--rule-default)]/40 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onUnwatchCommitment(item.id)}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-[10px] text-[12px] font-medium border border-[var(--rule-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-center"
              >
                Remove
              </button>
              {currentRole !== 'dweller' && (
                <button
                  type="button"
                  onClick={() => {
                    item.status = 'active';
                    handleSetSection('active');
                  }}
                  className="flex-1 sm:flex-none px-4 py-1.5 rounded-[10px] bg-[#F59E0B] text-black text-[12px] font-extrabold hover:opacity-95 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
                >
                  Activate Now
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 sm:p-8 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)] text-center w-full">
          <p className="text-[13.5px] sm:text-[14px] text-[var(--text-muted)]">
            No watched items in queue.
          </p>
        </div>
      )}
    </div>
  );

  // 4. Past Fulfilled Archive Section
  const renderPastSection = () => (
    <div className="flex flex-col gap-3 pt-1 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] sm:text-[16px] font-bold text-[var(--text-primary)] tracking-tight">
            {currentRole === 'authority'
              ? 'Ratified Decrees & Governance Archive'
              : currentRole === 'teacher'
              ? 'Stamped Academic & Faculty Archive'
              : 'Past Fulfilled Archive'}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-extrabold bg-[#0284C7] text-white">
            {pastItems.length} Inscribed
          </span>
        </div>
        <span className="text-[11.5px] sm:text-[12px] text-[var(--text-muted)] font-medium">
          Witnessed proof ledger
        </span>
      </div>

      {pastItems.length > 0 ? (
        pastItems.map((item) => {
          const isMissed = item.status === 'missed';
          return (
            <div
              key={item.id}
              className={`w-full p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border shadow-md transition-all ${
                isMissed
                  ? 'border-dashed border-[var(--text-muted)]/50 opacity-75'
                  : 'border-[var(--rule-default)]/70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-[6px] font-bold uppercase tracking-wider ${
                        isMissed
                          ? 'bg-[var(--text-muted)]/15 text-[var(--text-muted)]'
                          : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      }`}
                    >
                      {isMissed ? 'Missed Deadline' : 'Witnessed Completion'}
                    </span>
                    <span className="text-[11px] sm:text-[11.5px] text-[var(--text-muted)] truncate">
                      {item.sourceInstitution}
                    </span>
                  </div>

                  <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[var(--text-primary)] break-words">
                    {item.title}
                  </h4>

                  {item.witnessName && (
                    <p className="text-[11.5px] sm:text-[12px] text-[var(--text-secondary)] mt-0.5 break-words">
                      Witness Verified: <strong className="text-[var(--text-primary)]">{item.witnessName}</strong>
                    </p>
                  )}

                  {item.retrospective && (
                    <div className="mt-2.5 p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[11.5px] sm:text-[12px] text-[var(--text-secondary)]">
                      <span className="font-bold text-[var(--text-primary)] block mb-0.5">
                        Archived Knowledge Retrospective:
                      </span>
                      <p className="italic">&ldquo;{item.retrospective.wentWell}&rdquo;</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--rule-default)]/40 sm:border-none text-right shrink-0">
                  <span className="sm:hidden text-[11px] text-[var(--text-muted)] font-medium">Status</span>
                  {isMissed ? (
                    <span className="text-[11.5px] sm:text-[12px] font-medium text-[var(--text-muted)] border-b border-dashed border-[var(--text-muted)] pb-0.5">
                      Uncompleted
                    </span>
                  ) : (
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Inscribed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-6 sm:p-8 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)] text-center w-full">
          <p className="text-[13.5px] sm:text-[14px] text-[var(--text-muted)]">
            No historical archived commitments yet.
          </p>
        </div>
      )}
    </div>
  );

  // 5. Secondary Bento Rail
  const renderRightRail = () => (
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
      {/* Bento Card 1: Urgency & Deadline Pressure */}
      <div className="p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)]/70 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--rule-default)]/50 mb-3">
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>
              {currentRole === 'authority'
                ? 'Mandate Priority'
                : currentRole === 'teacher'
                ? 'Faculty Queue Pressure'
                : 'Deadline Pressure'}
            </span>
          </span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            {activeItems.length} Total
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 font-medium text-[var(--text)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              Critical (&le; 24h)
            </span>
            <span className="font-extrabold text-[#EF4444] tabular-nums">
              {urgencyStats.critical}
            </span>
          </div>

          <div className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 font-medium text-[var(--text)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              Impending (&le; 72h)
            </span>
            <span className="font-extrabold text-[#F59E0B] tabular-nums">
              {urgencyStats.impending}
            </span>
          </div>

          <div className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 font-medium text-[var(--text)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              On Track (&gt; 72h)
            </span>
            <span className="font-extrabold text-[#10B981] tabular-nums">
              {urgencyStats.relaxed}
            </span>
          </div>
        </div>
      </div>

      {/* Bento Card 2: Role Exclusive Shortcut */}
      {hasExclusiveConsole && (
        <div
          className="p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border shadow-md"
          style={{ borderColor: `${roleConfig.exclusiveFeature.bg}66` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: roleConfig.exclusiveFeature.bg }}
            >
              <span>{roleConfig.exclusiveFeature.icon}</span>
              <span>Role-Exclusive Console</span>
            </span>
          </div>
          <h4 className="text-[14.5px] font-bold text-[var(--text-primary)] mb-1">
            {roleConfig.exclusiveFeature.label}
          </h4>
          <p className="text-[12px] text-[var(--text-secondary)] mb-3 leading-snug">
            {roleConfig.exclusiveFeature.description}
          </p>
          <button
            type="button"
            onClick={() => handleSetSection('console')}
            className="w-full py-2.5 rounded-[12px] font-extrabold text-[12px] shadow-xs hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: roleConfig.exclusiveFeature.bg,
              color: roleConfig.exclusiveFeature.color,
            }}
          >
            <span>Focus {roleConfig.exclusiveFeature.shortLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bento Card 3: Top Sourcing Institutions */}
      <div className="p-3.5 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)]/70 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--rule-default)]/50 mb-3">
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Active Jurisdiction</span>
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            Verified Units
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {institutionList.map((inst) => {
            const tagStyle = getSolidTagStyle(inst.name);
            return (
              <div
                key={inst.name}
                className="flex items-center justify-between p-2 rounded-[12px] bg-[var(--track)] border border-[var(--rule-default)]/60 text-[12px]"
              >
                <span className="font-semibold text-[var(--text-primary)] truncate max-w-[140px] sm:max-w-[190px]">
                  {inst.name}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                  style={{
                    backgroundColor: tagStyle.bg,
                    color: tagStyle.text,
                  }}
                >
                  {inst.count} Items
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      <div className="main no-scrollbar" id="boardMain">
        <div id="board-view" className="w-full max-w-7xl mx-auto pt-2 sm:pt-4 pb-28 sm:pb-20 lg:pb-12 px-1 sm:px-4 lg:px-6">
          {/* Header Title & Role Badge */}
          <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[20px] sm:text-[28px] font-extrabold text-[var(--text-primary)] tracking-tight">
                  {roleConfig.boardHeader.title}
                </h1>
                <span
                  className="px-2.5 py-0.5 rounded-[8px] text-[10.5px] sm:text-[11.5px] font-extrabold shrink-0"
                  style={{
                    backgroundColor: roleConfig.exclusiveFeature.bg,
                    color: roleConfig.exclusiveFeature.color,
                  }}
                >
                  {roleConfig.boardHeader.badge}
                </span>
              </div>
              <p className="text-[12px] sm:text-[14px] text-[var(--text-secondary)] mt-0.5 line-clamp-2 sm:line-clamp-none">
                {roleConfig.boardHeader.subtitle}
              </p>
            </div>

            <button
              id="board-unconventional-btn"
              type="button"
              onClick={() => onOpenUnconventionalFeatures?.()}
              className="pill pill-sm flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer shadow-xs"
              title="Commitment Invariants & Rules"
              aria-label="Commitment Invariants"
            >
              <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9.5px] font-bold font-serif italic leading-none">
                i
              </div>
              <span className="hidden sm:inline">Invariants</span>
            </button>
          </div>

          {/* 1. ROLE-CALIBRATED SOVEREIGN PULSE METRICS */}
          {renderSovereignPulse()}

          {/* 2. UNIFIED QUICK FILTER RIBBON (WITH EXCLUSIVE CONSOLE TAB) */}
          <div className="chips mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5" id="board-tabs">
            <button
              type="button"
              id="board-tab-all"
              onClick={() => handleSetSection('all')}
              className={`chip font-bold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 ${boardSection === 'all' ? 'on' : ''}`}
              style={
                boardSection === 'all'
                  ? { background: '#3B82F6', borderColor: '#2563EB', color: '#FFFFFF', fontWeight: 800 }
                  : undefined
              }
            >
              <Layers className="w-3.5 h-3.5 mr-1" />
              <span className="sm:hidden">Unified</span>
              <span className="hidden sm:inline">Unified Board</span> ({commitments.length})
            </button>

            {hasExclusiveConsole && (
              <button
                type="button"
                id="board-tab-console"
                onClick={() => handleSetSection('console')}
                className={`chip font-extrabold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 flex items-center gap-1.5 ${
                  boardSection === 'console' ? 'on' : ''
                }`}
                style={
                  boardSection === 'console'
                    ? {
                        background: roleConfig.exclusiveFeature.bg,
                        borderColor: roleConfig.exclusiveFeature.bg,
                        color: roleConfig.exclusiveFeature.color,
                        fontWeight: 800,
                      }
                    : undefined
                }
              >
                <span>{roleConfig.exclusiveFeature.icon}</span>
                <span>{roleConfig.exclusiveFeature.shortLabel}</span>
              </button>
            )}

            <button
              type="button"
              id="board-tab-active"
              onClick={() => handleSetSection('active')}
              className={`chip font-bold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 ${boardSection === 'active' ? 'on' : ''}`}
              style={
                boardSection === 'active'
                  ? { background: '#10B981', borderColor: '#059669', color: '#FFFFFF', fontWeight: 800 }
                  : undefined
              }
            >
              <span className="sm:hidden">Active</span>
              <span className="hidden sm:inline">
                {currentRole === 'authority'
                  ? 'Mandates'
                  : currentRole === 'teacher'
                  ? 'Faculty Queue'
                  : currentRole === 'steward'
                  ? 'Witness Queue'
                  : 'Active Obligations'}
              </span>{' '}
              ({activeItems.length})
            </button>

            <button
              type="button"
              id="board-tab-watched"
              onClick={() => handleSetSection('watched')}
              className={`chip font-bold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 ${boardSection === 'watched' ? 'on' : ''}`}
              style={
                boardSection === 'watched'
                  ? { background: '#F59E0B', borderColor: '#D97706', color: '#0F172A', fontWeight: 800 }
                  : undefined
              }
            >
              <span className="sm:hidden">Watched</span>
              <span className="hidden sm:inline">Watched Queue</span> ({watchedItems.length})
            </button>

            <button
              type="button"
              id="board-tab-past"
              onClick={() => handleSetSection('past')}
              className={`chip font-bold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 ${boardSection === 'past' ? 'on' : ''}`}
              style={
                boardSection === 'past'
                  ? { background: '#0284C7', borderColor: '#0369A1', color: '#FFFFFF', fontWeight: 800 }
                  : undefined
              }
            >
              <span className="sm:hidden">Archive</span>
              <span className="hidden sm:inline">Past Archive</span> ({pastItems.length})
            </button>

            <button
              type="button"
              id="board-tab-analytics"
              onClick={() => handleSetSection('analytics')}
              className={`chip flex items-center gap-1.5 font-bold text-[11.5px] sm:text-[12.5px] px-3 sm:px-3.5 py-1.5 ${boardSection === 'analytics' ? 'on' : ''}`}
              style={
                boardSection === 'analytics'
                  ? { background: '#8B5CF6', borderColor: '#7C3AED', color: '#FFFFFF', fontWeight: 800 }
                  : undefined
              }
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="sm:hidden">Analytics</span>
              <span className="hidden sm:inline">Analytics</span>
            </button>
          </div>

          {/* 3. MASTER STAGE (ROLE-INTEGRATED CONSOLE + COMMITMENTS) */}
          {boardSection === 'analytics' ? (
            <TaskAnalytics
              commitments={commitments}
              score={currentScore}
              dailyStreak={currentStreak}
              onOpenProfile={onOpenProfile}
              isDark={true}
            />
          ) : boardSection === 'console' ? (
            <div className="flex flex-col gap-5 w-full">
              {renderRoleExclusiveConsole()}
              {renderActiveSection()}
            </div>
          ) : isMobile ? (
            <div className="flex flex-col gap-5 w-full">
              {/* Role-exclusive console integrated directly at the top of Unified Board for Steward, Teacher, Authority, Core, Dweller, Alumni */}
              {boardSection === 'all' && hasExclusiveConsole && renderRoleExclusiveConsole()}
              {(boardSection === 'all' || boardSection === 'active') && renderActiveSection()}
              {(boardSection === 'all' || boardSection === 'watched') && renderWatchedSection()}
              {(boardSection === 'all' || boardSection === 'past') && renderPastSection()}

              {boardSection === 'all' && (
                <div className="flex flex-col gap-3.5 mt-2 pt-4 border-t border-white/8 w-full">
                  <span className="text-[12.5px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] px-1">
                    Live Insights &amp; Jurisdiction
                  </span>
                  {renderRightRail()}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Role-exclusive console integrated directly into the Commitment Board */}
                {boardSection === 'all' && hasExclusiveConsole && renderRoleExclusiveConsole()}
                {(boardSection === 'all' || boardSection === 'active') && renderActiveSection()}
                {(boardSection === 'all' || boardSection === 'watched') && renderWatchedSection()}
                {(boardSection === 'all' || boardSection === 'past') && renderPastSection()}
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                {renderRightRail()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
