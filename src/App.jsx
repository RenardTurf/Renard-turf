import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, Users, Star, 
  Youtube, Ticket, ShieldCheck, ExternalLink, History, PlayCircle, 
  Eye, Star as StarIcon, BarChart3, CheckCircle2, Search, ArrowRight
} from 'lucide-react';

// --- INITIALISATION GOOGLE ANALYTICS (G-EY4386K4P1) ---
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
  
  // --- BASE DE DONNÉES : PRIX DE LA CÔTE D'AZUR (08/01/2026) ---
  const horsesData = [
    { id: 8, name: "FREE TIME JEPSON", rpi: 95, perf: 49, intent: 23, context: 23, tactic: "Note record. Gocciadoro aux commandes. D4 confirmé pour la gagne." },
    { id: 3, name: "KAPTAIN DU LIAMONE", rpi: 92, perf: 45, intent: 25, context: 22, tactic: "Duo Raffin/Prat (Intention 25/25). Engagement visé à 100%." },
    { id: 1, name: "GERICAULT", rpi: 89, perf: 46, intent: 21, context: 22, tactic: "Vient de gagner avec brio. C. Martens à Cagnes = Danger imminent." },
    { id: 16, name: "HARLEY GEMA", rpi: 84, perf: 48, intent: 20, context: 16, tactic: "Classe pure. Doit rendre 25m, mais Rochard est dans une forme olympique." },
    { id: 5, name: "IMPERATOR D'ELA", rpi: 81, perf: 38, intent: 22, context: 21, tactic: "Anomalie détectée par le système : Market Sentiment très positif." },
    { id: 9, name: "COLBERT WF", rpi: 78, perf: 40, intent: 19, context: 19, tactic: "Bel étranger. Rythme élevé prévu, va finir très fort son parcours." },
    { id: 14, name: "KSAR", rpi: 74, perf: 35, intent: 21, context: 18, tactic: "Bekaert connaît la piste par cœur. Candidat sérieux pour une grosse cote." },
    { id: 10, name: "CHARMY CHARLY AS", rpi: 69, perf: 32, intent: 18, context: 19, tactic: "Second atout Bondo. Si le 'Pace' s'écroule devant, il sera là." },
    { id: 13, name: "GIBUS", rpi: 65, perf: 30, intent: 15, context: 20, tactic: "Spécialiste de la piste cagnoise, peut pimenter les rapports du Quinté." },
    { id: 2, name: "GIMY DU POMMEREUX", rpi: 61, perf: 28, intent: 17, context: 16, tactic: "Petit poids, grosse vitesse initiale. Peut tenir un long moment." },
    { id: 4, name: "FLOREAL", rpi: 58, perf: 25, intent: 20, context: 13, tactic: "Note d'intention intéressante, mais le lot est très relevé aujourd'hui." },
    { id: 6, name: "EPSOM D'HERFRAIE", rpi: 54, perf: 28, intent: 12, context: 14, tactic: "Cheval de classe en fin de carrière, a besoin de rassurer le système." },
    { id: 7, name: "FILOU SMILE", rpi: 49, perf: 22, intent: 14, context: 13, tactic: "Mission compliquée à ce niveau. L'algorithme reste prudent." },
    { id: 11, name: "EBERTON", rpi: 45, perf: 20, intent: 10, context: 15, tactic: "Le guerrier local, mais l'âge commence à peser dans la balance." },
    { id: 12, name: "BILO JEPSON", rpi: 41, perf: 25, intent: 8, context: 8, tactic: "Rentrée. Sera beaucoup plus compétitif lors de ses prochaines sorties." },
    { id: 15, name: "ERIC THE EEL", rpi: 38, perf: 30, intent: 4, context: 4, tactic: "Reste ferré. Course de préparation uniquement selon nos capteurs." }
  ];

  const [selectedHorse, setSelectedHorse] = useState(horsesData[0]);

  useEffect(() => {
    initGA('G-EY4386K4P1');
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    VIP_HEBDO: "https://lerenardturf.sellfy.store/p/pronovip/",
    BIBLE: "https://lerenardturf.sellfy.store/p/le-guide-du-renard/",
    FICHE_ESSAI: "https://lerenardturf.sellfy.store/p/fiche-essais-1-quinte-du-31-12/",
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "CY0WGMtkS0s",
    COURSE_REF_URL: "https://www.equidia.fr/courses/2025-11-20/R1/C1"
  };

  const stats = [
    { label: "ROI Moyen", value: "+51%", icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { label: "Membres", value: "1500+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: "Taux Réussite", value: "74%", icon: <Target className="w-5 h-5 text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black italic text-white uppercase tracking-tight">RENARD<span className="text-orange-500 font-bold">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-white">Vidéos</a>
            <a href="#rpi-tool" className="text-orange-500 underline underline-offset-8 decoration-2 font-black">Testeur RPI</a>
            <a href="#offres" className="hover:text-white">Offres</a>
            <a href={LINKS.VIP_HEBDO} target="_blank" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all font-black shadow-lg uppercase">Accès VIP</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <span className="text-orange-500 animate-pulse font-bold">●</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Saison 2026 : Rentabilité Activée</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 uppercase italic leading-none">
            Devenez un <span className="text-orange-500">Investisseur</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium italic">
            Utilisez l'indice RPI pour détecter les anomalies de cotes et sécuriser vos paris.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-2xl mx-auto">
            <a href="#rpi-tool" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 uppercase group">
              TESTER UN CHEVAL <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={LINKS.BIBLE} target="_blank" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase">
              LA BIBLE DU RENARD
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

      {/* --- OUTIL INTERACTIF RPI --- */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-950 flex flex-col items-center border-y border-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Testeur d'Indice RPI v1.1</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Le Verdict du <span className="text-orange-500">Renard</span></h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 text-left">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block italic">1. Choisir un cheval du Quinté</label>
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
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest"><span>Performance</span><span className="text-white">{selectedHorse.perf}/50</span></div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-white transition-all duration-700" style={{ width: `${(selectedHorse.perf/50)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest"><span>Intention</span><span className="text-orange-500">{selectedHorse.intent}/25</span></div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-orange-600 transition-all duration-700" style={{ width: `${(selectedHorse.intent/25)*100}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest"><span>Contexte</span><span className="text-slate-300">{selectedHorse.context}/25</span></div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-slate-600 transition-all duration-700" style={{ width: `${(selectedHorse.context/25)*100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-orange-600/5 border border-orange-500/20 rounded-2xl text-left">
               <p className="text-slate-300 text-sm italic font-medium leading-relaxed">
                 <span className="text-orange-500 font-black uppercase not-italic mr-2">Verdict :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>
          </div>

          <div className="text-center py-10">
            <h4 className="text-2xl font-black text-white uppercase italic mb-6 leading-tight">Obtenez le tableau de synthèse des 16 partants</h4>
            <a 
              href={LINKS.FICHE_ESSAI} 
              target="_blank"
              className="inline-flex items-center gap-4 bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl group"
            >
              Essayer l'analyse complète à 1€ <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION YOUTUBE */}
      <section id="youtube" className="py-24 px-6 bg-slate-950 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="flex items-center justify-center gap-3 mb-4 text-orange-500">
                <Youtube className="w-8 h-8 fill-current text-orange-600" />
                <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Analyse Vidéo</h2>
             </div>
             <p className="text-slate-400 font-medium italic">Rejoins les 1500+ passionnés qui suivent le défi sur YouTube.</p>
          </div>
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
             <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="Dernière Vidéo" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* SECTION : COURSE RÉFÉRENCE */}
      <section id="reference" className="py-20 px-6 bg-slate-900/10 border-y border-slate-900 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><History className="w-32 h-32 text-orange-500" /></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 shadow-lg"><PlayCircle className="text-orange-500 w-8 h-8" /></div>
                    <div className="text-left">
                       <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Course Référence</h3>
                       <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 italic">L'étude indispensable pour demain</p>
                    </div>
                 </div>
                 <div className="bg-orange-600/10 border border-orange-500/20 px-4 py-2 rounded-lg"><span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">REPLAY</span></div>
              </div>
              <div className="bg-slate-950 rounded-3xl p-10 border border-slate-800 flex flex-col items-center text-center relative z-10 group">
                 <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform duration-500"><Eye className="text-white w-10 h-10" /></div>
                 <h4 className="text-xl font-black text-white mb-8 uppercase italic">Analyse du passé</h4>
                 <a href={LINKS.COURSE_REF_URL} target="_blank" className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-slate-100 transition-all shadow-xl">Visionner sur Equidia <ExternalLink className="w-4 h-4" /></a>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION OFFRES */}
      <section id="offres" className="py-32 px-6 flex flex-col items-center">
        <div className="container mx-auto max-w-6xl text-center flex flex-col items-center">
           <div className="mb-20 px-6">
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white leading-tight italic">Passe au niveau supérieur</h2>
              <p className="text-slate-400 text-lg font-medium leading-none italic">Arrête de jouer au hasard.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
              <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[3rem] flex flex-col justify-between hover:border-orange-500/50 transition-all shadow-xl min-h-[520px] text-left">
                 <div>
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800"><BookOpen className="text-orange-500 w-7 h-7" /></div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight italic text-white leading-none">La Bible du Renard</h3>
                    <p className="text-slate-400 mb-10 text-lg font-medium leading-relaxed italic">Ma méthode complète et ma gestion financière.</p>
                    <ul className="space-y-4 mb-12 text-left italic">
                       <li className="flex items-center gap-4 text-sm text-slate-300 font-black italic"><CheckCircle2 className="w-5 h-5 text-orange-500" /> 23 Pages Pour Analyser Comme Un Pro.</li>
                       <li className="flex items-center gap-4 text-sm text-orange-400 font-black bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20 leading-none italic"><StarIcon className="w-5 h-5 text-orange-500" /> + 7 JOURS VIP OFFERTS</li>
                    </ul>
                 </div>
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-800/50 mt-auto w-full italic">
                    <div className="flex flex-col items-center sm:items-start space-y-0 leading-none"><span className="text-slate-500 line-through text-lg font-bold">29,90€</span><span className="text-4xl font-black text-white leading-none">14,90€</span></div>
                    <a href={LINKS.BIBLE} target="_blank" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 px-10 py-4 rounded-2xl font-black transition-all border border-slate-700 uppercase text-[11px] tracking-widest text-center shadow-lg italic">Commander</a>
                 </div>
              </div>
              <div className="bg-orange-600 p-8 md:p-12 rounded-[3rem] flex flex-col justify-between shadow-2xl shadow-orange-600/30 transform hover:-translate-y-2 transition-all min-h-[520px] text-left">
                 <div>
                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/10 text-white"><Zap className="fill-current w-7 h-7 text-white" /></div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic leading-none">Pass Hebdo VIP</h3>
                    <p className="text-orange-100 mb-10 text-lg font-medium leading-relaxed italic">L'analyse complète reçue chaque matin avant 9h.</p>
                    <ul className="space-y-4 mb-12 text-white font-bold italic">
                       <li className="flex items-center gap-4 text-sm leading-none italic"><CheckCircle2 className="w-5 h-5 text-white" /> L'analyse Complète Du Quinté</li>
                       <li className="flex items-center gap-4 text-sm leading-none italic"><CheckCircle2 className="w-5 h-5 text-white" /> 5 à 10 Chevaux À Grosse Confiance</li>
                    </ul>
                 </div>
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 mt-auto w-full italic">
                    <div className="flex flex-col items-center sm:items-start text-white space-y-0"><span className="text-4xl font-black leading-none">5€</span><span className="text-[10px] text-orange-200 font-bold uppercase tracking-widest font-black mt-1 leading-none italic">par semaine</span></div>
                    <a href={LINKS.VIP_HEBDO} target="_blank" className="w-full sm:w-auto bg-white text-orange-600 px-10 py-5 rounded-2xl font-black transition-all hover:bg-slate-100 shadow-xl uppercase text-[11px] tracking-widest text-center italic">C'est parti !</a>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center px-6 leading-none flex flex-col items-center">
        <span className="text-2xl font-black italic text-white uppercase block mb-8 tracking-tight">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10 w-full italic">
          <p className="text-slate-600 text-[10px] leading-loose font-bold uppercase tracking-widest text-center leading-relaxed">Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13. Réservé aux majeurs.</p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center font-bold italic">© 2026 LE RENARD DU TURF</p>
      </footer>
    </div>
  );
};

export default App;
