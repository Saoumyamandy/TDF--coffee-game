/**
 * Web Audio Synthesizer for Coffee Craft Master
 * Provides warm, lo-fi cafe chord progressions and tactile barista sound effects
 * without relying on external audio files that could fail.
 */

class CoffeeAudioManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicVolume = 0.25;
  private sfxVolume = 0.45;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isRunning = false;
  private currentStep = 0;
  private timerId: number | null = null;

  // Cozy Lo-Fi Coffee Shop Progression (frequencies in Hz)
  // Fmaj9 -> Am7 -> Bbmaj7 -> C9sus4
  private chordProgression = [
    // Fmaj9: F3, C4, E4, G4, A4
    [174.61, 261.63, 329.63, 392.00, 440.00],
    // Am7: A3, C4, E4, G4
    [220.00, 261.63, 329.63, 392.00],
    // Bbmaj7: Bb3, D4, F4, A4
    [233.08, 293.66, 349.23, 440.00],
    // C9sus4 / Gm7: G3, C4, D4, F4
    [196.00, 261.63, 293.66, 349.23],
    // Dm9: D3, A3, C4, E4, F4
    [146.83, 220.00, 261.63, 329.63, 349.23],
    // Gm7: G3, Bb3, D4, F4
    [196.00, 233.08, 293.66, 349.23],
    // C11 / C7: C3, G3, Bb3, D4, E4
    [130.81, 196.00, 233.08, 293.66, 329.63],
    // Fmaj7 (warm home): F3, A3, C4, E4
    [174.61, 220.00, 261.63, 329.63],
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Music Master Bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMusicPlaying ? this.musicVolume : 0, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      // SFX Master Bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMusic(enable?: boolean): boolean {
    this.initContext();
    const targetState = enable !== undefined ? enable : !this.isMusicPlaying;
    this.isMusicPlaying = targetState;

    if (this.musicGain && this.ctx) {
      const now = this.ctx.currentTime;
      if (this.isMusicPlaying) {
        this.musicGain.gain.cancelScheduledValues(now);
        this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
        this.musicGain.gain.linearRampToValueAtTime(this.musicVolume, now + 1.2);
        if (!this.isRunning) {
          this.startMusicLoop();
        }
      } else {
        this.musicGain.gain.cancelScheduledValues(now);
        this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
        this.musicGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      }
    }

    return this.isMusicPlaying;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicGain && this.ctx && this.isMusicPlaying) {
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  private startMusicLoop() {
    this.isRunning = true;
    const playNextBeat = () => {
      if (!this.isRunning) return;
      if (this.ctx && this.isMusicPlaying) {
        this.scheduleLoFiChord(this.currentStep);
        this.currentStep = (this.currentStep + 1) % this.chordProgression.length;
      }
      // ~2.4 seconds per bar: relaxed 50-60 BPM cafe vibe
      this.timerId = window.setTimeout(playNextBeat, 2400);
    };
    playNextBeat();
  }

  private scheduleLoFiChord(chordIndex: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const freqs = this.chordProgression[chordIndex % this.chordProgression.length];

    // Warm Rhodes / Electric Piano synthesis
    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm mellow tone with sine/triangle blend
      osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Low-pass warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 2.0);

      // Subtle human strum offset
      const strumOffset = i * 0.035;
      const startTime = now + strumOffset;
      const noteDuration = 2.2;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.08 / (i + 1), startTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(startTime);
      osc.stop(startTime + noteDuration + 0.1);
    });

    // Subtle soft acoustic jazz brush/tick
    this.playSoftBrush(now);
    this.playSoftBrush(now + 1.2);
  }

  private playSoftBrush(time: number) {
    if (!this.ctx || !this.musicGain) return;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, time);
    filter.Q.setValueAtTime(2.5, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.015, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  // --- Sound Effects ---

  /** Soft liquid droplet / pour sound when adding liquid or espresso */
  public playDropSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /** High crystalline clinking sound for ice cubes */
  public playIceSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    [1760, 2489, 3136].forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.02);

      gain.gain.setValueAtTime(0.12, now + idx * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.02);
      osc.stop(now + idx * 0.02 + 0.2);
    });
  }

  /** Soft steam hiss for hot water / steam / foam */
  public playSteamSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.22);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.25);
  }

  /** Celebratory discovery chime when a recipe matches! Includes 8-bit retro victory flair */
  public playDiscoverySound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Harmonious retro 8-bit arpeggio: C5 -> E5 -> G5 -> C6 -> E6 -> G6
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

    arpeggio.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const noteTime = now + idx * 0.075;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Retro square wave mixed with triangle
      osc.type = idx % 2 === 0 ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });
  }

  /** Retro 8-bit Coin chime */
  public playCoinSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(this.sfxGain);

    osc1.start(now);
    osc1.stop(now + 0.36);
  }

  /** Soft swirl sound when clearing the cup */
  public playPourOutSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /** Clean UI click */
  public playClickSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  public cleanup() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.isRunning = false;
  }
}

export const coffeeAudio = new CoffeeAudioManager();
