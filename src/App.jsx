import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Target, 
  Users, 
  Star, 
  Youtube, 
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
  UserCheck
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


  return (
    <div className="w-full flex justify-center py-6 bg-slate-50">
      <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
        <iframe
          ref={bannerRef}
          title="Offre Genybet"
          width="320"
          height="100" 
          frameBorder="0"
          scrolling="no"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState('Plat');
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v2.3 (VENDREDI 23 JANVIER - PRIX DE CHERBOURG) ---
  const horsesData = [
    { "id": 1, "name": "CELESTIAL", "rpi": 95.5, "perf": 49.0, "intent": 29.0, "context": 17.5, "tactic": "2ème de la course référence. 100% sur le parcours, 80% PSF. Associé à Soumillon (Top Jockey) avec la Corde 1. Tous les feux sont au vert." },
    { "id": 2, "name": "LOVE IS GOLD", "rpi": 86.5, "perf": 45.0, "intent": 26.5, "context": 15.0, "tactic": "Le spécialiste (14 courses ici). Très régulier mais hérite de la pire corde (16). Devra compter sur un parcours fluide pour finir." },
    { "id": 3, "name": "DARI RIVER", "rpi": 80.0, "perf": 42.0, "intent": 24.0, "context": 14.0, "tactic": "75% de réussite sur ce tracé. A joué de malchance dernièrement (enfermée). Avec un bon parcours, elle peut refaire surface." },
    { "id": 4, "name": "CICCIO BOY", "rpi": 72.0, "perf": 38.0, "intent": 21.0, "context": 13.0, "tactic": "Expérimenté à ce niveau mais semble moins tranchant (33% parcours). Corde 13 difficile. Pour une 5ème place éventuellement." },
    { "id": 5, "name": "DIVIDE AND RULE", "rpi": 68.0, "perf": 35.0, "intent": 20.0, "context": 13.0, "tactic": "N'a pas confirmé ses bonnes sorties passées récemment. Rentrée moyenne. Semble barrée par les spécialistes de la PSF de Deauville." },
    { "id": 6, "name": "ZELORO", "rpi": 84.0, "perf": 43.0, "intent": 26.0, "context": 15.0, "tactic": "Entraînement Brandt en forme (47%). Couple 100% réussite avec Demuro. Monte de catégorie mais ses limites sont inconnues." },
    { "id": 7, "name": "HAPPY SAXON", "rpi": 65.0, "perf": 32.0, "intent": 19.0, "context": 14.0, "tactic": "Rentrée et première fois handicap en France. Difficile à situer face à des chevaux rodés à ce niveau de compétition." },
    { "id": 8, "name": "SOUS LA NEIGE", "rpi": 82.5, "perf": 41.0, "intent": 25.5, "context": 16.0, "tactic": "4ème de la course clé. Solide sur PSF (64%). Une valeur sûre pour les places dans la combinaison." },
    { "id": 9, "name": "STAR OF THE NIGHT", "rpi": 89.0, "perf": 46.0, "intent": 27.0, "context": 16.0, "tactic": "Porte des oeillères pour la 1ère fois. 75% réussite PSF. Corde 4 idéale. Attention, elle peut gagner à belle cote." },
    { "id": 10, "name": "AQUILA VOLANTE", "rpi": 60.0, "perf": 30.0, "intent": 18.0, "context": 12.0, "tactic": "Stats faibles sur PSF (40%). Corde 14. Tâche compliquée dans ce lot très relevé." },
    { "id": 11, "name": "GOGUEN SPAISE", "rpi": 76.0, "perf": 39.0, "intent": 23.0, "context": 14.0, "tactic": "Régulier (66% PSF). Une possibilité pour les places, mais marge réduite pour la victoire." },
    { "id": 12, "name": "TELCHERBOLINE", "rpi": 78.5, "perf": 40.0, "intent": 24.5, "context": 14.0, "tactic": "Chuchotée et bonnes perfs en quinté. 66% PSF. Corde 15 handicapante mais finit vite." },
    { "id": 13, "name": "HAZA", "rpi": 74.0, "perf": 38.0, "intent": 22.0, "context": 14.0, "tactic": "Porte des oeillères australiennes. 100% réussite sur le parcours (1 course). Outsider amusant en cas de défaillances." },
    { "id": 14, "name": "SOEUR", "rpi": 93.0, "perf": 48.0, "intent": 28.0, "context": 17.0, "tactic": "Sans faute sur le parcours (4 sur 4 à l'arrivée). 3ème de la course réf. Poids favorable. C'est une base solide." },
    { "id": 15, "name": "FEARLESS CHEETAH", "rpi": 91.5, "perf": 47.5, "intent": 27.5, "context": 16.5, "tactic": "La découverte Data. 100% avec son jockey. 69% de réussite PSF. En gros progrès, elle vise le podium." },
    { "id": 16, "name": "YOUNG AND PROUD", "rpi": 62.0, "perf": 31.0, "intent": 19.0, "context": 12.0, "tactic": "Seulement 25% de réussite sur PSF. Corde 2 favorable mais semble un ton en dessous des meilleurs." }
  ];

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 1) || horsesData[0]);
  const [compHorse1, setCompHorse1] = useState(horsesData[0]); // Celestial
  const [compHorse2, setCompHorse2] = useState(horsesData[13]); // Soeur

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
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "r2DdSjVHckc", 
    PLAYLIST_BILAN: "https://youtube.com/playlist?list=PLgejDmYclZBKZEyl_0H5j6hqXgjEf60SE",
    PLAYLIST_PRONO: "https://youtube.com/playlist?list=PLgejDmYclZBLuvLZIaZtvtBdGZrc62b8t"
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
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={LINKS.PLAYLIST_PRONO} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-600/20"><Ticket /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2 text-slate-900">Les Pronos <ExternalLink size={14}/></span>
              </a>

              <a href={LINKS.PLAYLIST_BILAN} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4"><FileText /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2 text-slate-900">Les Bilans</span>
                <span className="text-orange-600 text-[10px] font-black uppercase mt-1">Depuis début janvier, les bilans sont dans l'intro des pronos.</span>
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
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                CONSULTER L'INDICE <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#youtube" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase shadow-xl shadow-orange-600/20 flex items-center justify-center">
                DERNIÈRE VIDÉO
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                JOCKEYS <Trophy className="w-5 h-5" />
              </a>
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                ENTRAÎNEURS <UserCheck className="w-5 h-5" />
              </a>
            </div>

            <div className="w-full">
              <a href="#ticket" className="w-full bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                LE TICKET DU JOUR <Ticket className="w-5 h-5" />
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

            <div className="mt-10 p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left italic">
               <p className="text-slate-700 text-sm font-medium leading-relaxed">
                 <span className="text-orange-600 font-black uppercase not-italic mr-2">Verdict :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>

            {/* --- BOUTONS D'ACTION (RPI TOOL - DYNAMIC) --- */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GENYBET RPI */}
              <a 
                href="https://www.gambling-affiliation.com/cpc/v=i4y8QpvWIKLB9KI57u.kuZEQ02dHjRKXIgVJsBwWORM_GA7331V2&aff_var_1=bouton_rpi_geny" 
                target="_blank" 
                rel="nofollow noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border-2 border-transparent hover:border-yellow-400 transition-all shadow-lg"
              >
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl">
                  250€ OFFERTS
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest group-hover:text-yellow-400 transition-colors">
                  GENYBET
                </span>
                <span className="font-black italic text-white uppercase text-center leading-tight">
                  JOUER <span className="text-yellow-400">{selectedHorse.name}</span>
                </span>
              </a>

              {/* PMU RPI */}
              <a 
                href="https://lk.gt/amyY9" 
                target="_blank" 
                rel="nofollow noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 bg-green-800 rounded-2xl border-2 border-transparent hover:border-white transition-all shadow-lg"
              >
                <div className="absolute top-0 right-0 bg-white text-green-900 text-[10px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl">
                  100€ OFFERTS
                </div>
                <span className="text-[10px] font-black uppercase text-green-200 mb-1 tracking-widest group-hover:text-white transition-colors">
                  PMU.FR
                </span>
                <span className="font-black italic text-white uppercase text-center leading-tight">
                  JOUER <span className="underline decoration-2 underline-offset-2">{selectedHorse.name}</span>
                </span>
              </a>
            </div>
            {/* --------------------------------------------- */}

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
                  <div className="mt-6 pt-4 border-t border-white/10 italic">
                    <p className="text-white/60 text-[11px] leading-relaxed">
                      <span className="text-orange-500 font-black uppercase not-italic mr-2">Verdict :</span>
                      "{compHorse1.tactic}"
                    </p>
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
                  <div className="mt-6 pt-4 border-t border-white/10 italic">
                    <p className="text-white/60 text-[11px] leading-relaxed">
                      <span className="text-orange-500 font-black uppercase not-italic mr-2">Verdict :</span>
                      "{compHorse2.tactic}"
                    </p>
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

      <section id="youtube" className="py-24 px-6 bg-slate-50 flex flex-col items-center scroll-mt-20">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-600">
               <Youtube className="w-8 h-8 fill-current" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-slate-900">Archives Vidéos</h2>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-black">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="YouTube" frameBorder="0" allowFullScreen></iframe>
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
              <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Deauville R1C8</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <History size={12} className="text-orange-600" /> Départ 20h15 • 23 Janvier 2026
              </span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-6 leading-none">
              Prix de Cherbourg
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Discipline", val: "Plat" },
                { label: "Distance", val: "1 900m" },
                { label: "Surface", val: "PSF" },
                { label: "Corde", val: "À Droite" },
                { label: "Partants", val: "16 [4 ans+]" },
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
                       {[1, 14].map(num => <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic">{num}</div>)}
                    </div>
                 </div>
                 <div className="flex flex-col items-start gap-4 text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-green-600" /> Sélection</h4>
                    <div className="flex flex-wrap gap-2">
                       {[1, 14, 15, 9, 2, 6, 8, 3].map((num, i) => (
                          <div key={num} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm italic border-2 ${i < 2 ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10' : 'bg-white border-slate-200 text-slate-900'}`}>{num}</div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* --- BOUTONS AFFILIATION SOUS LA SÉLECTION (TICKET) --- */}
              <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* GENYBET TICKET */}
                    <a href="https://www.gambling-affiliation.com/cpc/v=i4y8QpvWIKLB9KI57u.kuZEQ02dHjRKXIgVJsBwWORM_GA7331V2&aff_var_1=bouton_ticket_geny" target="_blank" rel="nofollow noreferrer" className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white rounded-xl shadow-md hover:bg-slate-800 transition-all group border-b-4 border-yellow-500">
                       <div className="flex flex-col text-left">
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Partenaire</span>
                          <span className="font-black italic text-sm">GENYBET</span>
                       </div>
                       <span className="font-bold text-sm bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg">250€ Offerts</span>
                    </a>

                    {/* PMU TICKET */}
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

      {/* BANNIÈRE GENYBET INSÉRÉE ICI */}
      <GenyBanner />

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
