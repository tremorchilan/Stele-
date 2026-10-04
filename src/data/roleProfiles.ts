import { Role, Commitment, NoticeItem, CommunicationChannel, DispatchMessage, StudentProfile } from '../types';

const now = Date.now();
const hour = 3600 * 1000;
const day = 24 * hour;

export interface RoleHomeBentoConfig {
  subtitlePrefix: string;
  hero: {
    pill: string;
    title: string;
    source: string;
    avatars: { initials: string; bg: string }[];
    moreLabel: string;
    timeLeft: string;
    toastMessage: string;
    detailSheetTitle: string;
    detailSheetDesc: string;
    detailMeta: { b: string; span: string }[];
    detailCta: string;
  };
  ringTile: {
    label: string;
    title: string;
    subtitle: string;
    toastMessage: string;
  };
  checkTile: {
    doneTitle: string;
    pendingTitle: string;
    doneSub: string;
    pendingSub: string;
    toastDone: string;
    toastPending: string;
  };
  wideBannerTile: {
    pill: string;
    meta: string;
    timeLabel: string;
    title: string;
    subtitle: string;
    linkLabel: string;
    toastMessage: string;
  };
  noticeTile: {
    title: string;
    summary: string;
    linkText: string;
    toastMessage: string;
  };
  deadlineTile: {
    timeLabel: string;
    title: string;
    toastMessage: string;
  };
  digestBanner: {
    title: string;
    badge: string;
    scopeLabel: string;
    subtitle: string;
  };
  exclusiveFeature: {
    label: string;
    shortLabel: string;
    icon: string;
    bg: string;
    color: string;
    description: string;
    boardSection: 'console' | 'all' | 'active' | 'watched' | 'past' | 'analytics';
  };
  boardHeader: {
    title: string;
    badge: string;
    subtitle: string;
  };
  pulseTiles: {
    tile1: {
      label: string;
      badge: string;
      value: string;
      unit: string;
      subRight: string;
      progress: number;
      footerLeft: string;
      footerRight: string;
    };
    tile2: {
      label: string;
      badge: string;
      value: string;
      unit: string;
      subRight: string;
      footerLeft: string;
      footerRight: string;
    };
    tile3: {
      label: string;
      badge: string;
      stat1: { val: string; label: string };
      stat2: { val: string; label: string };
      stat3: { val: string; label: string };
      footerLeft: string;
      footerRight: string;
    };
  };
}

export const ROLE_PROFILES: Record<Role, StudentProfile> = {
  dweller: {
    name: 'Rifat Chowdhury',
    studentId: 'SHS-OBS-9902',
    institution: 'Springfield High School',
    section: 'Visitor / Observer Stage',
    district: 'District 4, Dhaka',
    federationId: 'did:stele:dhaka:shs:observer:9902',
    role: 'dweller',
    joinedDate: 'September 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    score: 120,
    dailyStreak: 2,
    longestStreak: 2,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 0,
    earlyDeliveriesCount: 0,
    noticesInspectedCount: 6,
    retrospectivesContributedCount: 0,
    badges: [
      {
        id: 'b-dweller-1',
        title: 'Federation Observer',
        description: 'Verified read-only access to public club charters and institutional timetables.',
        dateEarned: 'September 14, 2025',
        fact: 'Inspected 6 public institutional notices in zero-pressure mode.',
        iconName: 'BookOpen',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-dw-1',
        type: 'notice_view',
        title: 'Public Charter Inspected',
        points: 15,
        timestamp: new Date(now - 4 * hour).toISOString(),
        details: 'Read Robotics Society public charter in observer mode',
      },
    ],
    claimedPerks: [],
  },

  aspirant: {
    name: 'Shadman Shakib',
    studentId: 'SHS-2026-8841',
    institution: 'Springfield High School',
    section: 'Grade 11, Section A · Trialist',
    district: 'District 4, Dhaka',
    federationId: 'did:stele:dhaka:shs:2026:8841',
    role: 'aspirant',
    joinedDate: 'January 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    score: 640,
    dailyStreak: 6,
    longestStreak: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 8,
    earlyDeliveriesCount: 3,
    noticesInspectedCount: 12,
    retrospectivesContributedCount: 2,
    badges: [
      {
        id: 'b-streak',
        title: '7-Day Invariant',
        description: 'Maintained consecutive days of civic presence without missing trialist commitments.',
        dateEarned: 'September 12, 2025',
        fact: 'Logged 6+ consecutive days of institutional presence.',
        iconName: 'Flame',
      },
      {
        id: 'b-early',
        title: 'Early Deliverer',
        description: 'Fulfilled a Steward-witnessed commitment >24 hours prior to deadline clock.',
        dateEarned: 'September 15, 2025',
        fact: 'Delivered Robotics Kit 48h before clock deadline.',
        iconName: 'Zap',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-asp-1',
        type: 'early_bonus',
        title: 'Early Bird Fulfillment Bonus',
        points: 50,
        timestamp: new Date(now - 2 * hour).toISOString(),
        details: 'Robotics line-follower calibration submitted 48h before deadline',
      },
      {
        id: 'rw-asp-2',
        type: 'completion',
        title: 'Trialist Task Fulfilled',
        points: 100,
        timestamp: new Date(now - 5 * hour).toISOString(),
        details: 'Signed by Mr. Rahman · Inscribed into Sovereign Ledger',
      },
    ],
    claimedPerks: [],
  },

  member: {
    name: 'Tariq Al-Amin',
    studentId: 'SHS-2026-7712',
    institution: 'Springfield High School',
    section: 'Grade 11, Section A · Active Member',
    district: 'District 4, Dhaka',
    federationId: 'did:stele:dhaka:shs:2026:7712',
    role: 'member',
    joinedDate: 'November 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    score: 710,
    dailyStreak: 8,
    longestStreak: 16,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 11,
    earlyDeliveriesCount: 4,
    noticesInspectedCount: 15,
    retrospectivesContributedCount: 3,
    badges: [],
    rewardHistory: [],
    claimedPerks: [],
  },

  loyal_core: {
    name: 'Tahmid Hasan',
    studentId: 'SHS-2026-3319',
    institution: 'Springfield High School',
    section: 'Grade 12, Section A · Core Wiki Editor',
    district: 'District 4, Dhaka',
    federationId: 'did:stele:dhaka:shs:2026:3319',
    role: 'loyal_core',
    joinedDate: 'August 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    score: 820,
    dailyStreak: 11,
    longestStreak: 21,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 16,
    earlyDeliveriesCount: 7,
    noticesInspectedCount: 24,
    retrospectivesContributedCount: 9,
    badges: [
      {
        id: 'b-core-1',
        title: 'Operational Inscriber',
        description: 'Authored 9 verified club playbooks and post-fixture retrospectives.',
        dateEarned: 'September 10, 2025',
        fact: 'Maintains Line Follower PID Playbook v7 in Robotics Wiki.',
        iconName: 'BookOpen',
      },
      {
        id: 'b-core-2',
        title: 'Core Mentor',
        description: 'Guided 12 Trialists through hardware checkout and debate motion prep.',
        dateEarned: 'September 14, 2025',
        fact: 'Verified 12 peer trialist bench sessions.',
        iconName: 'ShieldCheck',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-core-1',
        type: 'retrospective',
        title: 'Playbook Revision v7 Published',
        points: 40,
        timestamp: new Date(now - 3 * hour).toISOString(),
        details: 'Updated PID surface lux calibration thresholds for Robotics Society',
      },
    ],
    claimedPerks: [],
  },

  steward: {
    name: 'Nafis Ahmed',
    studentId: 'SHS-STW-1042',
    institution: 'Springfield High School',
    section: 'Lead Steward · Robotics & Debating Executive',
    district: 'District 4, Dhaka',
    federationId: 'did:stele:dhaka:shs:steward:1042',
    role: 'steward',
    joinedDate: 'March 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    score: 960,
    dailyStreak: 18,
    longestStreak: 28,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 29,
    earlyDeliveriesCount: 14,
    noticesInspectedCount: 42,
    retrospectivesContributedCount: 15,
    badges: [
      {
        id: 'b-stw-1',
        title: 'Sovereign Steward Seal',
        description: 'Elected Lead Steward holding executive delegation & curation authority.',
        dateEarned: 'August 1, 2025',
        fact: '94% DC-1 Fairness Reach across 24 broadcasted club commitments.',
        iconName: 'ShieldCheck',
      },
      {
        id: 'b-stw-2',
        title: 'Succession Architect',
        description: 'Maintained zero-gap handover protocol and member promotion pipeline.',
        dateEarned: 'September 12, 2025',
        fact: 'Promoted 6 Trialists to Core with full ledger evidence.',
        iconName: 'Sparkles',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-stw-1',
        type: 'completion',
        title: 'Witnessed & Signed 4 Member Deliveries',
        points: 80,
        timestamp: new Date(now - 1 * hour).toISOString(),
        details: 'Cryptographic steward signature applied to Robotics & Debate tasks',
      },
      {
        id: 'rw-stw-2',
        type: 'retrospective',
        title: 'Curated 3 Federation Bot Dispatches',
        points: 45,
        timestamp: new Date(now - 6 * hour).toISOString(),
        details: 'Verified fairness timing & published to District Radar',
      },
    ],
    claimedPerks: [],
  },

  teacher: {
    name: 'Prof. M. Kaykobad',
    studentId: 'FAC-SHS-0084',
    institution: 'Springfield High · Dept. of Physics & CS',
    section: 'Senior Faculty Supervisor · Sections 10-B & 11-A',
    district: 'District 4 Academic Council',
    federationId: 'did:stele:dhaka:faculty:0084',
    role: 'teacher',
    joinedDate: 'January 2020',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    score: 1150,
    dailyStreak: 24,
    longestStreak: 45,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 64,
    earlyDeliveriesCount: 22,
    noticesInspectedCount: 85,
    retrospectivesContributedCount: 19,
    badges: [
      {
        id: 'b-tch-1',
        title: 'Faculty Witness Authority',
        description: 'Authorized academic supervisor signing laboratory logbooks and Olympiad endorsements.',
        dateEarned: 'Term 2025–2026',
        fact: '64 student laboratory portfolios cryptographically witnessed.',
        iconName: 'ShieldCheck',
      },
      {
        id: 'b-tch-2',
        title: 'Curriculum Architect',
        description: 'Published verified course syllabi and real-time rubric addendums.',
        dateEarned: 'September 2025',
        fact: '98% student reach across Section 10-B & 11-A syllabi.',
        iconName: 'BookOpen',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-tch-1',
        type: 'completion',
        title: 'Signed Section 10-B Physics Logbooks (Batch 1)',
        points: 100,
        timestamp: new Date(now - 2 * hour).toISOString(),
        details: 'Verified Optics & Galvanometer experimental data for 28 students',
      },
      {
        id: 'rw-tch-2',
        type: 'notice_view',
        title: 'Published PHY-301 Rubric Addendum',
        points: 50,
        timestamp: new Date(now - 12 * hour).toISOString(),
        details: 'Dispatched non-programmable calculator rule to 78 enrolled students',
      },
    ],
    claimedPerks: [],
  },

  authority: {
    name: 'Dr. Farhana Yasmin',
    studentId: 'GOV-SHS-0001',
    institution: 'Springfield Sovereign Node · Principal Office',
    section: 'Institutional Governance & District Board',
    district: 'District 4 Directorate, Dhaka',
    federationId: 'did:stele:dhaka:authority:0001',
    role: 'authority',
    joinedDate: 'July 2019',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    score: 1480,
    dailyStreak: 30,
    longestStreak: 60,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 92,
    earlyDeliveriesCount: 40,
    noticesInspectedCount: 140,
    retrospectivesContributedCount: 31,
    badges: [
      {
        id: 'b-auth-1',
        title: 'Institutional Node Signatory',
        description: 'Root cryptographic signatory for Springfield High School federation node.',
        dateEarned: '2025 Charter Cycle',
        fact: '96.4% District Fairness Compliance across 1,420 students.',
        iconName: 'ShieldCheck',
      },
      {
        id: 'b-auth-2',
        title: 'Anti-Surveillance Guarantor',
        description: 'Enforces constitutional zero-eavesdropping firewall between administration and Student Commons.',
        dateEarned: 'WP §14 Invariant',
        fact: 'Zero privacy breaches · 100% public circular transparency.',
        iconName: 'Sparkles',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-auth-1',
        type: 'completion',
        title: 'Ratified Q3 STEM & Debating Equipment Grants',
        points: 120,
        timestamp: new Date(now - 3 * hour).toISOString(),
        details: 'Approved BDT 1,45,000 allocation for Robotics Lab Bay 3 & Debate Union',
      },
      {
        id: 'rw-auth-2',
        type: 'notice_view',
        title: 'Issued Official Winter Recess & Cleanroom Circular',
        points: 60,
        timestamp: new Date(now - 8 * hour).toISOString(),
        details: 'Reached 94% of 1,420 enrolled students within 4 hours',
      },
    ],
    claimedPerks: [],
  },

  alumni: {
    name: 'Zara Kabir',
    studentId: 'SHS-ALM-2024',
    institution: 'Springfield High Alumni Fellowship (MIT EECS ’28)',
    section: 'Honorary Sovereign Fellow · Class of 2024',
    district: 'Global Alumni Node',
    federationId: 'did:stele:dhaka:alumni:2024:0412',
    role: 'alumni',
    joinedDate: 'Graduated June 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    score: 1320,
    dailyStreak: 14,
    longestStreak: 52,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedCommitmentsCount: 48,
    earlyDeliveriesCount: 25,
    noticesInspectedCount: 60,
    retrospectivesContributedCount: 22,
    badges: [
      {
        id: 'b-alm-1',
        title: 'Permanent Sovereign Fellow',
        description: 'Graduated Lead Steward with immutable SHA-256 historical ledger seal.',
        dateEarned: 'June 2024',
        fact: '48 witnessed commitments preserved in permanent archive.',
        iconName: 'ShieldCheck',
      },
    ],
    rewardHistory: [
      {
        id: 'rw-alm-1',
        type: 'retrospective',
        title: 'Reviewed Outgoing Steward Handover Charter',
        points: 40,
        timestamp: new Date(now - 5 * hour).toISOString(),
        details: 'Provided alumni advisory notes to Nafis Ahmed & Tahmid Hasan',
      },
    ],
    claimedPerks: [],
  },
};

export const ROLE_COMMITMENTS: Record<Role, Commitment[]> = {
  dweller: [
    {
      id: 'comm-dw-1',
      itemId: 'item-1',
      title: '[Public Observation] Robotics Olympiad — Regional Spectator & Open Demo',
      sourceInstitution: 'Springfield High · Gymnasium A',
      stewardName: 'Mr. Rahman (Faculty Mentor)',
      deadline: new Date(now + 18 * hour).toISOString(),
      type: 'self_chosen',
      status: 'watched',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-dw-2',
      itemId: 'item-2',
      title: '[Public Observation] Inter-College Parliamentary Debate Exhibition',
      sourceInstitution: 'Springfield Debating Union',
      stewardName: 'Zareen Tasnim (Lead Steward)',
      deadline: new Date(now + 48 * hour).toISOString(),
      type: 'self_chosen',
      status: 'watched',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-dw-3',
      itemId: 'item-past-dw',
      title: 'Campus Orientation & Public Charter Walkthrough',
      sourceInstitution: 'Springfield Student Registry',
      stewardName: 'Orientation Desk',
      deadline: new Date(now - 3 * day).toISOString(),
      type: 'self_chosen',
      status: 'completed',
      completedAt: new Date(now - 3 * day).toISOString(),
    },
  ],

  aspirant: [
    {
      id: 'commit-club-debate',
      itemId: 'item-2',
      title: 'Parliamentary Motion Brief & Adjudicator Tab',
      sourceInstitution: 'Springfield Debating Union',
      stewardName: 'Zareen Tasnim (Lead Steward)',
      deadline: new Date(now + 5 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Zareen Tasnim (Debating Lead Steward)',
      witnessedAt: new Date(now - 1 * day).toISOString(),
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commit-1',
      itemId: 'item-1',
      title: 'Robotics Olympiad — Regional Qualifiers',
      sourceInstitution: 'Springfield High',
      stewardName: 'Mr. Rahman',
      deadline: new Date(now + 6 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Mr. Rahman (Robotics Lead Steward)',
      witnessedAt: new Date(now - 2 * day).toISOString(),
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commit-3',
      itemId: 'item-3',
      title: 'Section 10-B Physics Lab Assessment Portfolio',
      sourceInstitution: 'Springfield High',
      stewardName: 'Dr. S. K. Sen',
      deadline: new Date(now + 80 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Dr. S. K. Sen (Head of Sciences)',
      witnessedAt: new Date(now - 1 * day).toISOString(),
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commit-4',
      itemId: 'item-4',
      title: 'National Mathematics Olympiad — Open Camp Invitation',
      sourceInstitution: 'Bangladesh Math Olympiad Committee',
      stewardName: 'Prof. M. Kaykobad',
      deadline: new Date(now + 7 * day).toISOString(),
      type: 'self_chosen',
      status: 'watched',
    },
    {
      id: 'commit-6',
      itemId: 'item-past-done',
      title: 'Annual Science Fair Engineering Booth Lead',
      sourceInstitution: 'Springfield High',
      stewardName: 'Mr. Rahman',
      deadline: new Date(now - 20 * day).toISOString(),
      type: 'delegated',
      witnessName: 'Mr. Rahman (Lead Steward)',
      witnessedAt: new Date(now - 18 * day).toISOString(),
      status: 'completed',
      completedAt: new Date(now - 18 * day).toISOString(),
      retrospective: {
        wentWell: 'Hardware demo attracted 400+ junior attendees without circuit failure.',
        wentWrong: 'Extra lithium-ion power packs were delayed at the gate inspection.',
        toChange: 'Order battery pre-clearance pass 5 school days earlier next year.',
      },
    },
  ],

  member: [],

  loyal_core: [
    {
      id: 'comm-core-1',
      itemId: 'item-2',
      title: 'Publish PID Sensor Calibration Playbook v8 to Robotics Wiki',
      sourceInstitution: 'Robotics & Automation Society',
      stewardName: 'Nafis Ahmed (Lead Steward)',
      deadline: new Date(now + 9 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Nafis Ahmed (Lead Steward)',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-core-2',
      itemId: 'item-1',
      title: 'Mentor 6 Trialist Squads on Asian Parliamentary Rebuttal Structure',
      sourceInstitution: 'Springfield Debating Union',
      stewardName: 'Zareen Tasnim (Lead Steward)',
      deadline: new Date(now + 28 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Zareen Tasnim (Lead Steward)',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-core-3',
      itemId: 'item-5',
      title: 'Archive Post-Fixture Retrospective for Inter-School Debate Qualifiers',
      sourceInstitution: 'Springfield Debating Union',
      stewardName: 'Zareen Tasnim',
      deadline: new Date(now - 5 * day).toISOString(),
      type: 'delegated',
      witnessName: 'Zareen Tasnim',
      status: 'completed',
      completedAt: new Date(now - 5 * day).toISOString(),
      retrospective: {
        wentWell: 'All 3 novice speakers completed 7-minute constructive speeches without notes.',
        wentWrong: 'Timekeeper bell was missing in Room 204 during Round 2.',
        toChange: 'Pack dedicated digital stopwatch in Debate Union locker kit.',
      },
    },
  ],

  steward: [
    {
      id: 'comm-stw-1',
      itemId: 'item-1',
      title: '[Steward Witnessing] Certify 4 Trialist Line-Follower Hardware Kits',
      sourceInstitution: 'Robotics & Automation Society · Bay 3',
      stewardName: 'Nafis Ahmed (Executive Lead Steward)',
      deadline: new Date(now + 4 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Mr. Rahman (Faculty Advisor Co-Sign)',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-stw-2',
      itemId: 'item-2',
      title: '[Steward Curation] Clear 2 Forwarded Federation Bot Opportunities',
      sourceInstitution: 'Stele Ingestion Queue · District 4',
      stewardName: 'Nafis Ahmed (Lead Steward)',
      deadline: new Date(now + 16 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Federation Fairness Protocol DC-1',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-stw-3',
      itemId: 'item-7',
      title: '[Executive Succession] Finalize Handover Briefing for Deputy Tahmid Hasan',
      sourceInstitution: 'Robotics & Automation Society',
      stewardName: 'Nafis Ahmed (Outgoing Steward)',
      deadline: new Date(now + 72 * hour).toISOString(),
      type: 'self_chosen',
      witnessName: 'Dr. Farhana Yasmin (Principal Registry)',
      status: 'active',
    },
    {
      id: 'comm-stw-4',
      itemId: 'item-past-stw',
      title: '[Fairness Audit] Resolved Off-Hours Drop Flag on Solar Energy Audit',
      sourceInstitution: 'Springfield High Governance',
      stewardName: 'Nafis Ahmed',
      deadline: new Date(now - 4 * day).toISOString(),
      type: 'delegated',
      witnessName: 'District Fairness Engine',
      status: 'completed',
      completedAt: new Date(now - 4 * day).toISOString(),
      retrospective: {
        wentWell: 'Suppressed urgent pulsing on 23:45 drop so sleeping students were not penalized.',
        wentWrong: 'Peer steward posted notice after 22:00 quiet hours.',
        toChange: 'Enforce automatic 08:00 AM scheduled release for late-night drafts.',
      },
    },
  ],

  teacher: [
    {
      id: 'comm-tch-1',
      itemId: 'item-3',
      title: '[Faculty Verification] Sign & Stamp Section 10-B Physics Lab Logbooks (28 Notebooks)',
      sourceInstitution: 'Dept. of Physics · Preparatory Desk 302',
      stewardName: 'Prof. M. Kaykobad (Faculty Supervisor)',
      deadline: new Date(now + 5 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Academic Council Registry',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-tch-2',
      itemId: 'item-4',
      title: '[Curriculum Release] Publish Mid-Term Mechanics & Thermodynamics Rubric Addendum',
      sourceInstitution: 'Sections 11-A & 11-B · Course PHY-301',
      stewardName: 'Prof. M. Kaykobad',
      deadline: new Date(now + 24 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Dr. Farhana Yasmin (Principal Office)',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-tch-3',
      itemId: 'item-1',
      title: '[Faculty Endorsement] Co-Sign Regional Robotics & Math Olympiad School Delegation Roster',
      sourceInstitution: 'Springfield High STEM Council',
      stewardName: 'Prof. M. Kaykobad & Mr. Rahman',
      deadline: new Date(now + 48 * hour).toISOString(),
      type: 'self_chosen',
      witnessName: 'National Olympiad Secretariat',
      status: 'watched',
    },
    {
      id: 'comm-tch-4',
      itemId: 'item-past-tch',
      title: '[Faculty Audit] Certified Laboratory Safety & Oscilloscope Calibration Protocol',
      sourceInstitution: 'Springfield Science Wing',
      stewardName: 'Prof. M. Kaykobad',
      deadline: new Date(now - 7 * day).toISOString(),
      type: 'delegated',
      witnessName: 'Academic Board',
      status: 'completed',
      completedAt: new Date(now - 7 * day).toISOString(),
    },
  ],

  authority: [
    {
      id: 'comm-auth-1',
      itemId: 'item-1',
      title: '[Institutional Ratification] Approve Q3 Robotics & Debating Society Equipment Grants',
      sourceInstitution: 'Office of the Principal · Budget & Charter Desk',
      stewardName: 'Dr. Farhana Yasmin (Principal)',
      deadline: new Date(now + 4 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'District 4 Education Treasury',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-auth-2',
      itemId: 'item-6',
      title: '[District Fairness Audit] Review DC-1 / DC-2 Reach Report & Suppress Off-Hours Drops',
      sourceInstitution: 'Springfield Sovereign Node · 1,420 Students',
      stewardName: 'Dr. Farhana Yasmin (Authority Board)',
      deadline: new Date(now + 18 * hour).toISOString(),
      type: 'delegated',
      witnessName: 'Federation Standards Board',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-auth-3',
      itemId: 'item-2',
      title: '[Almanac Decree] Sign Autumn Reading Week & Cleanroom Calibration Schedule Circular',
      sourceInstitution: 'Springfield High Secretariat',
      stewardName: 'Dr. Farhana Yasmin',
      deadline: new Date(now + 36 * hour).toISOString(),
      type: 'self_chosen',
      witnessName: 'Board of Governors',
      status: 'active',
    },
    {
      id: 'comm-auth-4',
      itemId: 'item-past-auth',
      title: '[Federation Security] Deployed SHA-256 Sovereign Ledger Witness Keys (v2.1)',
      sourceInstitution: 'District 4 Sovereign Pool',
      stewardName: 'Dr. Farhana Yasmin',
      deadline: new Date(now - 10 * day).toISOString(),
      type: 'delegated',
      witnessName: 'National Federation Directorate',
      status: 'completed',
      completedAt: new Date(now - 10 * day).toISOString(),
    },
  ],

  alumni: [
    {
      id: 'comm-alm-1',
      itemId: 'item-7',
      title: '[Alumni Mentorship] Guest Review of Autonomous Rover Pitch Decks (Class of 2026)',
      sourceInstitution: 'Springfield Alumni Fellowship · Robotics Society',
      stewardName: 'Zara Kabir (Alumni Fellow ’24)',
      deadline: new Date(now + 24 * hour).toISOString(),
      type: 'self_chosen',
      witnessName: 'Nafis Ahmed (Current Lead Steward)',
      status: 'active',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'comm-alm-2',
      itemId: 'item-5',
      title: '[Archival Verification] Co-Sign 2024–2026 Club Succession Lineage Pack',
      sourceInstitution: 'Springfield Permanent Archive',
      stewardName: 'Zara Kabir',
      deadline: new Date(now + 96 * hour).toISOString(),
      type: 'self_chosen',
      status: 'watched',
    },
    {
      id: 'comm-alm-3',
      itemId: 'item-past-alm',
      title: '[2024 Lead Steward Term] Delivered National Robotics Championship Trophy & Playbook v4',
      sourceInstitution: 'Springfield High School (Class of 2024)',
      stewardName: 'Zara Kabir',
      deadline: new Date(now - 180 * day).toISOString(),
      type: 'delegated',
      witnessName: 'Mr. Rahman & Dr. Farhana Yasmin',
      status: 'completed',
      completedAt: new Date(now - 180 * day).toISOString(),
    },
  ],
};

export const ROLE_HOME_CONFIG: Record<Role, RoleHomeBentoConfig> = {
  dweller: {
    subtitlePrefix: 'Public Exhibitions',
    hero: {
      pill: 'Read-Only Preview',
      title: 'Campus Open House & Public Club Charters',
      source: 'Springfield High · Zero-Pressure Observer Mode',
      avatars: [
        { initials: 'RC', bg: '#7A8595' },
        { initials: 'NA', bg: '#4D7EF7' },
        { initials: 'ZT', bg: '#3DB16E' },
      ],
      moreLabel: 'Public Access',
      timeLeft: 'Open Daily',
      toastMessage: 'Observer Mode: Browse public club charters and lectures without claiming pressure.',
      detailSheetTitle: 'Observer Orientation & Public Charters',
      detailSheetDesc:
        'As a Dweller (Observer Stage), you have full read-only access to public club charters, academic calendars, and verified syllabi with zero notification pings or claiming pressure.',
      detailMeta: [
        { b: '3', span: 'Guilds' },
        { b: '100%', span: 'Read-Only' },
        { b: '0', span: 'Pings' },
      ],
      detailCta: 'Browse Public Charters →',
    },
    ringTile: {
      label: 'Open',
      title: 'Public Lecture Series',
      subtitle: 'Auditorium A · Spectators welcome',
      toastMessage: 'Public Lecture Series: Open to all campus observers',
    },
    checkTile: {
      doneTitle: 'Visitor Pass Active ✓',
      pendingTitle: 'Activate Visitor Pass',
      doneSub: 'Read-only federation access verified',
      pendingSub: 'Tap to verify observer session',
      toastDone: 'Observer Visitor Pass verified ✓',
      toastPending: 'Observer pass paused',
    },
    wideBannerTile: {
      pill: 'Public Exhibition',
      meta: 'Debating Union · Open Gallery Seating',
      timeLabel: 'Fri',
      title: 'Inter-House Parliamentary Debate Exhibition Fixture',
      subtitle: 'Observers may watch from Auditorium Gallery · No speaker commitment required',
      linkLabel: 'Watch List',
      toastMessage: 'Public exhibition fixture added to Observer Watch List',
    },
    noticeTile: {
      title: 'Public Campus Almanac',
      summary: 'Autumn Reading Week & Open Lab hours published',
      linkText: 'Read circular',
      toastMessage: 'Inspected public campus circular',
    },
    deadlineTile: {
      timeLabel: 'Open Archive',
      title: 'Verified Club Playbooks & Syllabi',
      toastMessage: 'Browsing read-only club playbooks',
    },
    digestBanner: {
      title: 'Public Campus Bulletin',
      badge: '2 Circulars',
      scopeLabel: 'Read-Only Broadcast',
      subtitle: 'Official school announcements & open symposium dates · Tap to read',
    },
    exclusiveFeature: {
      label: 'Observer Orientation Deck',
      shortLabel: 'Observer Deck',
      icon: '👁️',
      bg: '#64748B',
      color: '#FFFFFF',
      description: 'Zero-pressure read-only charter browser & public fixture watch.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Observer Watch & Public Charters',
      badge: 'Tier 0 · Read-Only Observer',
      subtitle: 'Zero-pressure observation of campus fixtures, public club charters, and verified institutional archives.',
    },
    pulseTiles: {
      tile1: {
        label: 'Observer Access Pass',
        badge: 'Tier 0 · Visitor',
        value: 'READ',
        unit: 'ONLY',
        subRight: 'Zero claiming pressure',
        progress: 100,
        footerLeft: 'Public charters & timetables unlocked',
        footerRight: 'Inspect Pass →',
      },
      tile2: {
        label: 'Notification Shield',
        badge: 'Calm Mode',
        value: '0',
        unit: 'PINGS SENT',
        subRight: '100% Quiet',
        footerLeft: 'No deadline alarms in Dweller stage',
        footerRight: 'Protected',
      },
      tile3: {
        label: 'Public Federation Visibility',
        badge: 'Verified Node',
        stat1: { val: '3', label: 'Charters' },
        stat2: { val: '7', label: 'Notices' },
        stat3: { val: '5', label: 'Syllabi' },
        footerLeft: 'Switch to Aspirant in Settings to claim tasks',
        footerRight: 'Read-Only Proof',
      },
    },
  },

  aspirant: {
    subtitlePrefix: 'Opportunities',
    hero: {
      pill: 'Closing soon',
      title: 'Robotics Olympiad — Regional',
      source: 'Springfield High · Mr. Rahman',
      avatars: [
        { initials: 'AR', bg: '#4D7EF7' },
        { initials: 'JK', bg: '#E87A3D' },
        { initials: 'MS', bg: '#3DB16E' },
      ],
      moreLabel: '+12 joined',
      timeLeft: '6 hours left',
      toastMessage: 'Robotics Olympiad — Regional: 6 hours remaining',
      detailSheetTitle: 'Robotics Olympiad — Regional',
      detailSheetDesc:
        'Springfield High · Gym A · Team of 4 · Bring laptop + hardware kit. Mr. Rahman will finalize the team roster tonight at 8:00 PM.',
      detailMeta: [
        { b: '6h', span: 'Left' },
        { b: '12', span: 'Spots' },
        { b: '$10', span: 'Fee' },
      ],
      detailCta: 'Commit to Task Now →',
    },
    ringTile: {
      label: '2d',
      title: 'Design Hackathon',
      subtitle: '70% seats filled · Hall B',
      toastMessage: 'Design Hackathon: 70% seats filled',
    },
    checkTile: {
      doneTitle: 'Forms signed ✓',
      pendingTitle: 'Permission slip',
      doneSub: 'All set — approved',
      pendingSub: 'Tap to mark permission slip',
      toastDone: '+20 pts · Institutional Slip Signed ✓',
      toastPending: 'Pending permission slip signature',
    },
    wideBannerTile: {
      pill: 'Club deadline',
      meta: 'Debating Union · Witnessed by Zareen Tasnim',
      timeLabel: '5h',
      title: 'Parliamentary Motion Brief & Adjudicator Tab',
      subtitle: 'Asian Parliamentary squad roster & motion packet due · Tonight 18:00',
      linkLabel: 'Board',
      toastMessage: 'Club commitment due in 5h: Parliamentary Motion Brief & Adjudicator Tab',
    },
    noticeTile: {
      title: 'Fee deadline extended',
      summary: 'Registration window now closes Friday',
      linkText: 'View notice',
      toastMessage: '+15 pts · Inspected Official Notice: Fee deadline extended',
    },
    deadlineTile: {
      timeLabel: '2 days left',
      title: 'Optics & Galvanometer Lab Portfolio',
      toastMessage: 'Optics & Galvanometer Lab Portfolio: 2 days remaining',
    },
    digestBanner: {
      title: 'Catch-up Digest',
      badge: '5 New',
      scopeLabel: 'Student Commons',
      subtitle: '5 missed messages across Section 11-A & Robotics · Tap to review',
    },
    exclusiveFeature: {
      label: 'Trialist Claiming & Perks Circuit',
      shortLabel: 'Trialist Circuit',
      icon: '🎯',
      bg: '#3B82F6',
      color: '#FFFFFF',
      description: 'Claim Trialist commitments & redeem points at the Physical Perks Bazaar.',
      boardSection: 'active',
    },
    boardHeader: {
      title: 'Aspirant Commitments Board',
      badge: 'Tier 1 · Trialist Student',
      subtitle: 'Personal trialist obligations, self-chosen deadlines, and campus perks reward circuit.',
    },
    pulseTiles: {
      tile1: {
        label: 'Sovereign Reputation',
        badge: 'Tier 1 · Aspirant',
        value: '640',
        unit: 'PTS',
        subRight: '85% to next perk',
        progress: 85,
        footerLeft: 'Foundry Café Pass at 700 pts',
        footerRight: 'Inspect Perks →',
      },
      tile2: {
        label: 'Consistency Streak',
        badge: '+15% Multiplier',
        value: '6',
        unit: 'DAYS ACTIVE',
        subRight: 'Best: 14d',
        footerLeft: 'Deliver commitments daily',
        footerRight: 'Unbroken',
      },
      tile3: {
        label: 'Trialist Execution Velocity',
        badge: '100% Fulfilled',
        stat1: { val: '3', label: 'Active' },
        stat2: { val: '1', label: 'Watched' },
        stat3: { val: '1', label: 'Fulfilled' },
        footerLeft: 'Eligible for Core promotion after 2 more tasks',
        footerRight: 'Cryptographic Proof',
      },
    },
  },

  member: {
    subtitlePrefix: 'Member Tasks',
    hero: {
      pill: 'Closing soon',
      title: 'Robotics Olympiad — Regional',
      source: 'Springfield High · Mr. Rahman',
      avatars: [
        { initials: 'AR', bg: '#4D7EF7' },
        { initials: 'JK', bg: '#E87A3D' },
        { initials: 'MS', bg: '#3DB16E' },
      ],
      moreLabel: '+12 joined',
      timeLeft: '6 hours left',
      toastMessage: 'Robotics Olympiad — Regional: 6 hours remaining',
      detailSheetTitle: 'Robotics Olympiad — Regional',
      detailSheetDesc: 'Springfield High · Gym A · Team of 4 · Bring laptop + hardware kit.',
      detailMeta: [
        { b: '6h', span: 'Left' },
        { b: '12', span: 'Spots' },
        { b: '$10', span: 'Fee' },
      ],
      detailCta: 'Commit Now →',
    },
    ringTile: {
      label: '2d',
      title: 'Design Hackathon',
      subtitle: '70% seats filled · Hall B',
      toastMessage: 'Design Hackathon: 70% seats filled',
    },
    checkTile: {
      doneTitle: 'Forms signed ✓',
      pendingTitle: 'Permission slip',
      doneSub: 'All set — approved',
      pendingSub: 'Tap to mark permission slip',
      toastDone: '+20 pts · Institutional Slip Signed ✓',
      toastPending: 'Pending permission slip signature',
    },
    wideBannerTile: {
      pill: 'Club deadline',
      meta: 'Debating Union · Witnessed by Zareen Tasnim',
      timeLabel: '5h',
      title: 'Parliamentary Motion Brief & Adjudicator Tab',
      subtitle: 'Asian Parliamentary squad roster & motion packet due · Tonight 18:00',
      linkLabel: 'Board',
      toastMessage: 'Club commitment due in 5h',
    },
    noticeTile: {
      title: 'Fee deadline extended',
      summary: 'Registration window now closes Friday',
      linkText: 'View notice',
      toastMessage: 'Inspected notice',
    },
    deadlineTile: {
      timeLabel: '2 days left',
      title: 'Optics & Galvanometer Lab Portfolio',
      toastMessage: '2 days remaining',
    },
    digestBanner: {
      title: 'Catch-up Digest',
      badge: '5 New',
      scopeLabel: 'Student Commons',
      subtitle: '5 missed messages across Section 11-A & Robotics · Tap to review',
    },
    exclusiveFeature: {
      label: 'Member Commons & Perks',
      shortLabel: 'Member Board',
      icon: '⚡',
      bg: '#0284C7',
      color: '#FFFFFF',
      description: 'Active member commitments and unmonitored student commons.',
      boardSection: 'active',
    },
    boardHeader: {
      title: 'Member Commitments Board',
      badge: 'Tier 1.5 · Active Member',
      subtitle: 'Club fixtures, peer study commitments, and sovereign ledger records.',
    },
    pulseTiles: {
      tile1: {
        label: 'Sovereign Reputation',
        badge: 'Tier 1.5 · Member',
        value: '710',
        unit: 'PTS',
        subRight: '94% to next perk',
        progress: 94,
        footerLeft: 'Maker Lab 3D Print Pass Ready',
        footerRight: 'Inspect Perks →',
      },
      tile2: {
        label: 'Consistency Streak',
        badge: '+15% Multiplier',
        value: '8',
        unit: 'DAYS ACTIVE',
        subRight: 'Best: 16d',
        footerLeft: 'Deliver commitments daily',
        footerRight: 'Unbroken',
      },
      tile3: {
        label: 'Execution Velocity',
        badge: '100% Fulfilled',
        stat1: { val: '3', label: 'Active' },
        stat2: { val: '1', label: 'Watched' },
        stat3: { val: '2', label: 'Fulfilled' },
        footerLeft: 'Active in 2 Guilds',
        footerRight: 'Cryptographic Proof',
      },
    },
  },

  loyal_core: {
    subtitlePrefix: 'Core Editorial Tasks',
    hero: {
      pill: 'Core Wiki Revision',
      title: 'Line-Follower PID Playbook v8 & Sensor Blueprint',
      source: 'Robotics Society · Deputy Core Tahmid Hasan',
      avatars: [
        { initials: 'TH', bg: '#10B981' },
        { initials: 'NA', bg: '#E0A83A' },
        { initials: 'ER', bg: '#4D7EF7' },
      ],
      moreLabel: 'Wiki Quorum',
      timeLeft: '9 hours left',
      toastMessage: 'Core Playbook Revision v8 due in 9 hours',
      detailSheetTitle: 'PID Calibration Playbook v8 — Core Wiki',
      detailSheetDesc:
        'Update surface lux reflection tables and 3S LiPo voltage sag curves in the Robotics Society permanent wiki before Friday’s trialist workshop.',
      detailMeta: [
        { b: 'v8', span: 'Edition' },
        { b: '48', span: 'Readers' },
        { b: '+40', span: 'Wiki Pts' },
      ],
      detailCta: 'Open Core Wiki Studio →',
    },
    ringTile: {
      label: '92%',
      title: 'Wiki Memory Coverage',
      subtitle: '14 of 15 fixtures documented',
      toastMessage: '92% of club fixtures have archived retrospectives',
    },
    checkTile: {
      doneTitle: 'Bench Inventory Verified ✓',
      pendingTitle: 'Audit Bench C-3 Kit',
      doneSub: '4 optical encoders logged in wiki',
      pendingSub: 'Tap to sign off Core inventory check',
      toastDone: '+30 pts · Core Workbench Inventory Logged ✓',
      toastPending: 'Pending Core workbench audit',
    },
    wideBannerTile: {
      pill: 'Core Mentorship',
      meta: 'Debating Union · Core Editorial Desk',
      timeLabel: '28h',
      title: 'Mentor 6 Trialist Squads on Asian Parliamentary Rebuttals',
      subtitle: 'Review novice constructive speech outlines in Room 204 · Tomorrow 16:00',
      linkLabel: 'Core Studio',
      toastMessage: 'Core Mentorship session scheduled for tomorrow 16:00',
    },
    noticeTile: {
      title: 'Handover Protocol Drafted',
      summary: 'Nafis Ahmed nominated Tahmid Hasan as incoming Steward',
      linkText: 'Inspect charter',
      toastMessage: 'Inspected 2026 Steward Succession Charter',
    },
    deadlineTile: {
      timeLabel: 'Inscribed',
      title: '9 Operational Retrospectives in Club Wiki',
      toastMessage: '9 retrospectives authored by Tahmid Hasan',
    },
    digestBanner: {
      title: 'Core Contributor Digest',
      badge: '3 Wiki Edits',
      scopeLabel: 'Club Editorial Enclave',
      subtitle: 'Elena updated H-bridge PWM duty cycle notes in Robotics Wiki · Tap to review',
    },
    exclusiveFeature: {
      label: 'Core Wiki & Retrospective Studio',
      shortLabel: 'Core Wiki Studio',
      icon: '📘',
      bg: '#10B981',
      color: '#FFFFFF',
      description: 'Edit club playbooks, inscribe 2-minute retrospectives, and mentor trialists.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Loyal Core & Wiki Studio Board',
      badge: 'Tier 2 · Core Club Editor',
      subtitle: 'Institutional memory authorship, club playbook revisions, and core mentorship commitments.',
    },
    pulseTiles: {
      tile1: {
        label: 'Core Editorial Standing',
        badge: 'Tier 2 · Loyal Core',
        value: '820',
        unit: 'PTS',
        subRight: 'Deputy Steward Nominee',
        progress: 91,
        footerLeft: '9 Playbooks & Retrospectives Authored',
        footerRight: 'Inspect Ledger →',
      },
      tile2: {
        label: 'Wiki Continuity Streak',
        badge: 'Zero Memory Loss',
        value: '11',
        unit: 'DAYS ACTIVE',
        subRight: 'Best: 21d',
        footerLeft: 'Every club fixture documented',
        footerRight: 'Verified Editor',
      },
      tile3: {
        label: 'Core Mentorship & Wiki',
        badge: '100% Documented',
        stat1: { val: '2', label: 'Core Tasks' },
        stat2: { val: '9', label: 'Wiki Pages' },
        stat3: { val: '12', label: 'Mentored' },
        footerLeft: 'Can edit charters & claim Core tasks',
        footerRight: 'Wiki Authority',
      },
    },
  },

  steward: {
    subtitlePrefix: 'Executive Actions',
    hero: {
      pill: 'Steward Executive Desk',
      title: 'Certify 4 Trialist Line-Follower Hardware Kits',
      source: 'Nafis Ahmed (Lead Steward) · Robotics Bay 3',
      avatars: [
        { initials: 'NA', bg: '#E0A83A' },
        { initials: 'TH', bg: '#10B981' },
        { initials: 'MR', bg: '#4D7EF7' },
      ],
      moreLabel: '4 Awaiting Sign-Off',
      timeLeft: '4 hours left',
      toastMessage: 'Steward Action: 4 Trialist hardware kits awaiting witness signature',
      detailSheetTitle: 'Steward Witness Queue — Hardware Certification',
      detailSheetDesc:
        'Inspect PID sensor soldering and failsafe switch operation for 4 Trialist teams in Bay 3. Signing inscribes SHA-256 Steward Witness proof into their Sovereign Ledgers.',
      detailMeta: [
        { b: '4', span: 'Teams' },
        { b: '94%', span: 'DC-1 Reach' },
        { b: 'SHA-256', span: 'Witness' },
      ],
      detailCta: 'Open Steward Console →',
    },
    ringTile: {
      label: '94%',
      title: 'DC-1 Fairness Reach',
      subtitle: '226/240 members saw last drop',
      toastMessage: 'DC-1 Fairness Check: 94% of Robotics members saw notice within 4h',
    },
    checkTile: {
      doneTitle: '4 Member Tasks Witnessed ✓',
      pendingTitle: 'Sign Member Completions',
      doneSub: 'Cryptographic hashes inscribed',
      pendingSub: 'Tap to batch-witness 4 club deliveries',
      toastDone: 'Signed 4 member ledger entries as Lead Steward ✓',
      toastPending: '4 member completions awaiting Steward witness',
    },
    wideBannerTile: {
      pill: 'Steward Curation Queue',
      meta: 'Stele Ingestion Bot · 2 Forwarded Items Pending',
      timeLabel: '2 New',
      title: 'Curate Quadcopter Firmware Challenge & Bio-Design CAD Sprint',
      subtitle: 'Verify scope, tag target cohorts, and approve to District Opportunity Radar',
      linkLabel: 'Steward Console',
      toastMessage: 'Opening Steward Console Curation Queue',
    },
    noticeTile: {
      title: 'Off-Hours Flag Suppressed',
      summary: 'DC-2 muted pulsing on 23:45 Solar Audit drop',
      linkText: 'Audit fairness',
      toastMessage: 'Fairness Audit: DC-2 suppressed urgency pulsing for late-night drop',
    },
    deadlineTile: {
      timeLabel: 'Nov 30 Handover',
      title: 'Executive Succession → Tahmid Hasan',
      toastMessage: 'Succession Protocol: Tahmid Hasan nominated as incoming Lead Steward',
    },
    digestBanner: {
      title: 'Steward Executive Briefing',
      badge: '2 Bot Drops',
      scopeLabel: 'Executive Council',
      subtitle: '2 Telegram/WhatsApp opportunities queued for Steward curation · Tap to inspect',
    },
    exclusiveFeature: {
      label: 'Steward Console (6-Tab Executive)',
      shortLabel: 'Steward Console',
      icon: '⚡',
      bg: '#E0A83A',
      color: '#0F172A',
      description: 'Delegate commitments, curate bot drops, review member pipeline, audit fairness & succession.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Steward Executive & Commitments Board',
      badge: 'Tier 3 · Sovereign Steward',
      subtitle: 'Integrated 6-tab Steward Console: Delegate club commitments, curate bot queues, witness member deliveries, and audit DC-1/DC-2 fairness.',
    },
    pulseTiles: {
      tile1: {
        label: 'Steward Executive Standing',
        badge: 'Tier 3 · Lead Steward',
        value: '94%',
        unit: 'FAIRNESS REACH',
        subRight: '24 Fair Drops',
        progress: 94,
        footerLeft: 'Zero pad-ranking violations recorded',
        footerRight: 'Audit Fairness →',
      },
      tile2: {
        label: 'Member Pipeline & Witnessing',
        badge: 'Executive Signatory',
        value: '29',
        unit: 'WITNESSED ACTS',
        subRight: '4 Pending Today',
        footerLeft: 'Observer → Trialist → Core pipeline healthy',
        footerRight: 'Active Quorum',
      },
      tile3: {
        label: 'Executive Console Status',
        badge: '6 Tabs Active',
        stat1: { val: '2', label: 'Curate Queue' },
        stat2: { val: '4', label: 'Pipeline' },
        stat3: { val: '3', label: 'Wiki Docs' },
        footerLeft: 'Succession Nominee: Tahmid Hasan',
        footerRight: 'Sovereign Seal',
      },
    },
  },

  teacher: {
    subtitlePrefix: 'Faculty Supervision',
    hero: {
      pill: 'Faculty Verification Due',
      title: 'Section 10-B Physics Lab Logbook Sign-Offs',
      source: 'Prof. M. Kaykobad · Physics Prep Desk Room 302',
      avatars: [
        { initials: 'ZK', bg: '#E87A3D' },
        { initials: 'AS', bg: '#38BDF8' },
        { initials: 'TH', bg: '#10B981' },
      ],
      moreLabel: '28 Notebooks',
      timeLeft: 'Today 16:00',
      toastMessage: 'Faculty Desk: 28 Physics Lab notebooks ready for verification in Room 302',
      detailSheetTitle: 'Section 10-B Physics Lab Logbook Verification',
      detailSheetDesc:
        'Verify experimental data plots for Experiments 1–7 (Optics & Galvanometer) submitted by Section 10-B students. Faculty stamp inscribes official academic proof.',
      detailMeta: [
        { b: '28', span: 'Logbooks' },
        { b: '96%', span: 'Submitted' },
        { b: 'Rm 302', span: 'Prep Desk' },
      ],
      detailCta: 'Open Teacher Console →',
    },
    ringTile: {
      label: '96%',
      title: 'Section 11-A Reach',
      subtitle: '36/38 opened PHY-301 Rubric',
      toastMessage: '96% of Section 11-A students opened the PHY-301 Rubric Addendum',
    },
    checkTile: {
      doneTitle: 'Lab Safety Slips Approved ✓',
      pendingTitle: 'Approve 14 Lab Slips',
      doneSub: 'Oscilloscope & Bay 3 clearance granted',
      pendingSub: 'Tap to batch-approve Section 11-A lab slips',
      toastDone: 'Batch-approved 14 student laboratory safety slips ✓',
      toastPending: '14 laboratory safety slips awaiting faculty approval',
    },
    wideBannerTile: {
      pill: 'Curriculum & Rubric Desk',
      meta: 'Dept. of Physics & CS · Courses PHY-301 & CS-204',
      timeLabel: '24h',
      title: 'Publish Mid-Term Mechanics & Thermodynamics Rubric Addendum',
      subtitle: 'Clarify non-programmable calculator policy & SI unit deduction rules for Sections 11-A/B',
      linkLabel: 'Teacher Console',
      toastMessage: 'Opening Teacher Console: Curriculum & Rubric Publisher',
    },
    noticeTile: {
      title: 'Office Hours Roster Full',
      summary: '6 students booked MWF 14:00–16:00 consultation',
      linkText: 'Manage slots',
      toastMessage: 'Faculty Office Hours: 6 consultation slots booked today',
    },
    deadlineTile: {
      timeLabel: 'Thu 15:00',
      title: 'Co-Sign Regional Math & Physics Olympiad Roster',
      toastMessage: 'Regional Olympiad school delegation roster awaiting Faculty co-signature',
    },
    digestBanner: {
      title: 'Faculty Academic Briefing',
      badge: '3 Logbooks',
      scopeLabel: 'Faculty Senate & Sections',
      subtitle: '3 late lab logbook queries & Cleanroom calibration notice · Zero student lounge noise',
    },
    exclusiveFeature: {
      label: 'Teacher Console (Faculty Desk)',
      shortLabel: 'Teacher Console',
      icon: '🎓',
      bg: '#E87A3D',
      color: '#FFFFFF',
      description: 'Verify section logbooks, publish assignments/syllabi, audit class reach & manage office hours.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Faculty Supervision & Teacher Console',
      badge: 'Tier 4 · Faculty Supervisor',
      subtitle: 'Integrated Teacher Console: Verify student lab logbooks, publish course rubrics & assignments, audit section reach, and sign academic endorsements.',
    },
    pulseTiles: {
      tile1: {
        label: 'Section Logbook Verification',
        badge: 'Tier 4 · Faculty',
        value: '64',
        unit: 'SIGNED LOGS',
        subRight: '3 Pending Review',
        progress: 92,
        footerLeft: 'Sections 10-B & 11-A Physics / CS',
        footerRight: 'Verify Logbooks →',
      },
      tile2: {
        label: 'Academic Notice Reach',
        badge: '96% Section Reach',
        value: '78',
        unit: 'ENROLLED SCHOLARS',
        subRight: '2 Unseen',
        footerLeft: 'PHY-301 & CS-204 Syllabi Synced',
        footerRight: 'Transparent',
      },
      tile3: {
        label: 'Faculty Console Overview',
        badge: 'Anti-Surveillance Compliant',
        stat1: { val: '3', label: 'Pending Logs' },
        stat2: { val: '4', label: 'Syllabi' },
        stat3: { val: '6', label: 'Office Slots' },
        footerLeft: 'Student Commons cryptographically air-gapped',
        footerRight: 'Faculty Seal',
      },
    },
  },

  authority: {
    subtitlePrefix: 'Governance Mandates',
    hero: {
      pill: 'Institutional Governance',
      title: 'Ratify Q3 STEM & Debating Society Equipment Grants',
      source: 'Dr. Farhana Yasmin · Office of the Principal',
      avatars: [
        { initials: 'FY', bg: '#EF4444' },
        { initials: 'MK', bg: '#E87A3D' },
        { initials: 'NA', bg: '#E0A83A' },
      ],
      moreLabel: '3 Charters Ready',
      timeLeft: 'Today 17:00',
      toastMessage: 'Authority Action: 3 Club Charter & Equipment Grants awaiting Principal ratification',
      detailSheetTitle: 'Institutional Grant & Charter Ratification',
      detailSheetDesc:
        'Approve BDT 1,45,000 allocation for Robotics Lab Bay 3 optical encoders and Springfield Debating Union regional tournament travel charter.',
      detailMeta: [
        { b: '3', span: 'Charters' },
        { b: '1,420', span: 'Students' },
        { b: '96.4%', span: 'Fairness' },
      ],
      detailCta: 'Open Authority Console →',
    },
    ringTile: {
      label: '96%',
      title: 'Node Fairness Index',
      subtitle: '1,368/1,420 reached in window',
      toastMessage: 'District 4 Node Fairness Index: 96.4% compliant across all departments',
    },
    checkTile: {
      doneTitle: 'Winter Recess Decree Signed ✓',
      pendingTitle: 'Sign Almanac Decree',
      doneSub: 'Synced to all 1,420 student calendars',
      pendingSub: 'Tap to ratify Cleanroom & Recess circular',
      toastDone: 'Official Almanac Decree signed & broadcasted to 1,420 students ✓',
      toastPending: 'Almanac Decree awaiting Principal signature',
    },
    wideBannerTile: {
      pill: 'District Fairness Audit (DC-1 / DC-2)',
      meta: 'Springfield Sovereign Node · Constitutional Oversight',
      timeLabel: '1 Flag',
      title: 'Audit Off-Hours Drop Flag on Eco-Stewardship Solar Notice',
      subtitle: 'Notice dropped at 23:45 PM with 41% reach · Urgency pulsing automatically suppressed',
      linkLabel: 'Authority Console',
      toastMessage: 'Opening Authority Console: District Fairness & DC-1/DC-2 Audit',
    },
    noticeTile: {
      title: 'SHA-256 Node Keys Synced',
      summary: 'Federation Protocol v2.1 active across District 4',
      linkText: 'Inspect node',
      toastMessage: 'Springfield Sovereign Node cryptographic keys verified',
    },
    deadlineTile: {
      timeLabel: 'Zero Breaches',
      title: 'Constitutional Anti-Surveillance Firewall Active',
      toastMessage: 'WP §14 Invariant: Administration is cryptographically locked out of Student Commons',
    },
    digestBanner: {
      title: 'Principal & Directorate Briefing',
      badge: '3 Mandates',
      scopeLabel: 'Institutional Board',
      subtitle: 'Charter ratifications, district reach metrics & ministry accreditation · Tap to review',
    },
    exclusiveFeature: {
      label: 'Authority Console (Governance)',
      shortLabel: 'Authority Console',
      icon: '🏛️',
      bg: '#EF4444',
      color: '#FFFFFF',
      description: 'Broadcast official circulars, ratify club charters/budgets, audit district fairness & decrees.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Institutional Governance & Authority Console',
      badge: 'Tier 5 · Institutional Board',
      subtitle: 'Integrated Authority Console: Issue official campus circulars, ratify club charters & budgets, audit DC-1/DC-2 network fairness, and govern node almanac decrees.',
    },
    pulseTiles: {
      tile1: {
        label: 'District Node Reach & Fairness',
        badge: 'Tier 5 · Principal',
        value: '96.4%',
        unit: 'FAIRNESS INDEX',
        subRight: '1,420 Enrolled',
        progress: 96,
        footerLeft: 'DC-1 & DC-2 Constitutional Rules Enforced',
        footerRight: 'Audit Node →',
      },
      tile2: {
        label: 'Charters & Decrees Ratified',
        badge: 'Root Signatory',
        value: '18',
        unit: 'DECREES SIGNED',
        subRight: '3 Pending Today',
        footerLeft: 'All club successions & budgets verified',
        footerRight: 'Sovereign Trust',
      },
      tile3: {
        label: 'Constitutional Firewall',
        badge: 'WP §14 Verified',
        stat1: { val: '3', label: 'Guilds' },
        stat2: { val: '100%', label: 'Firewall' },
        stat3: { val: '0', label: 'Surveillance' },
        footerLeft: 'Zero administrative access to Student Commons',
        footerRight: 'Cryptographic Lock',
      },
    },
  },

  alumni: {
    subtitlePrefix: 'Alumni Fellowship',
    hero: {
      pill: 'Sovereign Fellow ’24',
      title: 'Guest Review: Autonomous Rover Pitch Decks',
      source: 'Zara Kabir (Class of ’24) · Robotics Fellowship Desk',
      avatars: [
        { initials: 'ZK', bg: '#9C7CF8' },
        { initials: 'NA', bg: '#E0A83A' },
        { initials: 'TH', bg: '#10B981' },
      ],
      moreLabel: '6 Squads',
      timeLeft: 'Tomorrow 18:00',
      toastMessage: 'Alumni Mentorship: Reviewing 6 student rover pitch decks',
      detailSheetTitle: 'Alumni Fellow Pitch Deck Review',
      detailSheetDesc:
        'Provide technical architecture feedback to Springfield High’s 2026 Robotics squads ahead of the Regional Qualifiers. Permanent read-only access to 2024–2026 playbooks.',
      detailMeta: [
        { b: '’24', span: 'Cohort' },
        { b: '48', span: 'Witnessed' },
        { b: 'SHA-256', span: 'Seal' },
      ],
      detailCta: 'Open Alumni Archive →',
    },
    ringTile: {
      label: '100%',
      title: 'Ledger Seal Intact',
      subtitle: '48 historical acts verified',
      toastMessage: 'Cryptographic Alumni Ledger Seal #4D7E-8F12 verified',
    },
    checkTile: {
      doneTitle: 'Succession Lineage Verified ✓',
      pendingTitle: 'Co-Sign 2026 Lineage',
      doneSub: '2024 → 2025 → 2026 handover intact',
      pendingSub: 'Tap to endorse outgoing steward handover',
      toastDone: 'Endorsed 2026 Robotics Steward Succession Lineage ✓',
      toastPending: 'Pending Alumni lineage endorsement',
    },
    wideBannerTile: {
      pill: 'Permanent Archive',
      meta: 'Class of 2024 · Honorary Sovereign Seat',
      timeLabel: 'Seal',
      title: 'Export Portable Cryptographic Ledger Pack (.JSON / PDF Proof)',
      subtitle: 'Contains 48 witnessed acts signed by Mr. Rahman & Dr. Farhana Yasmin',
      linkLabel: 'Alumni Console',
      toastMessage: 'Opening Alumni Sovereign Archive & Export Desk',
    },
    noticeTile: {
      title: 'Annual Alumni Colloquium',
      summary: 'Keynote panel scheduled for October 4 in Main Auditorium',
      linkText: 'RSVP seat',
      toastMessage: 'Alumni VIP front-row seat confirmed for Oct 4 Colloquium',
    },
    deadlineTile: {
      timeLabel: 'Permanent',
      title: 'Read-Only Access to Historical Club Wikis',
      toastMessage: 'Permanent Alumni Fellowship read-only access active',
    },
    digestBanner: {
      title: 'Alumni Fellowship Digest',
      badge: '2 Updates',
      scopeLabel: 'Honorary Archive',
      subtitle: '2026 Steward Succession notes & Annual Keynote invitation · Tap to inspect',
    },
    exclusiveFeature: {
      label: 'Alumni Sovereign Archive',
      shortLabel: 'Alumni Archive',
      icon: '🏛️',
      bg: '#8B5CF6',
      color: '#FFFFFF',
      description: 'Verify permanent SHA-256 ledger packs, inspect historical wikis & mentor current stewards.',
      boardSection: 'console',
    },
    boardHeader: {
      title: 'Alumni Sovereign Archive & Mentorship Board',
      badge: 'Tier 6 · Sovereign Fellow',
      subtitle: 'Permanent read-only historical memory, portable cryptographic ledger verification, and successor steward mentorship.',
    },
    pulseTiles: {
      tile1: {
        label: 'Permanent Sovereign Ledger',
        badge: 'Class of 2024',
        value: '48',
        unit: 'WITNESSED ACTS',
        subRight: 'SHA-256 Sealed',
        progress: 100,
        footerLeft: 'Exportable for university & fellowship portfolios',
        footerRight: 'Inspect Ledger →',
      },
      tile2: {
        label: 'Club Lineage Continuity',
        badge: '3 Generations',
        value: '2024',
        unit: '→ 2026 INTACT',
        subRight: 'Zero Gap',
        footerLeft: 'Playbooks v1–v7 preserved in Robotics Wiki',
        footerRight: 'Immutable',
      },
      tile3: {
        label: 'Alumni Fellowship Standing',
        badge: 'Permanent Seat',
        stat1: { val: '48', label: 'Archived' },
        stat2: { val: '22', label: 'Playbooks' },
        stat3: { val: '6', label: 'Mentored' },
        footerLeft: 'Read-only access to institutional archives',
        footerRight: 'Fellow Seal',
      },
    },
  },
};

// Role-exclusive communication channels to ensure Teacher, Authority, Steward, Dweller, and Alumni
// never see conflicting student-only chats, and vice versa!
export const ROLE_EXCLUSIVE_CHANNELS: CommunicationChannel[] = [
  // Authority & Faculty Exclusive Governance Channels
  {
    id: 'ch-authority-directorate',
    name: 'Institutional Governance Directorate',
    slug: 'authority-directorate',
    category: 'authority',
    privacySphere: 'public_institutional',
    allowedRoles: ['authority'],
    description: 'Principal Office, District 4 Education Board, and Charter Ratification command channel.',
    unreadCount: 2,
    isMuted: false,
    participantCount: 12,
    quietHours: 'Priority Governance Desk',
    antiSurveillanceGuarantee: 'Official Institutional Governance Record. Cryptographically signed decrees.',
    lastMessage: 'Dr. Farhana Yasmin: Q3 Robotics & Debating equipment grants are queued for final ratification.',
    lastMessageTime: '10:45 AM',
    topic: 'District charter ratifications, budget allocations, and DC-1/DC-2 fairness audits.',
  },
  {
    id: 'ch-faculty-senate',
    name: 'Faculty Senate & Academic Council',
    slug: 'faculty-senate',
    category: 'faculty',
    privacySphere: 'public_institutional',
    allowedRoles: ['authority', 'teacher'],
    description: 'Department chairs, laboratory supervisors, and examination moderation committee.',
    unreadCount: 3,
    isMuted: false,
    participantCount: 34,
    quietHours: 'Weekdays 8:00 AM - 5:00 PM',
    antiSurveillanceGuarantee: 'Faculty & Administration Academic Coordination Channel.',
    lastMessage: 'Prof. M. Kaykobad: Section 10-B Physics lab logbook verifications are 92% complete.',
    lastMessageTime: '11:15 AM',
    topic: 'Syllabus addendums, lab logbook sign-offs, and Olympiad faculty endorsements.',
  },
  {
    id: 'ch-steward-council',
    name: 'Sovereign Stewards Executive Council',
    slug: 'steward-council',
    category: 'club',
    privacySphere: 'public_institutional',
    allowedRoles: ['steward', 'loyal_core'],
    description: 'Inter-club Lead Stewards & Deputies coordination for fixture scheduling, curation, and succession.',
    unreadCount: 2,
    isMuted: false,
    participantCount: 18,
    quietHours: 'Quiet Hours: 9:00 PM - 7:00 AM',
    antiSurveillanceGuarantee: 'Executive Club Stewards Enclave. Zero pad-ranking enforcement.',
    lastMessage: 'Nafis Ahmed: Please check DC-1 reach before approving forwarded hackathon notices.',
    lastMessageTime: '11:30 AM',
    topic: 'Inter-club calendar deconfliction, bot curation queue, and handover protocols.',
  },
  {
    id: 'ch-alumni-fellowship',
    name: 'Sovereign Alumni Fellowship Network',
    slug: 'alumni-fellowship',
    category: 'club',
    privacySphere: 'public_institutional',
    allowedRoles: ['alumni', 'steward', 'authority'],
    description: 'Graduated Stewards and Honorary Fellows mentoring current cohorts and verifying historical archives.',
    unreadCount: 1,
    isMuted: false,
    participantCount: 85,
    quietHours: 'Async Global Digest',
    antiSurveillanceGuarantee: 'Permanent Alumni Fellowship Record.',
    lastMessage: 'Zara Kabir (’24): Reviewed the 2026 Robotics succession charter — PID playbook v7 looks rock solid!',
    lastMessageTime: 'Yesterday',
    topic: 'Successor mentorship, university portfolio verification, and annual symposium.',
  },
];

export const ROLE_EXCLUSIVE_MESSAGES: DispatchMessage[] = [
  {
    id: 'disp-gov-1',
    channelId: 'ch-authority-directorate',
    senderName: 'District 4 Accreditation Officer',
    senderRole: 'authority',
    timestamp: 'Today, 9:30 AM',
    content: ' Springfield Sovereign Node achieved 96.4% DC-1 fairness reach across all 14 institutional circulars this month. Only 1 peer-dropped notice (Solar Audit at 23:45 PM) triggered DC-2 motion suppression.',
    isOfficial: true,
    actionableTask: {
      title: 'Sign Monthly District 4 Fairness Compliance Certificate',
      deadline: 'Today, 5:00 PM',
      points: 80,
    },
  },
  {
    id: 'disp-gov-2',
    channelId: 'ch-authority-directorate',
    senderName: 'Dr. Farhana Yasmin (Principal)',
    senderRole: 'authority',
    timestamp: 'Today, 10:45 AM',
    content: 'Q3 Robotics Lab Bay 3 optical encoder grant (BDT 85,000) and Debating Union regional travel charter (BDT 60,000) are ready for final ratification in the Authority Console.',
    isOfficial: true,
  },
  {
    id: 'disp-fac-1',
    channelId: 'ch-faculty-senate',
    senderName: 'Dr. S. K. Sen (Head of Sciences)',
    senderRole: 'teacher',
    timestamp: 'Today, 9:45 AM',
    content: 'Colleagues, please ensure all Section 10-B and 11-A laboratory logbooks for Experiments 1–7 are stamped in the Teacher Console before Thursday’s cleanroom calibration.',
    isOfficial: true,
    actionableTask: {
      title: 'Complete Section 10-B Lab Logbook Batch Sign-Off',
      deadline: 'Today, 4:00 PM',
      points: 60,
    },
  },
  {
    id: 'disp-fac-2',
    channelId: 'ch-faculty-senate',
    senderName: 'Prof. M. Kaykobad',
    senderRole: 'teacher',
    timestamp: 'Today, 11:15 AM',
    content: 'I have published the PHY-301 Mid-Term Rubric Addendum specifying non-programmable scientific calculators. 96% of Section 11-A students have already received the alert.',
    isOfficial: true,
  },
  {
    id: 'disp-stw-1',
    channelId: 'ch-steward-council',
    senderName: 'Zareen Tasnim (Debate Lead Steward)',
    senderRole: 'steward',
    timestamp: 'Today, 10:10 AM',
    content: 'Debating Union adjudicator tab and motion briefing is set for 18:00 tonight. We avoided scheduling over the Robotics Bay 3 hardware checkout window.',
    isOfficial: false,
  },
  {
    id: 'disp-stw-2',
    channelId: 'ch-steward-council',
    senderName: 'Nafis Ahmed (Robotics Lead Steward)',
    senderRole: 'steward',
    timestamp: 'Today, 11:30 AM',
    content: 'Thanks Zareen! Reminder to all Stewards: 2 forwarded items from the Telegram ingestion bot are in our Curate Queue. Verify DC-1 timing before approving to the District Radar.',
    isOfficial: false,
    actionableTask: {
      title: 'Curate 2 Pending Federation Bot Submissions in Steward Console',
      deadline: 'Today, 6:00 PM',
      points: 50,
    },
  },
  {
    id: 'disp-alm-1',
    channelId: 'ch-alumni-fellowship',
    senderName: 'Zara Kabir (Alumni Fellow ’24)',
    senderRole: 'alumni',
    timestamp: 'Yesterday, 8:20 PM',
    content: 'Reviewed the 2026 Robotics Society handover briefing from Nafis Ahmed to Tahmid Hasan. Having 7 versions of the Line-Follower PID Playbook preserved in the club wiki is exactly why we built Stele.',
    isOfficial: false,
  },
];

export const getRoleHorizonTitle = (role: Role, pts: number): string => {
  switch (role) {
    case 'steward':
      return pts >= 1100 ? 'Sovereign Lead Steward' : 'Executive Club Steward';
    case 'teacher':
      return pts >= 900 ? 'Distinguished Faculty Supervisor' : 'Faculty Academic Mentor';
    case 'authority':
      return pts >= 1400 ? 'Constitutional Node Signatory' : 'Institutional Authority';
    case 'loyal_core':
      return pts >= 800 ? 'Deputy Core Architect' : 'Loyal Core Editor';
    case 'alumni':
      return 'Honorary Alumni Fellow';
    case 'dweller':
      return 'Quiet Campus Observer';
    case 'member':
      return pts >= 700 ? 'Senior Guild Member' : 'Active Club Member';
    case 'aspirant':
    default:
      if (pts >= 900) return 'Foundational Scholar';
      if (pts >= 600) return 'Consistent Trialist';
      if (pts >= 300) return 'Active Aspirant';
      return 'Emerging Trialist';
  }
};

