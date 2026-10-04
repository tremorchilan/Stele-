import React, { useState } from 'react';
import {
  FileCheck,
  Send,
  BookOpen,
  Users,
  Clock,
  Check,
  ShieldCheck,
  GraduationCap,
  BellRing,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SteleItem } from '../types';

interface TeacherConsoleProps {
  facultyName?: string;
  department?: string;
  onAddTask: (task: Partial<SteleItem>) => void;
  onShowToast?: (msg: string) => void;
  isDark?: boolean;
}

interface LabLogbookEntry {
  id: string;
  studentName: string;
  studentId: string;
  section: string;
  experiment: string;
  submittedAt: string;
  signed: boolean;
  hash?: string;
}

export const TeacherConsole: React.FC<TeacherConsoleProps> = ({
  facultyName = 'Prof. M. Kaykobad',
  department = 'Dept. of Physics & Computer Science',
  onAddTask,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    'logbooks' | 'assign' | 'syllabi' | 'reach' | 'office'
  >('logbooks');

  const [logbooks, setLogbooks] = useState<LabLogbookEntry[]>([
    {
      id: 'log-1',
      studentName: 'Shadman Shakib',
      studentId: 'SHS-2026-8841',
      section: 'Section 11-A',
      experiment: 'Exp 07: Optics & Galvanometer Figure of Merit',
      submittedAt: 'Today, 09:15 AM',
      signed: false,
    },
    {
      id: 'log-2',
      studentName: 'Zayan Kabir',
      studentId: 'SHS-2026-8804',
      section: 'Section 10-B',
      experiment: 'Exp 06: Electromagnetic Induction & Lenz Law Plot',
      submittedAt: 'Yesterday, 04:20 PM',
      signed: true,
      hash: '0x7a9f...3e12',
    },
    {
      id: 'log-3',
      studentName: 'Ayesha Siddiqua',
      studentId: 'SHS-2026-8819',
      section: 'Section 10-B',
      experiment: 'Exp 07: Diffraction Grating Wavelength Calibration',
      submittedAt: 'Today, 10:05 AM',
      signed: false,
    },
    {
      id: 'log-4',
      studentName: 'Tanvir Hossain',
      studentId: 'SHS-2026-8852',
      section: 'Section 11-A',
      experiment: 'CS-204 Lab: Segment Tree & Lazy Propagation Benchmark',
      submittedAt: 'Today, 11:30 AM',
      signed: false,
    },
  ]);

  // Publish Academic Assignment Form State
  const [assignTitle, setAssignTitle] = useState('');
  const [assignCourse, setAssignCourse] = useState('PHY-301 · Section 11-A');
  const [assignHours, setAssignHours] = useState('72');
  const [assignNotes, setAssignNotes] = useState('');
  const [assignSuccess, setAssignSuccess] = useState(false);

  // Syllabus Addendum State
  const [syllabiList, setSyllabiList] = useState([
    {
      id: 'syl-1',
      code: 'PHY-301',
      title: 'Classical Mechanics & Experimental Optics',
      section: 'Section 11-A (38 Students)',
      lastAddendum: 'Non-programmable calculator rule (fx-991EX) confirmed for Lab Mid-Term.',
      updatedAt: 'Today, 09:00 AM',
      reach: 96,
    },
    {
      id: 'syl-2',
      code: 'CS-204',
      title: 'Discrete Mathematics & Algorithmic Structures',
      section: 'Section 11-B (36 Students)',
      lastAddendum: 'Dynamic Programming on Trees problem set #4 added to reserve desk.',
      updatedAt: '2 days ago',
      reach: 94,
    },
    {
      id: 'syl-3',
      code: 'PHY-202',
      title: 'Electromagnetism & Circuit Lab',
      section: 'Section 10-B (42 Students)',
      lastAddendum: 'Experiments 1–7 notebook submission required before Thursday cleanroom calibration.',
      updatedAt: 'Yesterday',
      reach: 98,
    },
  ]);
  const [newAddendumText, setNewAddendumText] = useState('');
  const [selectedCourseCode, setSelectedCourseCode] = useState('PHY-301');

  // Office Hours & Slips State
  const [slipsBatchApproved, setSlipsBatchApproved] = useState(false);
  const [officeSlots, setOfficeSlots] = useState([
    { id: 'slot-1', time: 'Mon / Wed 14:00 – 15:00', topic: 'Physics Lab Oscilloscope Calibration', booked: 5, capacity: 6, status: 'Open' },
    { id: 'slot-2', time: 'Tue / Thu 15:30 – 16:30', topic: 'National Math & Informatics Olympiad Advising', booked: 6, capacity: 6, status: 'Full' },
    { id: 'slot-3', time: 'Friday 11:00 – 12:00', topic: 'Section 10-B & 11-A Make-Up Logbook Review', booked: 3, capacity: 8, status: 'Open' },
  ]);

  const pendingLogbooksCount = logbooks.filter((l) => !l.signed).length;

  const handleToggleSignLogbook = (id: string) => {
    setLogbooks((prev) =>
      prev.map((entry) => {
        if (entry.id !== id) return entry;
        const nextSigned = !entry.signed;
        onShowToast?.(
          nextSigned
            ? `Faculty Witness Stamp applied to ${entry.studentName}'s logbook ✓`
            : `Revoked stamp for ${entry.studentName}`
        );
        return {
          ...entry,
          signed: nextSigned,
          hash: nextSigned
            ? `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`
            : undefined,
        };
      })
    );
  };

  const handleBatchSignAll = () => {
    setLogbooks((prev) =>
      prev.map((entry) => ({
        ...entry,
        signed: true,
        hash: entry.hash || `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      }))
    );
    onShowToast?.('All Section 10-B & 11-A Lab Logbooks cryptographically stamped ✓');
  };

  const handlePublishAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim()) return;

    onAddTask({
      title: assignTitle.trim(),
      sourceInstitution: 'Springfield High · Academic Council',
      sourceSpace: assignCourse,
      stewardName: `${facultyName} (Faculty)`,
      provenance: 'Official',
      scope: 'district',
      deadline: new Date(Date.now() + Number(assignHours) * 3600 * 1000).toISOString(),
      originalMessage:
        assignNotes.trim() ||
        `Official faculty academic evaluation for ${assignCourse}. Verified completion will be stamped in student ledgers.`,
      tags: ['Academics', 'Curriculum', assignCourse.split(' ')[0]],
      isInstitutionOnly: true,
      reachCount: 78,
      unseenCount: 2,
    });

    setAssignSuccess(true);
    setAssignTitle('');
    setAssignNotes('');
    onShowToast?.(`Published Academic Mandate to ${assignCourse} ✓`);
    setTimeout(() => setAssignSuccess(false), 3000);
  };

  const handlePublishAddendum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddendumText.trim()) return;
    setSyllabiList((prev) =>
      prev.map((s) =>
        s.code === selectedCourseCode
          ? { ...s, lastAddendum: newAddendumText.trim(), updatedAt: 'Just now', reach: 100 }
          : s
      )
    );
    setNewAddendumText('');
    onShowToast?.(`Syllabus Addendum broadcasted to ${selectedCourseCode} scholars ✓`);
  };

  const tabs: {
    id: typeof activeTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: 'logbooks', label: 'Section Logbooks', icon: <FileCheck className="w-4 h-4" />, badge: pendingLogbooksCount },
    { id: 'assign', label: 'Publish Assignment', icon: <Send className="w-4 h-4" /> },
    { id: 'syllabi', label: 'Syllabi & Rubrics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'reach', label: 'Section Reach Audit', icon: <Users className="w-4 h-4" /> },
    { id: 'office', label: 'Office Hours & Slips', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div
      id="teacher-console-container"
      className="w-full rounded-[20px] bg-[var(--card)] border border-[var(--rule-default)]/80 shadow-[0_10px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden my-4"
    >
      {/* Top Header */}
      <div className="p-4 sm:p-6 border-b border-[var(--rule-default)]/60 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#E87A3D]">
            <GraduationCap className="w-4 h-4" />
            <span>Teacher Console</span>
            <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
            <span className="text-[var(--text-secondary)]">Tier 4 Faculty Supervisor</span>
          </div>
          <h2 className="text-[19px] sm:text-[20px] font-bold text-[var(--text-primary)] mt-1">
            {facultyName} · Academic Supervision Desk
          </h2>
          <p className="text-[12.5px] sm:text-[13px] text-[var(--text-secondary)]">
            {department} · Verify laboratory logbooks, publish course rubrics, and audit section reach
          </p>
        </div>

        {/* 5 Faculty Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`teacher-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#E87A3D] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white/25 text-[10px] flex items-center justify-center font-bold tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Section Logbooks Verification */}
      {activeTab === 'logbooks' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
                Student Laboratory & Portfolio Logbook Sign-Offs
              </h3>
              <p className="text-[12.5px] text-[var(--text-secondary)]">
                Faculty signatures inscribe cryptographic academic verification directly into the student’s Sovereign Ledger.
              </p>
            </div>
            {pendingLogbooksCount > 0 && (
              <button
                type="button"
                onClick={handleBatchSignAll}
                className="self-start sm:self-auto px-3.5 py-2 rounded-[12px] bg-[#10B981] text-white text-[12px] font-extrabold hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Batch Stamp All ({pendingLogbooksCount})</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            {logbooks.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap text-[12px] text-[var(--text-secondary)]">
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">
                      {log.studentName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11.5px]">{log.studentId}</span>
                    <span aria-hidden="true">·</span>
                    <span>{log.section}</span>
                    {log.signed && log.hash && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[11px] text-[#10B981] font-semibold">
                          Faculty Hash: {log.hash}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-[13.5px] font-semibold text-[var(--text-primary)] mt-1">
                    {log.experiment}
                  </p>
                  <p className="text-[11.5px] text-[var(--text-muted)] mt-0.5">
                    Submitted {log.submittedAt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleSignLogbook(log.id)}
                  className={`px-3.5 py-2 rounded-[11px] text-[12px] font-extrabold flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    log.signed
                      ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                      : 'bg-[#E87A3D] text-white hover:opacity-90 shadow-xs'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{log.signed ? 'Faculty Stamped ✓' : 'Verify & Stamp'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Publish Assignment / Lab Evaluation */}
      {activeTab === 'assign' && (
        <form onSubmit={handlePublishAssignment} className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Publish Official Academic Assignment or Lab Evaluation
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Broadcast curriculum deadlines with authoritative clock windows to enrolled sections.
            </p>
          </div>

          {assignSuccess && (
            <div className="p-3 rounded-[12px] bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-[13px] font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Academic assignment published to student Commitment Boards & Radar!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Assignment / Lab Portfolio Title
              </label>
              <input
                type="text"
                value={assignTitle}
                onChange={(e) => setAssignTitle(e.target.value)}
                placeholder="e.g. Exp 08: Wheatstone Bridge & Potentiometer Calibration Report"
                required
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Target Course & Section
              </label>
              <select
                value={assignCourse}
                onChange={(e) => setAssignCourse(e.target.value)}
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              >
                <option value="PHY-301 · Section 11-A">PHY-301 · Section 11-A (38 Scholars)</option>
                <option value="PHY-202 · Section 10-B">PHY-202 · Section 10-B (42 Scholars)</option>
                <option value="CS-204 · Section 11-B">CS-204 · Section 11-B (36 Scholars)</option>
                <option value="STEM Olympiad Squad">Regional STEM Olympiad School Delegation</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Submission Clock Window
              </label>
              <select
                value={assignHours}
                onChange={(e) => setAssignHours(e.target.value)}
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              >
                <option value="24">24 Hours (Tomorrow Cutoff)</option>
                <option value="48">48 Hours (2 Days)</option>
                <option value="72">72 Hours (3 Days Standard)</option>
                <option value="168">7 Days (Weekly Lab Portfolio)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold text-[var(--text-secondary)] mb-1">
                Rubric Instructions & Preparatory Desk Location
              </label>
              <textarea
                value={assignNotes}
                onChange={(e) => setAssignNotes(e.target.value)}
                rows={3}
                placeholder="Specify graph paper requirements, error propagation tolerances, and submission tray number..."
                className="w-full p-2.5 rounded-[12px] bg-[var(--canvas)] border border-[var(--rule-default)] text-[13.5px] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[12px] bg-[#E87A3D] text-white text-[13px] font-extrabold hover:opacity-90 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Publish Academic Mandate</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: Syllabi & Rubric Addendums */}
      {activeTab === 'syllabi' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-[15.5px] font-bold text-[var(--text-primary)]">
              Course Syllabi & Real-Time Rubric Addendums
            </h3>
            <p className="text-[12.5px] text-[var(--text-secondary)]">
              Push verified rubric clarifications directly to enrolled students’ Campus Resources & Syllabi alerts.
            </p>
          </div>

          <form onSubmit={handlePublishAddendum} className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row gap-2.5">
            <select
              value={selectedCourseCode}
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              className="p-2.5 rounded-[10px] bg-[var(--card)] border border-[var(--rule-default)] text-[13px] font-bold text-[var(--text-primary)] shrink-0"
            >
              <option value="PHY-301">PHY-301</option>
              <option value="CS-204">CS-204</option>
              <option value="PHY-202">PHY-202</option>
            </select>
            <input
              type="text"
              value={newAddendumText}
              onChange={(e) => setNewAddendumText(e.target.value)}
              placeholder="Enter syllabus addendum or exam calculator policy update..."
              className="flex-1 p-2.5 rounded-[10px] bg-[var(--card)] border border-[var(--rule-default)] text-[13px] text-[var(--text-primary)]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-[10px] bg-[#E87A3D] text-white text-[12.5px] font-extrabold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Push Alert</span>
            </button>
          </form>

          <div className="flex flex-col gap-2.5">
            {syllabiList.map((syl) => (
              <div
                key={syl.id}
                className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-[6px] bg-[#E87A3D]/20 text-[#E87A3D] text-[11px] font-extrabold font-mono">
                      {syl.code}
                    </span>
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">
                      {syl.title}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[var(--text-secondary)] mt-1">
                    <strong>Latest Addendum:</strong> {syl.lastAddendum}
                  </p>
                  <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                    {syl.section} · Updated {syl.updatedAt}
                  </span>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[11px] font-extrabold">
                    {syl.reach}% Student Reach
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Section Reach & Anti-Surveillance Audit */}
      {activeTab === 'reach' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="p-3.5 rounded-[14px] bg-[#10B981]/10 border border-[#10B981]/30 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <div className="text-[12.5px] leading-relaxed">
              <strong className="text-[var(--text-primary)] block">
                Constitutional Anti-Surveillance Boundary (WP §14):
              </strong>
              <span className="text-[var(--text-secondary)]">
                Faculty accounts can audit aggregate delivery reach of official academic notices (whether a class received a lab deadline), but are cryptographically locked out of informal Student Commons lounges and peer DMs.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13.5px] font-bold text-[var(--text-primary)]">
                  Section 11-A · PHY-301 Lab Rubric
                </span>
                <span className="px-2 py-0.5 rounded-[6px] bg-[#10B981]/15 text-[#10B981] text-[11px] font-bold">
                  36 / 38 Seen (95%)
                </span>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] mb-2.5">
                Published during weekday academic hours (09:00 AM). DC-1 Fairness verified.
              </p>
              <div className="w-full h-2 rounded-full bg-[var(--track)] overflow-hidden">
                <div className="w-[95%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13.5px] font-bold text-[var(--text-primary)]">
                  Section 10-B · Optics Logbook Cutoff
                </span>
                <span className="px-2 py-0.5 rounded-[6px] bg-[#10B981]/15 text-[#10B981] text-[11px] font-bold">
                  41 / 42 Seen (98%)
                </span>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] mb-2.5">
                40 notebooks already placed at Preparatory Desk 302 ahead of deadline.
              </p>
              <div className="w-full h-2 rounded-full bg-[var(--track)] overflow-hidden">
                <div className="w-[98%] h-full bg-[#10B981] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Office Hours & Permission Slips */}
      {activeTab === 'office' && (
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="p-4 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E87A3D] block">
                Institutional Compliance Desk
              </span>
              <h4 className="text-[15px] font-bold text-[var(--text-primary)] mt-0.5">
                Laboratory Safety & Regional Olympiad Permission Slips (14 Pending)
              </h4>
              <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                Co-sign guardian permission slips for Section 11-A Bay 3 oscilloscope access and Regional Olympiad travel.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSlipsBatchApproved(true);
                onShowToast?.('14 Student Lab & Olympiad Permission Slips approved by Faculty ✓');
              }}
              className={`px-4 py-2 rounded-[12px] text-[12.5px] font-extrabold shrink-0 transition-all cursor-pointer ${
                slipsBatchApproved
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#E87A3D] text-white hover:opacity-90'
              }`}
            >
              {slipsBatchApproved ? 'All 14 Slips Approved ✓' : 'Batch Approve 14 Slips'}
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[14px] font-bold text-[var(--text-primary)]">
              Faculty Consultation & Office Hours Roster
            </h4>
            {officeSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-3.5 rounded-[14px] bg-[var(--canvas)] border border-[var(--rule-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div>
                  <span className="text-[12px] font-mono font-bold text-[#E87A3D] block">
                    {slot.time}
                  </span>
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">
                    {slot.topic}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] text-[var(--text-secondary)] font-mono">
                    {slot.booked}/{slot.capacity} Scholars Booked
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOfficeSlots((prev) =>
                        prev.map((s) =>
                          s.id === slot.id
                            ? { ...s, capacity: s.capacity + 2, status: 'Open' }
                            : s
                        )
                      );
                      onShowToast?.(`Added +2 consultation seats for ${slot.time}`);
                    }}
                    className="px-3 py-1.5 rounded-[10px] bg-[var(--track)] hover:bg-[var(--tile-active)] border border-[var(--rule-default)] text-[11.5px] font-bold text-[var(--text-primary)] cursor-pointer"
                  >
                    +2 Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
