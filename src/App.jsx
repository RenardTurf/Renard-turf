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
  Activity
} from 'lucide-react';

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

  // --- DATA RPI v1.1 (MÉDIA & STATISTIQUES) ---
  const horsesData = [
  { 
    id: 1, name: "HURRICANE CARTER", rpi: 68,
    perf: 35, intent: 18, context: 15,
    tactic: "Tandem Lebourgeois redoutable (16v 5p). Lot relevé mais peut accrocher la 5ème place."
  },
  { 
    id: 2, name: "ISOFOU DU CHÊNE", rpi: 86,
    perf: 42, intent: 24, context: 20,
    tactic: "Spécialiste tenue. Redoutable D4 avec Ploquin. Podium en vue selon l'Expert."
  },
  { 
    id: 3, name: "HÉRO SIBEY", rpi: 94,
    perf: 48, intent: 24, context: 22,
    tactic: "Fin de course exceptionnelle pour sa rentrée. Duo Bonne au sommet. Outsider préféré."
  },
  { 
    id: 5, name: "HE AND ME", rpi: 46,
    perf: 28, intent: 8, context: 10,
    tactic: "Reste ferré. Préparation évidente pour la suite. Impasse conseillée par la Matrice."
  },
  { 
    id: 6, name: "JINGLE DU PONT", rpi: 82,
    perf: 40, intent: 22, context: 20,
    tactic: "2e du Quinté le 04/01. Récupération validée par Bazire. Au top pour confirmer."
  },
  { 
    id: 7, name: "HAPPY DANICA", rpi: 49,
    perf: 25, intent: 10, context: 14,
    tactic: "Configuration ferrée pénalisante. Class Level insuffisant face aux D4 du jour."
  },
  { 
    id: 8, name: "IDÉAL DU ROCHER", rpi: 89,
    perf: 45, intent: 22, context: 22,
    tactic: "Engagement visé par Duvaldestin. Grosse pointe de vitesse finale attendue. Base sérieuse."
  },
  { 
    id: 9, name: "JAZZMAN DEBAILLEUL", rpi: 60,
    perf: 38, intent: 12, context: 10,
    tactic: "Note d'espoir : Travaille très bien le matin. Vaut mieux que ses derniers échecs. Grosse cote."
  },
  { 
    id: 10, name: "HYMNE DU GERS", rpi: 63,
    perf: 40, intent: 10, context: 13,
    tactic: "Ferré pour cette sortie. L'algorithme détecte une course de préparation pure."
  },
  { 
    id: 11, name: "IGREC DE CELLAND", rpi: 84,
    perf: 42, intent: 20, context: 22,
    tactic: "Duo Thomain (10v 18p). Excellente ligne (3e de Cobra Killer Gar). Solide pour le Top 5."
  },
  { 
    id: 12, name: "HUBBLE DU VIVIER", rpi: 95,
    perf: 49, intent: 23, context: 23,
    tactic: "BASE ABSOLUE. Gardé pour cet engagement. Accélération foudroyante le 14/12. Le cheval à battre."
  },
  { 
    id: 13, name: "HIDALGO DES NOÉS", rpi: 76,
    perf: 37, intent: 18, context: 21,
    tactic: "Régulier avec Gelormini en D4. Un appui fiable pour les combinaisons élargies."
  },
  { 
    id: 14, name: "HULYSSE DIGEO", rpi: 65,
    perf: 35, intent: 15, context: 15,
    tactic: "Engagement idéal au plafond des gains. Outsider séduisant malgré un dernier échec."
  }
];

  const [selectedHorse, setSelectedHorse] = useState(horsesData[0]);

  useEffect(() => {
    initGA('G-EY4386K4P1');
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "orAZ4m_z4-c",
    COURSE_REF_URL: "https://www.equidia.fr/courses/2025-11-30/R1/C4"
  };

  const stats = [
    { label: "Vues", value: "500 000+", icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { label: "Abonnés", value: "1500+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: "Reussite Quinté 2026", value: "88%", icon: <Target className="w-5 h-5 text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      
      {/* NAVIGATION MEDIA */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white tracking-tight leading-none font-bold">RENARD<span className="text-orange-500 font-bold">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#rpi-tool" className="hover:text-orange-500 transition-colors text-orange-500 underline underline-offset-8 decoration-2 font-black">Indice RPI</a>
            <a href="#ticket" className="hover:text-orange-500 transition-colors">Rédaction</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - MEDIA TERMINOLOGY */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <Activity className="text-orange-500 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white">
            L'Information <span className="text-orange-500 font-bold">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Décryptage, statistiques avancées et expertise pour une approche rationnelle du PMU sur le long terme.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-6 md:px-0 w-full max-w-2xl">
            <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 group uppercase">
              CONSULTER L'INDICE <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#youtube" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase">
              DOSSIERS VIDÉOS
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 w-full px-4 md:px-0">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-xl border-b-2 border-b-orange-500/20">
                <div className="flex justify-center mb-5">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION OUTIL INTERACTIF RPI --- */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-950 flex flex-col items-center border-y border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-10 h-10 text-orange-500 mb-4" />
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none text-center">
              L'Analyseur de Probabilité <span className="text-orange-500">RPI</span>
            </h2>
            <p className="text-slate-500 mt-4 font-bold uppercase text-[10px] tracking-[0.3em]">Mise à jour : Vincennes - R1C4 - 15h15</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block italic">1. Sélectionner un partant</label>
                <div className="relative">
                  <select 
                    onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                    className="w-full bg-slate-950 border-2 border-slate-800 text-white font-black uppercase italic p-5 rounded-2xl appearance-none cursor-pointer focus:border-orange-500 outline-none transition-all"
                  >
                    {horsesData.map(h => (
                      <option key={h.id} value={h.id}>{h.id} - {h.name}</option>
                    ))}
                  </select>
                  <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-500 w-6 h-6" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-950 rounded-3xl p-8 border border-white/5">
                <span className="text-[10px] font-black uppercase text-slate-500 mb-2 italic">Renard Pro Index</span>
                <div className="text-7xl font-black text-white italic leading-none">{selectedHorse.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Performance</span>
                  <span className="text-white">{selectedHorse.perf}/50</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-white transition-all duration-700" style={{ width: `${(selectedHorse.perf/50)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Intention</span>
                  <span className="text-orange-500">{selectedHorse.intent}/25</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(selectedHorse.intent/25)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Contexte</span>
                  <span className="text-slate-300">{selectedHorse.context}/25</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-slate-600 transition-all duration-700" style={{ width: `${(selectedHorse.context/25)*100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-orange-600/5 border border-orange-500/20 rounded-2xl text-left">
               <p className="text-slate-300 text-sm italic font-medium leading-relaxed">
                 <span className="text-orange-500 font-black uppercase not-italic mr-2">Verdict Editorial :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION YOUTUBE */}
      <section id="youtube" className="py-24 px-6 bg-slate-950 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-500">
               <Youtube className="w-8 h-8 fill-current text-orange-600" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Archives Vidéos</h2>
            </div>
            <p className="text-slate-400 font-medium italic">Retrouvez nos analyses quotidiennes sur YouTube.</p>
          </div>
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
             <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`}
                title="Dernière Vidéo"
                frameBorder="0"
                allowFullScreen
             ></iframe>
          </div>
          
          <div className="mt-10">
             <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-8 py-4 rounded-full transition-all">
                Rejoindre la communauté <StarIcon className="w-4 h-4 text-orange-500 fill-current" />
             </a>
          </div>
        </div>
      </section>

      {/* SECTION : COURSE RÉFÉRENCE */}
      <section id="reference" className="py-20 px-6 bg-slate-900/10 border-y border-slate-900 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <History className="w-32 h-32 text-orange-500" />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-left relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 shadow-lg">
                       <PlayCircle className="text-orange-500 w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Course Référence</h3>
                       <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 italic">Support d'étude pour le Quinté du jour</p>
                    </div>
                 </div>
                 <div className="bg-orange-600/10 border border-orange-500/20 px-4 py-2 rounded-lg">
                    <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">REPLAY</span>
                 </div>
              </div>

              <div className="bg-slate-950 rounded-3xl p-10 border border-slate-800 flex flex-col items-center text-center relative z-10 group">
                 <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform duration-500">
                    <Eye className="text-white w-10 h-10" />
                 </div>
                 <h4 className="text-xl font-black text-white mb-8 uppercase italic">Analyse visuelle</h4>
                 <a 
                   href={LINKS.COURSE_REF_URL} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-slate-100 transition-all shadow-xl"
                 >
                    Consulter le direct <ExternalLink className="w-4 h-4" />
                 </a>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-950 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-500 px-6 py-2 rounded-full border border-orange-500/20 mb-6">
                <Ticket className="w-5 h-5 text-orange-600" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-bold">L'analyse de la rédaction</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">La Sélection Quinté 🎫</h2>
             <p className="text-slate-400 max-w-xl mx-auto italic font-medium leading-relaxed text-center">Synthèse des données RPI et des observations de terrain.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-1 shadow-2xl shadow-orange-600/10 overflow-hidden max-w-3xl mx-auto w-full">
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-8 mb-8 relative z-10 gap-4">
                 <div>
                    <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none italic">Note <span className="text-orange-600 font-bold">Renard</span></h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 tracking-wider italic italic">Vincennes - R1C4 - 15h15</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest italic">Analyse Quinté</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none italic">
                       <StarIcon className="w-3 h-3 fill-orange-500 text-orange-500" /> Points de Data Clés
                    </h4>
                    <div className="flex gap-3">
                       {[12, 8].map(num => (
                          <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-600/30 italic">
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none italic">
                       <ShieldCheck className="w-3 h-3 text-green-600" /> Sélection de la Rédaction
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                       {[12, 8, 3, 2, 11, 6, 13, 1, 14].map((num, i) => (
                          <div key={num} className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all italic ${i < 2 ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-slate-200 text-slate-700'}`}>
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

      {/* FOOTER - MEDIA STYLE */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center px-6 leading-none flex flex-col items-center">
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic block mb-8">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10 w-full italic">
          <p className="text-slate-600 text-[10px] leading-loose font-bold uppercase tracking-widest text-center leading-relaxed font-bold italic">
            La participation aux jeux d'argent comporte des risques. Média d'information indépendant. Réservé aux majeurs.
          </p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center font-bold italic">
          © 2026 RENARD TURF - RÉDACTION & ANALYSE DATA
        </p>
      </footer>
    </div>
  );
};

export default App;
