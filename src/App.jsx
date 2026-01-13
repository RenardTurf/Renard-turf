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
  Globe,
  Wallet,
  Music,
  UserCheck
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

  // --- DATA RPI v2.1 OPTIMISÉE (BRIONNE - 13/01/2026) ---
  const horsesData = [
    { 
      id: 10, name: "VALLATONIAN", rpi: 96.4, perf: 48.2, intent: 24, context: 24.2, 
      country: "NOR", gains: "162 967 €", music: "9a 2a 10a 1a 1a 2a 1a 5a", proForm: "83% (Tandem)",
      tactic: "LA RÉFÉRENCE. Record de 1'12\"6 sur le tracé. Tandem Abrivard à 83% de réussite."
    },
    { 
      id: 8, name: "EXPRESS D'ARC", rpi: 94.8, perf: 49, intent: 24.8, context: 21, 
      country: "ITY", gains: "161 352 €", music: "6a (25) 5a 5a 3a 5a 1a 2a", proForm: "42% (Driver)",
      tactic: "LE BOLIDE. Détient le record pur du lot (1'12\"5). Note confidentielle max de 16/20."
    },
    { 
      id: 14, name: "EVERY TIME WINNER", rpi: 92.1, perf: 46.5, intent: 23, context: 22.6, 
      country: "ITY", gains: "171 330 €", music: "4a (25) 6a 3a Da 5a 7a 1a", proForm: "50% (D4)",
      tactic: "REPÉRÉ. Capable de trotter en 1'12\"9. 50% de réussite au déferrage."
    },
    { 
      id: 9, name: "ICEBREAKER PELLINI", rpi: 89.5, perf: 45, intent: 23.5, context: 21, 
      country: "SWE", gains: "162 665 €", music: "(25) 4a 10a 1a 1a 2a 6a 2a", proForm: "46% (Entr.)",
      tactic: "SPÉCIALISTE. Expert corde à gauche. Entraîneur en top forme (46%)."
    },
    { 
      id: 3, name: "KAXIG IN", rpi: 87.2, perf: 44, intent: 22.5, context: 20.7, 
      country: "SWE", gains: "141 804 €", music: "(25) 4a 2a 6a Da 4a 3m 5a", proForm: "39% (Quinté)",
      tactic: "ATOUT GOOP. Duo affichant 100% de réussite. Taillé pour ce niveau."
    },
    { 
      id: 11, name: "DIE HARD", rpi: 85.6, perf: 43, intent: 22, context: 20.6, 
      country: "ITY", gains: "167 662 €", music: "(25) 3a 13a 6a Da 1a 1a 10a", proForm: "Va confirmer",
      tactic: "OUTSIDER SÉDUISANT. En plein regain de forme après son récent podium."
    },
    { 
      id: 12, name: "GLOBAL CONCEPT", rpi: 82.3, perf: 40.5, intent: 21.5, context: 20.3, 
      country: "SWE", gains: "168 404 €", music: "(25) Da 1a 1a 1a 3a 3a 1a", proForm: "100% (Duo)",
      tactic: "REVENANT. Duo Mottier infaillible. Classe intrinsèque supérieure."
    },
    { 
      id: 13, name: "OSCAR VAN HALBEEK", rpi: 79.8, perf: 42, intent: 19.5, context: 18.3, 
      country: "BEL", gains: "168 872 €", music: "(25) 2a 6a 2Da 3a 2a 1a 8a", proForm: "71% (Duo)",
      tactic: "MÉTRONOME. 100% de réussite parcours (4 places en 4 tentatives)."
    },
    { 
      id: 2, name: "COMPETIVO", rpi: 75.8, perf: 35.8, intent: 20, context: 20, 
      country: "SWE", gains: "136 739 €", music: "7a (25) 2m 3a 7a 1a 2a 5a", proForm: "39% (Driver)",
      tactic: "GUERRIER D4. Le déferrage lui donne un supplément d'âme (16/19)."
    }
  ];

  const [selectedHorse, setSelectedHorse] = useState(horsesData[0]);

  useEffect(() => {
    initGA('G-EY4386K4P1');
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LINKS = {
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "6Se7xPCZQOk"
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="#rpi-tool" className="hover:text-orange-600 transition-colors text-orange-600">Indice RPI</a>
            <a href="#analytics" className="hover:text-orange-600 transition-colors">Détails Pro</a>
            <a href="#ticket" className="hover:text-orange-600 transition-colors">Rédaction</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden text-center flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Activity className="text-orange-600 w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Média Hippique : Analyse & Data</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase italic">
            L'Information <span className="text-orange-600">Data</span><br />au service du Turf.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic">
            Décryptage algorithmique et expertise pour une approche rationnelle du PMU.
          </p>
          <a href="#rpi-tool" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group uppercase italic">
            CONSULTER L'INDICE <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* --- SECTION ANALYSEUR RPI --- */}
      <section id="rpi-tool" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Scanner de Probabilité <span className="text-orange-600">RPI</span>
            </h2>
            <p className="text-slate-400 mt-4 font-black uppercase text-[10px] tracking-[0.3em]">Vincennes - R1C1 - 13h55 (13/01/2026)</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="w-full md:w-1/2">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 mb-4 block italic">1. Sélectionner un partant</label>
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
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-900 rounded-3xl p-8 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400 mb-2 italic tracking-widest">Renard Pro Index</span>
                <div className="text-7xl font-black text-white italic leading-none">{selectedHorse.rpi}<span className="text-orange-600 text-2xl">/100</span></div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left">
               <p className="text-slate-700 text-sm italic font-medium leading-relaxed">
                 <span className="text-orange-600 font-black uppercase not-italic mr-2">Audit Technique :</span>
                 "{selectedHorse.tactic}"
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NOUVELLE SECTION : ANALYTICS PRO (POINTS FORTS) --- */}
      <section id="analytics" className="py-24 px-6 bg-white flex flex-col items-center">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              Détails <span className="text-orange-600">Analytics Pro</span>
            </h2>
            <p className="text-slate-500 font-medium italic">Les indicateurs de performance clés pour chaque favori du Quinté.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horsesData.slice(0, 9).map((horse) => (
              <div key={horse.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm border-b-4 border-b-orange-600/10 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black italic">{horse.id}</span>
                    <h3 className="font-black text-sm uppercase tracking-tighter">{horse.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-600">{horse.country}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-medium border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-2 text-slate-400"><Wallet className="w-3.5 h-3.5" /> Gains</div>
                    <span className="text-slate-900 font-bold">{horse.gains}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-2 text-slate-400"><UserCheck className="w-3.5 h-3.5" /> Forme Pro</div>
                    <span className="text-orange-600 font-black">{horse.proForm}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"><Music className="w-3 h-3" /> Musique Récente</div>
                    <p className="text-[10px] font-bold text-slate-600 bg-slate-50 p-2 rounded-lg leading-relaxed">{horse.music}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-50 flex flex-col items-center border-y border-slate-100">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg shadow-orange-600/20">
                <Ticket className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none font-bold">Sélection officielle</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 leading-tight">Le Ticket Quinté 🎫</h2>
             <p className="text-slate-500 max-w-xl mx-auto italic font-medium">Synthèse des données RPI et des observations de terrain.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-2 shadow-2xl overflow-hidden max-w-3xl mx-auto w-full border border-slate-100">
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
        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic block mb-8">RENARD<span className="text-orange-600 font-black">TURF</span></span>
        
        <div className="bg-yellow-400 text-slate-950 p-4 rounded-2xl max-w-4xl mx-auto mb-10 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4 shadow-sm">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block text-slate-400">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <button onClick={() => setActiveLegalModal('mentions')} className="hover:text-orange-600 transition-colors">Mentions Légales</button>
           <button onClick={() => setActiveLegalModal('gaming')} className="hover:text-orange-600 transition-colors">Jeu Responsable</button>
        </div>
        
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">
          © 2026 RENARD TURF - DATA & ANALYTICS
        </p>

        {/* MODAL */}
        {activeLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-white/80">
            <div className="bg-white border border-slate-200 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[3rem] p-10 md:p-14 shadow-2xl relative">
              <button onClick={() => setActiveLegalModal(null)} className="absolute top-8 right-8 text-slate-400 hover:text-orange-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-3xl font-black text-slate-900 uppercase italic mb-8">Informations</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Le jeu doit rester un plaisir. Ne misez jamais d'argent que vous ne pouvez pas vous permettre de perdre.</p>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
