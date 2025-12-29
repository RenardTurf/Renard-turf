import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, 
  BarChart3, CheckCircle2, Users, Star, Lock, Youtube 
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- TES LIENS OFFICIELS ---
  const LINKS = {
    VIP_HEBDO: "https://lerenardturf.sellfy.store/p/pronovip/",
    BIBLE: "https://lerenardturf.sellfy.store/p/le-guide-du-renard/",
    YOUTUBE_CHANNEL: "https://www.youtube.com/@LeRenardduTurf", // Remplace par ton lien de chaîne exact
    LAST_VIDEO_ID: "h4n0ugUfhLSeDVLG" // REMPLACE CECI par l'ID de ta dernière vidéo (ex: ce qui est après v=)
  };

  const stats = [
    { label: "ROI Moyen", value: "+51%", icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { label: "Vues Youtube", value: "500 000+", icon: <Users className="w-5 h-5 text-orange-500" /> },
    { label: "Taux Réussite Quinté", value: "73%", icon: <Target className="w-5 h-5 text-orange-500" /> },
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
            <span className="text-xl font-black tracking-tighter uppercase italic text-white tracking-tight">RENARD<span className="text-orange-500 font-black">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#analyse" className="hover:text-orange-500 transition-colors">L'Analyse</a>
            <a href="#offres" className="hover:text-orange-500 transition-colors">Offres</a>
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 font-black shadow-lg shadow-orange-600/20">
              Accès VIP
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <span className="text-orange-500">●</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Saison 2026 : Rentabilité Activée</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white">
            Deviens un <span className="text-orange-500 font-black">Investisseur</span>,<br />Plus un joueur.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Arrête de parier au hasard. Analyse, Gestion et Méthode pour dominer le PMU sur le long terme.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-6 md:px-0">
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 group">
              REJOINDRE LE VIP <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#offres" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center">
              LA BIBLE DU RENARD
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-xl">
                <div className="flex justify-center mb-5">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION YOUTUBE (NOUVEAU) */}
      <section id="youtube" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-500">
               <Youtube className="w-8 h-8 fill-current" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">Dernière Analyse Vidéo</h2>
            </div>
            <p className="text-slate-400 font-medium">Rejoins les 1500+ passionnés qui suivent mes méthodes sur YouTube.</p>
          </div>
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
             <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`}
                title="Dernière Vidéo Le Renard du Turf"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
             ></iframe>
          </div>
          
          <div className="mt-10 text-center">
             <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-8 py-4 rounded-full transition-all">
                S'abonner à la chaîne <Star className="w-4 h-4 text-orange-500 fill-current" />
             </a>
          </div>
        </div>
      </section>

      {/* ANALYSE DU JOUR */}
      <section id="analyse" className="py-24 bg-slate-900/20 border-y border-slate-900 px-6 md:px-0">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-3xl border-t-orange-500/20 border-t-2">
            <div className="p-8 md:p-16">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
                <div>
                  <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase italic text-white text-white">L'Analyse du Jour 🦊</h2>
                  <p className="text-slate-400 font-medium italic">Vincennes - Prix d'Hiver - Demain 13h50</p>
                </div>
                <div className="bg-orange-500/10 text-orange-500 px-5 py-2.5 rounded-xl font-black text-xs border border-orange-500/20 uppercase tracking-widest text-center">
                  Accès VIP
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center md:text-left">
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-slate-300 leading-relaxed text-xl font-medium">
                    "Vincennes nous offre un plateau royal demain. Mon pivot est une évidence statistique, mais attention : plusieurs favoris présentent un 'Hic' génétique majeur..."
                  </p>
                  
                  <div className="relative">
                    <div className="p-8 bg-slate-950/60 border border-slate-800 rounded-3xl space-y-5 filter blur-md select-none opacity-30 text-slate-400">
                      <p className="text-sm">Le n°5 est mon favori car...</p>
                      <p className="text-sm">Mon outsider préféré est le n°12...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-slate-900 border border-orange-500/40 p-10 rounded-[2rem] shadow-2xl text-center max-w-sm">
                        <Lock className="w-14 h-14 text-orange-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight italic">Analyse Réservée</h3>
                        <p className="text-sm text-slate-400 mb-8 font-medium">L'analyse complète et tous les pronostics du jour sont réservés aux VIP.</p>
                        <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all text-center">
                          REJOINDRE LE VIP
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 h-fit text-center md:text-left">
                  <h4 className="font-black text-slate-500 mb-8 flex items-center justify-center md:justify-start gap-3 uppercase tracking-tighter text-sm">
                    <BarChart3 className="w-5 h-5 text-orange-500" /> Paramètres
                  </h4>
                  <ul className="space-y-6 text-[13px]">
                    <li className="flex justify-between border-b border-slate-900 pb-4 font-bold">
                      <span className="text-slate-500 uppercase text-[10px]">Confiance</span>
                      <span className="text-orange-500 text-lg">85%</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-900 pb-4 font-bold">
                      <span className="text-slate-500 uppercase text-[10px]">Engagement</span>
                      <span className="text-orange-500 uppercase">Visé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION OFFRES */}
      <section id="offres" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-20 px-6">
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">Passe au niveau supérieur</h2>
              <p className="text-slate-400 text-lg font-medium">Arrête de jouer au hasard.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* La Bible */}
              <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[3rem] flex flex-col justify-between hover:border-orange-500/50 transition-all shadow-xl min-h-[520px]">
                 <div>
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800">
                       <BookOpen className="text-orange-500 w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight italic text-left text-white tracking-tight">La Bible du Renard</h3>
                    <p className="text-slate-400 mb-10 text-lg font-medium leading-relaxed text-left">Ma méthode complète, mes 13 piliers de sélection et ma gestion financière.</p>
                    <ul className="space-y-4 mb-12 text-left">
                       <li className="flex items-center gap-4 text-sm text-slate-300 font-medium"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Les 13 piliers d'analyse</li>
                       <li className="flex items-center gap-4 text-sm text-orange-400 font-black bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20"><Star className="w-5 h-5 text-orange-500" /> + 7 JOURS VIP OFFERTS</li>
                    </ul>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-800/50">
                    <div className="flex flex-col items-center sm:items-start space-y-0">
                        <span className="text-slate-500 line-through text-lg font-bold">29,90€</span>
                        <span className="text-4xl font-black text-white leading-none">14,90€</span>
                    </div>
                    <a href={LINKS.BIBLE} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 px-10 py-4 rounded-2xl font-black transition-all border border-slate-700 uppercase text-[11px] tracking-widest text-center shadow-lg whitespace-nowrap">
                        Commander
                    </a>
                 </div>
              </div>

              {/* VIP HEBDO */}
              <div className="bg-orange-600 p-8 md:p-12 rounded-[3rem] flex flex-col justify-between shadow-2xl shadow-orange-600/30 transform hover:-translate-y-2 transition-all min-h-[520px]">
                 <div>
                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/10 text-white">
                       <Zap className="fill-current w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic text-left tracking-tight">Pass Hebdo VIP</h3>
                    <p className="text-orange-100 mb-10 text-lg font-medium leading-relaxed text-left">Chaque matin avant 9h, reçois mon analyse complète et tous les pronostics du meilleur de la presse.</p>
                    <ul className="space-y-4 mb-12 text-white text-left font-bold">
                       <li className="flex items-center gap-4 text-sm"><CheckCircle2 className="w-5 h-5 text-white" /> Mon outsider préféré du jour</li>
                       <li className="flex items-center gap-4 text-sm"><CheckCircle2 className="w-5 h-5 text-white" /> 5 à 10 chevaux à grosse confiance dans les autres courses du jour</li>
                    </ul>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                    <div className="flex flex-col items-center sm:items-start text-white space-y-0">
                       <span className="text-4xl font-black leading-none">5€</span>
                       <span className="text-[10px] text-orange-200 font-bold uppercase tracking-widest font-black">par semaine</span>
                    </div>
                    <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-orange-600 px-10 py-5 rounded-2xl font-black transition-all hover:bg-slate-100 shadow-xl uppercase text-[11px] tracking-widest text-center whitespace-nowrap">
                        C'est parti !
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center px-6">
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic block mb-8 tracking-tight">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10">
          <p className="text-slate-600 text-[10px] leading-loose font-bold uppercase tracking-widest text-center">
            Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13. Réservé aux majeurs.
          </p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center">
          © 2026 LE RENARD DU TURF
        </p>
      </footer>
    </div>
  );
};

export default App;

