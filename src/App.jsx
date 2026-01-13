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
  Menu, // Ajouté pour le menu
  Trophy, // Ajouté pour les classements
  Map as MapIcon, // Ajouté pour les parcours
  FileText,
  UserCheck
} from 'lucide-react';

// --- CONFIGURATION GOOGLE SHEETS ---
const SHEET_URLS = {
  // Remplacez par votre lien Partants quand il sera prêt
  PARTANTS: "URL_CSV_PARTANTS", 
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État du menu
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [filterDiscipline, setFilterDiscipline] = useState('Attelé'); // Filtre classements

  // --- ÉTATS POUR LES DONNÉES DYNAMIQUES ---
  const [rankings, setRankings] = useState({ jockeys: [], trainers: [] });

  // --- DATA RPI v2.1 (FIXE EN ATTENDANT LE 3EME LIEN) ---
  const horsesData = [
    { "id": 1, "name": "RUGER", "rpi": 55.4, "perf": 25, "intent": 15, "context": 15.4, "tactic": "Rentrée ferré, lot trop relevé." },
    { "id": 2, "name": "COMPETIVO", "rpi": 75.8, "perf": 35.8, "intent": 20, "context": 20, "tactic": "D4 lui donne un supplément d'âme." },
    { "id": 3, "name": "KAXIG IN", "rpi": 87.2, "perf": 44, "intent": 22.5, "context": 20.7, "tactic": "Duo Goop (100%). Top Valeur." },
    { "id": 8, "name": "EXPRESS D'ARC", "rpi": 94.8, "perf": 49, "intent": 24.8, "context": 21, "tactic": "Record du parcours (1'12\"5)." },
    { "id": 10, "name": "VALLATONIAN", "rpi": 96.4, "perf": 48.2, "intent": 24, "context": 24.2, "tactic": "LA RÉFÉRENCE. 83% réussite tandem." }
  ];

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 10) || horsesData[0]);

  // FONCTION DE PARSING CSV
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
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
    
    // FETCH DES DONNÉES GOOGLE SHEETS
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
      } catch (e) { console.error("Erreur Sheets:", e); }
    };

    fetchRankings();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "6Se7xPCZQOk"
  };

  const stats = [
    { label: "Vues", value: "510 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1500+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "Réussite Quinté 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* NAVIGATION MEDIA */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
              <a href="#youtube" className="hover:text-orange-600 transition-colors">Vidéos</a>
              <a href="#rpi-tool" className="hover:text-orange-600 transition-colors text-orange-600 underline underline-offset-8 decoration-2 font-black">Indice RPI</a>
            </div>
            {/* BOUTON MENU */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* MENU DÉROULANT */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300 px-6 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Pronos & Bilans", icon: <FileText />, href: "#ticket" },
                { label: "Classement Jockeys", icon: <UserCheck />, href: "#rankings" },
                { label: "Classement Entraîneurs", icon: <Trophy />, href: "#rankings" },
                { label: "Parcours & Stratégies", icon: <MapIcon />, href: "#strategies" }
              ].map((item, idx) => (
                <a key={idx} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 group transition-all">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-orange-600 group-hover:text-white rounded-xl flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-black uppercase italic text-sm tracking-tight">{item.label}</span>
                </a>
              ))}
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
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Data & Expertise Hippique</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 leading-none tracking-tighter uppercase italic">
            L'Information <span className="text-orange-600">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Bilans, classements et analyses de parcours : une approche rationnelle du PMU.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-2xl px-6">
            <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase">
              VOIR L'INDICE RPI <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 px-10 py-5 rounded-2xl font-black text-lg transition-all uppercase text-slate-900">
              EXPLORER LE MENU
            </button>
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

      {/* RPI TOOL */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-10 h-10 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none text-center">
              L'Analyseur de Probabilité <span className="text-orange-600">RPI</span>
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase text-orange-600 mb-4 block italic">1. Sélectionner un partant</label>
                <div className="relative">
                  <select 
                    value={selectedHorse.id}
                    onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                    className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 font-black uppercase italic p-5 rounded-2xl appearance-none outline-none focus:border-orange-600 transition-all"
                  >
                    {horsesData.map(h => (
                      <option key={h.id} value={h.id}>{h.id} - {h.name}</option>
                    ))}
                  </select>
                  <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600 w-6 h-6" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 text-center shadow-2xl">
                <span className="text-[10px] font-black text-slate-400 mb-2 uppercase italic tracking-widest">Renard Pro Index</span>
                <div className="text-7xl font-black text-white italic leading-none">{selectedHorse.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
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

      {/* CLASSEMENTS (DATA SHEETS) */}
      <section id="rankings" className="py-24 px-6 bg-white flex flex-col items-center">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <Trophy className="w-10 h-10 text-orange-600 mb-4" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">Les Tops <span className="text-orange-600">Performers</span></h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 tracking-widest">Live Data 2026 - France Galop / SETF</p>
            </div>
            {/* FILTRES */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {['Attelé', 'Plat', 'Obstacle'].map((disc) => (
                <button key={disc} onClick={() => setFilterDiscipline(disc)} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${filterDiscipline === disc ? 'bg-white text-orange-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                  {disc}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* JOCKEYS */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="font-black uppercase italic mb-8 flex items-center gap-3"><UserCheck className="text-orange-600" /> Jockeys</h3>
              <div className="space-y-4">
                {rankings.jockeys.filter(j => j.discipline === filterDiscipline).map((j, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <span className="font-bold text-sm"><span className="text-orange-600 mr-2">{i+1}.</span> {j.name}</span>
                    <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded-lg">{j.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
            {/* TRAINERS */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="font-black uppercase italic mb-8 flex items-center gap-3"><Trophy className="text-orange-600" /> Entraîneurs</h3>
              <div className="space-y-4">
                {rankings.trainers.filter(t => t.discipline === filterDiscipline).map((t, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-sm"><span className="text-orange-600 mr-2">{i+1}.</span> {t.name}</span>
                    <span className="text-xs font-black border border-slate-200 px-3 py-1 rounded-lg">{t.wins} Vict.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATÉGIES PARCOURS */}
      <section id="strategies" className="py-24 px-6 bg-slate-950 text-white rounded-[3rem] mx-4 mb-24 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 blur-[120px] -z-10" />
         <div className="container mx-auto max-w-4xl text-center">
            <MapIcon className="w-12 h-12 text-orange-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-12 leading-tight">Référencement <span className="text-orange-600">Parcours</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { title: "PSF (Sable)", desc: "Privilégier les chevaux avec une forte 'Note de Fond'. Stratégie : Attente." },
                  { title: "Plat (Herbe)", desc: "L'aptitude au terrain est reine. Stratégie : Vitesse de pointe." },
                  { title: "Attelé (Vincennes)", desc: "Gestion de la montée et de l'effort. Stratégie : Tenue." }
               ].map((track, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md text-left">
                     <h4 className="font-black uppercase italic text-orange-500 mb-4 tracking-widest">{track.title}</h4>
                     <p className="text-slate-400 text-sm leading-relaxed italic">{track.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* YOUTUBE SECTION */}
      <section id="youtube" className="py-24 px-6 bg-white flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-600">
               <Youtube className="w-8 h-8 fill-current" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-slate-900">Archives Vidéos</h2>
            </div>
            <p className="text-slate-500 font-medium italic">Retrouvez nos analyses quotidiennes sur YouTube.</p>
          </div>
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-slate-50">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="Dernière Vidéo" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20 text-center px-6 flex flex-col items-center">
        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic block mb-8">RENARD<span className="text-orange-600">TURF</span></span>
        <div className="bg-yellow-400 text-slate-900 p-4 rounded-xl max-w-4xl mx-auto mb-8 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block text-yellow-600">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">© 2026 RENARD TURF - RÉDACTION & ANALYSE DATA</p>
      </footer>
    </div>
  );
};

export default App;
