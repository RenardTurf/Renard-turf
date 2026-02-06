import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, ChevronRight, Target, Users, Star, ShieldCheck, 
  CheckCircle2, ExternalLink, History, Star as StarIcon, BarChart3, 
  ArrowRight, Activity, X, Menu, Trophy, UserCheck, BookOpen, Crown,
  Gift, FileText
} from 'lucide-react';

// --- CONFIGURATION GOOGLE SHEETS ---
const SHEET_URLS = {
  JOCKEYS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQH61koCV9FgrkJfYVNQMlseDY2K4R54ClxM-tkM2vwb0Dvbwyb1KYiimPdZODPaFbXW40VrVUJjFqW/pub?output=csv",
  TRAINERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-gp9qlf4bEk3vMQuOp4WNickKworuWoP0P-Vgr5PtTE5hn-vkJhrC5GD3INH5T0WUbnlLfGtLMtiu/pub?output=csv"
};

const initGA = (id) => {
  if (typeof window !== 'undefined' && !document.getElementById('google-analytics')) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.id = 'google-analytics';
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `;
    document.head.appendChild(script2);
  }
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState('Attelé');
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v4.0 (SAMEDI 07 FÉVRIER - PRIX DE MUNICH) ---
  const horsesData = [
    { "id": 1, "name": "IBISCUS MAN", "rpi": 95.5, "perf": 52.0, "intent": 26.0, "context": 17.5, "stars": 5, "nickname": "Le Recordman" },
    { "id": 2, "name": "WORKING CLASS HERO", "rpi": 98.0, "perf": 54.0, "intent": 27.0, "context": 17.0, "stars": 5, "nickname": "Le Sans-Faute" },
    { "id": 3, "name": "KSAR", "rpi": 78.0, "perf": 40.0, "intent": 22.0, "context": 16.0, "stars": 2, "nickname": "L'Outsider" },
    { "id": 4, "name": "HAPPY DANICA", "rpi": 87.0, "perf": 46.0, "intent": 24.0, "context": 17.0, "stars": 3, "nickname": "La Revanche" },
    { "id": 5, "name": "JANGO VICI", "rpi": 90.0, "perf": 48.0, "intent": 25.0, "context": 17.0, "stars": 4, "nickname": "La Note Visuelle" },
    { "id": 6, "name": "IDÉAL DU ROCHER", "rpi": 85.0, "perf": 44.0, "intent": 24.0, "context": 17.0, "stars": 3, "nickname": "Le Solide" },
    { "id": 7, "name": "JINGLE DU PONT", "rpi": 88.5, "perf": 47.0, "intent": 24.5, "context": 17.0, "stars": 4, "nickname": "L'Autostart" },
    { "id": 8, "name": "HYMNE DU GERS", "rpi": 92.0, "perf": 50.0, "intent": 26.0, "context": 16.0, "stars": 4, "nickname": "Le Plafond" },
    { "id": 9, "name": "CASH BANK BIGI", "rpi": 75.0, "perf": 38.0, "intent": 22.0, "context": 15.0, "stars": 2, "nickname": "L'Italienne" },
    { "id": 10, "name": "KARAMBAR", "rpi": 72.0, "perf": 36.0, "intent": 20.0, "context": 16.0, "stars": 1, "nickname": "Le Remplaçant" },
    { "id": 11, "name": "INDY ROCK", "rpi": 82.0, "perf": 42.0, "intent": 24.0, "context": 16.0, "stars": 3, "nickname": "Le Suédois" },
    { "id": 12, "name": "MAIN STAGE", "rpi": 70.0, "perf": 35.0, "intent": 20.0, "context": 15.0, "stars": 1, "nickname": "Le Finlandais" },
    { "id": 13, "name": "GRINDELWALD", "rpi": 74.0, "perf": 37.0, "intent": 21.0, "context": 16.0, "stars": 2, "nickname": "L'X de la course" },
    { "id": 14, "name": "INVICTUS MADIBA", "rpi": 80.0, "perf": 41.0, "intent": 23.0, "context": 16.0, "stars": 3, "nickname": "Le Nivard" },
    { "id": 15, "name": "LIGHTNING STRIDE", "rpi": 68.0, "perf": 34.0, "intent": 19.0, "context": 15.0, "stars": 1, "nickname": "Le Finisseur" },
    { "id": 16, "name": "JAZZMAN", "rpi": 86.0, "perf": 45.0, "intent": 24.0, "context": 17.0, "stars": 3, "nickname": "Le Piégé ?" }
  ];

  const raceInfo = {
    title: "Prix de Munich",
    date: "07 Février 2026",
    location: "Paris-Vincennes",
    discipline: "Attelé (Autostart)",
    distance: "2 100m GP",
    allocation: "90 000€"
  };

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 2));
  const [compHorse1, setCompHorse1] = useState(horsesData[1]); // Working Class Hero
  const [compHorse2, setCompHorse2] = useState(horsesData[0]); // Ibiscus Man

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i]?.trim();
        return obj;
      }, {});
    });
  };

  useEffect(() => {
    initGA('G-EY4386K4P1');
    const fetchRankings = async () => {
      try {
        const [resJ, resT] = await Promise.all([
          fetch(SHEET_URLS.JOCKEYS).then(res => res.text()),
          fetch(SHEET_URLS.TRAINERS).then(res => res.text())
        ]);
        setRankings({ jockeys: parseCSV(resJ), trainers: parseCSV(resT) });
      } catch (e) { console.error("Erreur de liaison Data"); }
    };
    fetchRankings();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    EBOOK_SHOP: "https://lerenardturf.sellfy.store/p/les-secrets-des-turfistes-avertis/",
    SUBSCRIPTION: "https://lerenardturf.sellfy.store/p/abonnement-mensuel-1990/",
    FREE_ANALYSIS: "https://lerenardturf.sellfy.store/p/essai-analyse-quinte-2/"
  };

  const stats = [
    { label: "Vues", value: "550 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1600+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "Réussite Quinté 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 text-white font-bold">
               <Zap className="fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase italic flex items-center gap-2 hover:bg-yellow-300 transition-all shadow-md">
                <Crown size={14} className="fill-current" /> Devenir VIP
             </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-800 group">
                <div className="w-12 h-12 bg-yellow-400 text-slate-900 rounded-2xl flex items-center justify-center mb-4"><Crown /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2 text-yellow-400">ACCÈS VIP (19,90€) <ExternalLink size={14}/></span>
              </a>
              <a href={LINKS.EBOOK_SHOP} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 group">
                <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center mb-4"><BookOpen /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2">LE GUIDE DU RENARD (Ebook) <ExternalLink size={14}/></span>
              </a>
              <a href={LINKS.FREE_ANALYSIS} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group text-left">
                <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mb-4"><FileText /></div>
                <span className="font-black uppercase italic text-sm text-slate-500">Exemple Gratuit (PDF)</span>
              </a>
              <a href="#rankings" onClick={() => setIsMenuOpen(false)} className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group text-left">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Trophy /></div>
                <span className="font-black uppercase italic text-sm text-slate-900">Classements Data</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Activity className="text-orange-600 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 leading-none tracking-tighter uppercase italic">
            L'Information <span className="text-orange-600">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Ne jouez plus au hasard. Accédez aux statistiques avancées et à la méthode Renard 4.0 pour vos jeux quotidiens.
          </p>
          
          <div className="flex flex-col gap-5 justify-center items-center w-full max-w-2xl px-6 md:px-0">
            {/* VEDETTE : ABONNEMENT VIP */}
            <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-6 py-6 rounded-2xl font-black text-xl flex flex-col items-center justify-center gap-2 transition-all shadow-2xl shadow-yellow-400/30 border-2 border-white animate-pulse-slow group">
               <div className="flex items-center gap-3">
                 <Crown className="w-8 h-8 fill-current" />
                 <span>REJOINDRE LE CLUB VIP</span>
               </div>
               <span className="text-[10px] text-slate-700 uppercase tracking-widest font-bold opacity-80 group-hover:opacity-100">Pronostics complets + Infos de dernière minute</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
               <a href={LINKS.EBOOK_SHOP} target="_blank" rel="noreferrer" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/20 group uppercase border-2 border-slate-900 hover:border-orange-500">
                <BookOpen className="w-5 h-5 text-orange-500" /> GUIDE DU RENARD
              </a>
              <a href="#rpi-tool" className="w-full sm:w-1/2 bg-white hover:bg-orange-50 text-orange-600 px-6 py-4 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-md group uppercase border-2 border-orange-100">
                L'INDICE RPI DU JOUR <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 w-full px-4 md:px-0">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm border-b-2 border-b-orange-600/20">
                <div className="flex justify-center mb-5">{stat.icon}</div>
                <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION PROMO VIP (Mise en avant avantages) --- */}
      <section id="vip-promo" className="py-20 px-6 bg-slate-900 text-white flex flex-col items-center relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 rounded-full mb-6 shadow-sm backdrop-blur-sm">
            <Crown className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Offre Premium</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic tracking-tighter leading-none">
            PASSEZ AU NIVEAU <span className="text-yellow-400">SUPÉRIEUR</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Ne manquez plus aucun "Bruit d'écurie" ni aucune "Note" de tracking. Recevez la sélection détaillée et les jeux rentables la veille de la course.
          </p>
          <a 
            href={LINKS.SUBSCRIPTION} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-yellow-400/20 hover:scale-105"
          >
            <Crown className="w-6 h-6 fill-current" /> JE M'ABONNE (19,90€/Mois)
          </a>
        </div>
      </section>
      
      {/* RPI Analyzer Tool */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-10 h-10 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none text-center">
              L'Analyseur de Probabilité <span className="text-orange-600">RPI</span>
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12">
            {/* Note sur 5 étoiles + Surnom */}
            <div className="mb-8 flex flex-col items-center gap-2 border-b border-slate-100 pb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={24} fill={i < selectedHorse.stars ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-lg font-black uppercase italic text-orange-600">"{selectedHorse.nickname}"</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-4 block italic">1. Sélectionner un partant</label>
                <div className="relative">
                  <select 
                    value={selectedHorse.id}
                    onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                    className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 font-black uppercase italic p-5 rounded-2xl appearance-none cursor-pointer focus:border-orange-600 focus:bg-white outline-none transition-all"
                  >
                    {horsesData.map(h => (
                      <option key={h.id} value={h.id}>{h.id} - {h.name}</option>
                    ))}
                  </select>
                  <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600 w-6 h-6" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400 mb-2 italic">Renard Pro Index</span>
                <div className="text-7xl font-black text-white italic leading-none">{selectedHorse.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[['Performance', selectedHorse.perf, 54], ['Intention', selectedHorse.intent, 33], ['Contexte', selectedHorse.context, 20]].map(([label, val, max]) => (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                    <span>{label}</span>
                    <span className="text-slate-900">{val}/{max}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(val/max)*100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-500 px-4 py-1.5 rounded-full mb-4">
                <Zap size={14} className="fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Outil de Duel Data</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Comparateur de Performance</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-600 rounded-full items-center justify-center text-white font-black italic z-10 shadow-lg shadow-orange-600/40 border-4 border-slate-900">
                VS
              </div>

              <div className="space-y-6 text-left">
                <select 
                  value={compHorse1.id}
                  onChange={(e) => setCompHorse1(horsesData.find(h => h.id === parseInt(e.target.value)))}
                  className="w-full bg-white/5 border border-white/10 text-white font-black uppercase italic p-4 rounded-xl outline-none focus:border-orange-600 transition-all"
                >
                  {horsesData.map(h => <option key={h.id} value={h.id} className="text-slate-900">{h.id} - {h.name}</option>)}
                </select>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <div className="text-4xl font-black text-orange-500 italic mb-6">{compHorse1.rpi}<span className="text-xs text-white/40 uppercase ml-1">pts</span></div>
                  <div className="space-y-4">
                    {[['Perf', compHorse1.perf, 54], ['Intent', compHorse1.intent, 33], ['Context', compHorse1.context, 20]].map(([label, val, max]) => (
                      <div key={label} className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold uppercase text-white/40"><span>{label}</span><span>{val}/{max}</span></div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-600" style={{ width: `${(val/max)*100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-left">
                <select 
                  value={compHorse2.id}
                  onChange={(e) => setCompHorse2(horsesData.find(h => h.id === parseInt(e.target.value)))}
                  className="w-full bg-white/5 border border-white/10 text-white font-black uppercase italic p-4 rounded-xl outline-none focus:border-orange-600 transition-all"
                >
                  {horsesData.map(h => <option key={h.id} value={h.id} className="text-slate-900">{h.id} - {h.name}</option>)}
                </select>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <div className="text-4xl font-black text-orange-500 italic mb-6">{compHorse2.rpi}<span className="text-xs text-white/40 uppercase ml-1">pts</span></div>
                  <div className="space-y-4">
                    {[['Perf', compHorse2.perf, 54], ['Intent', compHorse2.intent, 33], ['Context', compHorse2.context, 20]].map(([label, val, max]) => (
                      <div key={label} className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold uppercase text-white/40"><span>{label}</span><span>{val}/{max}</span></div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-600" style={{ width: `${(val/max)*100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rankings" className="py-24 px-6 bg-white flex flex-col items-center border-b border-slate-100 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Trophy className="w-10 h-10 text-orange-600 mb-4" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">Les Tops <span className="text-orange-600">Performers</span></h2>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {['Attelé', 'Plat', 'Obstacle', 'Monté'].map(d => (
                <button key={d} onClick={() => setFilterDiscipline(d)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterDiscipline === d ? 'bg-white shadow-md text-orange-600' : 'text-slate-400'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
              <h3 className="font-black italic uppercase text-xs mb-6 flex items-center gap-2 text-left"><UserCheck size={16} className="text-orange-600" /> Top Jockeys</h3>
              <div className="space-y-3 text-left">
                {rankings.jockeys.filter(j => j.discipline?.toLowerCase() === filterDiscipline.toLowerCase()).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <span className="font-bold text-xs">{i+1}. {item.name}</span>
                    <span className="font-black text-white bg-slate-900 px-2.5 py-1 rounded text-[10px]">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
              <h3 className="font-black italic uppercase text-xs mb-6 flex items-center gap-2 text-left"><Trophy size={16} className="text-orange-600" /> Top Entraîneurs</h3>
              <div className="space-y-3 text-left">
                {rankings.trainers.filter(t => t.discipline?.toLowerCase() === filterDiscipline.toLowerCase()).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <span className="font-bold text-xs">{i+1}. {item.name}</span>
                    <span className="font-black text-orange-600 px-2.5 py-1 rounded text-[10px]">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-20 text-center px-6 flex flex-col items-center">
        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic block mb-8">RENARD<span className="text-orange-600">TURF</span></span>
        
        <div className="bg-yellow-400 text-slate-900 p-4 rounded-xl max-w-4xl mx-auto mb-8 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4 shadow-sm">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block text-yellow-600">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <button onClick={() => setActiveLegalModal('mentions')}>Mentions Légales</button>
           <button onClick={() => setActiveLegalModal('gaming')}>Jeu Responsable</button>
        </div>

        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">
          © 2026 RENARD TURF - RÉDACTION & ANALYSE DATA
        </p>

        {activeLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 relative text-left shadow-2xl">
              <button onClick={() => setActiveLegalModal(null)} className="absolute top-6 right-6 font-black uppercase text-xs">Fermer [X]</button>
              {activeLegalModal === 'mentions' ? (
                <>
                  <h3 className="text-2xl font-black uppercase italic mb-6">Mentions Légales</h3>
                  <div className="text-slate-500 text-xs leading-relaxed italic space-y-4">
                    <p>RenardTurf est un média indépendant d'analyse hippique. Nous ne sommes pas un opérateur de jeux.</p>
                    <p>
                      Nous utilisons les services de Gambling-Affiliation.com (ci-après nommé "GA"), un fournisseur de service externe, afin d'afficher certaines publicités sous la forme de bannières cliquables, de boutons, ou d'hyperliens. Lorsque nous affichons ces publicités ou lorsque vous cliquez dessus, "GA" collecte votre IP pour des raisons de détection de fraude, puis vous êtes ensuite redirigé vers le site de l'annonceur. Dans certains cas, des cookies "GA" peuvent être déposés sur votre appareil, pour plus d'information veuillez vous reporter à la politique de cookies de "GA" accessible sur <a href="https://www.gambling-affiliation.com/fr/politique-des-cookies" target="_blank" rel="noreferrer" className="underline text-orange-600">https://www.gambling-affiliation.com/fr/politique-des-cookies</a>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-black uppercase italic mb-6">Charte Jeu Responsable</h3>
                  <p className="text-slate-500 text-xs leading-relaxed italic">Jouez avec modération. Le jeu doit rester un plaisir. Si vous sentez que vous perdez le contrôle, contactez Joueurs Info Service au 09 74 75 13 13.</p>
                </>
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
