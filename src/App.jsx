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
  Menu, // Hamburger
  Trophy, // Classements
  FileText,
  UserCheck
} from 'lucide-react';

// --- CONFIGURATION GOOGLE SHEETS ---
const SHEET_URLS = {
  JOCKEYS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQH61koCV9FgrkJfYVNQMlseDY2K4R54ClxM-tkM2vwb0Dvbwyb1KYiimPdZODPaFbXW40VrVUJjFqW/pub?output=csv",
  TRAINERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-gp9qlf4bEk3vMQuOp4WNickKworuWoP0P-Vgr5PtTE5hn-vkJhrC5GD3INH5T0WUbnlLfGtLMtiu/pub?output=csv"
};

// --- INITIALISATION GOOGLE ANALYTICS ---
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

  // --- DATA RPI v2.1 ---
  const horsesData = [
  { "id": 1, "name": "CHITCHAT", "rpi": 92.2, "perf": 46.5, "intent": 26.5, "context": 19.2, "tactic": "Le Spécialiste (60%). Chrono 1'11''1. Stalle 1 (36%) idéale pour prendre la tête." },
  { "id": 2, "name": "HISTORIC DAY", "rpi": 52.4, "perf": 22.0, "intent": 15.0, "context": 15.4, "tactic": "Stalle 2 correcte mais manque de références chronos sur le parcours." },
  { "id": 3, "name": "HYDROMEL", "rpi": 88.6, "perf": 44.5, "intent": 28.0, "context": 16.1, "tactic": "100% avec Raffin (3/3). 75% réussite parcours. Vise le podium." },
  { "id": 4, "name": "HOLD UP RANAIS", "rpi": 84.4, "perf": 42.2, "intent": 23.2, "context": 19.0, "tactic": "Record 1'10''9. Duo G. Martin (75%). Candidat sérieux aux places." },
  { "id": 5, "name": "GUCCI DE BARB", "rpi": 66.8, "perf": 32.0, "intent": 20.5, "context": 14.3, "tactic": "73% réussite avec Daugeard mais doit monter en condition." },
  { "id": 6, "name": "TURE L.A.", "rpi": 90.4, "perf": 45.0, "intent": 25.5, "context": 19.9, "tactic": "Top Stalle 6 (41%). Note Barbara 15/20. Base de jeu incontournable." },
  { "id": 7, "name": "GUMP DU PONCELET", "rpi": 87.5, "perf": 43.0, "intent": 27.0, "context": 17.5, "tactic": "Repéré écurie. 100% déferré (11/11). Capable de gagner si parcours clair." },
  { "id": 8, "name": "FORREST GUMP SET", "rpi": 86.9, "perf": 43.5, "intent": 24.0, "context": 19.4, "tactic": "Spécialiste (3/4). Stalle 8 (38%). Note 15/20. Très performant sur ce profil." },
  { "id": 9, "name": "GLAMOUR YOMA", "rpi": 64.2, "perf": 30.0, "intent": 18.0, "context": 16.2, "tactic": "Cote élevée attendue. Doit rassurer sur sa vitesse finale." },
  { "id": 10, "name": "GRAZIELA D'EL", "rpi": 80.1, "perf": 41.0, "intent": 22.5, "context": 16.6, "tactic": "La Découverte. Chrono 1'11''4. Score 10/16 sur le parcours. Outsider amusant." },
  { "id": 11, "name": "FALCO DU HAMEL", "rpi": 62.5, "perf": 29.0, "intent": 17.0, "context": 16.5, "tactic": "Chrono 1'11''4 mais position en seconde ligne handicapante." },
  { "id": 12, "name": "NICE PRESENT", "rpi": 85.3, "perf": 42.5, "intent": 24.0, "context": 18.8, "tactic": "Record parcours 1'10''9. 7/8 dans les Quintés. Malgré la 2e ligne, priorité." },
  { "id": 13, "name": "CHESTNUT", "rpi": 88.1, "perf": 44.0, "intent": 26.5, "context": 17.6, "tactic": "Duo Abrivard/Redén (100%). Chrono 1'11''2. Grande piste (6/7)." },
  { "id": 14, "name": "FERGIE HIGHLAND", "rpi": 72.8, "perf": 35.0, "intent": 21.0, "context": 16.8, "tactic": "Chrono 1'11''. 50% de réussite sur le parcours. Pour une 5e place." },
  { "id": 15, "name": "CERTAINLY", "rpi": 76.5, "perf": 38.0, "intent": 21.5, "context": 17.0, "tactic": "L'outsider séduisant de Damien Bazerque. Note confidentielle 13/20." },
  { "id": 16, "name": "GOELAND DE JANZE", "rpi": 74.2, "perf": 36.5, "intent": 22.0, "context": 15.7, "tactic": "Note 13/20. 100% avec Nivard (1 place). Vise une petite place." }
];

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 2) || horsesData[0]);
  
  // ÉTATS POUR LE COMPARATEUR
  const [compHorse1, setCompHorse1] = useState(horsesData[0]);
  const [compHorse2, setCompHorse2] = useState(horsesData[1]);

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
    LAST_VIDEO_ID: "GZEa0h_bkt4",
    PLAYLIST_BILAN: "https://youtube.com/playlist?list=PLgejDmYclZBKZEyl_0H5j6hqXgjEf60SE&si=Ps_jdMmtYv3u4Imp",
    PLAYLIST_PRONO: "https://youtube.com/playlist?list=PLgejDmYclZBLuvLZIaZtvtBdGZrc62b8t&si=sh8aR-nCphC4ChvQ"
  };

  const stats = [
    { label: "Vues", value: "530 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1500+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "Réussite Quinté 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* NAVIGATION MEDIA */}
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

        {/* MENU HAMBURGER OVERLAY */}
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

      {/* HERO SECTION */}
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

      {/* RPI TOOL SECTION */}
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
            <div className="mt-10 p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left italic">
               <p className="text-slate-700 text-sm font-medium leading-relaxed">
                 <span className="text-orange-600 font-black uppercase not-italic mr-2">Verdict :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>
          </div>

          {/* OUTIL COMPARATEUR INTRODUIT ICI */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-500 px-4 py-1.5 rounded-full mb-4">
                <Zap size={14} className="fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Outil de Duel Data</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Comparateur de Performance</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              {/* SÉPARATEUR VS */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-600 rounded-full items-center justify-center text-white font-black italic z-10 shadow-lg shadow-orange-600/40 border-4 border-slate-900">
                VS
              </div>

              {/* CHEVAL 1 */}
              <div className="space-y-6">
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
                    {[['Perf', compHorse1.perf, 50], ['Intent', compHorse1.intent, 25], ['Context', compHorse1.context, 25]].map(([label, val, max]) => (
                      <div key={label} className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold uppercase text-white/40"><span>{label}</span><span>{val}/{max}</span></div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-600" style={{ width: `${(val/max)*100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CHEVAL 2 */}
              <div className="space-y-6">
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
                    {[['Perf', compHorse2.perf, 50], ['Intent', compHorse2.intent, 25], ['Context', compHorse2.context, 25]].map(([label, val, max]) => (
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

      {/* SECTION CLASSEMENTS */}
      <section id="rankings" className="py-24 px-6 bg-white flex flex-col items-center border-b border-slate-100 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Trophy className="w-10 h-10 text-orange-600 mb-4" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">Les Tops <span className="text-orange-600">Performers</span></h2>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {['Attelé', 'Plat', 'Obstacle'].map(d => (
                <button key={d} onClick={() => setFilterDiscipline(d)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterDiscipline === d ? 'bg-white shadow-md text-orange-600' : 'text-slate-400'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
              <h3 className="font-black italic uppercase text-xs mb-6 flex items-center gap-2 text-left"><UserCheck size={16} className="text-orange-600" /> Top Jockeys</h3>
              <div className="space-y-3">
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
              <div className="space-y-3">
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

      {/* SECTION YOUTUBE */}
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

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-white flex flex-col items-center scroll-mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-600 px-6 py-2 rounded-full border border-orange-500/20 mb-6 font-black uppercase text-xs italic tracking-widest leading-none">Analyse Quinté</div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-tight text-center">La Sélection Quinté 🎫</h2>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-1 shadow-2xl shadow-orange-600/5 overflow-hidden max-w-3xl mx-auto w-full">
            <div className="bg-white border-4 border-dashed border-slate-100 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-8 mb-8">
                 <h3 className="font-black text-2xl uppercase italic leading-none">Note <span className="text-orange-600 font-bold italic">Renard</span></h3>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic tracking-widest">Vincennes R1C1</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start gap-4 text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2"><StarIcon className="w-3 h-3 fill-orange-600 text-orange-600" /> Bases Data</h4>
                    <div className="flex gap-3">
                       {[1, 6].map(num => <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic">{num}</div>)}
                    </div>
                 </div>
                 <div className="flex flex-col items-start gap-4 text-left">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-green-600" /> Sélection</h4>
                    <div className="flex flex-wrap gap-2">
                       {[1, 6, 3, 13, 7, 8, 12, 4].map((num, i) => (
                          <div key={num} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm italic border-2 ${i < 2 ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10' : 'bg-white border-slate-200 text-slate-900'}`}>{num}</div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
              <h3 className="text-2xl font-black uppercase italic mb-6">{activeLegalModal === 'mentions' ? 'Mentions Légales' : 'Charte Jeu Responsable'}</h3>
              <p className="text-slate-500 text-xs leading-relaxed italic">RenardTurf est un média indépendant d'analyse hippique. Nous ne sommes pas un opérateur de jeux. Jouez avec modération.</p>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
