import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Target, 
  Users, 
  Youtube, 
  Ticket, 
  ShieldCheck, 
  Star as StarIcon,
  BarChart3,
  ArrowRight,
  Activity,
  X,
  Menu,
  Trophy,
  FileText,
  UserCheck,
  ExternalLink
} from 'lucide-react';

// --- CONFIGURATION GOOGLE SHEETS ---
const SHEET_URLS = {
  PARTANTS: "URL_DE_VOTRE_ONGLET_PARTANTS_CSV", 
  JOCKEYS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQH61koCV9FgrkJfYVNQMlseDY2K4R54ClxM-tkM2vwb0Dvbwyb1KYiimPdZODPaFbXW40VrVUJjFqW/pub?output=csv",
  TRAINERS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-gp9qlf4bEk3vMQuOp4WNickKworuWoP0P-Vgr5PtTE5hn-vkJhrC5GD3INH5T0WUbnlLfGtLMtiu/pub?output=csv"
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDiscipline, setFilterDiscipline] = useState('Attelé');
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA PARTANTS (Statique en attendant le 3ème lien) ---
  const horsesData = [
    { "id": 1, "name": "RUGER", "rpi": 55.4, "perf": 25, "intent": 15, "context": 15.4, "tactic": "Rentrée ferré, lot trop relevé." },
    { "id": 10, "name": "VALLATONIAN", "rpi": 96.4, "perf": 48.2, "intent": 24, "context": 24.2, "tactic": "LA RÉFÉRENCE. 83% réussite tandem." },
    { "id": 8, "name": "EXPRESS D'ARC", "rpi": 94.8, "perf": 49, "intent": 24.8, "context": 21, "tactic": "Record du parcours (1'12\"5)." }
  ];
  const [selectedHorse, setSelectedHorse] = useState(horsesData[0]);

  // PARSER CSV AMÉLIORÉ (Gère les majuscules/minuscules des colonnes)
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
    const fetchRankings = async () => {
      try {
        const [resJ, resT] = await Promise.all([
          fetch(SHEET_URLS.JOCKEYS).then(res => res.text()),
          fetch(SHEET_URLS.TRAINERS).then(res => res.text())
        ]);
        setRankings({
          jockeys: parseCSV(resJ),
          trainers: parseCSV(resT)
        });
      } catch (e) { console.error("Erreur de liaison Google Sheets"); }
    };
    fetchRankings();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA",
    PLAYLIST_BILAN: "https://youtube.com/playlist?list=PLgejDmYclZBKZEyl_0H5j6hqXgjEf60SE&si=Ps_jdMmtYv3u4Imp",
    PLAYLIST_PRONO: "https://youtube.com/playlist?list=PLgejDmYclZBLuvLZIaZtvtBdGZrc62b8t&si=sh8aR-nCphC4ChvQ",
    LAST_VIDEO_ID: "6Se7xPCZQOk"
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 text-white">
               <Zap className="fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU DÉROULANT */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top px-6 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={LINKS.PLAYLIST_PRONO} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all group border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Ticket /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2">Les Pronos <ExternalLink size={14}/></span>
                <span className="text-slate-400 text-[10px] font-bold uppercase mt-1">Playlist Quinté+ Quotidien</span>
              </a>

              <a href={LINKS.PLAYLIST_BILAN} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all group border border-slate-100">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4"><FileText /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2">Les Bilans <ExternalLink size={14}/></span>
                <span className="text-orange-600 text-[9px] font-black uppercase mt-1 leading-tight">
                  Note : Depuis début janvier, les bilans sont dans l'introduction de mes pronos.
                </span>
              </a>

              <a href="#rankings" onClick={() => setIsMenuOpen(false)} className="flex flex-col p-6 rounded-[2rem] bg-slate-50 hover:bg-orange-50 transition-all group border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mb-4"><Trophy /></div>
                <span className="font-black uppercase italic text-sm">Classements Data</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase mt-1">Jockeys & Entraîneurs</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-20 text-center px-6">
        <div className="container mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full mb-8 border border-orange-100">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Live Data Stream 2026</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic">
            L'ANALYSE <br /><span className="text-orange-600">SANS FILTRE.</span>
          </h1>
        </div>
      </section>

      {/* RPI TOOL */}
      <section id="rpi-tool" className="py-24 bg-slate-50 border-y border-slate-100 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-12 text-center">
            <BarChart3 className="w-10 h-10 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Indice <span className="text-orange-600">RPI</span></h2>
          </div>
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <select 
                  onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl font-black italic uppercase outline-none focus:border-orange-600 appearance-none"
                >
                  {horsesData.map(h => <option key={h.id} value={h.id}>{h.id} - {h.name}</option>)}
                </select>
              </div>
              <div className="w-full md:w-1/2 bg-slate-900 rounded-[2.5rem] p-10 text-center text-white">
                <span className="text-slate-400 text-[10px] font-black uppercase block mb-2 tracking-widest">Confiance Renard</span>
                <div className="text-7xl font-black italic">{selectedHorse?.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-orange-50 rounded-2xl border border-orange-100 italic text-slate-700">
               <span className="text-orange-600 font-black uppercase not-italic mr-2">Verdict :</span> "{selectedHorse?.tactic}"
            </div>
          </div>
        </div>
      </section>

      {/* RANKINGS */}
      <section id="rankings" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-left">
              <Trophy className="w-12 h-12 text-orange-600 mb-4" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Les <span className="text-orange-600">Classements</span></h2>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {['Attelé', 'Plat', 'Obstacle'].map(d => (
                <button key={d} onClick={() => setFilterDiscipline(d)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filterDiscipline === d ? 'bg-white shadow-md text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* JOCKEYS */}
            <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 shadow-sm">
              <h3 className="font-black italic uppercase flex items-center gap-3 mb-8"><UserCheck className="text-orange-600" /> Jockeys</h3>
              <div className="space-y-4">
                {rankings.jockeys.filter(j => j.discipline === filterDiscipline.toLowerCase() || j.discipline === filterDiscipline).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-sm">{i+1}. {item.name}</span>
                    <span className="font-black text-white bg-slate-900 px-3 py-1 rounded-lg text-xs">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
            {/* TRAINERS */}
            <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 shadow-sm">
              <h3 className="font-black italic uppercase flex items-center gap-3 mb-8"><Trophy className="text-orange-600" /> Entraîneurs</h3>
              <div className="space-y-4">
                {rankings.trainers.filter(t => t.discipline === filterDiscipline.toLowerCase() || t.discipline === filterDiscipline).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-sm">{i+1}. {item.name}</span>
                    <span className="font-black text-orange-600">{item.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE EMBED */}
      <section id="youtube" className="py-24 bg-slate-50 flex flex-col items-center px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Youtube className="w-12 h-12 text-orange-600 mx-auto mb-6" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12">Dernière <span className="text-orange-600">Analyse</span></h2>
          <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl bg-black">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="YouTube video" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20 text-center px-6">
        <span className="text-2xl font-black italic tracking-tighter uppercase">RENARD<span className="text-orange-600">TURF</span></span>
        <div className="mt-8 flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <span>© 2026</span>
           <span>DATA SOURCE FRANCE GALOP / SETF</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
