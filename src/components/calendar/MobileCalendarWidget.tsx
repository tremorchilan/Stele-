import React, { useState, useMemo } from 'react';
import {
  X,
  Check,
  Calendar as CalendarIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
  Download,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import { UnifiedCalendarEvent } from '../UnifiedCalendarModal';
import { SteleItem, Commitment } from '../../types';

interface MobileCalendarWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  activeEvents: UnifiedCalendarEvent[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  academicEventsCount: number;
  tasksCount: number;
  opportunitiesCount: number;
  onCommitOpportunity?: (item: SteleItem) => void;
  onCompleteCommitment?: (cm: Commitment) => void;
  calendarSync: boolean;
  onToggleCalendarSync: (val: boolean) => void;
  onDownloadICS: () => void;
  onCopyWebCalFeed: () => void;
  onShowToast: (msg: string) => void;
  isDark: boolean;
  onSwitchToDesktopView?: () => void;
  isDeviceFrame?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const MobileCalendarWidget: React.FC<MobileCalendarWidgetProps> = ({
  isOpen,
  onClose,
  activeEvents,
  selectedDate,
  onSelectDate,
  onCommitOpportunity,
  onCompleteCommitment,
  calendarSync,
  onToggleCalendarSync,
  onDownloadICS,
  onCopyWebCalFeed,
  onShowToast,
  isDeviceFrame = true,
}) => {
  const parsedSelected = useMemo(() => {
    try {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    } catch {
      // Fallback
    }
    return new Date(2025, 8, 19);
  }, [selectedDate]);

  const [currentYear, setCurrentYear] = useState<number>(() => parsedSelected.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(() => parsedSelected.getMonth());
  const [streamFilter, setStreamFilter] = useState<'selected' | 'all_month' | 'deadlines' | 'events'>('selected');
  const [showSyncDrawer, setShowSyncDrawer] = useState(false);

  // Month Grid Cells with attached Deadlines & Events
  const monthCells = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    let startDayOfWeek = firstDay.getDay() - 1; // Mon = 0, Sun = 6
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const cells: {
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      events: UnifiedCalendarEvent[];
      dots: string[];
      hasCriticalDeadline: boolean;
      hasAnyDeadline: boolean;
      hasCampusEvent: boolean;
    }[] = [];

    const buildCell = (y: number, m: number, d: number, isCurrentMonth: boolean) => {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvts = activeEvents.filter((e) => e.date === dateStr);

      const dots: string[] = [];
      let hasCriticalDeadline = false;
      let hasAnyDeadline = false;
      let hasCampusEvent = false;

      dayEvts.forEach((evt) => {
        if (evt.sourceType === 'task' || (evt.sourceType === 'opportunity' && evt.urgency === 'critical')) {
          hasAnyDeadline = true;
          if (evt.urgency === 'critical') {
            hasCriticalDeadline = true;
            if (!dots.includes('#E87A3D')) dots.push('#E87A3D'); // Coral/Orange for Critical & Club Deadlines
          } else {
            if (!dots.includes('#E0A83A')) dots.push('#E0A83A'); // Amber for Approaching Deadlines
          }
        } else if (evt.sourceType === 'opportunity') {
          hasAnyDeadline = true;
          if (!dots.includes('#E0A83A')) dots.push('#E0A83A');
        } else if (evt.sourceType === 'academic') {
          hasCampusEvent = true;
          if (!dots.includes('#38BDF8')) dots.push('#38BDF8'); // Sky Blue for Campus & Academic Events
        }
      });

      return {
        dayNumber: d,
        dateStr,
        isCurrentMonth,
        events: dayEvts,
        dots: dots.slice(0, 3),
        hasCriticalDeadline,
        hasAnyDeadline,
        hasCampusEvent,
      };
    };

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevDaysInMonth - i;
      const pMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const pYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      cells.push(buildCell(pYear, pMonth, d, false));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(buildCell(currentYear, currentMonth, d, true));
    }

    // Pad to 35 or 42 cells for clean rows
    const totalNeeded = cells.length > 35 ? 42 : 35;
    const remaining = totalNeeded - cells.length;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    for (let d = 1; d <= remaining; d++) {
      cells.push(buildCell(nextYear, nextMonth, d, false));
    }

    return cells;
  }, [currentYear, currentMonth, activeEvents]);

  // Month-wide counts for header hint strip
  const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const monthDeadlinesCount = useMemo(
    () => activeEvents.filter((e) => e.date.startsWith(monthPrefix) && (e.sourceType === 'task' || e.sourceType === 'opportunity')).length,
    [activeEvents, monthPrefix]
  );
  const monthEventsCount = useMemo(
    () => activeEvents.filter((e) => e.date.startsWith(monthPrefix) && e.sourceType === 'academic').length,
    [activeEvents, monthPrefix]
  );

  // Filtered events for the bottom hints & agenda list
  const displayedEvents = useMemo(() => {
    if (streamFilter === 'selected') {
      const exact = activeEvents.filter((e) => e.date === selectedDate);
      if (exact.length > 0) return exact;
      // If selected date has no events, show upcoming hints from this month so the user always sees hints of Deadlines & Events
      return activeEvents.filter((e) => e.date.startsWith(monthPrefix)).slice(0, 5);
    }
    if (streamFilter === 'deadlines') {
      return activeEvents.filter(
        (e) => e.date.startsWith(monthPrefix) && (e.sourceType === 'task' || e.sourceType === 'opportunity')
      );
    }
    if (streamFilter === 'events') {
      return activeEvents.filter((e) => e.date.startsWith(monthPrefix) && e.sourceType === 'academic');
    }
    return activeEvents.filter((e) => e.date.startsWith(monthPrefix));
  }, [activeEvents, selectedDate, streamFilter, monthPrefix]);

  const selectedDayHasExactEvents = useMemo(
    () => activeEvents.some((e) => e.date === selectedDate),
    [activeEvents, selectedDate]
  );

  const handleSelectDay = (dateStr: string) => {
    onSelectDate(dateStr);
    setStreamFilter('selected');
    try {
      const parts = dateStr.split('-');
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      if (m !== currentMonth || y !== currentYear) {
        setCurrentYear(y);
        setCurrentMonth(m);
      }
    } catch {
      // ignore
    }
  };

  const formatShortDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isDeviceFrame
          ? 'absolute inset-0 z-[58] rounded-[44px] overflow-hidden'
          : 'fixed inset-0 z-50 p-3 sm:p-4 items-center justify-center'
      } bg-black/72 backdrop-blur-xs flex flex-col justify-end mobile-calendar-backdrop`}
      onClick={onClose}
    >
      {/* Strictly Confined Mobile Calendar Sheet inside .device */}
      <div
        className={`w-full ${
          isDeviceFrame
            ? 'max-h-[86%] rounded-t-[28px]'
            : 'max-w-[388px] max-h-[85vh] rounded-[30px] mx-auto'
        } bg-[#16161A] text-[#F4F4F5] border-t border-white/14 shadow-[0_-16px_48px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mobile-calendar-sheet relative select-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Grab Handle */}
        <div
          className="pt-2 pb-1 flex justify-center shrink-0 cursor-pointer"
          onClick={onClose}
          title="Close calendar sheet"
        >
          <div className="w-9 h-1 rounded-full bg-white/22" />
        </div>

        {/* Compact Top Header */}
        <div className="flex items-center justify-between px-3.5 pt-0.5 pb-2 border-b border-white/8 shrink-0">
          <button
            type="button"
            id="mobile-cal-close-btn"
            onClick={onClose}
            className="w-7.5 h-7.5 rounded-full bg-white/8 hover:bg-white/14 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Calendar"
          >
            <X className="w-4 h-4 stroke-[2.4]" />
          </button>

          <div className="text-center">
            <h2 className="text-[14px] font-extrabold text-white tracking-tight flex items-center justify-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#E87A3D]" />
              <span>Campus Calendar</span>
            </h2>
            <p className="text-[10px] text-[#A2A2AA] font-semibold">
              {monthDeadlinesCount} Deadlines · {monthEventsCount} Events in {MONTH_NAMES[currentMonth].slice(0, 3)}
            </p>
          </div>

          <button
            type="button"
            id="mobile-cal-confirm-btn"
            onClick={() => {
              onShowToast(`Calendar synced · Viewing ${formatShortDate(selectedDate)}`);
              onClose();
            }}
            className="w-7.5 h-7.5 rounded-full bg-[#E87A3D] text-white flex items-center justify-center font-bold shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Done"
          >
            <Check className="w-4 h-4 stroke-[2.8]" />
          </button>
        </div>

        {/* Scrollable Content Strictly Confined Inside Device Frame */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3 pt-2 pb-6 space-y-2.5 no-scrollbar">
          {/* Interactive Deadlines & Events Hint Summary Pills */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setStreamFilter(streamFilter === 'deadlines' ? 'selected' : 'deadlines')}
              className={`px-2.5 py-1.5 rounded-[12px] border text-left transition-all cursor-pointer flex items-center justify-between ${
                streamFilter === 'deadlines'
                  ? 'bg-[#E87A3D]/20 border-[#E87A3D] text-white'
                  : 'bg-white/[0.04] border-white/8 text-[#D4D4D8] hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#E87A3D] shadow-[0_0_6px_#E87A3D] shrink-0" />
                <div className="truncate">
                  <div className="text-[10.5px] font-extrabold text-white leading-tight">
                    {monthDeadlinesCount} Deadlines
                  </div>
                  <div className="text-[9px] text-[#9A9AA2] truncate">
                    Club, Task &amp; Radar Due
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E87A3D]/20 text-[#E87A3D] shrink-0">
                DUE
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStreamFilter(streamFilter === 'events' ? 'selected' : 'events')}
              className={`px-2.5 py-1.5 rounded-[12px] border text-left transition-all cursor-pointer flex items-center justify-between ${
                streamFilter === 'events'
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-white'
                  : 'bg-white/[0.04] border-white/8 text-[#D4D4D8] hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] shrink-0" />
                <div className="truncate">
                  <div className="text-[10.5px] font-extrabold text-white leading-tight">
                    {monthEventsCount} Events
                  </div>
                  <div className="text-[9px] text-[#9A9AA2] truncate">
                    Campus &amp; Almanac
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] shrink-0">
                EVT
              </span>
            </button>
          </div>

          {/* Month Navigation + Compact 7-Column Grid with Deadline & Event Hints */}
          <div className="p-2 rounded-[16px] bg-[#1E1E24] border border-white/8">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-extrabold text-white tracking-tight">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </span>
                <span className="text-[9.5px] font-semibold text-[#9A9AA2] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E87A3D]" />
                  <span>Due</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] ml-1" />
                  <span>Event</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear((y) => y - 1);
                    } else {
                      setCurrentMonth((m) => m - 1);
                    }
                  }}
                  className="w-6 h-6 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center text-gray-300 cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear((y) => y + 1);
                    } else {
                      setCurrentMonth((m) => m + 1);
                    }
                  }}
                  className="w-6 h-6 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center text-gray-300 cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Day-of-Week Headers */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#7A8595] pb-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Day Cells with Color-Coded Deadline & Event Hints */}
            <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center">
              {monthCells.map((cell) => {
                const isSelected = cell.dateStr === selectedDate;
                const hasItems = cell.events.length > 0;

                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => handleSelectDay(cell.dateStr)}
                    className={`relative flex flex-col items-center justify-center h-[31px] rounded-[9px] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E87A3D] text-white font-extrabold shadow-[0_2px_10px_rgba(232,122,61,0.45)]'
                        : cell.hasCriticalDeadline
                        ? 'bg-[#E87A3D]/14 border border-[#E87A3D]/40 text-white font-bold'
                        : cell.hasAnyDeadline
                        ? 'bg-[#E0A83A]/10 border border-[#E0A83A]/30 text-gray-100 font-semibold'
                        : cell.hasCampusEvent
                        ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-gray-100 font-semibold'
                        : cell.isCurrentMonth
                        ? 'text-gray-200 hover:bg-white/6 font-medium'
                        : 'text-gray-600 font-normal'
                    }`}
                  >
                    <span className="text-[11.5px] leading-none">{cell.dayNumber}</span>

                    {/* Up to 3 Color-Coded Hint Dots per Day (PRD §15) */}
                    {hasItems && (
                      <div className="flex items-center justify-center gap-0.5 mt-0.5">
                        {cell.dots.map((dotColor, idx) => (
                          <span
                            key={idx}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: isSelected ? '#FFFFFF' : dotColor,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Jump Date Chips for Active Deadlines & Events */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {[
              { date: '2025-09-19', label: 'Sep 19 · 4 Due', color: '#E87A3D' },
              { date: '2025-09-20', label: 'Sep 20 · Radar', color: '#E0A83A' },
              { date: '2025-09-22', label: 'Sep 22 · Debate', color: '#E87A3D' },
              { date: '2025-09-24', label: 'Sep 24 · Event', color: '#38BDF8' },
              { date: '2025-09-26', label: 'Sep 26 · Club Lab', color: '#E87A3D' },
            ].map((chip) => {
              const active = selectedDate === chip.date;
              return (
                <button
                  key={chip.date}
                  type="button"
                  onClick={() => handleSelectDay(chip.date)}
                  className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer shrink-0 ${
                    active
                      ? 'bg-white/15 border-white/30 text-white'
                      : 'bg-white/[0.04] border-white/8 text-[#9A9AA2] hover:text-white'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: chip.color }}
                  />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Deadlines & Events Filter Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[
                  { id: 'selected', label: `${formatShortDate(selectedDate)}` },
                  { id: 'all_month', label: 'All Month' },
                  { id: 'deadlines', label: 'Deadlines' },
                  { id: 'events', label: 'Events' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStreamFilter(tab.id as any)}
                    className={`px-2.5 py-1 rounded-[10px] text-[10.5px] font-bold transition-all cursor-pointer ${
                      streamFilter === tab.id
                        ? 'bg-[#E87A3D] text-white'
                        : 'bg-white/6 text-[#9A9AA2] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowSyncDrawer(!showSyncDrawer)}
                className="text-[10.5px] font-bold text-[#E87A3D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Sync</span>
              </button>
            </div>

            {/* Optional Compact Sync / ICS Drawer */}
            {showSyncDrawer && (
              <div className="p-2.5 rounded-[14px] bg-white/[0.05] border border-white/10 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Calendar Sync (iCal / WebCal)</span>
                  <button
                    type="button"
                    onClick={() => onToggleCalendarSync(!calendarSync)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      calendarSync ? 'bg-[#3DB16E] text-white' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {calendarSync ? 'Subscribed ✓' : 'Enable Sync'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onDownloadICS}
                    className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#E87A3D]" />
                    <span>.ICS Pack</span>
                  </button>
                  <button
                    type="button"
                    onClick={onCopyWebCalFeed}
                    className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <LinkIcon className="w-3 h-3 text-[#38BDF8]" />
                    <span>Copy WebCal</span>
                  </button>
                </div>
              </div>
            )}

            {!selectedDayHasExactEvents && streamFilter === 'selected' && (
              <div className="px-2.5 py-1.5 rounded-[10px] bg-white/[0.03] border border-white/6 text-[10.5px] text-[#9A9AA2] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E0A83A] shrink-0" />
                <span>No items on {formatShortDate(selectedDate)} · Showing upcoming month deadlines &amp; events:</span>
              </div>
            )}

            {/* Hints of Deadlines & Events Cards */}
            <div className="space-y-2">
              {displayedEvents.map((evt) => {
                const isCritical = evt.urgency === 'critical';
                const isAcademic = evt.sourceType === 'academic';
                const accentColor = isAcademic
                  ? '#38BDF8'
                  : isCritical
                  ? '#E87A3D'
                  : '#E0A83A';

                return (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-[14px] bg-[#1E1E24] border border-white/8 flex flex-col gap-1.5 text-left relative overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: accentColor }}
                    />

                    <div className="flex items-center justify-between gap-2 pl-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-[9.5px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-[5px]"
                          style={{
                            backgroundColor: `${accentColor}22`,
                            color: accentColor,
                            border: `1px solid ${accentColor}44`,
                          }}
                        >
                          {isAcademic ? 'Campus Event' : isCritical ? 'Club / Critical Due' : 'Deadline'}
                        </span>
                        <span className="text-[10.5px] font-semibold text-[#9A9AA2]">
                          {formatShortDate(evt.date)}
                        </span>
                      </div>

                      {evt.time && (
                        <span className="text-[10.5px] font-mono font-bold text-[#C4C4CC] flex items-center gap-1 shrink-0">
                          <Clock className="w-2.5 h-2.5" style={{ color: accentColor }} />
                          {evt.time}
                        </span>
                      )}
                    </div>

                    <div className="pl-1.5">
                      <h4 className="text-[13px] font-bold text-white leading-snug">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-[#9A9AA2] line-clamp-1 mt-0.5">
                        {evt.sourceInstitution || 'Springfield High'}
                        {evt.stewardName ? ` · ${evt.stewardName}` : ''}
                      </p>
                    </div>

                    {(evt.sourceType === 'task' && evt.originalCommitment) ||
                    (evt.sourceType === 'opportunity' && evt.originalItem) ? (
                      <div className="flex items-center justify-end pt-1 pl-1.5">
                        {evt.sourceType === 'task' && evt.originalCommitment && (
                          <button
                            type="button"
                            onClick={() => {
                              if (onCompleteCommitment && evt.originalCommitment) {
                                onCompleteCommitment(evt.originalCommitment);
                                onShowToast(`Completed: ${evt.title}`);
                              }
                            }}
                            className="px-2.5 py-1 rounded-[8px] bg-[#E87A3D] text-white text-[10.5px] font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Mark Complete</span>
                          </button>
                        )}

                        {evt.sourceType === 'opportunity' && evt.originalItem && (
                          <button
                            type="button"
                            onClick={() => {
                              if (onCommitOpportunity && evt.originalItem) {
                                onCommitOpportunity(evt.originalItem);
                                onShowToast(`Committed: ${evt.title}`);
                              }
                            }}
                            className="px-2.5 py-1 rounded-[8px] bg-white/10 hover:bg-white/15 text-white text-[10.5px] font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                          >
                            <span>Commit to Board</span>
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
