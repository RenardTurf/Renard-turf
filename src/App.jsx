import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Target, 
  Users, 
  Star, 
  Ticket, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  History, 
  PlayCircle, 
  Eye, 
  Star as StarIcon, 
  BarChart3, 
  ArrowRight, 
  Info, 
  Activity, 
  X, 
  Menu, 
  Trophy, 
  FileText, 
  UserCheck, 
  BookOpen, 
  Crown 
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
  const [filterDiscipline, setFilterDiscipline] = useState('Plat');
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v4.0 (LUNDI 02 FÉVRIER - PRIX DU VAR) ---
  const horsesData = [
    { "id": 1, "name": "GRECIAN COMET", "rpi": 83.0, "perf": 44.0, "intent": 25.0, "context": 14.0 },
    { "id": 2, "name": "MILLAR", "rpi": 82.0, "perf": 42.0, "intent": 24.0, "context": 16.0 },
    { "id": 3, "name": "FIUMICCINO", "rpi": 85.0, "perf": 45.0, "intent": 24.0, "context": 16.0 },
    { "id": 4, "name": "ALOYSIUS", "rpi": 96.0, "perf": 49.0, "intent": 30.0, "context": 17.0 },
    { "id": 5, "name": "PRINCESSE TREZY", "rpi": 77.0, "perf": 39.0, "intent": 24.0, "context": 14.0 },
    { "id": 6, "name": "LANTANA", "rpi": 78.0, "perf": 40.0, "intent": 23.0, "context": 15.0 },
    { "id": 7, "name": "NOUS Y SOMMES", "rpi": 92.0, "perf": 48.0, "intent": 26.0, "context": 18.0 },
    { "id": 8, "name": "LADY VITESSE", "rpi": 81.0, "perf": 41.0, "intent": 24.0, "context": 16.0 },
    { "id": 9, "name": "AQUITAIN", "rpi": 70.0, "perf": 36.0, "intent": 21.0, "context": 13.0 },
    { "id": 10, "name": "TIMBER CIRCLE", "rpi": 59.0, "perf": 30.0, "intent": 18.0, "context": 11.0 },
    { "id": 11, "name": "BLUE SEABIRD", "rpi": 71.0, "perf": 35.0, "intent": 24.0, "context": 12.0 },
    { "id": 12, "name": "WEEMAGATEE", "rpi": 99.0, "perf": 52.0, "intent": 29.0, "context": 18.0 },
    { "id": 13, "name": "BLARNEY", "rpi": 88.0, "perf": 46.0, "intent": 25.0, "context": 17.0 },
    { "id": 14, "name": "SIR CRATER", "rpi": 62.0, "perf": 32.0, "intent": 18.0, "context": 12.0 },
    { "id": 15, "name": "KAWAALOT", "rpi": 76.0, "perf": 38.0, "intent": 22.0, "context": 16.0 },
    { "id": 16, "name": "MEME TOI", "rpi": 74.0, "perf": 37.0, "intent": 22.0, "context": 15.0 }
  ];

  // Infos de la course mises à jour
  const raceInfo = {
    title: "Prix du Var",
    date: "02 Février 2026",
    location: "Cagnes-sur-Mer",
    discipline: "Plat (Gazon)",
    distance: "2 150m",
    allocation: "53 000€"
  };

  // Sélection par défaut sur la base (Weemagatee #12)
  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 12) || horsesData[0]);
  
  // Comparateur par défaut : Weemagatee (#12) vs Aloysius (#4)
  const [compHorse1, setCompHorse1] = useState(horsesData[11]); // Index 11 = ID 12
  const [compHorse2, setCompHorse2] = useState(horsesData[3]);  // Index 3 = ID 4

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
    SUBSCRIPTION: "https://lerenardturf.sellfy.store/p/abonnement-mensuel-1990/"
  };

  const stats = [
    { label: "Vues", value: "550 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1600+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "Réussite Quinté 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 text-white font-bold">
               <Zap className="fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <a href={LINKS.EBOOK_SHOP} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 group">
                <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center mb-4"><BookOpen /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2">LE GUIDE DU RENARD (Ebook) <ExternalLink size={14}/></span>
              </a>

              <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-800 group">
                <div className="w-12 h-12 bg-yellow-400 text-slate-900 rounded-2xl flex items-center justify-center mb-4"><Crown /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2 text-yellow-400">ABONNEMENT VIP <ExternalLink size={14}/></span>
              </a>
              
              <a href="#rankings" onClick={() => setIsMenuOpen(false)} className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group text-left">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Trophy /></div>
                <span className="font-black uppercase italic text-sm text-slate-900">Classements Data</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Activity className="text-orange-600 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 leading-none tracking-tighter uppercase italic">
            L'Information <span className="text-orange-600">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Décryptage, statistiques avancées et expertise pour une approche rationnelle du PMU sur le long terme.
          </p>
          
          <div className="flex flex-col gap-5 justify-center items-center w-full max-w-2xl px-6 md:px-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
               {/* EBOOK BUTTON */}
               <a href={LINKS.EBOOK_SHOP} target="_blank" rel="noreferrer" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-5 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/20 group uppercase border-2 border-slate-900 hover:border-orange-500">
                <BookOpen className="w-5 h-5 text-orange-500" /> GUIDE DU RENARD
              </a>
              {/* SUBSCRIPTION BUTTON */}
              <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="w-full sm:w-1/2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-6 py-5 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-yellow-400/20 group uppercase border-2 border-yellow-400 hover:border-white">
                <Crown className="w-5 h-5 text-slate-900" /> ABONNEMENT VIP
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full mt-2">
              <a href="#rpi-tool" className="w-full bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                CONSULTER L'INDICE <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                {filterDiscipline === 'Plat' ? 'JOCKEYS' : 'DRIVERS'} <Trophy className="w-5 h-5" />
              </a>
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                ENTRAÎNEURS <UserCheck className="w-5 h-5" />
              </a>
            </div>
            
            <div className="w-full">
              <a href="#ticket" className="w-full bg-white border-2 border-slate-100 hover:border-orange-600 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-sm group uppercase">
                LE TICKET DU JOUR <Ticket className="w-5 h-5 text-orange-600" />
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

      {/* --- SECTION EBOOK PROMO --- */}
      <section id="ebook-promo" className="py-20 px-6 bg-slate-900 text-white flex flex-col items-center relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-500/30 text-orange-500 px-4 py-1.5 rounded-full mb-6 shadow-sm backdrop-blur-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Formation Exclusive</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic tracking-tighter leading-none">
            LES SECRETS DES <span className="text-orange-500">TURFISTES AVERTIS</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            23 pages pour analyser le Quinté comme un pro. Comprenez enfin les mécanismes cachés des courses et arrêtez de jouer au hasard.
          </p>
          <a 
            href={LINKS.EBOOK_SHOP} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-orange-600/30 hover:scale-105"
          >
            <BookOpen className="w-6 h-6" /> OBTENIR LE GUIDE MAINTENANT
          </a>
        </div>
      </section>

      {/* --- SECTION ABONNEMENT VIP --- */}
      <section id="subscription-promo" className="py-20 px-6 bg-white text-slate-900 flex flex-col items-center relative border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="text-left md:w-3/5">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-yellow-400/20">
                  <Crown className="w-4 h-4 fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Offre Premium</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
                  DEVENEZ <span className="text-yellow-400">MEMBRE VIP</span>
                </h2>
                <ul className="space-y-4 mb-8">
                  {['Selection Quinté+ détaillée la veille', 'Analyses exclusives & Chevaux D\'autres Courses', 'Un Chapitre Et Une Astuce De Jeu Du Guide Du Renard Gratuitement'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:w-2/5 flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full text-center">
                  <span className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2 block">Sans engagement</span>
                  <div className="text-5xl font-black text-white mb-6">19,90€<span className="text-lg text-slate-400 font-medium">/mois</span></div>
                  <a 
                    href={LINKS.SUBSCRIPTION} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full block bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-yellow-400/20 hover:scale-105 uppercase"
                  >
                    JE M'ABONNE 🚀
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* RPI Analyzer Tool (SANS ANALYSE TEXTUELLE) */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-10 h-10 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none text-center">
              L'Analyseur de Probabilité <span className="text-orange-600">RPI</span>
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12">
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
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Performance</span>
                  <span className="text-slate-900">{selectedHorse.perf}/50</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 transition-all duration-700" style={{ width: `${(selectedHorse.perf/50)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Intention</span>
                  <span className="text-orange-600">{selectedHorse.intent}/30</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(selectedHorse.intent/30)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Contexte</span>
                  <span className="text-slate-600">{selectedHorse.context}/20</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 transition-all duration-700" style={{ width: `${(selectedHorse.context/20)*100}%` }}></div>
                </div>
              </div>
            </div>

            {/* --- BOUTONS D'ACTION (RPI TOOL) --- */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://www.gambling-affiliation.com/cpc/v=i4y8QpvWIKLB9KI57u.kuZEQ02dHjRKXIgVJsBwWORM_GA7331V2&aff_var_1=bouton_rpi_geny" 
                target="_blank" 
                rel="nofollow noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border-2 border-transparent hover:border-yellow-400 transition-all shadow-lg"
              >
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl">250€ OFFERTS</div>
                <span className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest group-hover:text-yellow-400 transition-colors">GENYBET</span>
                <span className="font-black italic text-white uppercase text-center leading-tight">JOUER <span className="text-yellow-400">{selectedHorse.name}</span></span>
              </a>

              <a 
                href="https://lk.gt/amyY9" 
                target="_blank" 
                rel="nofollow noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 bg-green-800 rounded-2xl border-2 border-transparent hover:border-white transition-all shadow-lg"
              >
                <div className="absolute top-0 right-0 bg-white text-green-900 text-[10px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl">100€ OFFERTS</div>
                <span className="text-[10px] font-black uppercase text-green-200 mb-1 tracking-widest group-hover:text-white transition-colors">PMU.FR</span>
                <span className="font-black italic text-white uppercase text-center leading-tight">JOUER <span className="underline decoration-2 underline-offset-2">{selectedHorse.name}</span></span>
              </a>
            </div>
            {/* ----------------------------------- */}

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
                    {[['Perf', compHorse1.perf, 50], ['Intent', compHorse1.intent, 30], ['Context', compHorse1.context, 20]].map(([label, val, max]) => (
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
                    {[['Perf', compHorse2.perf, 50], ['Intent', compHorse2.intent, 30], ['Context', compHorse2.context, 20]].map(([label, val, max]) => (
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

      <section id="ticket" className="py-24 px-6 bg-white flex flex-col items-center scroll-mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-600 px-6 py-2 rounded-full border border-orange-500/20 mb-6 font-black uppercase text-xs italic tracking-widest leading-none">Analyse Quinté</div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-tight text-center">La Sélection Quinté 🎫</h2>
          </div>

          <div className="max-w-3xl mx-auto mb-10 text-left border-l-4 border-orange-600 pl-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Cagnes-sur-Mer R1C1</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <History size={12} className="text-orange-600" /> Départ 13h55 • 02 Février 2026
              </span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-6 leading-none">
              Prix du Var
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Discipline", val: "Plat (Gazon)" },
                { label: "Distance", val: "2 150m" },
                { label: "Surface", val: "Collant" },
                { label: "Corde", val: "À Gauche" },
                { label: "Partants", val: "16 [4 ans]" },
                { label: "Allocation", val: "53 000€" }
              ].map((info, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</span>
                  <span className="text-xs font-bold text-slate-900 uppercase">{info.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-1 shadow-2xl shadow-orange-600/5 overflow-hidden max-w-3xl mx-auto w-full">
            <div className="bg-white border-4 border-dashed border-slate-100 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-8 mb-8">
                 <h3 className="font-black text-2xl uppercase italic leading-none">Note <span className="text-orange-600 font-bold italic">Renard</span></h3>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic tracking-widest">Quinté+</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start gap-4 text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2"><StarIcon className="w-3 h-3 fill-orange-600 text-orange-600" /> Bases Data</h4>
                    <div className="flex gap-3">
                       {[12, 4].map(num => <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic">{num}</div>)}
                    </div>
                 </div>
                 <div className="flex flex-col items-start gap-4 text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-green-600" /> Sélection</h4>
                    <div className="flex flex-wrap gap-2">
                       {[12, 4, 7, 13, 3, 1, 2, 8].map((num, i) => (
                          <div key={num} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm italic border-2 ${i < 2 ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10' : 'bg-white border-slate-200 text-slate-900'}`}>{num}</div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* --- BOUTONS AFFILIATION SOUS LA SÉLECTION (TICKET) --- */}
              <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://www.gambling-affiliation.com/cpc/v=i4y8QpvWIKLB9KI57u.kuZEQ02dHjRKXIgVJsBwWORM_GA7331V2&aff_var_1=bouton_ticket_geny" target="_blank" rel="nofollow noreferrer" className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white rounded-xl shadow-md hover:bg-slate-800 transition-all group border-b-4 border-yellow-500">
                       <div className="flex flex-col text-left">
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Partenaire</span>
                          <span className="font-black italic text-sm">GENYBET</span>
                       </div>
                       <span className="font-bold text-sm bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg">250€ Offerts</span>
                    </a>

                    <a href="https://lk.gt/amyY9" target="_blank" rel="nofollow noreferrer" className="flex items-center justify-between px-4 py-3 bg-green-700 text-white rounded-xl shadow-md hover:bg-green-800 transition-all group border-b-4 border-green-900">
                       <div className="flex flex-col text-left">
                          <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest">Partenaire</span>
                          <span className="font-black italic text-sm">PMU.FR</span>
                       </div>
                       <span className="font-bold text-sm bg-white text-green-800 px-3 py-1 rounded-lg">100€ Offerts</span>
                    </a>
                 </div>
              </div>
              {/* --------------------------------------------- */}

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
