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
  const [showRankings, setShowRankings] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState('Attelé');
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v2.1 ---
  const horsesData = [
  { "id": 1, "name": "KAHUNA", "rpi": 91.5, "perf": 46.0, "intent": 22.5, "context": 23.0, "tactic": "EXTRA SUR LE PARCOURS (3/3). Corde 6 idéale. Dernière minute chuchotée." },
  { "id": 2, "name": "WATCH HIM", "rpi": 78.4, "perf": 40.0, "intent": 19.5, "context": 18.9, "tactic": "Favori spéculatif. 77% de réussite PSF mais doit rassurer sur la fraîcheur." },
  { "id": 3, "name": "AMERICAN GLORY", "rpi": 70.2, "perf": 32.0, "intent": 18.0, "context": 20.2, "tactic": "Corde 4 avantageuse. 100% de réussite en valeur handicap du jour." },
  { "id": 4, "name": "MAX VERST", "rpi": 74.6, "perf": 35.0, "intent": 19.0, "context": 20.6, "tactic": "Tandem Boutin 100%. Forme saisonnière confirmée. Corde 9 correcte." },
  { "id": 5, "name": "ALPAGE", "rpi": 84.6, "perf": 42.0, "intent": 22.0, "context": 20.6, "tactic": "SPÉCIALISTE CAGNES (7/7). Score pondéré par la corde 15 handicapante." },
  { "id": 6, "name": "GILDED DRAGON", "rpi": 68.3, "perf": 38.0, "intent": 15.0, "context": 15.3, "tactic": "Top forme saisonnière (4,20). Oeillères portées. Stalle 16 délicate." },
  { "id": 7, "name": "CENTRAL PARK WEST", "rpi": 95.2, "perf": 48.0, "intent": 23.5, "context": 23.7, "tactic": "BASE SOLIDE. Invincibilité en jeu. Malgré corde 14, reste incontournable." },
  { "id": 8, "name": "EUSKADI", "rpi": 86.1, "perf": 43.5, "intent": 21.0, "context": 21.6, "tactic": "100% RÉUSSITE PSF (4/4). Jamais déçu sur la surface azuréenne." },
  { "id": 9, "name": "ALOYSIUS", "rpi": 96.8, "perf": 47.5, "intent": 24.5, "context": 24.8, "tactic": "LE FAVORI RPI. Corde 5 (62% succès). Repéré dans les jumelles." },
  { "id": 10, "name": "XILOFONO", "rpi": 52.4, "perf": 22.0, "intent": 15.0, "context": 15.4, "tactic": "Semi-rentrée. Risque d'avoir besoin de cette course. Corde 10." },
  { "id": 11, "name": "HARRY WAY", "rpi": 48.7, "perf": 18.0, "intent": 14.0, "context": 16.7, "tactic": "Dernières sorties transparentes. Indice de forme le plus bas (9,00)." },
  { "id": 12, "name": "I'M A BELIEVER", "rpi": 81.9, "perf": 43.0, "intent": 18.5, "context": 20.4, "tactic": "LA DÉCOUVERTE. Note de forme 4,30. Outsider préféré sous 54,5kg." },
  { "id": 13, "name": "MELBORA", "rpi": 93.7, "perf": 45.8, "intent": 24.0, "context": 23.9, "tactic": "TUYAU RÉDACTION. 100% sur le tracé (3/3). Entraîneur très optimiste." },
  { "id": 14, "name": "GRECIAN BONANZA", "rpi": 88.4, "perf": 44.2, "intent": 21.0, "context": 23.2, "tactic": "Corde 2 idéale. Presque parfait sur 2000m PSF. Candidat podium." },
  { "id": 15, "name": "GRAND BALCON", "rpi": 82.3, "perf": 41.0, "intent": 20.5, "context": 20.8, "tactic": "Corde 1 avantageuse. Mieux placé au poids. Notre outsider préféré." },
  { "id": 16, "name": "DRESSMAN", "rpi": 62.9, "perf": 30.0, "intent": 15.0, "context": 17.9, "tactic": "À surveiller. Références sur PSF à l'étranger mais doit s'adapter ici." }
];

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 2) || horsesData[0]);

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
          
          <button onClick={() => { setIsMenuOpen(!isMenuOpen); setShowRankings(false); }} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU HAMBURGER OVERLAY */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto max-w-4xl">
              {!showRankings ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a href={LINKS.PLAYLIST_PRONO} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-600/20"><Ticket /></div>
                    <span className="font-black uppercase italic text-sm flex items-center gap-2 text-slate-900">Les Pronos <ExternalLink size={14}/></span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase mt-1">Playlist Quinté+ Quotidien</span>
                  </a>

                  <a href={LINKS.PLAYLIST_BILAN} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4"><FileText /></div>
                    <span className="font-black uppercase italic text-sm flex items-center gap-2 text-slate-900">Les Bilans <ExternalLink size={14}/></span>
                    <span className="text-orange-600 text-[10px] font-black uppercase mt-1 leading-tight">
                      Depuis début janvier, les bilans sont dans l'introduction de mes pronos.
                    </span>
                  </a>

                  <button onClick={() => setShowRankings(true)} className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all border border-slate-100 group text-left">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Trophy /></div>
                    <span className="font-black uppercase italic text-sm text-slate-900">Classements Data</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest italic">Jockeys & Entraîneurs</span>
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <button onClick={() => setShowRankings(false)} className="mb-8 flex items-center gap-2 text-orange-600 font-black uppercase text-xs italic bg-orange-50 px-4 py-2 rounded-xl">
                    <ArrowRight className="rotate-180 w-4 h-4" /> Retour au menu
                  </button>
                  
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-8 w-fit shadow-inner">
                    {['Attelé', 'Plat', 'Obstacle'].map(d => (
                      <button key={d} onClick={() => setFilterDiscipline(d)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterDiscipline === d ? 'bg-white shadow-md text-orange-600' : 'text-slate-400'}`}>
                        {d}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100">
                      <h3 className="font-black italic uppercase text-xs mb-6 flex items-center gap-2"><UserCheck size={16} className="text-orange-600" /> Top Jockeys</h3>
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
                      <h3 className="font-black italic uppercase text-xs mb-6 flex items-center gap-2"><Trophy size={16} className="text-orange-600" /> Top Entraîneurs</h3>
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
              )}
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
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-6 md:px-0 w-full max-w-2xl">
            <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase">
              CONSULTER L'INDICE <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#youtube" className="w-full sm:w-1/2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase text-slate-900">
              DOSSIERS VIDÉOS
            </a>
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
            <p className="text-slate-400 mt-4 font-bold uppercase text-[10px] tracking-[0.3em]">Mise à jour : Cagnes - R1C2 - 13h55 (14/01/2026)</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8">
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
                  <span className="text-orange-600">{selectedHorse.intent}/25</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(selectedHorse.intent/25)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Contexte</span>
                  <span className="text-slate-600">{selectedHorse.context}/25</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 transition-all duration-700" style={{ width: `${(selectedHorse.context/25)*100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left">
               <p className="text-slate-700 text-sm italic font-medium leading-relaxed">
                 <span className="text-orange-600 font-black uppercase not-italic mr-2">Verdict Éditorial :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION YOUTUBE */}
      <section id="youtube" className="py-24 px-6 bg-white flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-600">
               <Youtube className="w-8 h-8 fill-current" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-slate-900">Archives Vidéos</h2>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-slate-50">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="YouTube" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-50 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-600 px-6 py-2 rounded-full border border-orange-500/20 mb-6">
                <Ticket className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-bold text-orange-600">L'analyse de la rédaction</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-tight">La Sélection Quinté 🎫</h2>
             <p className="text-slate-500 max-w-xl mx-auto italic font-medium leading-relaxed text-center">Synthèse des données RPI et des observations de terrain pour le Prix De Cannes.</p>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-1 shadow-2xl shadow-orange-600/5 overflow-hidden max-w-3xl mx-auto w-full">
            <div className="bg-white border-4 border-dashed border-slate-100 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-100 pb-8 mb-8 relative z-10 gap-4">
                 <div>
                    <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none italic">Note <span className="text-orange-600 font-bold">Renard</span></h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 italic">Cagnes - R1C2 - 13h55 (14/01/2026)</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest italic">Analyse Quinté</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 italic">
                       <StarIcon className="w-3 h-3 fill-orange-600 text-orange-600" /> Points de Data Clés
                    </h4>
                    <div className="flex gap-3">
                       {[9, 7].map(num => (
                          <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-lg shadow-orange-600/20">
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 italic">
                       <ShieldCheck className="w-3 h-3 text-green-600" /> Sélection de la Rédaction
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                       {[9, 7, 13, 1, 14, 8, 5, 12,].map((num, i) => (
                          <div key={num} className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border-2 italic transition-all ${i < 2 ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10' : 'bg-white border-slate-200 text-slate-900'}`}>
                             {num}
                          </div>
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
