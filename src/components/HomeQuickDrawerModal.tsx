import React, { useState } from 'react';
import {
  X,
  Bell,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck,
  Flame,
  Building2,
} from 'lucide-react';
import { NoticeItem, SteleItem, Commitment, Role } from '../types';
import { ROLE_HOME_CONFIG } from '../data/roleProfiles';

interface HomeQuickDrawerModalProps {
  mode: 'notices' | 'closing' | null;
  onClose: () => void;
  currentRole: Role;
  notices: NoticeItem[];
  items: SteleItem[];
  commitments: Commitment[];
  onInspectNotice: () => void;
  onFulfillSlip: () => void;
  onSelectItem: (item: SteleItem) => void;
  onCommitItem: (item: SteleItem) => void;
  onOpenCommitment: (comm: Commitment) => void;
  onOpenExclusiveConsole: () => void;
  onShowToast: (msg: string) => void;
  isDark: boolean;
}

export const HomeQuickDrawerModal: React.FC<HomeQuickDrawerModalProps> = ({
  mode,
  onClose,
  currentRole,
  notices,
  items,
  commitments,
  onInspectNotice,
  onFulfillSlip,
  onSelectItem,
  onCommitItem,
  onOpenCommitment,
  onOpenExclusiveConsole,
  onShowToast,
}) => {
  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [slipSigned, setSlipSigned] = useState(false);

  if (!mode) return null;

  const roleConfig = ROLE_HOME_CONFIG[currentRole] || ROLE_HOME_CONFIG.aspirant;

  const activeCommitments = commitments.filter((c) => c.status === 'active');
  const closingSoonItems = items.slice(0, 4);

  const noticesTitle =
    currentRole === 'authority'
      ? 'Official Institutional Circulars'
      : currentRole === 'teacher'
      ? 'Section Notices & Rubric Circulars'
      : 'Recent Campus Notices & Circulars';

  const closingTitle =
    currentRole === 'steward'
      ? 'Witness Sign-Off & Closing Queue'
      : currentRole === 'teacher'
      ? 'Pending Lab Logbooks & Academic Deadlines'
      : currentRole === 'authority'
      ? 'Pending Charter Grants & Governance Deadlines'
      : 'Closing Soon · Urgent Deadlines';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] rounded-t-[26px] sm:rounded-[26px] bg-[var(--stele-surface)] border border-[var(--stele-rule)] shadow-2xl flex flex-col overflow-hidden text-[var(--stele-text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-[var(--stele-rule)] flex items-center justify-between bg-[var(--stele-canvas)]/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 ${
                mode === 'notices'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {mode === 'notices' ? <Bell className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--stele-accent)] font-bold block">
                {currentRole.replace('_', ' ')} Quick Access
              </span>
              <h3 className="text-[15px] font-extrabold text-[var(--stele-text-primary)] truncate">
                {mode === 'notices' ? noticesTitle : closingTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[var(--stele-canvas)] hover:bg-white/10 text-[var(--stele-text-secondary)] hover:text-[var(--stele-text-primary)] transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {mode === 'notices' ? (
            <>
              {/* Role-Specific Featured Action Card */}
              <div className="p-3.5 rounded-[16px] bg-[var(--stele-accent-soft)] border border-[var(--stele-accent)]/30 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[var(--stele-accent)] shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--stele-accent)]">
                      {slipSigned ? roleConfig.checkTile.doneTitle : roleConfig.checkTile.pendingTitle}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--stele-text-secondary)] mt-0.5">
                    {slipSigned ? roleConfig.checkTile.doneSub : roleConfig.checkTile.pendingSub}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={slipSigned}
                  onClick={() => {
                    setSlipSigned(true);
                    onFulfillSlip();
                  }}
                  className={`px-3 py-1.5 rounded-[10px] text-[11.5px] font-bold shrink-0 transition-all cursor-pointer ${
                    slipSigned
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[var(--stele-accent)] text-white hover:opacity-90'
                  }`}
                >
                  {slipSigned ? 'Verified ✓' : 'Sign (+20 pts)'}
                </button>
              </div>

              {/* Notice Cards */}
              {notices.map((notice) => {
                const isInspected = inspectedIds.includes(notice.id);
                return (
                  <div
                    key={notice.id}
                    className="p-3.5 rounded-[16px] bg-[var(--stele-canvas)] border border-[var(--stele-rule)] space-y-2 transition-all hover:border-[var(--stele-accent)]/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-[6px] bg-sky-500/15 text-sky-400 text-[10px] font-mono font-bold uppercase">
                            {notice.scope}
                          </span>
                          {notice.isUrgent && (
                            <span className="px-2 py-0.5 rounded-[6px] bg-amber-500/15 text-amber-400 text-[10px] font-mono font-bold uppercase">
                              Priority Circular
                            </span>
                          )}
                          <span className="text-[11px] text-[var(--stele-text-muted)]">
                            {notice.issuer}
                          </span>
                        </div>
                        <h4 className="text-[14px] font-bold text-[var(--stele-text-primary)] mt-1 leading-snug">
                          {notice.title}
                        </h4>
                      </div>
                      {notice.reachPercentage && (
                        <span className="text-[10.5px] font-mono text-emerald-400 font-semibold shrink-0">
                          {notice.reachPercentage}% reach
                        </span>
                      )}
                    </div>

                    <p className="text-[12px] text-[var(--stele-text-secondary)] leading-relaxed">
                      {notice.summary}
                    </p>

                    <div className="pt-2 border-t border-[var(--stele-rule)]/60 flex items-center justify-between gap-2">
                      <span className="text-[10.5px] text-[var(--stele-text-muted)] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Cryptographically signed notice</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          if (!isInspected) {
                            setInspectedIds((prev) => [...prev, notice.id]);
                            onInspectNotice();
                          } else {
                            onShowToast(`Already verified: ${notice.title}`);
                          }
                        }}
                        className={`px-3 py-1 rounded-[10px] text-[11.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          isInspected
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-[var(--stele-surface)] hover:bg-[var(--stele-accent)] hover:text-white border border-[var(--stele-rule)] text-[var(--stele-text-primary)]'
                        }`}
                      >
                        {isInspected ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Inspected (+15 pts)</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[var(--stele-accent)]" />
                            <span>Acknowledge (+15 pts)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {/* Role-Specific Primary Urgent Queue Banner */}
              <div className="p-3.5 rounded-[16px] bg-gradient-to-r from-rose-500/15 via-amber-500/10 to-transparent border border-rose-500/30 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-rose-400">
                      {roleConfig.hero.pill} · {roleConfig.hero.timeLeft}
                    </span>
                  </div>
                  <h4 className="text-[13.5px] font-bold text-[var(--stele-text-primary)] mt-0.5 truncate">
                    {roleConfig.hero.title}
                  </h4>
                  <p className="text-[11.5px] text-[var(--stele-text-secondary)] truncate">
                    {roleConfig.hero.source}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenExclusiveConsole();
                  }}
                  className="px-3 py-1.5 rounded-[10px] bg-rose-500 text-white text-[11.5px] font-bold shrink-0 hover:opacity-90 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Open Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Active Role Commitments Closing Soon */}
              {activeCommitments.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--stele-text-muted)] px-1">
                    Active {currentRole.replace('_', ' ')} Commitments ({activeCommitments.length})
                  </div>
                  {activeCommitments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-3 rounded-[14px] bg-[var(--stele-canvas)] border border-[var(--stele-rule)] flex items-center justify-between gap-3 hover:border-[var(--stele-accent)]/40 transition-all"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
                          {comm.sourceInstitution}
                        </span>
                        <h4 className="text-[13px] font-bold text-[var(--stele-text-primary)] truncate">
                          {comm.title}
                        </h4>
                        <span className="text-[11px] text-[var(--stele-text-muted)]">
                          Witness: {comm.witnessName || comm.stewardName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCommitment(comm);
                        }}
                        className="px-2.5 py-1.5 rounded-[10px] bg-[var(--stele-surface)] hover:bg-[var(--stele-accent)] hover:text-white border border-[var(--stele-rule)] text-[11.5px] font-bold shrink-0 transition-all cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Campus Opportunities Closing Soon */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--stele-text-muted)] px-1">
                  Federation & Campus Deadlines Closing Soon
                </div>
                {closingSoonItems.map((item) => {
                  const isCommitted = commitments.some(
                    (c) => c.itemId === item.id && c.status === 'active'
                  );
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-[14px] bg-[var(--stele-canvas)] border border-[var(--stele-rule)] space-y-2 hover:border-[var(--stele-accent)]/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono uppercase text-[var(--stele-accent)] font-bold block">
                            {item.sourceInstitution} · {item.sourceSpace}
                          </span>
                          <h4 className="text-[13.5px] font-bold text-[var(--stele-text-primary)] leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-[6px] bg-rose-500/15 text-rose-400 text-[10px] font-mono font-bold shrink-0">
                          Urgent
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectItem(item);
                          }}
                          className="text-[11.5px] font-semibold text-[var(--stele-text-secondary)] hover:text-[var(--stele-text-primary)] underline cursor-pointer"
                        >
                          Read full specification
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!isCommitted) {
                              onCommitItem(item);
                            } else {
                              onClose();
                              onSelectItem(item);
                            }
                          }}
                          className={`px-3 py-1 rounded-[10px] text-[11.5px] font-bold transition-all cursor-pointer ${
                            isCommitted
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-[var(--stele-accent)] text-white hover:opacity-90'
                          }`}
                        >
                          {isCommitted ? 'Committed ✓' : 'Commit (+10 pts)'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[var(--stele-rule)] bg-[var(--stele-canvas)]/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--stele-text-muted)]">
            <Building2 className="w-3.5 h-3.5 text-[var(--stele-accent)]" />
            <span>Springfield High Sovereign Node</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-[10px] bg-[var(--stele-surface)] border border-[var(--stele-rule)] text-[12px] font-bold text-[var(--stele-text-primary)] hover:bg-white/10 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
