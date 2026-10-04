import React, { useState } from 'react';
import {
  Building2,
  Send,
  ShieldCheck,
  Scale,
  Calendar,
  Lock,
  Check,
  AlertTriangle,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { SteleItem, NoticeItem } from '../types';

interface AuthorityConsoleProps {
  authorityName?: string;
  titleRole?: string;
  onAddTask: (task: Partial<SteleItem>) => void;
  onAddNotice?: (notice: NoticeItem) => void;
  onShowToast?: (msg: string) => void;
  isDark?: boolean;
}

interface CharterRatificationItem {
  id: string;
  clubOrDept: string;
  title: string;
  submittedBy: string;
  budgetOrScope: string;
  status: 'pending' | 'ratified' | 'revision_requested';
  hash?: string;
}

export const AuthorityConsole: React.FC<AuthorityConsoleProps> = ({
  authorityName = 'Dr. Farhana Yasmin',
  titleRole = 'Principal & Institutional Board · Springfield Sovereign Node',
  onAddTask,
  onAddNotice,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    'broadcast' | 'charters' | 'fairness' | 'almanac' | 'firewall'
  >('broadcast');

  // Tab 1: Official Circular Broadcast state
  const [circularTitle, setCircularTitle] = useState('');
  const [circularScope, setCircularScope] = useState<'institutional' | 'national'>('institutional');
  const [circularUrgent, setCircularUrgent] = useState(false);
  const [circularSummary, setCircularSummary] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Tab 2: Charter & Budget Ratification state
  const [charters, setCharters] = useState<CharterRatificationItem[]>([
    {
      id: 'chr-1',
      clubOrDept: 'Robotics & Automation Society',
      title: 'Q3 Optical Encoder Wheel Sets & Bay 3 LiPo Safety Vault Requisition',
      submittedBy: 'Nafis Ahmed (Lead Steward) · Co-signed by Mr. Rahman',
      budgetOrScope: 'BDT 85,000 · Capital Lab Grant',
      status: 'pending',
    },
    {
      id: 'chr-2',
      clubOrDept: 'Springfield Debating Union',
      title: 'Inter-College Parliamentary Debate Delegation & Adjudicator Travel Charter',
      submittedBy: 'Zareen Tasnim (Lead Steward)',
      budgetOrScope: 'BDT 60,000 · Division Representation',
      status: 'pending',
    },
    {
      id: 'chr-3',
      clubOrDept: 'Robotics Society Succession Protocol',
      title: '2026 Executive Steward Handover: Nafis Ahmed → Tahmid Hasan',
      submittedBy: 'Robotics Core Quorum (88% Vote Verified)',
      budgetOrScope: 'Constitutional Charter §27',
      status: 'ratified',
      hash: '0x9f2c...88a1',
    },
  ]);

  // Tab 3: Fairness Audit state
  const [fairnessAudits, setFairnessAudits] = useState([
    {
      id: 'fa-1',
      title: 'Campus Solar Energy Youth Audit',
      issuer: 'Eco-Stewardship Initiative',
      dropTime: '23:45 PM (Off-Hours Violation)',
      reach: 41,
      suppressed: true,
      note: 'DC-2 automatically suppressed urgency pulsing because >50% of students were asleep at drop time.',
    },
    {
      id: 'fa-2',
      title: 'Robotics Olympiad — Regional Qualifiers',
      issuer: 'Robotics Society · Mr. Rahman',
      dropTime: '10:15 AM (Weekday Window)',
      reach: 94,
      suppressed: false,
      note: '226/240 enrolled STEM students opened notice within 4 hours. Full countdown ring active.',
    },
    {
      id: 'fa-3',
      title: 'Section 10-B Physics Lab Assessment Portfolio',
      issuer: 'Academic Council · Dr. S. K. Sen',
      dropTime: '09:00 AM (Weekday Window)',
      reach: 96,
      suppressed: false,
      note: '43/45 section students verified receipt.',
    },
  ]);

  // Tab 4: Almanac Decrees state
  const [decrees, setDecrees] = useState([
    {
      id: 'dec-1',
      title: 'Central Science Wing Cleanroom & Air Filter Calibration',
      dates: 'Sept 18 – Sept 20, 2025',
      impact: 'Workshop B remains open; Main Cleanroom closed for particulate testing.',
      active: true,
    },
    {
      id: 'dec-2',
      title: 'Autumn Reading Week & Mid-Term Preparation Recess',
      dates: 'Oct 15 – Oct 19, 2025',
      impact: 'Zero club deadlines or mandatory fixtures permitted during recess window.',
      active: true,
    },
  ]);
  const [newDecreeTitle, setNewDecreeTitle] = useState('');
  const [newDecreeDates, setNewDecreeDates] = useState('');

  const pendingChartersCount = charters.filter((c) => c.status === 'pending').length;

  const handleIssueCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularTitle.trim()) return;

    const newNotice: NoticeItem = {
      id: `notice-auth-${Date.now()}`,
      title: circularTitle.trim(),
      issuer: `${authorityName} (Principal Office)`,
      scope: circularScope,
      timestamp: 'Just now',
      summary:
        circularSummary.trim() ||
        'Official institutional circular signed by Springfield Sovereign Node Authority.',
      isUrgent: circularUrgent,
      reachPercentage: 100,
    };

    onAddNotice?.(newNotice);
    onAddTask({
      title: `[Official Circular] ${circularTitle.trim()}`,
      sourceInstitution: 'Springfield High Secretariat',
      sourceSpace: 'Office of the Principal',
      stewardName: authorityName,
      provenance: 'Official',
      scope: circularScope === 'national' ? 'national' : 'district',
      deadline: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      originalMessage:
        circularSummary.trim() ||
        'Official administrative decree broadcasted to all 1,420 students and faculty.',
      tags: ['Official', 'Governance', 'Circular'],
      isInstitutionOnly: circularScope === 'institutional',
      reachCount: 1420,
      unseenCount: 0,
    });

    setBroadcastSuccess(true);
    setCircularTitle('');
    setCircularSummary('');
    onShowToast?.('Official Institutional Circular signed & broadcasted to 1,420 students ✓');
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  const handleRatifyCharter = (id: string) => {
    setCharters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus = c.status === 'ratified' ? 'pending' : 'ratified';
        onShowToast?.(
          nextStatus === 'ratified'
            ? `Ratified ${c.clubOrDept} Charter & Grant with Principal Seal ✓`
            : `Reverted ${c.clubOrDept} ratification to pending`
        );
        return {
          ...c,
          status: nextStatus,
          hash:
            nextStatus === 'ratified'
              ? `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`
              : undefined,
        };
      })
    );
  };

  const handleAddDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecreeTitle.trim()) return;
    setDecrees((prev) => [
      {
        id: `dec-${Date.now()}`,
        title: newDecreeTitle.trim(),
        dates: newDecreeDates.trim() || 'Effective Immediately',
        impact: 'Synced to Unified Academic Almanac across all student & faculty devices.',
        active: true,
      },
      ...prev,
    ]);
    setNewDecreeTitle('');
    setNewDecreeDates('');
    onShowToast?.('Almanac Decree inscribed and synced to Campus Calendar ✓');
  };

  const tabs: {
    id: typeof activeTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: 'broadcast', label: 'Official Broadcast', icon: <Send className="w-4 h-4" /> },
    { id: 'charters', label: 'Charter & Budgets', icon: <FileCheck className="w-4 h-4" />, badge: pendingChartersCount },
    { id: 'fairness', label: 'Fairness Audit (DC-1/2)', icon: <Scale className="w-4 h-4" /> },
    { id: 'almanac', label: 'Almanac Decrees', icon: <Calendar className="w-4 h-4" /> },
    { id: 'firewall', label: 'Node & Firewall', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div
      id="authority-console-container"
      className="w-full rounded-[20px] bg-[var(--card)] border border-[#EF4444]/40 shadow-lg overflow-hidden my-4"
    >
      {/* Top Header */}
      <div className="p-4 sm:p-6 border-b border-[var(--rule-default)]/60 bg-[#EF4444]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#EF4444] flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Authority Console · Institutional Governance Board</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
              Tier 5 Root Signatory
            </span>
          </div>
          <h2 className="text-[19px] sm:text-[21px] font-extrabold text-[var(--text-primary)] mt-1">
            {authorityName} · Sovereign Node Directorate
          </h2>
          <p className="text-[12.5px] sm:text-[13px] text-[var(--text-secondary)]">
            {titleRole}
          </p>
        </div>

        {/* 5 Governance Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`authority-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-[12.5px] font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#EF4444] text-white shadow-xs'
                    : 'bg-[var(--track)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white/25 text-[10px] flex items-center justify-center font-extrabold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Official Circular Broadcast */}
      {activeTab === 'broadcast' && (
        <form onSubmit={handleIssueCircular} className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Issue Cryptographically Signed Institutional Circular
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Broadcast official school decrees, scholarship notices, or weather schedule advisories across all 1,420 student & faculty nodes.
            </p>
          </div>

          {broadcastSuccess && (
            <div className="p-3 rounded-[12px] bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-[13px] font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Official Circular signed with Principal Root Key & dispatched to all 1,420 nodes!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Circular Title / Decree Subject
              </label>
              <input
                type="text"
                value={circularTitle}
                onChange={(e) => setCircularTitle(e.target.value)}
                placeholder="e.g. District 4 STEM Grant Allocation & Autumn Recess Lab Hours"
                required
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Jurisdiction Scope
              </label>
              <select
                value={circularScope}
                onChange={(e) => setCircularScope(e.target.value as 'institutional' | 'national')}
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              >
                <option value="institutional">Springfield Sovereign Node (1,420 Enrolled)</option>
                <option value="national">District 4 & National Federation Relay</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Priority Level
              </label>
              <button
                type="button"
                onClick={() => setCircularUrgent(!circularUrgent)}
                className={`w-full p-2.5 rounded-[12px] border text-[13px] font-bold flex items-center justify-between cursor-pointer ${
                  circularUrgent
                    ? 'bg-[#EF4444]/15 border-[#EF4444] text-[#EF4444]'
                    : 'bg-[var(--canvas)] border-[var(--rule-default)] text-[var(--text-secondary)]'
                }`}
              >
                <span>{circularUrgent ? 'Priority Emergency Advisory' : 'Standard Official Circular'}</span>
                <span>{circularUrgent ? 'URGENT' : 'NORMAL'}</span>
              </button>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Verbatim Circular Directive
              </label>
              <textarea
                value={circularSummary}
                onChange={(e) => setCircularSummary(e.target.value)}
                rows={3}
                placeholder="Enter authoritative text, compliance dates, and departmental contacts..."
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[12px] bg-[#EF4444] text-white text-[13px] font-extrabold hover:opacity-90 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Sign & Broadcast Circular</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Charter & Budget Ratification */}
      {activeTab === 'charters' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Club Charter, Succession & Equipment Grant Ratifications
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Verify Steward succession handovers and release institutional treasury grants to student societies.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {charters.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EF4444]">
                      {item.clubOrDept}
                    </span>
                    <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-[6px] bg-[var(--track)] text-[var(--text-secondary)] border border-[var(--rule-default)]">
                      {item.budgetOrScope}
                    </span>
                    {item.status === 'ratified' && item.hash && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[6px] bg-[#10B981]/15 text-[#10B981] font-bold">
                        Seal: {item.hash}
                      </span>
                    )}
                  </div>
                  <h4 className="text-[14.5px] font-bold text-[var(--text-primary)] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                    Submitted by: {item.submittedBy}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRatifyCharter(item.id)}
                  className={`px-4 py-2 rounded-[11px] text-[12px] font-extrabold flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    item.status === 'ratified'
                      ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                      : 'bg-[#EF4444] text-white hover:opacity-90 shadow-xs'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{item.status === 'ratified' ? 'Ratified & Sealed ✓' : 'Ratify Grant'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: District Fairness Audit (DC-1 / DC-2) */}
      {activeTab === 'fairness' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Constitutional Fairness & Reach Audit (DC-1 & DC-2)
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Ensure no student is penalized for notices dropped outside waking academic hours or with &lt;50% cohort reach.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {fairnessAudits.map((fa) => (
              <div
                key={fa.id}
                className={`p-4 rounded-[14px] bg-[var(--canvas)] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  fa.suppressed ? 'border-[#EF4444]/40' : 'border-[var(--rule-default)]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">
                      {fa.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-[6px] text-[10.5px] font-extrabold ${
                        fa.suppressed
                          ? 'bg-[#EF4444]/15 text-[#EF4444]'
                          : 'bg-[#10B981]/15 text-[#10B981]'
                      }`}
                    >
                      {fa.reach}% Reach · {fa.dropTime}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                    {fa.note}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFairnessAudits((prev) =>
                      prev.map((item) =>
                        item.id === fa.id ? { ...item, suppressed: !item.suppressed } : item
                      )
                    );
                    onShowToast?.(
                      !fa.suppressed
                        ? `DC-2 Motion Suppression enforced on "${fa.title}"`
                        : `Restored standard countdown motion for "${fa.title}"`
                    );
                  }}
                  className={`px-3.5 py-2 rounded-[10px] text-[11.5px] font-extrabold shrink-0 cursor-pointer ${
                    fa.suppressed
                      ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                      : 'bg-[var(--track)] text-[var(--text-primary)] border border-[var(--rule-default)]'
                  }`}
                >
                  {fa.suppressed ? 'Motion Suppressed (DC-2)' : 'Fair Drop Verified'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Almanac & Holiday Decrees */}
      {activeTab === 'almanac' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Academic Almanac & Institutional Recess Decrees
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Inscribe official off-days and exam blackouts into the Unified Campus Calendar.
            </p>
          </div>

          <form onSubmit={handleAddDecree} className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newDecreeTitle}
              onChange={(e) => setNewDecreeTitle(e.target.value)}
              placeholder="Decree title (e.g. Victory Day National Holiday)"
              className="flex-1 p-2.5 rounded-[10px] bg-[var(--card)] border border-[var(--rule-default)] text-[13px] text-[var(--text-primary)]"
            />
            <input
              type="text"
              value={newDecreeDates}
              onChange={(e) => setNewDecreeDates(e.target.value)}
              placeholder="Dates (e.g. Dec 16, 2025)"
              className="sm:w-44 p-2.5 rounded-[10px] bg-[var(--card)] border border-[var(--rule-default)] text-[13px] text-[var(--text-primary)]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-[10px] bg-[#EF4444] text-white text-[12.5px] font-extrabold shrink-0 cursor-pointer"
            >
              Inscribe Decree
            </button>
          </form>

          <div className="flex flex-col gap-2.5">
            {decrees.map((dec) => (
              <div
                key={dec.id}
                className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#EF4444] block">
                    {dec.dates}
                  </span>
                  <h4 className="text-[14px] font-bold text-[var(--text-primary)]">
                    {dec.title}
                  </h4>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                    {dec.impact}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[11px] font-extrabold self-start sm:self-center shrink-0">
                  Synced to Calendar ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Node Sovereignty & Anti-Surveillance Firewall */}
      {activeTab === 'firewall' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="p-4 rounded-[16px] bg-[#10B981]/10 border border-[#10B981]/30 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
            <div className="text-[12.5px] leading-relaxed">
              <strong className="text-[14px] text-[var(--text-primary)] block mb-0.5">
                Constitutional Anti-Surveillance Guarantee (White Paper §14)
              </strong>
              <span className="text-[var(--text-secondary)]">
                The Authority Console governs public institutional circulars, budgets, and fairness audits, while the cryptographic firewall strictly prevents administrative inspection of Student Commons lounges and Peer Encrypted DMs.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)]">
              <span className="text-[11px] font-bold uppercase text-[var(--text-muted)] block">
                Root Node Public Key
              </span>
              <span className="text-[13px] font-mono font-bold text-[var(--text-primary)] block mt-1 truncate">
                ed25519:shs-dhaka-0x98f2a
              </span>
              <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">
                ● Verified Active
              </span>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)]">
              <span className="text-[11px] font-bold uppercase text-[var(--text-muted)] block">
                Student Commons Access
              </span>
              <span className="text-[13px] font-extrabold text-[#EF4444] block mt-1">
                CRYPTOGRAPHICALLY LOCKED
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                Zero surveillance enforced
              </span>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)]">
              <span className="text-[11px] font-bold uppercase text-[var(--text-muted)] block">
                Quiet Hours Enforcement
              </span>
              <span className="text-[13px] font-extrabold text-[var(--text-primary)] block mt-1">
                21:00 PM – 07:00 AM
              </span>
              <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">
                Auto-holds late circulars
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
