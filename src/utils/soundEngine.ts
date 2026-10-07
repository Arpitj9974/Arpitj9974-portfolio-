// Sound Engine disabled to ensure clean, silent, and distraction-free portfolio browsing.
export function isSoundEnabled(): boolean {
  return false;
}

export function setSoundEnabled(_enabled: boolean): void {}
export function playClick(): void {}
export function playToggle(_isDark?: boolean): void {}
export function playPalette(): void {}
export function playSuccess(_force?: boolean): void {}
