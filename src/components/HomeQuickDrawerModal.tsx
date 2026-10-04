import React, { useState } from 'react';
import {
  X,
  Bell,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  FileCheck,
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
      : 'Recent Campus Notices';

  const closingTitle =
    currentRole === 'steward'
      ? 'Witness Sign-Off & Closing Queue'
      : currentRole === 'teacher'
      ? 'Pending Lab Logbooks & Deadlines'
      : currentRole === 'authority'
      ? 'Pending Charter Grants & Mandates'
      : 'Closing Soon · Urgent Deadlines';

  return (
    <div
      id="home-quick-drawer-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md android-popup-backdrop"
      onClick={onClose}
    >
      <div
        id="home-quick-drawer-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[88vh] rounded-[24px] flex flex-col overflow-hidden text-[var(--text)] android-popup-widget"
        style={{
          background: 'rgba(22, 22, 28, 0.92)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--rule-default)]/50 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[12px] bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0 shadow-xs">
              {mode === 'notices' ? <Bell className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-[var(--text-secondary)] font-medium">
                <span className="capitalize">{currentRole.replace('_', ' ')}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{mode === 'notices' ? 'Institutional Circulars' : 'Clock-Driven Queue'}</span>
              </div>
              <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--text-primary)] truncate leading-tight">
                {mode === 'notices' ? noticesTitle : closingTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 min-h-0">
          {mode === 'notices' ? (
            <>
              {/* Role-Specific Compliance Slip Row */}
              <div className="p-4 rounded-[18px] bg-white/[0.03] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[var(--reward-done)]">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    <span>
                      {slipSigned ? roleConfig.checkTile.doneTitle : roleConfig.checkTile.pendingTitle}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[var(--text-secondary)] mt-1">
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
                  className={`px-3.5 py-2 rounded-[12px] text-[12px] font-semibold shrink-0 transition-all cursor-pointer ${
                    slipSigned
                      ? 'bg-[var(--reward-done)]/15 text-[var(--reward-done)] border border-[var(--reward-done)]/30'
                      : 'bg-[var(--accent)] text-white hover:opacity-90 shadow-xs'
                  }`}
                >
                  {slipSigned ? 'Verified ✓' : 'Verify & Sign (+20 pts)'}
                </button>
              </div>

              {/* Notice Cards */}
              {notices.map((notice) => {
                const isInspected = inspectedIds.includes(notice.id);
                return (
                  <div
                    key={notice.id}
                    className="p-4 rounded-[18px] bg-white/[0.03] border border-[var(--rule-default)] space-y-2.5 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap text-[11.5px] text-[var(--text-secondary)]">
                          <span className="capitalize font-medium text-[var(--accent)]">
                            {notice.scope}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{notice.issuer}</span>
                          {notice.isUrgent && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[var(--amber)] font-semibold">Priority</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-[15px] font-bold text-[var(--text-primary)] mt-1 leading-snug">
                          {notice.title}
                        </h3>
                      </div>
                      {notice.reachPercentage && (
                        <span className="text-[11px] font-mono tabular-nums text-[var(--reward-done)] font-medium shrink-0">
                          {notice.reachPercentage}% reach
                        </span>
                      )}
                    </div>

                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {notice.summary}
                    </p>

                    <div className="pt-2.5 border-t border-[var(--rule-default)]/50 flex items-center justify-between gap-2">
                      <span className="text-[11.5px] text-[var(--text-muted)] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--reward-done)]" />
                        <span>Witnessed circular</span>
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
                        className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isInspected
                            ? 'bg-[var(--reward-done)]/15 text-[var(--reward-done)] border border-[var(--reward-done)]/30'
                            : 'bg-[var(--tile)] hover:bg-[var(--accent)] hover:text-white border border-[var(--rule-default)] text-[var(--text-primary)]'
                        }`}
                      >
                        {isInspected ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Acknowledged (+15 pts)</span>
                          </>
                        ) : (
                          <span>Acknowledge (+15 pts)</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {/* Role-Specific Primary Urgent Queue Card */}
              <div className="p-4 rounded-[18px] bg-white/[0.04] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[var(--orange)]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{roleConfig.hero.pill}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{roleConfig.hero.timeLeft}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[var(--text-primary)] mt-1 leading-snug">
                    {roleConfig.hero.title}
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                    {roleConfig.hero.source}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenExclusiveConsole();
                  }}
                  className="px-3.5 py-2 rounded-[12px] bg-[var(--accent)] text-white text-[12px] font-semibold shrink-0 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Active Role Commitments Closing Soon */}
              {activeCommitments.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-[12px] font-semibold text-[var(--text-secondary)] px-1">
                    Active {currentRole.replace('_', ' ')} Commitments ({activeCommitments.length})
                  </div>
                  {activeCommitments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-3.5 rounded-[16px] bg-white/[0.03] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-white/20 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] text-[var(--text-secondary)]">
                          <span>{comm.sourceInstitution}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>Witness: {comm.witnessName || comm.stewardName}</span>
                        </div>
                        <h4 className="text-[14px] font-bold text-[var(--text-primary)] mt-0.5 leading-snug">
                          {comm.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCommitment(comm);
                        }}
                        className="px-3 py-1.5 rounded-[10px] bg-[var(--tile)] hover:bg-[var(--accent)] hover:text-white border border-[var(--rule-default)] text-[12px] font-semibold shrink-0 transition-all cursor-pointer self-start sm:self-center"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Campus Opportunities Closing Soon */}
              <div className="space-y-2 pt-1">
                <div className="text-[12px] font-semibold text-[var(--text-secondary)] px-1">
                  Federation &amp; Campus Deadlines
                </div>
                {closingSoonItems.map((item) => {
                  const isCommitted = commitments.some(
                    (c) => c.itemId === item.id && c.status === 'active'
                  );
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-[16px] bg-white/[0.03] border border-[var(--rule-default)] space-y-2 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[11px] text-[var(--text-secondary)]">
                            <span>{item.sourceInstitution}</span>
                            <span className="mx-1.5" aria-hidden="true">·</span>
                            <span>{item.sourceSpace}</span>
                          </div>
                          <h4 className="text-[14px] font-bold text-[var(--text-primary)] mt-0.5 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--rule-default)]/40">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectItem(item);
                          }}
                          className="text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                        >
                          View details &rarr;
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
                          className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all cursor-pointer ${
                            isCommitted
                              ? 'bg-[var(--reward-done)]/15 text-[var(--reward-done)] border border-[var(--reward-done)]/30'
                              : 'bg-[var(--accent)] text-white hover:opacity-90'
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
        <div className="px-5 py-3.5 border-t border-[var(--rule-default)]/40 bg-white/[0.02] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11.5px] text-[var(--text-muted)]">
            <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Springfield Sovereign Node</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-[12px] bg-[var(--accent)] text-white text-[12.5px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
