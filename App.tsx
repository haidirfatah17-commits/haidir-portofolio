/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeroScene, 
  QuantumComputerScene 
} from './components/QuantumScene';
import { 
  BezierPenTool, 
  TypographyTuner, 
  ColorHarmonyPlayground 
} from './components/Diagrams';
import { 
  ArrowDown, 
  Menu, 
  X, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Layers, 
  Zap, 
  FolderGit2, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  CheckCircle,
  Instagram,
  Linkedin,
  Compass
} from 'lucide-react';
import { Project, TimelineItem, Skill, StatItem } from './types';

import posterImg from './src/assets/images/poster_swiss_design_1783084226036.jpg';
import brandingImg from './src/assets/images/brand_tokyo_design_1783084196149.jpg';
import packagingImg from './src/assets/images/packaging_aura_design_1783084240224.jpg';

/// CORE DATA FOR GRAPHIC DESIGNER PORTFOLIO - MUHAMAD HAIDIR ABDUL FATAH
const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Event Poster Design',
    category: 'Poster Design',
    image: posterImg,
    description: 'Desain poster untuk kebutuhan acara dengan visual yang modern, informatif, dan mudah menarik perhatian audiens.',
    fullDescription: 'Proyek ini berfokus pada pembuatan materi promosi event dengan penataan layout yang bersih, kontras tinggi, dan elemen grafis yang dinamis. Menggabungkan tipografi yang berani untuk memastikan pesan utama tersampaikan dengan cepat sekaligus memberikan impresi visual yang mendalam dan profesional kepada audiens.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
    client: 'Event Mandiri / Eksplorasi Sekolah',
    year: '2025',
    colorPalette: ['#3b82f6', '#a855f7', '#090714', '#f8fafc']
  },
  {
    id: '2',
    title: 'Social Media Campaign',
    category: 'Social Media Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Desain konten media sosial untuk kebutuhan promosi brand, campaign, dan publikasi digital.',
    fullDescription: 'Pengembangan rangkaian konten digital estetik yang dirancang khusus untuk meningkatkan engagement di platform sosial media seperti Instagram. Setiap slide dikurasi dengan grid yang rapi, kombinasi warna yang konsisten, dan ilustrasi komunikatif untuk memperkuat pesan campaign secara visual terstruktur.',
    tools: ['Adobe Illustrator', 'Figma', 'Canva'],
    client: 'Personal Project',
    year: '2025',
    colorPalette: ['#ec4899', '#6366f1', '#0f172a', '#e2e8f0']
  },
  {
    id: '3',
    title: 'Logo Exploration',
    category: 'Branding',
    image: brandingImg,
    description: 'Eksplorasi logo dan identitas visual dengan pendekatan modern, sederhana, dan mudah diaplikasikan ke berbagai media.',
    fullDescription: 'Proyek riset dan pembuatan logo yang menekankan prinsip kesederhanaan, keunikan, dan kemudahan pengenalan. Eksplorasi mencakup pembuatan sketsa manual, penyesuaian bentuk geometris digital, pemilihan tipe huruf custom, hingga perancangan panduan dasar identitas visual yang siap diaplikasikan pada berbagai media cetak maupun digital.',
    tools: ['Adobe Illustrator', 'Figma'],
    client: 'UMKM & Personal Client',
    year: '2025',
    colorPalette: ['#22d3ee', '#3b82f6', '#090714', '#ffffff']
  },
  {
    id: '4',
    title: 'Key Visual Campaign',
    category: 'Campaign Design',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    description: 'Pembuatan key visual untuk campaign promosi dengan komposisi visual yang kuat dan pesan yang jelas.',
    fullDescription: 'Merancang aset visual induk (key visual) yang menjadi acuan utama seluruh materi promosi sebuah kampanye kreatif. Fokus proyek ini terletak pada kekuatan komposisi objek utama, keseimbangan ruang negatif, serta harmoni warna yang dramatis guna menciptakan impresi visual yang solid, terpadu, dan langsung melekat di benak audiens.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator'],
    client: 'Brand Campaign Concept',
    year: '2024',
    colorPalette: ['#a855f7', '#ec4899', '#1e1b4b', '#f8fafc']
  },
  {
    id: '5',
    title: 'Product Mockup',
    category: 'Mockup Design',
    image: packagingImg,
    description: 'Visualisasi desain pada media promosi seperti banner, flyer, packaging, merchandise, dan kebutuhan branding lainnya.',
    fullDescription: 'Mempresentasikan konsep desain secara realistis ke dalam media fisik menggunakan teknik penataan bayangan, pencahayaan, dan perspektif mockup 3D yang akurat. Hasil visualisasi membantu klien memahami pengaplikasian desain nyata pada botol kemasan, merchandise kaos, totebag, flyer promosi, serta materi pameran.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator'],
    client: 'Local Brand Mockups',
    year: '2025',
    colorPalette: ['#06b6d4', '#fbbf24', '#111827', '#f3f4f6']
  },
  {
    id: '6',
    title: 'Landing Page Concept',
    category: 'UI Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Konsep tampilan landing page modern dengan layout yang rapi, visual menarik, dan mudah digunakan.',
    fullDescription: 'Eksplorasi antarmuka web (UI Design) dengan memadukan struktur grid asimetris yang trendi, tipografi modern, dan elemen glassmorphic transparan. Dirancang secara responsif dengan menyeimbangkan tata letak konten visual kreatif agar pengunjung dapat menavigasi informasi dengan nyaman dan terkesan oleh estetika premium.',
    tools: ['Figma', 'Adobe Illustrator'],
    client: 'Creative Studio Concept',
    year: '2025',
    colorPalette: ['#3b82f6', '#22d3ee', '#07050e', '#ffffff']
  }
];

const SKILLS_DATA: Skill[] = [
  // Software Tools (Design Tools)
  { name: 'Adobe Photoshop', level: 90, category: 'software' },
  { name: 'Adobe Illustrator', level: 85, category: 'software' },
  { name: 'Figma', level: 80, category: 'software' },
  { name: 'Canva', level: 95, category: 'software' },
  // Creative (Design Skills)
  { name: 'Graphic Design', level: 90, category: 'creative' },
  { name: 'Branding', level: 85, category: 'creative' },
  { name: 'Social Media Design', level: 90, category: 'creative' },
  { name: 'Poster Design', level: 88, category: 'creative' },
  { name: 'Key Visual Design', level: 80, category: 'creative' },
  { name: 'Layouting', level: 85, category: 'creative' },
  { name: 'Basic UI Design', level: 75, category: 'creative' },
  { name: 'Visual Campaign', level: 82, category: 'creative' },
  { name: 'Mockup Design', level: 85, category: 'creative' }
];

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 't1',
    year: '2024 - Sekarang',
    title: 'Student of Visual Communication Design',
    subtitle: 'SMKN 2 Garut',
    description: 'Saya mempelajari dasar-dasar desain komunikasi visual, mulai dari typography, layout, ilustrasi, branding, fotografi, hingga pengembangan konsep visual untuk berbagai media.',
    type: 'education'
  },
  {
    id: 't2',
    year: 'Present',
    title: 'Design Training & Personal Projects',
    subtitle: 'Eksplorasi Mandiri',
    description: 'Saya aktif mengembangkan skill desain melalui pelatihan, eksplorasi mandiri, dan pembuatan project personal untuk memperkuat portfolio dan mewujudkan pendapatan mandiri.',
    type: 'experience'
  }
];

const STATS_DATA: StatItem[] = [
  { value: 'DKV', label: 'KOMPETENSI KEAHLIAN', description: 'Siswa kelas 11 jurusan Desain Komunikasi Visual di SMKN 2 Garut' },
  { value: '100%', label: 'MINAT & DEDIKASI', description: 'Komitmen tinggi menggabungkan konsep, warna, dan komposisi pesan' },
  { value: 'Mandiri', label: 'MISI FINANSIAL', description: 'Belajar giat untuk menghasilkan pendapatan mandiri yang produktif' }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom contact form states
  const [formData, setFormData] = useState({ name: '', email: '', projectType: 'Branding', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'Branding', message: '' });
    }, 4000);
  };

  // Pre-filled WhatsApp link builder (Indonesian context)
  const getWhatsAppLink = () => {
    const defaultText = `Halo Muhamad Haidir, saya melihat portfolio desain Anda dan tertarik untuk berdiskusi mengenai proyek visual.`;
    const formText = `Halo Muhamad Haidir, nama saya ${formData.name}. Saya tertarik untuk berkolaborasi dalam proyek ${formData.projectType}. Pesan saya: ${formData.message}`;
    const textToSend = formData.name ? formText : defaultText;
    return `https://wa.me/6281564691925?text=${encodeURIComponent(textToSend)}`;
  };

  // Filter projects
  const filteredProjects = activeFilter === 'Semua' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#07050e] text-slate-100 selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* Background Neon ambient spots */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/15 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-blue-900/15 blur-[180px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#07050e]/85 backdrop-blur-xl border-b border-white/5 shadow-lg py-3' : 'bg-transparent py-5'}`} id="navbar">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#hero" onClick={scrollToSection('hero')} className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
              MH
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-sans font-black tracking-widest text-sm uppercase text-white group-hover:text-cyan-400 transition-colors">
              MUHAMAD <span className="font-light text-stone-400">HAIDIR</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-7 text-xs font-bold tracking-widest text-stone-300">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-cyan-400 transition-colors cursor-pointer uppercase">Tentang</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase">Keahlian</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-purple-400 transition-colors cursor-pointer uppercase">Portfolio</a>
            <a href="#experience" onClick={scrollToSection('experience')} className="hover:text-pink-400 transition-colors cursor-pointer uppercase">Timeline</a>
            <a href="#playground" onClick={scrollToSection('playground')} className="hover:text-cyan-400 transition-colors cursor-pointer uppercase flex items-center gap-1"><Compass size={12} className="animate-spin-slow" /> Playground</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-5 py-2.5 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:text-slate-950 rounded-full border border-white/10 hover:border-transparent transition-all duration-300 shadow-sm font-black text-[10px] uppercase cursor-pointer">
              Let's Talk
            </a>
          </div>

          <button className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] bottom-0 z-40 bg-[#07050e]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-base font-bold tracking-widest"
          >
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-cyan-400 transition-colors cursor-pointer uppercase text-white/90">Tentang</a>
            <a href="#skills" onClick={scrollToSection('skills')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase text-white/90">Keahlian</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-purple-400 transition-colors cursor-pointer uppercase text-white/90">Portfolio</a>
            <a href="#experience" onClick={scrollToSection('experience')} className="hover:text-pink-400 transition-colors cursor-pointer uppercase text-white/90">Timeline</a>
            <a href="#playground" onClick={scrollToSection('playground')} className="hover:text-cyan-400 transition-colors cursor-pointer uppercase text-white/90 flex items-center gap-1.5"><Compass size={14} /> Playground</a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')} 
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 rounded-full font-black text-xs uppercase shadow-lg"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
        <HeroScene />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(7,5,14,0.1)_0%,rgba(7,5,14,0.85)_65%,rgba(7,5,14,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-purple-500/30 text-purple-400 text-[10px] tracking-[0.25em] uppercase font-black rounded-full backdrop-blur-md bg-purple-950/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <Sparkles size={12} className="animate-pulse" /> Graphic Designer • Visual Creative
          </motion.div>
          
          {/* Large Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8 tracking-tighter"
          >
            Muhamad Haidir<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)] font-serif italic font-normal">
              Abdul Fatah
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-sm md:text-base text-stone-400 font-medium leading-relaxed mb-12"
          >
            Saya adalah creative designer yang fokus pada desain grafis, branding, social media design, poster, key visual, dan visual campaign. Saya membantu membuat tampilan visual yang menarik, rapi, komunikatif, dan mudah diingat.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            <a 
              href="#projects" 
              onClick={scrollToSection('projects')} 
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-black rounded-full shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer"
            >
              View Portfolio
            </a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')} 
              className="w-full sm:w-auto px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-black rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer backdrop-blur-md"
            >
              Contact Me
            </a>
          </motion.div>
          
          {/* Scroll Down */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center"
          >
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-2 text-[10px] tracking-widest font-bold text-stone-500 hover:text-white transition-colors cursor-pointer">
                <span>EKSPLORASI</span>
                <span className="p-2.5 border border-white/5 rounded-full group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all bg-white/5 backdrop-blur-sm shadow-md">
                    <ArrowDown size={14} className="animate-bounce" />
                </span>
             </a>
          </motion.div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* About Me Section */}
        <section id="about" className="py-28 bg-[#090712] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Heading and Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-cyan-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Tentang Saya
                </div>
                <h2 className="font-sans text-4xl lg:text-5xl font-black leading-tight text-white tracking-tighter">
                  Menerjemahkan Ide Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-serif italic font-normal">Komposisi Estetik</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
                
                <div className="text-stone-300 font-medium text-sm md:text-base leading-relaxed space-y-5">
                  <p>
                    Saya adalah siswa <strong className="text-white font-bold">SMKN 2 Garut</strong> jurusan <strong className="text-white font-bold">Desain Komunikasi Visual (DKV)</strong>, saat ini saya duduk di kelas 11. Awalnya saya tidak ada ketertarikan terhadap dunia visual creative, tetapi dikarenakan saya ingin mempunyai pendapatan mandiri, akhirnya saya mencoba mendalami dunia visual creative.
                  </p>
                  <p>
                    Dalam setiap desain, saya berusaha menggabungkan konsep, komposisi, warna, typography, dan pesan visual agar hasilnya tidak hanya menarik secara tampilan, tetapi juga mudah dipahami oleh audiens.
                  </p>
                  <p>
                    Bagi saya, desain bukan sekadar hiasan kosmetik, melainkan pemecahan masalah komunikasi terstruktur secara visual. Saya selalu bersemangat mempelajari tantangan baru, menerima kritik konstruktif, serta menyempurnakan setiap piksel dalam karya saya.
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                  {STATS_DATA.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/5 shadow-sm hover:border-white/10 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1.5">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-black text-white tracking-wider mb-1 uppercase">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-stone-400 leading-tight">
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive 3D Bento Card and Philosophy */}
              <div className="lg:col-span-5 space-y-6 w-full">
                
                {/* 3D Bento Box Display */}
                <div className="relative rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden shadow-2xl h-80 flex flex-col justify-end p-6 group hover:border-purple-500/30 transition-all duration-300">
                  
                  {/* Background 3D rotating canvas */}
                  <div className="absolute inset-0 z-0">
                    <QuantumComputerScene />
                  </div>
                  
                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-1 pointer-events-none" />

                  {/* Text Overlay */}
                  <div className="relative z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[9px] font-mono font-bold text-blue-400 mb-2 uppercase">
                      STUDIO 3D VIRTUAL
                    </div>
                    <h3 className="font-serif italic text-2xl text-white mb-1.5">Struktur & Ruang</h3>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
                      Visualisasi interaktif 3D yang menggambarkan harmoni matematika di dalam ruang desain.
                    </p>
                  </div>
                </div>

                {/* Philosophy Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-tr from-purple-950/25 to-cyan-950/25 border border-white/5 flex flex-col gap-4 shadow-xl hover:border-white/10 transition-all">
                  <div className="p-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl w-11 h-11 flex items-center justify-center text-slate-950">
                    <Zap size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Misi Desain Saya</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    "Saya bertekad menggabungkan konsep, komposisi, warna, typography, dan pesan visual agar hasil desain tidak hanya menarik secara tampilan, tetapi juga mudah dipahami oleh audiens untuk membantu brand Anda tampil menonjol."
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-28 bg-[#07050e] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Fondasi Visual
              </div>
              <h2 className="font-sans text-4xl font-black text-white tracking-tighter">
                Perangkat Lunak & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-serif italic font-normal">Keahlian Kreatif</span>
              </h2>
              <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                Kombinasi antara kemahiran teknis alat digital (Software) dan kepekaan rasa dalam mengeksekusi konsep estetik (Creative).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
              
              {/* Category 1: Software Tools */}
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-6 hover:border-blue-500/20 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Layers size={18} />
                  </div>
                  <h3 className="font-sans font-black text-base text-white tracking-wider uppercase">SOFTWARE TOOLS</h3>
                </div>
                <div className="w-full h-[1px] bg-white/5"></div>
                
                <div className="space-y-6 flex-1">
                  {SKILLS_DATA.filter(s => s.category === 'software').map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-stone-200">{skill.name}</span>
                        <span className="font-mono text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Creative Expertise */}
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-6 hover:border-purple-500/20 transition-all duration-300 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="font-sans font-black text-base text-white tracking-wider uppercase">CREATIVE EXPERTISE</h3>
                </div>
                <div className="w-full h-[1px] bg-white/5"></div>

                <div className="space-y-6 flex-1">
                  {SKILLS_DATA.filter(s => s.category === 'creative').map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-stone-200">{skill.name}</span>
                        <span className="font-mono text-purple-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Portfolio Projects Section */}
        <section id="projects" className="py-28 bg-[#090712] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-purple-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Galeri Karya
                </div>
                <h2 className="font-sans text-4xl font-black text-white tracking-tighter">
                  Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 font-serif italic font-normal">Pilihan</span>
                </h2>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Kumpulan proyek desain konsep untuk memamerkan kecenderungan visual, eksekusi layout, dan kemampuan berpikir konseptual saya. Klik untuk detail proses kreatif.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-full border border-white/5 max-w-max">
                {['Semua', 'Poster Design', 'Social Media Design', 'Branding', 'Campaign Design', 'Mockup Design', 'UI Design'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeFilter === filter ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black shadow-md' : 'text-stone-400 hover:text-white'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col rounded-2xl bg-white/[0.01] border border-white/5 hover:border-purple-500/30 overflow-hidden shadow-md hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:bg-white/[0.02] cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Thumbnail Frame */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative border-b border-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Interactive Eye floating badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          PROSES KREATIF <ExternalLink size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-cyan-400">
                          <span>{project.category}</span>
                          <span className="text-stone-500">{project.year}</span>
                        </div>
                        <h3 className="font-sans font-bold text-base text-white group-hover:text-cyan-400 transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-stone-400 font-medium leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Tool Badges */}
                      <div className="flex flex-wrap gap-1">
                        {project.tools.map((tool) => (
                          <span key={tool} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-stone-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="py-28 bg-[#07050e] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-pink-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> Rekam Jejak
              </div>
              <h2 className="font-sans text-4xl font-black text-white tracking-tighter">
                Pengalaman & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 font-serif italic font-normal">Pendidikan</span>
              </h2>
              <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                Langkah-langkah yang telah saya tempuh untuk mengasah kepekaan seni visual serta teori komunikasi praktis.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">
              
              {/* Vertical line helper */}
              <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-[0.5px] pointer-events-none" />

              <div className="space-y-12">
                {TIMELINE_DATA.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div 
                      key={item.id} 
                      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:justify-start' : 'md:justify-end'} w-full`}
                    >
                      {/* Timeline Node Ring */}
                      <div className="absolute left-[16px] md:left-1/2 w-8 h-8 rounded-full bg-[#07050e] border-2 border-purple-500/80 -translate-x-[15px] md:-translate-x-4 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        {item.type === 'experience' ? (
                          <FolderGit2 size={12} className="text-purple-400" />
                        ) : (
                          <GraduationCap size={12} className="text-cyan-400" />
                        )}
                      </div>

                      {/* Content Card container */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                        <div className="p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all duration-300 shadow-sm flex flex-col gap-2.5">
                          
                          {/* Year & Type tag */}
                          <div className={`flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider ${isEven ? 'md:justify-end' : ''}`}>
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 text-stone-300">
                              <Calendar size={10} /> {item.year}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${item.type === 'experience' ? 'bg-purple-950/45 text-purple-400 border border-purple-800/30' : 'bg-cyan-950/45 text-cyan-400 border border-cyan-800/30'}`}>
                              {item.type === 'experience' ? 'Pengalaman' : 'Pendidikan'}
                            </span>
                          </div>

                          <h3 className="font-sans font-bold text-base text-white leading-snug">
                            {item.title}
                          </h3>
                          
                          <h4 className="text-xs font-semibold text-cyan-400">
                            {item.subtitle}
                          </h4>

                          <p className="text-xs text-stone-400 leading-relaxed font-medium">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Creative Interactive Widgets Section (Playground) */}
        <section id="playground" className="py-28 bg-[#090712] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Interaktif
              </div>
              <h2 className="font-sans text-4xl font-black text-white tracking-tighter">
                Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-serif italic font-normal">Playground</span>
              </h2>
              <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                Silakan berinteraksi dengan meja kerja desain virtual saya! Cobalah membuat kurva vektor (Bezier), menyetel tipografi estetik, dan menyalin harmoni palet warna untuk kebutuhan Anda.
              </p>
            </div>

            {/* Layout grids for interactive widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 w-full">
                <BezierPenTool />
              </div>
              <div className="lg:col-span-6 w-full flex flex-col gap-8">
                <TypographyTuner />
                <ColorHarmonyPlayground />
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-28 bg-[#07050e] border-t border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left column: Quick contact cards & Social handles */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-black text-purple-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Mari Berkolaborasi
                  </div>
                  <h2 className="font-sans text-4xl lg:text-5xl font-black text-white tracking-tighter">
                    Siap Memulai <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 font-serif italic font-normal">
                      Proyek Hebat?
                    </span>
                  </h2>
                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    Apakah Anda membutuhkan logo baru untuk bisnis Anda, poster keren untuk kampanye digital, sampul album musik, atau sekadar ingin menyapa dan berbagi masukan visual? Pintu diskusi saya selalu terbuka.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Quick card */}
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500/30 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Hubungi Lewat WhatsApp</h3>
                      <p className="text-[11px] text-emerald-400">+62 815 6469 1925 (Respon cepat)</p>
                    </div>
                  </a>

                  {/* Email Quick card */}
                  <a 
                    href="mailto:haidirfatah17@gmail.com?subject=Kerja%20Sama%20Desain%20Visual"
                    className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Kirim Pesan Email</h3>
                      <p className="text-[11px] text-blue-400">haidirfatah17@gmail.com</p>
                    </div>
                  </a>
                </div>

                {/* Social media footer */}
                <div className="space-y-3 pt-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase">IKUTI PERJALANAN CREATIVE SAYA</span>
                  <div className="flex gap-3">
                    {[
                      { href: 'https://instagram.com/haaidir_af', label: 'Instagram', icon: <Instagram size={16} /> }
                    ].map((soc) => (
                      <a
                        key={soc.label}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-stone-400 transition-colors border border-white/5 flex items-center justify-center"
                        title={soc.label}
                      >
                        {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Interactive glass enquiry form */}
              <div className="lg:col-span-7 w-full">
                <form 
                  onSubmit={handleFormSubmit}
                  className="p-8 rounded-2xl bg-white/[0.01] backdrop-blur-xl border border-white/5 flex flex-col gap-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle top cyan line decoration */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

                  <div className="space-y-1.5">
                    <h3 className="font-sans font-bold text-lg text-white">Formulir Pertanyaan & Brief Desain</h3>
                    <p className="text-[11px] text-stone-400 leading-normal">
                      Isi data Anda dan jelaskan proyek visual yang ingin didesain. Tombol akan berubah dinamis untuk mengirim ke Email atau langsung WhatsApp!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">NAMA ANDA</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Masukkan nama"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/5 focus:border-cyan-400/50 text-white text-sm focus:outline-none transition-colors shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">ALAMAT EMAIL</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="contoh@domain.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/5 focus:border-cyan-400/50 text-white text-sm focus:outline-none transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-purple-400 tracking-wider uppercase">JENIS PROYEK</label>
                    <select 
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/5 focus:border-purple-400/50 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Branding">Brand Identity / Desain Logo</option>
                      <option value="Album Art">Sampul Album / Vinyl Art</option>
                      <option value="Poster">Poster Promosi / Cetak Digital</option>
                      <option value="Packaging">Desain Kemasan Produk (Packaging)</option>
                      <option value="Lainnya">Lainnya / Kolaborasi Bebas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-purple-400 tracking-wider uppercase">DESKRIPSI BRIEF / PESAN ANDA</label>
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Jelaskan kebutuhan estetika Anda, preferensi warna, atau target audiens produk..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/5 focus:border-purple-400/50 text-white text-sm focus:outline-none transition-colors shadow-inner resize-none"
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Primary Button: Send via WhatsApp (Live builder) */}
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle size={15} /> Kirim via WhatsApp
                    </a>

                    {/* Secondary Button: Submit Form internally to mimic server */}
                    <button 
                      type="submit"
                      className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl border border-white/10 hover:border-white/20 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Mail size={15} /> Simpan Form
                    </button>
                  </div>

                  {/* Submit state check notifications */}
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-950/50 border border-emerald-400/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2"
                    >
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                      <span>Formulir disimulasikan berhasil disimpan! Brief Anda tersimpan di local memory. Muhamad Haidir akan segera menghubungi Anda.</span>
                    </motion.div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#06040c] border-t border-white/5 text-center text-stone-500 text-xs">
        <div className="container mx-auto px-6 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center text-slate-950 font-black text-xs">MH</div>
            <span className="font-sans font-black text-white uppercase tracking-widest text-[10px]">Muhamad Haidir • Portfolio 2026</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] leading-relaxed">
            Didesain dengan pendekatan Glassmorphism premium gelap, perpaduan warna Ungu, Biru & Cyan, serta widget interaktif ThreeJS & SVG.
          </p>
          <p className="text-[10px] text-stone-600">
            © 2026 Muhamad Haidir. Seluruh Hak Cipta Dilindungi. Built via Google AI Studio Build.
          </p>
        </div>
      </footer>

      {/* PROJECT DETAILED VIEW CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#07050e]/85 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Glass Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-950/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 select-text"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-stone-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1">
                {/* Hero Banner inside Modal */}
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-900 relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  
                  {/* Category overlay */}
                  <div className="absolute bottom-6 left-6 md:left-8">
                    <span className="px-3 py-1 bg-purple-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white mt-2 leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Brief details */}
                  <div className="md:col-span-4 space-y-6">
                    
                    {/* Project specs bento widget */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                      <div>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">KLIEN / PROYEK</span>
                        <span className="text-sm font-bold text-white">{selectedProject.client}</span>
                      </div>
                      <div className="h-[1px] bg-white/5"></div>
                      <div>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">TAHUN</span>
                        <span className="text-sm font-bold text-stone-200">{selectedProject.year}</span>
                      </div>
                      <div className="h-[1px] bg-white/5"></div>
                      <div>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">ALAT DESAIN</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedProject.tools.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] font-mono rounded text-stone-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Brand Palette */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                      <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">PALET WARNA PROYEK</span>
                      <div className="flex gap-2">
                        {selectedProject.colorPalette.map((col) => (
                          <div key={col} className="flex flex-col items-center gap-1">
                            <div 
                              className="w-8 h-8 rounded-full border border-white/10 shadow-md hover:scale-105 transition-transform cursor-pointer" 
                              style={{ backgroundColor: col }}
                              title={col}
                              onClick={() => navigator.clipboard.writeText(col)}
                            />
                            <span className="text-[8px] font-mono text-stone-400">{col}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Narrative study */}
                  <div className="md:col-span-8 space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">KONSEP & PROSES KREATIF</h3>
                      <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-600" />
                    </div>
                    
                    <div className="text-stone-300 text-sm leading-relaxed space-y-4">
                      <p className="font-medium text-white/95">
                        {selectedProject.fullDescription}
                      </p>
                      
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-purple-400" /> Pendekatan Desain
                        </h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          Penataan komposisi menitikberatkan pada kejelasan keterbacaan (Hierarchy), pemilihan palet warna kontras yang memanjakan mata, serta pembagian grid asimetris yang rapi untuk menghasilkan dampak visual terbaik.
                        </p>
                      </div>

                      <p className="text-xs text-stone-400 italic">
                        *Catatan: Ini adalah proyek portofolio eksplorasi kreatif yang dikembangkan oleh Muhamad Haidir untuk merepresentasikan arah visual, metodologi, dan kematangan desain digital.
                      </p>
                    </div>

                    {/* CTA button inside Modal */}
                    <div className="pt-4 flex justify-end">
                      <a 
                        href={`https://wa.me/6281564691925?text=Halo%20Muhamad%20Haidir,%20saya%20tertarik%20dengan%20proyek%20"${encodeURIComponent(selectedProject.title)}"%20Anda%20dan%20ingin%20berkolaborasi.`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 hover:scale-102 transition-transform"
                      >
                        <MessageCircle size={14} /> Diskusikan Proyek Ini
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
