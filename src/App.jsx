import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, 
  Users, Star, Youtube, Ticket, ShieldCheck, 
  MousePointerClick, CheckCircle2, ExternalLink, 
  History, PlayCircle, Eye, Play, RefreshCw, 
  ArrowUpRight, ArrowDownRight, Activity, AlertCircle
} from 'lucide-react';

// --- CONFIGURATION API ---
const apiKey = ""; // L'environnement injecte la clé automatiquement
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

  // --- LOGIQUE D'ACTUALISATION AUTOMATIQUE ---
  const fetchLiveOdds = useCallback(async (retryCount = 0) => {
    setIsRefreshing(true);
    setError(null);

    const today = new Date().toLocaleDateString('fr-FR');
    const prompt = `Trouve les cotes PMU actuelles pour le Quinté du jour (${today}). 
    Donne les 5 favoris avec : numéro, nom, et cote.
    Réponds UNIQUEMENT en JSON : [{"num": number, "nom": "string", "cote": number, "trend": "up"|"down"}]`;

    try {
      const response = await fetch(MODEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) throw new Error('Erreur API');
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setLiveOdds(JSON.parse(text));
        setLastUpdate(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      if (retryCount < 2) {
        setTimeout(() => fetchLiveOdds(retryCount + 1), 2000);
      } else {
        setError("Cotes indisponibles pour le moment");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    fetchLiveOdds();
    const interval = setInterval(fetchLiveOdds, 600000); // Toutes les 10 min
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
            <span className="text-xl tracking-tighter uppercase italic">RENARD<span className="text-orange-500 font-black">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#ticket" className="hover:text-orange-500 transition-colors">Ticket & Cotes</a>
            <a href="#offres" className="hover:text-orange-500 transition-colors font-black">Offres</a>
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20 uppercase font-black">
              Accès VIP
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - RESTAURÉE */}
      <section className="relative pt-40 pb-12 overflow-hidden text-center flex flex-col items-center px-6 font-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10 font-black" />
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8 font-black">
          <Activity className="w-4 h-4 text-orange-500 animate-pulse font-black" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-black">Analyse Data & Génétique 2026</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white font-black">
          Deviens un <span className="text-orange-500 font-black">Investisseur</span>.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed font-black">
          Arrête de parier au hasard. Domine le PMU avec notre sélection stratégique quotidienne.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-2xl font-black">
          <a href={LINKS.VIP_HEBDO} target="_blank" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 group uppercase font-black">
            REJOINDRE LE VIP <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform font-black" />
          </a>
          <a href="#offres" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase font-black">
            LA BIBLE DU RENARD
          </a>
        </div>
      </section>

      {/* SECTION YOUTUBE SHORTS - RESTAURÉE */}
      <section id="youtube" className="py-20 px-6 flex flex-col items-center font-black">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-500 font-black">
               <Youtube className="w-8 h-8 fill-current text-orange-600 font-black" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none font-black">L'Analyse Vidéo</h2>
            </div>
            <p className="text-slate-400 font-medium italic font-black">Mes 3 bases YouTube pour le Quinté du jour.</p>
          </div>
          <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900 font-black">
             <iframe className="absolute inset-0 w-full h-full font-black" src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`} title="Analyse" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* SECTION COMMUNE : TICKET + COTES LIVE (CÔTE À CÔTE) */}
      <section id="ticket" className="py-20 px-6 bg-slate-900/10 border-y border-slate-900 flex flex-col items-center font-black">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8 font-black">
          
          {/* LE TICKET DU JOUR (Gauches - 3/5) */}
          <div className="lg:col-span-3 font-black">
            <div className="bg-white rounded-[2.5rem] p-1 shadow-2xl shadow-orange-600/10 overflow-hidden font-black">
              <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2.3rem] p-8 md:p-10 text-slate-900 relative font-black">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-6 mb-8 gap-4 font-black">
                   <div>
                      <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none font-black">Sélection <span className="text-orange-600 font-black">Renard</span></h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 italic font-black">Vincennes - R1C6 - 15h15</p>
                   </div>
                   <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest font-black">Quinté+</div>
                </div>

                <div className="space-y-10 font-black">
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-black">
                         <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> Mes 3 Bases YouTube
                      </h4>
                      <div className="flex gap-3 font-black">
                         {[15, 3, 5].map(num => (
                            <div key={num} className="w-14 h-14 md:w-16 md:h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-lg shadow-orange-600/30">
                               {num}
                            </div>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-black">
                         <ShieldCheck className="w-3 h-3 text-green-600 font-black" /> Ma Sélection Complète
                      </h4>
                      <div className="flex flex-wrap gap-2 font-black">
                         {[15, 3, 5, 13, 4, 14, 7, 11, 10].map((num, i) => (
                            <div key={num} className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all ${i < 3 ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-slate-200 text-slate-700'}`}>
                               {num}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="mt-10 flex justify-center font-black">
                   <a href={LINKS.FICHE_1EURO} target="_blank" className="border-2 border-orange-500 rounded-xl px-6 py-4 text-orange-600 hover:bg-orange-500 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 text-center shadow-md font-black">
                      Essayer l’analyse Complète à 1€
                   </a>
                </div>
              </div>
            </div>
          </div>

          {/* LES COTES EN DIRECT (Droites - 2/5) */}
          <div className="lg:col-span-2 space-y-6 font-black">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl h-full font-black">
              <div className="flex justify-between items-center mb-8 font-black">
                <div className="flex items-center gap-3 font-black">
                  <TrendingUp className="text-orange-500 w-5 h-5 font-black" />
                  <h3 className="text-lg font-black text-white uppercase italic font-black">Cotes Live</h3>
                </div>
                <button onClick={() => fetchLiveOdds()} className="text-slate-500 hover:text-orange-500 transition-colors font-black">
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {error ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-500 italic text-xs text-center font-black">
                  <AlertCircle className="w-8 h-8 mb-2 opacity-20 font-black" />
                  {error}
                </div>
              ) : liveOdds.length > 0 ? (
                <div className="space-y-3 font-black">
                   {liveOdds.map((cheval, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/30 font-black">
                         <div className="flex items-center gap-4 font-black font-black">
                            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm font-black">{cheval.num}</div>
                            <span className="text-[10px] font-black text-white uppercase tracking-tight">{cheval.nom}</span>
                         </div>
                         <div className="flex items-center gap-2 font-black">
                            <span className="text-lg font-black text-orange-500">{cheval.cote.toFixed(1)}</span>
                            {cheval.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-red-500 font-black" /> : <ArrowUpRight className="w-4 h-4 text-green-500 font-black" />}
                         </div>
                      </div>
                   ))}
                   <p className="text-[8px] text-slate-600 text-center uppercase tracking-widest mt-4 font-black">Dernier relevé : {lastUpdate || '...'}</p>
                </div>
              ) : (
                <div className="space-y-4 py-4 animate-pulse font-black">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-slate-800/50 rounded-xl font-black"></div>)}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* COURSE RÉFÉRENCE - RESTAURÉE */}
      <section className="py-20 px-6 flex flex-col items-center font-black font-black">
        <div className="container mx-auto max-w-4xl font-black">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden font-black">
              <div className="flex items-center gap-5 mb-10 font-black">
                 <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 text-orange-500 font-black">
                    <History className="w-8 h-8 font-black font-black" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase italic leading-none font-black font-black">Course Référence</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 font-black font-black">La course d'appui indispensable</p>
                 </div>
              </div>
              <a href={LINKS.COURSE_REF_URL} target="_blank" className="relative block aspect-video w-full rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950 group cursor-pointer shadow-inner font-black font-black font-black">
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-slate-950 group-hover:bg-slate-900/20 transition-colors font-black"></div>
                 <div className="absolute inset-0 flex items-center justify-center font-black">
                    <div className="w-20 h-20 bg-orange-600/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform font-black">
                       <Play className="text-white w-8 h-8 fill-current ml-1 font-black font-black" />
                    </div>
                 </div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-black">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full font-black">Visionner sur Equidia</span>
                 </div>
              </a>
           </div>
        </div>
      </section>

      {/* OFFRES - RESTAURÉES */}
      <section id="offres" className="py-20 px-6 flex flex-col items-center font-black font-black">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 w-full font-black">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-between font-black font-black">
            <div>
              <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 font-black font-black">
                <BookOpen className="text-orange-500 w-6 h-6 font-black font-black" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic font-black font-black">La Bible du Renard</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed font-black font-black">La méthode complète pour devenir rentable sur le long terme.</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 font-black font-black">
              <div className="font-black font-black"><span className="text-slate-500 line-through text-xs font-black">29,90€</span><br /><span className="text-2xl text-white font-black font-black">14,90€</span></div>
              <a href={LINKS.BIBLE} target="_blank" className="bg-slate-800 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 font-black">Commander</a>
            </div>
          </div>
          <div className="bg-orange-600 p-8 rounded-[3rem] flex flex-col justify-between shadow-xl shadow-orange-600/20 font-black font-black">
            <div>
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 border border-white/10 font-black font-black">
                <Zap className="text-white w-6 h-6 fill-current font-black font-black" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic font-black font-black font-black">Pass VIP Hebdo</h3>
              <p className="text-orange-100 mb-8 text-sm leading-relaxed font-black font-black">Analyses exclusives envoyées chaque matin avant 9h00.</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/10 font-black font-black">
              <div className="font-black text-white font-black"><span className="text-2xl font-black">5,00€</span><br /><span className="text-[10px] uppercase tracking-widest opacity-80 font-black font-black">par semaine</span></div>
              <a href={LINKS.VIP_HEBDO} target="_blank" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 font-black">S'abonner</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center px-6 font-black">
        <span className="text-xl font-black tracking-tighter uppercase italic block mb-6 font-black font-black">RENARD<span className="text-orange-500 font-black font-black">TURF</span></span>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest max-w-md mx-auto leading-relaxed mb-6 font-black font-black">
          Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13.
        </p>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] font-black font-black font-black">© 2026 LE RENARD DU TURF</p>
      </footer>
    </div>
  );
};

export default App;

