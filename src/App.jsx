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
  X
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
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // --- DATA RPI v2.1 PRÉCISION (PRIX DE BRIONNE - 13/01/2026) ---
  const horsesData = [
    { "id": 1, "name": "RUGER", "rpi": 55.4, "perf": 25, "intent": 15, "context": 15.4, "tactic": "Rentrée ferré, lot trop relevé pour espérer mieux qu'une 5ème place." },
    { "id": 2, "name": "COMPETIVO", "rpi": 75.8, "perf": 35.8, "intent": 20, "context": 20, "tactic": "D4 lui donne un supplément d'âme. 100% de réussite driver." },
    { "id": 3, "name": "KAXIG IN", "rpi": 87.2, "perf": 44, "intent": 22.5, "context": 20.7, "tactic": "Duo Goop (100%). Top Valeur détecté au banc d'essai." },
    { "id": 4, "name": "CONDOR BAR", "rpi": 42.1, "perf": 15.1, "intent": 12, "context": 15, "tactic": "Note confidentielle basse (4/20). Impasse conseillée." },
    { "id": 5, "name": "MIDNIGHT SPECIAL", "rpi": 0, "perf": 0, "intent": 0, "context": 0, "tactic": "NON-PARTANT (NP)." },
    { "id": 6, "name": "I LOVE JOSSELYN", "rpi": 45.3, "perf": 18.3, "intent": 12, "context": 15, "tactic": "Audit de forme négatif. Tâche complexe." },
    { "id": 7, "name": "ENOCK", "rpi": 70.9, "perf": 32.9, "intent": 18, "context": 20, "tactic": "3 places sur le parcours. Solide pour les combinaisons larges." },
    { "id": 8, "name": "EXPRESS D'ARC", "rpi": 94.8, "perf": 49, "intent": 24.8, "context": 21, "tactic": "Record du parcours (1'12\"5) + Note Confidentielle 16/20." },
    { "id": 9, "name": "ICEBREAKER PELLINI", "rpi": 89.5, "perf": 45, "intent": 23.5, "context": 21, "tactic": "Corde à gauche validée (6 succès). Note stable de 15/20." },
    { "id": 10, "name": "VALLATONIAN", "rpi": 96.4, "perf": 48.2, "intent": 24, "context": 24.2, "tactic": "LA RÉFÉRENCE. 83% réussite tandem + Top Forme au banc d'essai." },
    { "id": 11, "name": "DIE HARD", "rpi": 85.6, "perf": 43, "intent": 22, "context": 20.6, "tactic": "L'outsider séduisant. En plein regain de forme." },
    { "id": 12, "name": "GLOBAL CONCEPT", "rpi": 82.3, "perf": 40.5, "intent": 21.5, "context": 20.3, "tactic": "Tandem Mottier 100%. Méfiance malgré la rentrée." },
    { "id": 13, "name": "OSCAR VAN HALBEEK", "rpi": 79.8, "perf": 42, "intent": 19.5, "context": 18.3, "tactic": "100% de places sur le tracé. Chrono solide de 1'12\"9." },
    { "id": 14, "name": "EVERY TIME WINNER", "rpi": 92.1, "perf": 46.5, "intent": 23, "context": 22.6, "tactic": "REPÉRÉ. 50% réussite déferrage et excellente aptitude GP." },
    { "id": 15, "name": "KENTUCKY IDÉAL", "rpi": 58.7, "perf": 28.7, "intent": 15, "context": 15, "tactic": "Audit de contexte moyen. Jouera les petites places." },
    { "id": 16, "name": "JOURNEY OF DREAM", "rpi": 35.2, "perf": 12.2, "intent": 10, "context": 13, "tactic": "Note confidentielle critique (4/20). Très peu de chances." }
  ];

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 10) || horsesData[0]);

  useEffect(() => {
    initGA('G-EY4386K4P1');
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "dgq5yAJJ6sg",
    COURSE_REF_URL: "https://www.equidia.fr/courses/2025-12-03/R1/C1"
  };

  const stats = [
    { label: "Vues", value: "510 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1500+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "Réussite 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-500/30">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* LOGO RENARD */}
            <img src="/logo-renard.png" alt="Logo Renard" className="w-10 h-10 object-contain" />
            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">
              RENARD<span className="text-orange-600">TURF</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#youtube" className="hover:text-orange-600 transition-colors">Vidéos</a>
            <a href="#rpi-tool" className="hover:text-orange-600 transition-colors text-orange-600 font-black">Indice RPI</a>
            <a href="#ticket" className="hover:text-orange-600 transition-colors">Rédaction</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        {/* Gradients pour le thème clair */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full mb-8">
            <Activity className="text-orange-600 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 leading-none tracking-tighter uppercase italic">
            L'Information <span className="text-orange-600 font-black">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic">
            Décryptage algorithmique et expertise pour une approche rationnelle du PMU.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-2xl">
            <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase italic">
              L'INDICE RPI <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#youtube" className="w-full sm:w-1/2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase italic">
              DOSSIERS VIDÉOS
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 w-full px-4 md:px-0">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm border-b-4 border-b-orange-500/20 transition-transform hover:-translate-y-1">
                <div className="flex justify-center mb-5">{stat.icon}</div>
                <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter italic">{stat.value}</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION OUTIL INTERACTIF RPI --- */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-10 h-10 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none text-center">
              L'Analyseur de Probabilité <span className="text-orange-600">RPI</span>
            </h2>
            <p className="text-slate-400 mt-4 font-bold uppercase text-[10px] tracking-[0.3em]">Vincennes - R1C1 - 13h55 (13/01/2026)</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-4 block italic">1. Sélectionner un partant</label>
                <div className="relative">
                  <select 
                    value={selectedHorse.id}
                    onChange={(e) => setSelectedHorse(horsesData.find(h => h.id === parseInt(e.target.value)))}
                    className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 font-black uppercase italic p-5 rounded-2xl appearance-none cursor-pointer focus:border-orange-500 outline-none transition-all shadow-inner"
                  >
                    {horsesData.map(h => (
                      <option key={h.id} value={h.id}>{h.id} - {h.name}</option>
                    ))}
                  </select>
                  <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600 w-6 h-6" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 shadow-inner">
                <span className="text-[10px] font-black uppercase text-slate-500 mb-2 italic tracking-widest">Renard Pro Index</span>
                <div className="text-7xl font-black text-white italic leading-none">{selectedHorse.rpi}<span className="text-orange-500 text-2xl">/100</span></div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Progress bars styling updated for light mode */}
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Performance</span>
                  <span className="text-slate-900 font-black">{selectedHorse.perf}/50</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-slate-900 transition-all duration-700" style={{ width: `${(selectedHorse.perf/50)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Intention</span>
                  <span className="text-orange-600 font-black">{selectedHorse.intent}/25</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(selectedHorse.intent/25)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Contexte</span>
                  <span className="text-slate-900 font-black">{selectedHorse.context}/25</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-slate-400 transition-all duration-700" style={{ width: `${(selectedHorse.context/25)*100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left">
               <p className="text-slate-700 text-sm italic font-medium leading-relaxed">
                 <span className="text-orange-600 font-black uppercase not-italic mr-2 italic">Verdict Éditorial :</span>
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
               <Youtube className="w-10 h-10 fill-current" />
               <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none text-slate-900">Le Débrief Vidéo</h2>
            </div>
            <p className="text-slate-500 font-medium italic">Analyse complète et repérés en vidéo.</p>
          </div>
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl bg-slate-100">
             <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`}
                title="Dernière Vidéo"
                frameBorder="0"
                allowFullScreen
             ></iframe>
          </div>
          
          <div className="mt-10">
             <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-orange-600 px-10 py-5 rounded-full transition-all shadow-lg">
                Rejoindre la communauté <StarIcon className="w-4 h-4 text-orange-500 fill-current" />
             </a>
          </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-50 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg shadow-orange-600/20">
                <Ticket className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-bold">Sélection officielle</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-tight">Le Ticket Quinté 🎫</h2>
             <p className="text-slate-500 max-w-xl mx-auto italic font-medium">L'avis définitif croisant données RPI et repérés terrain.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-2 shadow-2xl shadow-slate-200 overflow-hidden max-w-3xl mx-auto w-full border border-slate-100">
            <div className="bg-white border-4 border-dashed border-slate-100 rounded-[2.5rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-50 pb-8 mb-8 gap-4">
                 <div>
                    <h3 className="font-black text-3xl uppercase italic tracking-tighter italic">L'Avis <span className="text-orange-600 font-black">Renard</span></h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 italic">Vincennes - R1C1 (13/01/2026)</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest italic">Data Audit</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">
                       <StarIcon className="w-4 h-4 fill-orange-500 text-orange-500" /> Les 2 Bases RPI
                    </h4>
                    <div className="flex gap-4">
                       {[10, 8].map(num => (
                          <div key={num} className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-orange-600/30 italic">
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">
                       <ShieldCheck className="w-4 h-4 text-green-600" /> Sélection Complète
                    </h4>
                    <div className="flex flex-wrap gap-3">
                       {[10, 8, 14, 9, 3, 11, 12, 13].map((num, i) => (
                          <div key={num} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border-2 transition-all italic ${i < 2 ? 'bg-orange-50 border-orange-500 text-orange-600 scale-110' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}>
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
        <div className="flex items-center gap-3 mb-8">
            <img src="/logo-renard.png" alt="Logo Renard" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
              RENARD<span className="text-orange-600 font-black">TURF</span>
            </span>
        </div>
        
        {/* BANDEAU ANJ OBLIGATOIRE (On garde le jaune pour la visibilité ANJ) */}
        <div className="bg-yellow-400 text-slate-950 p-4 rounded-2xl max-w-4xl mx-auto mb-10 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4 shadow-sm">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block text-slate-400">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <button onClick={() => setActiveLegalModal('mentions')} className="hover:text-orange-600 transition-colors">Mentions Légales</button>
           <button onClick={() => setActiveLegalModal('gaming')} className="hover:text-white transition-colors">Jeu Responsable</button>
           <a href="https://www.joueurs-info-service.fr/" target="_blank" className="hover:text-orange-600 transition-colors underline decoration-orange-600/30">Aide aux Joueurs</a>
        </div>
        
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">
          © 2026 RENARD TURF - DATA & ANALYTICS
        </p>

        {/* MODAL (Style Clair) */}
        {activeLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-white/80">
            <div className="bg-white border border-slate-200 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[3rem] p-10 md:p-14 shadow-2xl relative">
              <button onClick={() => setActiveLegalModal(null)} className="absolute top-8 right-8 text-slate-400 hover:text-orange-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
              {activeLegalModal === 'mentions' ? (
                <div className="text-left space-y-6">
                  <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Mentions Légales</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">Éditeur : RenardTurf - Média indépendant spécialisé dans l'analyse de données hippiques.</p>
                </div>
              ) : (
                <div className="text-left space-y-6">
                  <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Jeu Responsable</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">Le jeu doit rester un plaisir. Ne misez jamais d'argent que vous ne pouvez pas vous permettre de perdre.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
