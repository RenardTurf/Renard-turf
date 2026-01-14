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

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState('Attelé');
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v2.1 ---
  const horsesData = [
  { "id": 1, "name": "KAHUNA", "rpi": 91.5, "perf": 46.0, "intent": 22.5, "context": 23.0, "tactic": "EXTRA SUR LE PARCOURS (3/3). Corde 6 idéale. Dernière minute chuchotée." },
  { "id": 2, "name": "WATCH HIM", "rpi": 78.4, "perf": 40.0, "intent": 19.5, "context": 18.9, "tactic": "Favori spéculatif. 77% de réussite PSF." },
  { "id": 9, "name": "ALOYSIUS", "rpi": 96.8, "perf": 47.5, "intent": 24.5, "context": 24.8, "tactic": "LE FAVORI RPI. Corde 5 (62% succès). Repéré dans les jumelles." },
  { "id": 13, "name": "MELBORA", "rpi": 93.7, "perf": 45.8, "intent": 24.0, "context": 23.9, "tactic": "TUYAU RÉDACTION. 100% sur le tracé (3/3)." }
];

  const [selectedHorse, setSelectedHorse] = useState(horsesData[0]);

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
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 text-white font-bold text-white">
               <Zap className="fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU HAMBURGER (Redirection vers ancres fluides) */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={LINKS.PLAYLIST_PRONO} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Ticket /></div>
                <span className="font-black uppercase italic text-sm text-slate-900">Les Pronos <ExternalLink size={14} className="inline ml-1"/></span>
              </a>

              <a href={LINKS.PLAYLIST_BILAN} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4"><FileText /></div>
                <span className="font-black uppercase italic text-sm text-slate-900 leading-tight">Les Bilans</span>
                <span className="text-orange-600 text-[9px] font-black uppercase mt-1 leading-tight italic">Bilans en intro des pronos depuis janvier.</span>
              </a>

              <a href="#rankings" onClick={() => setIsMenuOpen(false)} className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Trophy /></div>
                <span className="font-black uppercase italic text-sm text-slate-900">Classements</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase mt-1 italic">Jockeys & Entraîneurs</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Activity className="text-orange-600 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic text-slate-900 leading-[0.9]">
            L'Information <span className="text-orange-600">Data</span><br />au service du Turf.
          </h1>
          
          <div className="flex flex-col gap-5 justify-center items-center w-full max-w-2xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                INDICE RPI <ChevronRight size={24}/>
              </a>
              <a href="#youtube" className="w-full sm:w-1/2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-10 py-5 rounded-2xl font-black text-lg text-slate-900 uppercase flex items-center justify-center">
                DOSSIERS VIDÉOS
              </a>
            </div>

            {/* NOUVEAUX BOUTONS CLASSEMENTS FLUIDES */}
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                JOCKEYS <Trophy size={20} />
              </a>
              <a href="#rankings" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20 group uppercase">
                ENTRAÎNEURS <UserCheck size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 w-full">
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

      {/* RPI TOOL */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100 scroll-mt-24">
        <div className="container mx-auto max-w-4xl text-center">
          <BarChart3 className="w-10 h-10 text-orange-600 mx-auto mb-4" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12 text-slate-900">Analyseur <span className="text-orange-600">RPI</span></h2>
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <select 
                   value={selectedHorse.id}
                   onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                   className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl font-black uppercase italic outline-none focus:border-orange-600 appearance-none"
                >
                  {horsesData.map(h => <option key={h.id} value={h.id}>{h.id} - {h.name}</option>)}
                </select>
              </div>
              <div className="w-full md:w-1/2 bg-slate-900 rounded-3xl p-8 text-center text-white shadow-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-2 italic tracking-widest">Renard Pro Index</span>
                <div className="text-7xl font-black italic">{selectedHorse.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-orange-50 rounded-2xl italic text-left border border-orange-100">
               <span className="text-orange-600 font-black uppercase not-italic mr-2">Verdict :</span> "{selectedHorse.tactic}"
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CLASSEMENTS (Visible sur la page pour scroll fluide) */}
      <section id="rankings" className="py-24 px-6 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="container mx-auto max-w-6xl text-center flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 w-full">
            <div className="text-left">
              <Trophy className="w-12 h-12 text-orange-600 mb-4" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900">Les Tops <span className="text-orange-600">Performers</span></h2>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {['Attelé', 'Plat', 'Obstacle'].map(d => (
                <button key={d} onClick={() => setFilterDiscipline(d)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filterDiscipline === d ? 'bg-white shadow-md text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div className="bg-slate-50 border-2 border-slate-100 rounded-[3rem] p-10 shadow-sm text-left">
              <h3 className="font-black italic uppercase flex items-center gap-3 mb-8 text-slate-900"><UserCheck className="text-orange-600" /> Jockeys</h3>
              <div className="space-y-4">
                {rankings.jockeys.filter(j => j.discipline?.toLowerCase() === filterDiscipline.toLowerCase()).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100">
                    <span className="font-bold text-sm">{i+1}. {item.name}</span>
                    <span className="font-black text-white bg-slate-900 px-3 py-1 rounded-lg text-xs">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 border-2 border-slate-100 rounded-[3rem] p-10 shadow-sm text-left">
              <h3 className="font-black italic uppercase flex items-center gap-3 mb-8 text-slate-900"><Trophy className="text-orange-600" /> Entraîneurs</h3>
              <div className="space-y-4">
                {rankings.trainers.filter(t => t.discipline?.toLowerCase() === filterDiscipline.toLowerCase()).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100">
                    <span className="font-bold text-sm">{i+1}. {item.name}</span>
                    <span className="font-black text-orange-600 text-sm italic">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION YOUTUBE */}
      <section id="youtube" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-b border-slate-100 scroll-mt-24">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <Youtube className="w-12 h-12 text-orange-600 mb-6" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12 text-slate-900">Dernière <span className="text-orange-600">Analyse</span></h2>
          <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-slate-200">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="YouTube" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-white flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center">
           <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-600 px-6 py-2 rounded-full border border-orange-500/20 mb-12 uppercase italic font-bold text-xs tracking-widest">
             <Ticket size={20} /> Sélection Quinté
           </div>
           {/* Bloc Ticket existant... */}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20 text-center px-6">
        <span className="text-2xl font-black italic uppercase text-slate-900 leading-none">RENARD<span className="text-orange-600">TURF</span></span>
        <div className="bg-yellow-400 text-slate-900 p-4 rounded-xl max-w-4xl mx-auto my-10 font-black uppercase text-[10px] tracking-widest flex flex-col md:flex-row items-center justify-center gap-4">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] italic">© 2026 RENARD TURF - DATA & ANALYSE</p>
      </footer>
    </div>
  );
};

export default App;
