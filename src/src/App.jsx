import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, 
  BarChart3, CheckCircle2, Users, Star, Lock 
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "ROI Moyen", value: "+51%", icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { label: "Membres Team", value: "1400+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: "Taux Réussite", value: "73%", icon: <Target className="w-5 h-5 text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
               <Zap className="text-white fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">RENARD<span className="text-orange-500 font-black">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#analyse" className="hover:text-orange-500 transition-colors">L'Analyse</a>
            <a href="#offres" className="hover:text-orange-500 transition-colors">Offres 2026</a>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 font-black shadow-lg shadow-orange-600/20">
              Accès VIP
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Saison 2026 : Rentabilité Activée</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic">
            Deviens un <span className="text-orange-500 font-black">Investisseur</span>,<br />Plus un joueur.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Arrête de parier au hasard. Utilise la data et les 13 piliers du Renard pour dominer le PMU sur le long terme.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 group">
              REJOINDRE LE VIP <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all">
              LA BIBLE DU RENARD
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-xl hover:border-orange-500/30 transition-colors">
                <div className="flex justify-center mb-5">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="analyse" className="py-24 bg-slate-900/20 border-y border-slate-900">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-3xl border-t-orange-500/20 border-t-2">
            <div className="p-8 md:p-16">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">L'Analyse du Jour 🦊</h2>
                  <p className="text-slate-400 font-medium italic">Vincennes - Prix d'Hiver - Demain 13h50</p>
                </div>
                <div className="bg-orange-500/10 text-orange-500 px-5 py-2.5 rounded-xl font-black text-xs border border-orange-500/20 uppercase tracking-widest">
                  Quinté+
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-slate-300 leading-relaxed text-xl font-medium">
                    "Vincennes nous offre un plateau royal demain. Mon pivot est une évidence statistique, mais attention : plusieurs favoris présentent un 'Hic' génétique majeur..."
                  </p>
                  
                  <div className="relative group">
                    <div className="p-8 bg-slate-950/60 border border-slate-800 rounded-3xl space-y-5 filter blur-md select-none opacity-30">
                      <p className="text-sm">Le n°5 est mon favori car...</p>
                      <p className="text-sm">Mon outsider caché est le n°12...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-slate-900 border border-orange-500/40 p-10 rounded-[2rem] shadow-2xl text-center max-w-sm transform group-hover:scale-105 transition-all">
                        <Lock className="w-14 h-14 text-orange-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight italic">Analyse Réservée</h3>
                        <p className="text-sm text-slate-400 mb-8 font-medium">Accède au ticket complet, au tocard secret et à la sélection VIP du Renard.</p>
                        <button className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all">
                          Prendre la Fiche (1€)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800">
                  <h4 className="font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter text-sm">
                    <BarChart3 className="w-5 h-5 text-orange-500" /> Paramètres
                  </h4>
                  <ul className="space-y-6 text-[13px]">
                    <li className="flex justify-between border-b border-slate-900 pb-4">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Confiance</span>
                      <span className="text-orange-500 font-black text-lg">85%</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-900 pb-4">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Engagement</span>
                      <span className="text-orange-500 font-black">Visé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center">
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic block mb-8">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10 mx-6">
          <p className="text-slate-600 text-[10px] leading-loose font-bold uppercase tracking-widest">
            Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13.
          </p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em]">
          © 2026 RENARD TURF - DOMINATION HIPPIQUE
        </p>
      </footer>
    </div>
  );
};

export default App;

