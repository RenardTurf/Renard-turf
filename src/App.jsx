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
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'mentions' ou 'gaming'

  // --- DATA RPI v2.1 (PRIX VANS BARBOT - 12/01/2026) ---
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

  const [selectedHorse, setSelectedHorse] = useState(horsesData.find(h => h.id === 2) || horsesData[0]);

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
    LAST_VIDEO_ID: "dgq5yAJJ6sg",
    COURSE_REF_URL: "https://www.equidia.fr/courses/2025-12-03/R1/C1"
  };

  const stats = [
    { label: "Vues", value: "510 000+", icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { label: "Abonnés", value: "1500+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: "Réussite Quinté 2026", value: "85%", icon: <Target className="w-5 h-5 text-orange-500" /> },
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
            <span className="text-xl font-black tracking-tighter uppercase italic text-white leading-none font-bold">RENARD<span className="text-orange-500">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#rpi-tool" className="hover:text-orange-500 transition-colors text-orange-500 underline underline-offset-8 decoration-2 font-black">Indice RPI</a>
            <a href="#ticket" className="hover:text-orange-500 transition-colors">Rédaction</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <Activity className="text-orange-500 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white">
            L'Information <span className="text-orange-500">Data</span><br />au service du Turf.
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
            <p className="text-slate-500 mt-4 font-bold uppercase text-[10px] tracking-[0.3em]">Mise à jour : Vincennes - R1C1 - 13h55 (13/01/2026)</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block italic">1. Sélectionner un partant</label>
                <div className="relative">
                  <select 
                    value={selectedHorse.id}
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
                 <span className="text-orange-500 font-black uppercase not-italic mr-2">Verdict Éditorial :</span>
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

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-950 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-500 px-6 py-2 rounded-full border border-orange-500/20 mb-6">
                <Ticket className="w-5 h-5 text-orange-600" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-bold">L'analyse de la rédaction</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">La Sélection Quinté 🎫</h2>
             <p className="text-slate-400 max-w-xl mx-auto italic font-medium leading-relaxed text-center">Synthèse des données RPI et des observations de terrain pour le Prix Vans Barbot.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-1 shadow-2xl shadow-orange-600/10 overflow-hidden max-w-3xl mx-auto w-full">
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-8 mb-8 relative z-10 gap-4">
                 <div>
                    <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none italic">Note <span className="text-orange-600 font-bold">Renard</span></h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 tracking-wider italic">Vincennes - R1C1 - 13h55 (13/01/2026)</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest italic">Analyse Quinté</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="flex flex-col items-start">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none italic">
                       <StarIcon className="w-3 h-3 fill-orange-500 text-orange-500" /> Points de Data Clés
                    </h4>
                    <div className="flex gap-3">
                       {[10, 8].map(num => (
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
                       {[10, 8, 14, 9, 3, 11, 12, 13, 2].map((num, i) => (
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

      {/* FOOTER - CONFORMITÉ ANJ & GAMBLING AFFILIATION */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center px-6 flex flex-col items-center">
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic block mb-8">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        
        {/* BANDEAU DE PRÉVENTION OBLIGATOIRE ANJ */}
        <div className="bg-yellow-500 text-slate-950 p-4 rounded-xl max-w-4xl mx-auto mb-8 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13 (APPEL NON SURTAXÉ)</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
           <button onClick={() => setActiveLegalModal('mentions')} className="hover:text-white transition-colors">Mentions Légales</button>
           <button onClick={() => setActiveLegalModal('gaming')} className="hover:text-white transition-colors">Jeu Responsable</button>
           <a href="https://www.joueurs-info-service.fr/" target="_blank" className="hover:text-white transition-colors">Aide aux Joueurs</a>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10 w-full italic">
          <p className="text-slate-600 text-[9px] md:text-[10px] leading-relaxed font-bold uppercase tracking-widest text-center">
            RenardTurf est un média d'information hippique indépendant. Nous ne sommes pas un opérateur de jeux. 
            Le contenu est purement informatif. L'utilisation de nos données ne garantit en aucun cas un gain financier. 
          </p>
        </div>
        
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">
          © 2026 RENARD TURF - RÉDACTION & ANALYSE DATA
        </p>

        {/* MODAL DE CONFORMITÉ */}
        {activeLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-950/80">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white font-black uppercase text-xs tracking-widest"
              >
                Fermer [X]
              </button>

              {activeLegalModal === 'mentions' ? (
                <div className="text-left space-y-6">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Mentions Légales</h3>
                  <div className="text-slate-400 text-xs font-medium space-y-4 leading-relaxed">
                    <p><strong>Éditeur :</strong> RenardTurf - Média indépendant spécialisé dans l'analyse de données hippiques.</p>
                    <p><strong>Hébergement :</strong> [Vercel Inc, San Francisco, USA].</p>
                    <p><strong>Affiliation :</strong> Ce site participe à des programmes d'affiliation. Conformément aux directives de Gambling Affiliation, nous informons nos utilisateurs que l'accès à certaines sélections gratuites peut être conditionné par l'utilisation de nos liens partenaires.</p>
                    <p><strong>Propriété :</strong> L'outil "Renard Pro Index" et les algorithmes associés sont la propriété exclusive de RenardTurf.</p>
                  </div>
                </div>
              ) : (
                <div className="text-left space-y-6">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Charte Jeu Responsable</h3>
                  <div className="text-slate-400 text-xs font-medium space-y-4 leading-relaxed">
                    <p className="bg-orange-600/10 p-4 border-l-4 border-orange-500 text-orange-500 font-bold">
                      Le jeu doit rester un plaisir. Ne misez jamais d'argent que vous ne pouvez pas vous permettre de perdre.
                    </p>
                    <p><strong>Prévention :</strong> Nous encourageons une pratique de jeu saine et raisonnée. Nos analyses RPI sont des aides à la décision et non des promesses de gains.</p>
                    <p><strong>Interdiction aux mineurs :</strong> L'accès aux sites de paris hippiques est strictement interdit aux mineurs de moins de 18 ans.</p>
                    <p><strong>Besoin d'aide ?</strong> Si vous pensez avoir un problème avec le jeu, contactez Joueurs Info Service au <strong>09 74 75 13 13</strong> ou visitez <strong>www.joueurs-info-service.fr</strong>.</p>
                  </div>
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
