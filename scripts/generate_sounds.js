const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;

function createWavBuffer(samplesLeft, samplesRight) {
  const numSamples = samplesLeft.length;
  const numChannels = 2;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = numSamples * blockAlign;
  
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  const data = Buffer.alloc(dataSize);
  for (let i = 0; i < numSamples; i++) {
    const l = Math.tanh(samplesLeft[i]);
    const r = Math.tanh(samplesRight[i]);
    const s16L = Math.max(-32768, Math.min(32767, Math.floor(l * 32767)));
    const s16R = Math.max(-32768, Math.min(32767, Math.floor(r * 32767)));
    data.writeInt16LE(s16L, i * 4);
    data.writeInt16LE(s16R, i * 4 + 2);
  }

  return Buffer.concat([header, data]);
}

function generateCrackTear() {
  const duration = 0.45;
  const totalSamples = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  const fracturePoints = [
    { time: 0.000, amp: 1.0, freq: 1450, resonance: 0.045 },
    { time: 0.045, amp: 0.65, freq: 1120, resonance: 0.035 },
    { time: 0.110, amp: 0.85, freq: 1680, resonance: 0.050 },
    { time: 0.185, amp: 0.70, freq: 940, resonance: 0.040 },
    { time: 0.260, amp: 0.90, freq: 1350, resonance: 0.045 },
    { time: 0.330, amp: 0.75, freq: 880, resonance: 0.035 },
  ];

  for (const fp of fracturePoints) {
    const startSample = Math.floor(fp.time * SAMPLE_RATE);
    const endSample = Math.min(totalSamples, startSample + Math.floor(fp.resonance * 3 * SAMPLE_RATE));
    for (let i = startSample; i < endSample; i++) {
      const t = (i - startSample) / SAMPLE_RATE;
      const env = Math.exp(-t / fp.resonance);
      
      const noise = (Math.random() * 2 - 1) * env * fp.amp * 0.8;
      const tone = Math.sin(2 * Math.PI * fp.freq * t) * env * fp.amp * 0.45;
      const snap = Math.sin(2 * Math.PI * (fp.freq * 0.25) * Math.exp(-t * 80) * t) * env * fp.amp * 0.35;

      const sampleVal = noise + tone + snap;
      left[i] += sampleVal * 0.95;
      right[i] += sampleVal * 0.88;
    }
  }

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 6);
    const lowRumble = Math.sin(2 * Math.PI * (120 - t * 140) * t) * env * 0.35;
    left[i] += lowRumble;
    right[i] += lowRumble;
  }

  return createWavBuffer(left, right);
}

function generateCrackImpact() {
  const duration = 0.68;
  const totalSamples = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;

    const strikeEnv = Math.exp(-t * 90);
    const strikeNoise = (Math.random() * 2 - 1) * strikeEnv * 1.3;

    const bodyEnv = Math.exp(-t * 14);
    const bodyOsc = Math.sin(2 * Math.PI * (165 * Math.exp(-t * 18)) * t) * bodyEnv * 0.85;

    const subEnv = Math.exp(-t * 5.5);
    const subFreq = 58 - t * 45;
    const subOsc = Math.sin(2 * Math.PI * subFreq * t) * subEnv * 1.15;

    let rumbleNoise = 0;
    if (t > 0.02) {
      const crumbleEnv = Math.exp(-(t - 0.02) * 8) * (Math.random() > 0.96 ? 1.4 : 0.25);
      rumbleNoise = (Math.random() * 2 - 1) * crumbleEnv * 0.45;
    }

    const mixedL = (strikeNoise * 1.1 + bodyOsc + subOsc + rumbleNoise);
    const mixedR = (strikeNoise * 0.9 + bodyOsc * 1.05 + subOsc + rumbleNoise * 1.1);

    left[i] = mixedL;
    right[i] = mixedR;
  }

  return createWavBuffer(left, right);
}

function generateWallParting() {
  const duration = 1.45;
  const totalSamples = Math.floor(SAMPLE_RATE * duration);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  let b0L = 0, b1L = 0, b2L = 0;
  let b0R = 0, b1R = 0, b2R = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;
    const globalEnv = Math.sin((t / duration) * Math.PI) * Math.exp(-t * 0.4);

    const whiteL = Math.random() * 2 - 1;
    const whiteR = Math.random() * 2 - 1;

    b0L = 0.94 * b0L + whiteL * 0.06;
    b1L = 0.94 * b1L + b0L * 0.06;
    b2L = 0.94 * b2L + b1L * 0.06;

    b0R = 0.94 * b0R + whiteR * 0.06;
    b1R = 0.94 * b1R + b0R * 0.06;
    b2R = 0.94 * b2R + b1R * 0.06;

    const frictionMod = Math.sin(2 * Math.PI * (16 + Math.sin(t * 8) * 6) * t);
    const stoneGrindL = b2L * 14.0 * (1 + 0.4 * frictionMod);
    const stoneGrindR = b2R * 14.0 * (1 + 0.4 * -frictionMod);

    const droneFreq = 38 - (t / duration) * 14;
    const drone = Math.sin(2 * Math.PI * droneFreq * t) * 0.55 * globalEnv;

    let pebble = 0;
    if (Math.random() > 0.992) {
      pebble = (Math.random() * 2 - 1) * 0.65;
    }

    left[i] = (stoneGrindL * globalEnv * 0.75 + drone + pebble);
    right[i] = (stoneGrindR * globalEnv * 0.75 + drone - pebble);
  }

  return createWavBuffer(left, right);
}

const outDir = path.resolve(process.cwd(), "public/assets/audio");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "crack-tear.wav"), generateCrackTear());
fs.writeFileSync(path.join(outDir, "crack-impact.wav"), generateCrackImpact());
fs.writeFileSync(path.join(outDir, "wall-parting.wav"), generateWallParting());

console.log("Audio files created in:", outDir);
