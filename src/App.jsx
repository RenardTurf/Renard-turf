import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BookOpen, Zap, ChevronRight, Target, 
  BarChart3, CheckCircle2, Users, Star, Lock, Youtube,
  Ticket, ShieldCheck, MousePointerClick
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
    FICHE_ESSAI: "https://lerenardturf.sellfy.store/p/fiche-essais-1-quinte-du-31-12/",
    YOUTUBE_CHANNEL: "https://www.youtube.com/channel/UC64vhh_FBnthLJKNqEdjZpA", 
    LAST_VIDEO_ID: "VT20U4PrtOc"
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
            <span className="text-xl font-black tracking-tighter uppercase italic text-white tracking-tight leading-none">RENARD<span className="text-orange-500 font-black">TURF</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400 font-bold">
            <a href="#youtube" className="hover:text-orange-500 transition-colors">Vidéos</a>
            <a href="#analyse" className="hover:text-orange-500 transition-colors">L'Analyse</a>
            <a href="#ticket" className="hover:text-orange-500 transition-colors text-orange-500 underline underline-offset-8 decoration-2 font-bold">Ticket du Jour</a>
            <a href="#offres" className="hover:text-orange-500 transition-colors">Offres</a>
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 font-black shadow-lg shadow-orange-600/20 uppercase">
              Accès VIP
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-12 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-8">
            <span className="text-orange-500 animate-pulse font-bold">●</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Saison 2026 : Rentabilité Activée</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none tracking-tighter uppercase italic text-white">
            Deviens un <span className="text-orange-500 font-black">Investisseur</span>,<br />Plus un joueur.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Arrête de parier au hasard. Analyse, Gestion et Méthode pour dominer le PMU sur le long terme.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-6 md:px-0 w-full max-w-2xl">
            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/30 group uppercase">
              REJOINDRE LE VIP <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#offres" className="w-full sm:w-1/2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-10 py-5 rounded-2xl font-black text-lg transition-all text-center uppercase">
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

      {/* SECTION YOUTUBE */}
      <section id="youtube" className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 text-orange-500">
               <Youtube className="w-8 h-8 fill-current" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">Dernière Analyse Vidéo</h2>
            </div>
            <p className="text-slate-400 font-medium italic">Rejoins les 1500+ passionnés qui suivent mes méthodes sur YouTube.</p>
          </div>
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
             <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${LINKS.LAST_VIDEO_ID}`}
                title="Dernière Vidéo Le Renard du Turf"
                frameBorder="0"
                allowFullScreen
             ></iframe>
          </div>
          
          <div className="mt-10">
             <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-8 py-4 rounded-full transition-all">
                S'abonner à la chaîne <Star className="w-4 h-4 text-orange-500 fill-current" />
             </a>
          </div>
        </div>
      </section>

      {/* ANALYSE DU JOUR */}
      <section id="analyse" className="py-24 bg-slate-900/20 border-y border-slate-900 px-6 md:px-0">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-3xl border-t-orange-500 border-t-4">
            <div className="p-8 md:p-16">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase italic text-white leading-none">L'Analyse du Jour 🦊</h2>
                  <p className="text-slate-400 font-medium italic">Vincennes - Prix de Poitiers - Le 31/12 13h50</p>
                </div>
                <div className="bg-orange-500/10 text-orange-500 px-5 py-2.5 rounded-xl font-black text-xs border border-orange-500/20 uppercase tracking-widest">
                  Fiche Quinté
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center md:text-left">
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-slate-300 leading-relaxed text-xl font-medium italic">
                    "On termine l'année à Vincennes. Ma méthode génétique a détecté une anomalie sur les chevaux de tête..."
                  </p>
                  
                  <div className="relative">
                    <div className="p-8 bg-slate-950/60 border border-slate-800 rounded-3xl space-y-5 filter blur-md select-none opacity-30 text-slate-400">
                      <p className="text-sm">Le n°7 est mon favori car...</p>
                      <p className="text-sm">Mon outsider préféré est le n°4...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-slate-950 border border-orange-500/40 p-8 md:p-12 rounded-[2rem] shadow-2xl text-center max-w-md backdrop-blur-sm">
                        <Lock className="w-12 h-12 text-orange-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight italic leading-none">Analyse Réservée</h3>
                        <p className="text-sm text-slate-400 mb-8 font-medium italic leading-relaxed">Débloque le ticket complet, l'outsider préféré et l'analyse stratégique.</p>
                        
                        <div className="flex flex-col gap-4">
                            <a href={LINKS.FICHE_ESSAI} target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                              <MousePointerClick className="w-4 h-4" /> Essayer l’analyse à 1€
                            </a>
                            <a href={LINKS.VIP_HEBDO} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-600/30 transition-all text-white">
                              REJOINDRE LE VIP (5€)
                            </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 h-fit">
                  <h4 className="font-black text-slate-500 mb-8 flex items-center justify-center md:justify-start gap-3 uppercase tracking-tighter text-xs leading-none">
                    <BarChart3 className="w-4 h-4 text-orange-500" /> Paramètres Data
                  </h4>
                  <ul className="space-y-6 text-[13px]">
                    <li className="flex justify-between border-b border-slate-900 pb-4 font-bold">
                      <span className="text-slate-500 uppercase text-[10px]">Confiance</span>
                      <span className="text-orange-500 text-lg">70%</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-900 pb-4 font-bold">
                      <span className="text-slate-500 uppercase text-[10px]">Engagement</span>
                      <span className="text-orange-500 uppercase italic">Visé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TICKET DU JOUR */}
      <section id="ticket" className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12 flex flex-col items-center">
             <div className="inline-flex items-center gap-3 bg-orange-600/10 text-orange-500 px-6 py-2 rounded-full border border-orange-500/20 mb-6">
                <Ticket className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic leading-none">Sélection Gratuite du Site</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">Le Ticket du Jour 🎫</h2>
             <p className="text-slate-400 max-w-xl mx-auto italic font-medium leading-relaxed">Sur YouTube je donne mes 2 bases. Ici, je vous donne toute ma sélection pour le Quinté.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-1 shadow-2xl shadow-orange-600/10 overflow-hidden max-w-3xl mx-auto">
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[1.8rem] p-8 md:p-12 text-slate-900 relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-8 mb-8 relative z-10 gap-4 text-left">
                 <div>
                    <h3 className="font-black text-2xl uppercase italic tracking-tighter leading-none">Sélection <span className="text-orange-600 font-black">Renard</span></h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 tracking-wider italic">Vincennes - R1C1 - 13h50</p>
                 </div>
                 <div className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest">Quinté+</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 text-left">
                 {/* BASES */}
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none">
                       <Star className="w-3 h-3 fill-orange-500 text-orange-500 font-bold" /> Mes 2 Bases YouTube
                    </h4>
                    <div className="flex gap-3">
                       {[7, 4].map(num => (
                          <div key={num} className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-600/30">
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* SÉLECTION COMPLÈTE - 9 CHEVAUX */}
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-bold leading-none">
                       <ShieldCheck className="w-3 h-3 text-green-600 font-bold" /> Ma Sélection de 9 Chevaux
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                       {[7, 4, 12, 1, 9, 3, 16, 5, 8].map((num, i) => (
                          <div key={num} className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all ${i < 2 ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-slate-200 text-slate-700'}`}>
                             {num}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* BOUTON D'ESSAI DISCRET (REMPLACE LE TEXTE DE CERTIFICATION) */}
              <div className="mt-12 flex justify-center relative z-10">
                 <a 
                   href={LINKS.FICHE_ESSAI} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-orange-600 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:tracking-[0.5em] flex items-center gap-2 cursor-pointer leading-none"
                 >
                    Essayer l’analyse Complète à 1€
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION OFFRES */}
      <section id="offres" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl text-center">
           <div className="mb-20 px-6">
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white leading-tight">Passe au niveau supérieur</h2>
              <p className="text-slate-400 text-lg font-medium">Arrête de jouer au hasard.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* La Bible */}
              <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[3rem] flex flex-col justify-between hover:border-orange-500/50 transition-all shadow-xl min-h-[520px]">
                 <div>
                    <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800">
                       <BookOpen className="text-orange-500 w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight italic text-left text-white tracking-tight leading-none">La Bible du Renard</h3>
                    <p className="text-slate-400 mb-10 text-lg font-medium leading-relaxed text-left">Ma méthode complète, mes 13 piliers de sélection et ma gestion financière.</p>
                    <ul className="space-y-4 mb-12 text-left">
                       <li className="flex items-center gap-4 text-sm text-slate-300 font-medium text-left"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Les 13 piliers d'analyse</li>
                       <li className="flex items-center gap-4 text-sm text-orange-400 font-black bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20 text-left leading-none"><Star className="w-5 h-5 text-orange-500" /> + 7 JOURS VIP OFFERTS</li>
                    </ul>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-800/50 mt-auto">
                    <div className="flex flex-col items-center sm:items-start space-y-0 leading-none">
                        <span className="text-slate-500 line-through text-lg font-bold">29,90€</span>
                        <span className="text-4xl font-black text-white leading-none font-black">14,90€</span>
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
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic text-left tracking-tight leading-none">Pass Hebdo VIP</h3>
                    <p className="text-orange-100 mb-10 text-lg font-medium leading-relaxed text-left leading-tight">Chaque matin avant 9h, reçois mon analyse complète et tous les pronostics du meilleur de la presse.</p>
                    <ul className="space-y-4 mb-12 text-white text-left font-bold">
                       <li className="flex items-center gap-4 text-sm text-left leading-none"><CheckCircle2 className="w-5 h-5 text-white" /> Mon outsider préféré du jour</li>
                       <li className="flex items-center gap-4 text-sm text-left leading-none"><CheckCircle2 className="w-5 h-5 text-white" /> 5 à 10 chevaux à grosse confiance</li>
                    </ul>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 mt-auto text-left">
                    <div className="flex flex-col items-center sm:items-start text-white space-y-0 text-left">
                       <span className="text-4xl font-black leading-none font-black">5€</span>
                       <span className="text-[10px] text-orange-200 font-bold uppercase tracking-widest font-black mt-1 leading-none">par semaine</span>
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
      <footer className="bg-slate-950 border-t border-slate-900 py-20 text-center px-6 leading-none">
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic block mb-8 tracking-tight">RENARD<span className="text-orange-500 font-black">TURF</span></span>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto mb-10">
          <p className="text-slate-600 text-[10px] leading-loose font-bold uppercase tracking-widest text-center leading-relaxed font-bold">
            Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13. Réservé aux majeurs.
          </p>
        </div>
        <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center leading-none">
          © 2026 LE RENARD DU TURF
        </p>
      </footer>
    </div>
  );
};

export default App;

