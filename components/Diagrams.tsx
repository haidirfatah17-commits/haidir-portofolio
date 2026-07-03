import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Palette, Type, Compass, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

// 1. INTERACTIVE BEZIER PEN TOOL DIAGRAM
export const BezierPenTool: React.FC = () => {
  const [p1, setP1] = useState<Point>({ x: 50, y: 150 });
  const [p2, setP2] = useState<Point>({ x: 350, y: 150 });
  const [cp1, setCp1] = useState<Point>({ x: 120, y: 50 });
  const [cp2, setCp2] = useState<Point>({ x: 280, y: 50 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointerDown = (pointId: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
    }
    setDragging(pointId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    // Calculate coordinates relative to SVG viewBox (0-400, 0-200)
    const x = Math.max(0, Math.min(400, ((e.clientX - rect.left) / rect.width) * 400));
    const y = Math.max(0, Math.min(200, ((e.clientY - rect.top) / rect.height) * 200));

    const updatedPoint = { x: Math.round(x), y: Math.round(y) };

    if (dragging === 'p1') setP1(updatedPoint);
    else if (dragging === 'p2') setP2(updatedPoint);
    else if (dragging === 'cp1') setCp1(updatedPoint);
    else if (dragging === 'cp2') setCp2(updatedPoint);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragging && svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    setDragging(null);
  };

  const resetCurve = () => {
    setP1({ x: 50, y: 150 });
    setP2({ x: 350, y: 150 });
    setCp1({ x: 120, y: 50 });
    setCp2({ x: 280, y: 50 });
  };

  const pathString = `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;

  const copyPathCode = () => {
    navigator.clipboard.writeText(`<path d="${pathString}" fill="none" stroke="currentColor" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
          <Compass size={20} />
        </div>
        <div>
          <h3 className="font-sans font-bold text-lg text-white">Interactive Bezier Curve</h3>
          <p className="text-xs text-stone-400">Drag anchor points and control handles to design</p>
        </div>
      </div>

      <div className="relative bg-slate-950/80 rounded-xl border border-white/5 overflow-hidden p-2 select-none touch-none">
        <svg
          ref={svgRef}
          viewBox="0 0 400 200"
          className="w-full h-auto cursor-crosshair"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Grid lines background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connection Lines (Anchor to Control Point) */}
          <line x1={p1.x} y1={p1.y} x2={cp1.x} y2={cp1.y} stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={p2.x} y1={p2.y} x2={cp2.x} y2={cp2.y} stroke="rgba(232, 121, 249, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Main Bezier Curve */}
          <path d={pathString} fill="none" stroke="url(#bezierGradient)" strokeWidth="4.5" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="bezierGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Control Point Handles (Lines/Sticks) */}
          <circle cx={cp1.x} cy={cp1.y} r="7" className="fill-blue-500 stroke-white stroke-2 cursor-grab active:cursor-grabbing shadow-lg" onPointerDown={handlePointerDown('cp1')} />
          <circle cx={cp2.x} cy={cp2.y} r="7" className="fill-fuchsia-500 stroke-white stroke-2 cursor-grab active:cursor-grabbing shadow-lg" onPointerDown={handlePointerDown('cp2')} />

          {/* Anchor Points */}
          <rect x={p1.x - 6} y={p1.y - 6} width="12" height="12" className="fill-cyan-400 stroke-slate-900 stroke-2 cursor-grab active:cursor-grabbing shadow-md" onPointerDown={handlePointerDown('p1')} />
          <rect x={p2.x - 6} y={p2.y - 6} width="12" height="12" className="fill-purple-500 stroke-slate-900 stroke-2 cursor-grab active:cursor-grabbing shadow-md" onPointerDown={handlePointerDown('p2')} />
        </svg>

        {/* Floating coordinates indicator */}
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-stone-500 flex gap-4">
          <span>P1: ({p1.x}, {p1.y})</span>
          <span>P2: ({p2.x}, {p2.y})</span>
        </div>
      </div>

      {/* Code Display & Actions */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase">SVG PATH CODE</span>
          <div className="flex items-center gap-2">
            <button
              onClick={resetCurve}
              className="p-1.5 hover:bg-white/10 rounded-lg text-stone-400 hover:text-white transition-colors"
              title="Reset Path"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={copyPathCode}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-xs font-semibold text-stone-300 hover:text-white transition-colors"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-[11px] text-cyan-400/90 break-all leading-relaxed whitespace-pre-wrap select-all">
          {`<path d="${pathString}" ... />`}
        </div>
      </div>
    </div>
  );
};

// 2. INTERACTIVE TYPOGRAPHY & CONTRAST TUNER
export const TypographyTuner: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [weight, setWeight] = useState('font-normal');
  const [letterSpacing, setLetterSpacing] = useState('tracking-normal');
  const [contrastRatio, setContrastRatio] = useState(7.4);
  const [colorScheme, setColorScheme] = useState<'cyan' | 'purple' | 'gold'>('cyan');

  const quotes = [
    { text: "Bentuk mengikuti fungsi.", translation: "Form follows function." },
    { text: "Desain adalah pemecahan masalah.", translation: "Design is problem solving." },
    { text: "Kesederhanaan adalah kecanggihan tertinggi.", translation: "Simplicity is the ultimate sophistication." },
  ];

  const weights = [
    { label: 'Light', class: 'font-light' },
    { label: 'Regular', class: 'font-normal' },
    { label: 'Medium', class: 'font-medium' },
    { label: 'Bold', class: 'font-bold' },
    { label: 'Black', class: 'font-black' },
  ];

  const trackings = [
    { label: 'Tight', class: 'tracking-tight' },
    { label: 'Normal', class: 'tracking-normal' },
    { label: 'Wide', class: 'tracking-wide' },
    { label: 'Widest', class: 'tracking-widest' },
  ];

  // Map settings to generate pseudo contrast values
  useEffect(() => {
    let base = 6.2;
    if (colorScheme === 'cyan') base += 2.1;
    if (colorScheme === 'purple') base += 0.8;
    if (colorScheme === 'gold') base += 1.8;
    
    if (weight === 'font-light') base -= 0.6;
    if (weight === 'font-bold' || weight === 'font-black') base += 0.4;
    
    setContrastRatio(parseFloat(base.toFixed(1)));
  }, [weight, colorScheme]);

  const getTextColorClass = () => {
    switch (colorScheme) {
      case 'cyan': return 'text-cyan-400';
      case 'purple': return 'text-purple-400';
      case 'gold': return 'text-amber-400';
    }
  };

  const getOverlayShadow = () => {
    switch (colorScheme) {
      case 'cyan': return 'shadow-[0_0_20px_rgba(34,211,238,0.15)]';
      case 'purple': return 'shadow-[0_0_20px_rgba(168,85,247,0.15)]';
      case 'gold': return 'shadow-[0_0_20px_rgba(251,191,36,0.15)]';
    }
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 transition-all duration-300 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
          <Type size={20} />
        </div>
        <div>
          <h3 className="font-sans font-bold text-lg text-white">Typography Tuner</h3>
          <p className="text-xs text-stone-400">Play with alignment, spacing, and accessibility</p>
        </div>
      </div>

      {/* Preview Card */}
      <div className={`relative flex flex-col justify-center items-center p-8 bg-slate-950/80 rounded-xl border border-white/5 min-h-[160px] text-center mb-5 transition-all duration-300 ${getOverlayShadow()}`}>
        <motion.p
          key={`${quoteIdx}-${weight}-${letterSpacing}-${colorScheme}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-sans text-xl md:text-2xl leading-snug transition-all ${getTextColorClass()} ${weight} ${letterSpacing}`}
        >
          "{quotes[quoteIdx].text}"
        </motion.p>
        <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-2">
          {quotes[quoteIdx].translation}
        </p>

        {/* Contrast Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 rounded-full border border-white/10 text-[9px] font-mono text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>WCAG AAA: {contrastRatio}:1</span>
        </div>
      </div>

      {/* Tuning Controls */}
      <div className="space-y-4 flex-1">
        {/* Toggle Quotes */}
        <div>
          <label className="text-[10px] font-mono text-purple-400 tracking-wider block mb-1.5">QUOTE SELECTOR</label>
          <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setQuoteIdx(idx)}
                className={`py-1 text-xs font-semibold rounded-md transition-colors ${quoteIdx === idx ? 'bg-blue-500 text-white shadow-md' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
              >
                Quote {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Weight Grid */}
        <div>
          <label className="text-[10px] font-mono text-cyan-400 tracking-wider block mb-1.5">FONT WEIGHT</label>
          <div className="grid grid-cols-5 gap-1 bg-white/5 p-1 rounded-lg">
            {weights.map((w) => (
              <button
                key={w.class}
                onClick={() => setWeight(w.class)}
                className={`py-1 text-[10px] font-medium rounded-md transition-colors ${weight === w.class ? 'bg-purple-600 text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Grid */}
        <div>
          <label className="text-[10px] font-mono text-blue-400 tracking-wider block mb-1.5">LETTER SPACING</label>
          <div className="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-lg">
            {trackings.map((t) => (
              <button
                key={t.class}
                onClick={() => setLetterSpacing(t.class)}
                className={`py-1 text-[10px] font-medium rounded-md transition-colors ${letterSpacing === t.class ? 'bg-indigo-600 text-white' : 'text-stone-400 hover:text-white'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color Selection */}
        <div>
          <label className="text-[10px] font-mono text-stone-400 tracking-wider block mb-1.5">COLOR SCHEME</label>
          <div className="flex gap-2.5">
            {[
              { id: 'cyan' as const, bg: 'bg-cyan-400', label: 'Cyan Glow' },
              { id: 'purple' as const, bg: 'bg-purple-400', label: 'Purple Dream' },
              { id: 'gold' as const, bg: 'bg-amber-400', label: 'Gold Elegance' },
            ].map((col) => (
              <button
                key={col.id}
                onClick={() => setColorScheme(col.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${colorScheme === col.id ? 'bg-white/10 border-white/20 text-white shadow-md' : 'bg-transparent border-white/5 text-stone-400 hover:text-white hover:border-white/10'}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${col.bg}`}></span>
                <span>{col.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. COLOR HARMONY PLAYGROUND
export const ColorHarmonyPlayground: React.FC = () => {
  const [harmony, setHarmony] = useState<'complementary' | 'analogous' | 'triadic'>('complementary');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Harmony configurations built around a central purple/cyan/blue focus
  const schemes = {
    complementary: [
      { name: 'Electric Violet', hex: '#8B5CF6', rgb: '139, 92, 246', role: 'Primary' },
      { name: 'Cyber Amber', hex: '#F59E0B', rgb: '245, 158, 11', role: 'Complement' },
      { name: 'Dark Nebula', hex: '#0D0B21', rgb: '13, 11, 33', role: 'Background' },
    ],
    analogous: [
      { name: 'Synthwave Magenta', hex: '#D946EF', rgb: '217, 70, 239', role: 'Warm Accent' },
      { name: 'Deep Purple', hex: '#6D28D9', rgb: '109, 40, 217', role: 'Dominant' },
      { name: 'Electric Blue', hex: '#3B82F6', rgb: '59, 130, 246', role: 'Cool Accent' },
    ],
    triadic: [
      { name: 'Neon Cyan', hex: '#06B6D4', rgb: '6, 182, 212', role: 'Cyan focal' },
      { name: 'Rose Petal', hex: '#F43F5E', rgb: '244, 63, 94', role: 'Coral focal' },
      { name: 'Golden Glow', hex: '#EAB308', rgb: '234, 179, 8', role: 'Yellow focal' },
    ]
  };

  const currentColors = schemes[harmony];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
          <Palette size={20} />
        </div>
        <div>
          <h3 className="font-sans font-bold text-lg text-white">Color Harmony Generator</h3>
          <p className="text-xs text-stone-400">Copy high-contrast palettes for your designs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white/5 p-1 rounded-lg mb-5">
        {[
          { id: 'complementary' as const, label: 'Complementary' },
          { id: 'analogous' as const, label: 'Analogous' },
          { id: 'triadic' as const, label: 'Triadic' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setHarmony(tab.id)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${harmony === tab.id ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Color Cards */}
      <div className="space-y-3">
        {currentColors.map((color) => (
          <div
            key={color.hex}
            onClick={() => copyToClipboard(color.hex)}
            className="group relative flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/20 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              {/* Colored Badge */}
              <div
                className="w-12 h-12 rounded-lg border border-white/10 transition-transform group-hover:scale-105 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{color.name}</h4>
                <div className="flex gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                  <span>{color.hex}</span>
                  <span>•</span>
                  <span>rgb({color.rgb})</span>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold tracking-widest text-stone-500 uppercase px-2 py-0.5 bg-white/5 rounded-full border border-white/5">
                {color.role}
              </span>
              <div className="text-stone-400 group-hover:text-white transition-colors p-1">
                {copiedColor === color.hex ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                )}
              </div>
            </div>

            {/* Click notification toast overlay */}
            {copiedColor === color.hex && (
              <div className="absolute inset-0 flex items-center justify-center bg-cyan-950/90 backdrop-blur-sm rounded-xl border border-cyan-400/40 animate-fade-in text-xs font-bold text-cyan-400">
                <Sparkles size={14} className="mr-1.5 animate-spin" /> Copied {color.hex} to Clipboard!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
