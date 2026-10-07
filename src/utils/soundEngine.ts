// Native Web Audio API Micro-Haptics Engine
// Zero external files, 0 kB bandwidth, synthesized in-browser with precision envelopes.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export const SOUND_STORAGE_KEY = "portfolio_audio_enabled";

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SOUND_STORAGE_KEY) === "true";
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "true" : "false");
}

function runWithContext(synth: (ctx: AudioContext) => void, force = false): void {
  if (!force && !isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const execute = () => {
    try {
      synth(ctx);
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  };

  // Modern browsers require resuming AudioContext after user interaction gesture
  if (ctx.state === "suspended") {
    ctx.resume().then(execute).catch(() => {});
  } else {
    execute();
  }
}

export function playClick(): void {
  runWithContext((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  });
}

export function playToggle(isDark: boolean): void {
  runWithContext((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    const startFreq = isDark ? 660 : 440;
    const endFreq = isDark ? 440 : 660;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  });
}

export function playPalette(): void {
  runWithContext((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.07);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  });
}

export function playSuccess(force = false): void {
  runWithContext((ctx) => {
    const now = ctx.currentTime;

    // Harmonic 2-note chime: C5 (523.25Hz) -> G5 (783.99Hz)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(783.99, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.12);

    osc2.start(now + 0.08);
    osc2.stop(now + 0.22);
  }, force);
}
