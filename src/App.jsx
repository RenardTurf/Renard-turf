import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, 
  Users, Star, Youtube, Ticket, ShieldCheck, 
  MousePointerClick, CheckCircle2, ExternalLink, 
  History, PlayCircle, Eye, Play, RefreshCw, 
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

// --- CONFIGURATION API ---
const apiKey = ""; // La clé est injectée automatiquement par l'environnement
const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveOdds, setLiveOdds] = useState([]);
  const [error, setError] = useState(null);

  // --- TES LIENS OFFICIELS ---
  const LINKS = {
    VIP_HEBDO: "https://lerenardturf.sellfy.store/p/pronovip/",
    BIBLE: "https://lerenardturf.sellfy.store/p/le-guide-du-renard/",
    FICHE_1EURO: "https://lerenardturf.sellfy.store/p/fiche-essais-1-quinte-du-31-12/",
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "X9jfR6Z--UM",
    COURSE_REF_URL: "https://www.equidia.fr/courses/2025-11-22/R1/C4"
  };

  // --- LOGIQUE D'ACTUALISATION AUTOMATIQUE VIA GOOGLE SEARCH ---
  const fetchLiveOdds = useCallback(async (retryCount = 0) => {
    setIsRefreshing(true);
    setError(null);

    const today = new Date().toLocaleDateString('fr-FR');
    const prompt = `Trouve les cotes actuelles en direct (PMU/Turf) pour le Quinté du jour (${today}). 
    Donne-moi les 5 favoris avec : leur numéro, leur nom, et leur cote actuelle.
    Réponds UNIQUEMENT sous forme de JSON valide : [{"num": number, "nom": "string", "cote": number, "trend": "up"|"down"|"stable"}]`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }], // Utilisation de Google Search pour le temps réel
      generationConfig: { responseMimeType: "application/json" }
    };

    try {
      const response = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erreur réseau');

      const result = await response.json();
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResponse) {
        const data = JSON.parse(textResponse);
        setLiveOdds(data);
        setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
      }
    } catch (err) {
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => fetchLiveOdds(retryCount + 1), delay);
      } else {
        setError("Impossible de récupérer les cotes en direct. Veuillez réessayer plus tard.");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Premier chargement
    fetchLiveOdds();

    // Actualisation toutes les 15 minutes
    const interval = setInterval(fetchLiveOdds, 15 * 60 * 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [fetchLiveOdds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center font-black">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl tracking-tighter uppercase italic">RENARD<span className="text-orange-500">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#ticket" className="hover:text-orange-500 transition-colors text-orange-500 underline decoration-2 underline-offset-8">Ticket</a>
            <a href="#offres" className="hover:text-orange-500 transition-colors">Offres</a>
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20 uppercase">
              Accès VIP
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 flex flex-col items-center font-black">
          <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-8">
            <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">Cotes PMU Live Activées</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white">
            Deviens un <span className="text-orange-500 font-black font-bold">Investisseur</span>.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed font-black">
            Analyse Data & Génétique automatisée. Ne pariez plus, investissez sur les meilleures probabilités.
          </p>
        </div>
      </section>

      {/* DASHBOARD LIVE : COTES & REPLAY */}
      <section className="py-12 px-6 flex flex-col items-center">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 w-full font-black">
           
           {/* MODULE DES COTES AUTO-GÉRÉ PAR IA */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 animate-pulse"></div>
              
              <div className="flex justify-between items-start mb-8">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="text-orange-500 w-6 h-6" />
                    <h3 className="text-xl font-black text-white uppercase italic">Cotes PMU en Direct</h3>
                 </div>
                 <div className="text-right">
                    <button 
                      onClick={() => fetchLiveOdds()} 
                      disabled={isRefreshing}
                      className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-widest font-black"
                    >
                       <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                       {isRefreshing ? 'Recherche...' : `Actualisé: ${lastUpdate || '--:--'}`}
                    </button>
                 </div>
              </div>

              {error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold text-center italic leading-relaxed">
                  {error}
                </div>
              ) : liveOdds.length > 0 ? (
                <div className="space-y-3 font-black">
                   {liveOdds.map((cheval, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 hover:border-orange-500/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black">{cheval.num}</div>
                            <div className="flex flex-col">
                               <span className="text-[11px] font-black text-white uppercase tracking-tight leading-none">{cheval.nom}</span>
                               <span className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Cote Probable</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-xl font-black text-orange-500">{cheval.cote.toFixed(1)}</span>
                            {cheval.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-red-500" /> : <ArrowUpRight className="w-4 h-4 text-green-500" />}
                         </div>
                      </div>
                   ))}
                </div>
              ) : (
                <div className="space-y-3 animate-pulse">
                   {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-800 rounded-2xl opacity-20"></div>)}
                </div>
              )}
              
              <div className="mt-6 flex items-center gap-2 justify-center">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                 <span className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Flux Live Automatisé par IA</span>
              </div>
           </div>

           {/* COURSE RÉFÉRENCE */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl flex flex-col justify-between font-black">
              <div>
                 <div className="flex items-center gap-3 mb-6 font-black font-black">
                    <History className="text-orange-500 w-6 h-6 font-black" />
                    <h3 className="text-xl font-black text-white uppercase italic font-black">Course Référence</h3>
                 </div>
                 <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-10 italic font-black font-black">L'analyse visuelle indispensable du jour</p>
              </div>

              <a 
                href={LINKS.COURSE_REF_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative block aspect-video w-full rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950 group cursor-pointer shadow-inner"
              >
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-slate-950 group-hover:bg-slate-900/20 transition-colors duration-500"></div>
                 <div className="absolute inset-0 flex items-center justify-center font-black">
                    <div className="w-20 h-20 bg-orange-600/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                       <Play className="text-white w-8 h-8 fill-current ml-1" />
                    </div>
                 </div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full backdrop-blur-md font-black">Ouvrir sur Equidia</span>
                 </div>
              </a>
           </div>

        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-12 px-6 flex flex-col items-center">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center font-black">
          <div className="mb-12 flex flex-col items-center font-black">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-500 px-6 py-2 rounded-full border border-orange-500/20 mb-6">
                <Ticket className="w-5 h-5 text-orange-600 font-black" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-black font-black">Exclusivité Site : Sélection Complète</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight font-black font-black">Le Ticket du Jour 🎫</h2>
             <p className="text-slate-400 max-w-xl mx-auto italic font-medium leading-relaxed text-center font-black">3 bases + la sélection de 9 chevaux.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-1 shadow-2xl shadow-orange-600/10 overflow-hidden max-w-3xl mx-auto w-full font-black">
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-8 mb-8 relative z-10 gap-4 text-left font-black">
                 <div>
                    <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none font-black">Sélection <span className="text-orange-600 font-bold font-black">Renard</span></h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 tracking-wider italic font-black">Vincennes - R1C6 - 15h15</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest font-black font-black">Quinté+</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 text-left font-black">
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none font-black">
                       <Star className="w-3 h-3 fill-orange-500 text-orange-500 font-black font-black font-black" /> Mes 3 Bases YouTube
                    </h4>
                    <div className="flex gap-3 font-black font-black font-black">
                       {[15, 3, 5].map(num => (
                          <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-600/30">
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none font-black font-black">
                       <ShieldCheck className="w-3 h-3 text-green-600 font-black font-black font-black" /> Sélection de 9 Chevaux
                    </h4>
                    <div className="flex flex-wrap gap-2.5 font-black font-black">
                       {[15, 3, 5, 13, 4, 14, 7, 11, 10].map((num, i) => (
                          <div key={num} className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all font-black ${i < 3 ? 'bg-orange-50 border-orange-500 text-orange-600 font-black font-black' : 'bg-white border-slate-200 text-slate-700 font-black'}`}>
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex justify-center relative z-10 font-black font-black">
                 <a href={LINKS.FICHE_1EURO} target="_blank" rel="noopener noreferrer" className="border-2 border-orange-500 rounded-xl px-6 py-4 text-orange-600 hover:bg-orange-500 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 flex items-center gap-3 cursor-pointer leading-none text-center shadow-md font-black">
                    Essayer l’analyse Complète à 1€
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION OFFRES VIP */}
      <section id="offres" className="py-24 px-6 flex flex-col items-center">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 w-full font-black">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-between font-black">
            <div>
              <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800">
                <BookOpen className="text-orange-500 w-6 h-6 font-black font-black" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic">La Bible du Renard</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed font-black">23 Pages Pour Analyser Les Quintés Comme Un Pro. </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 font-black font-black">
              <div className="font-black"><span className="text-slate-500 line-through text-xs font-black">29,90€</span><br /><span className="text-2xl text-white font-black font-black">14,90€</span></div>
              <a href={LINKS.BIBLE} target="_blank" className="bg-slate-800 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-colors font-black">Commander</a>
            </div>
          </div>
          <div className="bg-orange-600 p-8 rounded-[3rem] flex flex-col justify-between shadow-xl shadow-orange-600/20 font-black">
            <div>
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <Zap className="text-white w-6 h-6 fill-current font-black" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Pass VIP Hebdo</h3>
              <p className="text-orange-100 mb-8 text-sm leading-relaxed font-black">Reçois l'analyse complète chaque matin avant 9h00.</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/10 font-black font-black font-black">
              <div className="font-black text-white font-black font-black"><span className="text-2xl font-black">5,00€</span><br /><span className="text-[10px] uppercase tracking-widest opacity-80 font-black">par semaine</span></div>
              <a href={LINKS.VIP_HEBDO} target="_blank" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors font-black font-black">S'abonner</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center px-6 font-black font-black">
        <span className="text-xl font-black tracking-tighter uppercase italic block mb-6 font-black font-black font-black">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10 w-full font-black">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest max-w-md mx-auto leading-relaxed mb-6 font-black font-black">
            Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13. Réservé aux majeurs.
          </p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] font-black font-black font-black">© 2026 LE RENARD DU TURF</p>
      </footer>
    </div>
  );
};

export default App;

