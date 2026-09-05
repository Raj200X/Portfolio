import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * AmbientNightSound — Procedural, atmospheric mountain night wind
 * synthesized via Web Audio API. Zero external audio downloads.
 */
export const AmbientNightSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Generate 4 seconds of organic pink noise
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const output = noiseBuffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Soft lowpass filter to mimic deep distant mountain wind
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    // LFO to modulate filter frequency for natural wind gusts
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // ~10s gust period
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(120, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNodeRef.current = masterGain;

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    whiteNoise.start(0);
    lfo.start(0);
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!isPlaying) {
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.2);
      setIsPlaying(true);
    } else {
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <button
      type="button"
      className={`hero-ambient-sound-btn ${isPlaying ? 'is-active' : ''}`}
      onClick={toggleSound}
      aria-label={isPlaying ? 'Mute ambient night breeze' : 'Play ambient night breeze'}
      title={isPlaying ? 'Mute night mountain breeze' : 'Play ambient night breeze'}
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="sound-label">{isPlaying ? 'Breeze: ON' : 'Breeze: OFF'}</span>
      {isPlaying && (
        <span className="sound-wave-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}
    </button>
  );
};

export default AmbientNightSound;
