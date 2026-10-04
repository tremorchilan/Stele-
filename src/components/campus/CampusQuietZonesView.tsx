import React, { useState } from 'react';
import { CampusQuietZone } from '../../types';
import { MOCK_QUIET_ZONES } from '../../data/academicCalendarData';
import {
  Volume2,
  VolumeX,
  Wifi,
  Zap,
  CheckCircle2,
  ArrowLeft,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface CampusQuietZonesViewProps {
  onBack: () => void;
  onShowToast: (msg: string) => void;
  isDark: boolean;
}

export const CampusQuietZonesView: React.FC<CampusQuietZonesViewProps> = ({
  onBack,
  onShowToast,
  isDark,
}) => {
  const [zones, setZones] = useState<CampusQuietZone[]>(MOCK_QUIET_ZONES);
  const [reservedZoneId, setReservedZoneId] = useState<string | null>(null);

  const handleReserve = (zone: CampusQuietZone) => {
    if (reservedZoneId === zone.id) {
      setReservedZoneId(null);
      onShowToast(`Pod reservation at ${zone.name} released.`);
      return;
    }
    setReservedZoneId(zone.id);
    onShowToast(`45-minute focus session reserved at ${zone.name}! Access pin sent to your Stele ledger.`);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[var(--rule-default)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-[12px] bg-[var(--tile)] border border-[var(--rule-default)] text-[var(--meta)] hover:text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Back to Campus Hub"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
              <span className="text-[var(--accent)]">Sensory Environment</span>
              <span className="text-[var(--meta)]">·</span>
              <span className="text-[var(--reward-done)]">Real-Time Acoustic Telemetry</span>
            </div>
            <h1 className="text-[22px] font-extrabold text-[var(--text)] mt-0.5">
              Campus Quiet Zones &amp; Live Study Pods
            </h1>
          </div>
        </div>

        <span className="text-[12px] text-[var(--meta)] font-mono">
          Updated 10s ago via Campus Acoustic Enclaves
        </span>
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((zone) => {
          const isReserved = reservedZoneId === zone.id;
          return (
            <div
              key={zone.id}
              className={`tile flex flex-col justify-between ${
                isReserved
                  ? '!border-[var(--reward-done)] ring-1 ring-[var(--reward-done)]'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`pill ${
                      zone.noiseLevel === 'Silent'
                        ? ''
                        : zone.noiseLevel === 'Whisper'
                        ? 'on'
                        : 'urgent'
                    }`}
                    style={{ marginBottom: 0 }}
                  >
                    {zone.noiseLevel === 'Silent' ? (
                      <VolumeX className="w-3 h-3" />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                    <span>{zone.noiseLevel} Zone</span>
                  </span>

                  <span className="text-[14px] font-mono font-bold text-[var(--text)]">
                    {zone.noiseDb} dB
                  </span>
                </div>

                <h3 className="text-[17px] font-bold text-[var(--text)]">
                  {zone.name}
                </h3>

                <p className="text-[12px] text-[var(--meta)] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{zone.location}</span>
                </p>

                {/* Amenities */}
                <div className="flex items-center gap-3 mt-4 text-[11.5px] text-[var(--meta)]">
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{zone.wifiSpeedMbps} Mbps</span>
                  </span>
                  {zone.powerOutlets && (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[var(--amber)]" />
                      <span>USB-C / AC</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--reward-done)]" />
                    <span>45m Slots</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--rule-default)]">
                <div className="flex items-center justify-between text-[12px] mb-2">
                  <span className="text-[var(--meta)]">Available Pods:</span>
                  <span className="font-bold text-[var(--text)] font-mono">
                    {isReserved ? zone.availablePods - 1 : zone.availablePods} / {zone.totalPods} Free
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleReserve(zone)}
                  className={`w-full py-2 rounded-[12px] text-[12.5px] font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                    isReserved
                      ? 'bg-[var(--reward-done)] text-white hover:opacity-90'
                      : 'bg-[var(--accent)] text-white hover:opacity-90'
                  }`}
                >
                  {isReserved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Reserved · Slot Active</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Reserve 45m Pod</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
