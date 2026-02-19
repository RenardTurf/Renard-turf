import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Target, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Crown,
  Menu,
  X,
  ArrowRight,
  Gift,
  AlertTriangle,
  Banknote,
  Scale,
  BrainCircuit,
  Download,
  Mail
} from 'lucide-react';

// --- CONFIGURATION ANALYTICS ---
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // --- LIENS SELLFY (À METTRE À JOUR) ---
  const LINKS = {
    EBOOK_SHOP: "https://lerenardturf.sellfy.store/p/les-secrets-des-turfistes-avertis/",
    SUBSCRIPTION: "https://lerenardturf.sellfy.store/p/abonnement-mensuel-1990/",
    FREE_QUINTE: "https://lerenardturf.sellfy.store/p/analyse-complete-du-jour/", // <-- METS TON LIEN DU QUINTÉ GRATUIT ICI
    COUPS_SURS_2EUR: "https://lerenardturf.sellfy.store/p/essai-quinte-2/" // <-- METS TON LIEN DES COUPS SURS A 2€ ICI
  };

  useEffect(() => {
    initGA('G-EY4386K4P1');
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const stats = [
    { label: "Vues YouTube", value: "650 000+", icon: <TrendingUp className="w-5 h-5 text-orange-600" /> },
    { label: "Abonnés", value: "1 900+", icon: <Users className="w-5 h-5 text-orange-600" /> },
    { label: "ROI Global", value: "+51.5%", icon: <Target className="w-5 h-5 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* --- POP-UP CAPTURE EMAIL --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl border-4 border-orange-500">
            <button 
              onClick={() => setShowPopup(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <Gift size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2 text-slate-900">Cadeau de Bienvenue</h3>
              <p className="text-slate-600 mb-6 font-medium">
                Arrêtez de perdre votre argent bêtement. Téléchargez gratuitement ma méthode de <strong>Gestion de Bankroll</strong>.
              </p>
              <a 
                href={LINKS.FREE_BANKROLL} 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black uppercase py-4 rounded-xl shadow-lg shadow-orange-600/30 transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                TÉLÉCHARGER LE GUIDE <ArrowRight size={18} />
              </a>
              <button 
                onClick={() => setShowPopup(false)}
                className="mt-4 text-xs text-slate-400 underline decoration-slate-300"
              >
                Non merci, je préfère parier au hasard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-white py-4 border-b border-slate-100'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 text-white font-bold">
               <Zap className="fill-current w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic leading-none">RENARD<span className="text-orange-600">TURF</span></span>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-sm">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href={LINKS.SUBSCRIPTION} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-800 group">
                <div className="w-12 h-12 bg-yellow-400 text-slate-900 rounded-2xl flex items-center justify-center mb-4"><Crown /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2 text-yellow-400">ACCÈS VIP <ExternalLink size={14}/></span>
              </a>
              <a href={LINKS.FREE_QUINTE} target="_blank" rel="noreferrer" className="flex flex-col p-6 rounded-[2rem] bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 group">
                <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center mb-4"><Download /></div>
                <span className="font-black uppercase italic text-sm flex items-center gap-2">QUINTÉ GRATUIT <ExternalLink size={14}/></span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION : QUINTÉ GRATUIT --- */}
      <section className="pt-32 pb-16 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-slate-900 to-slate-900 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full mb-6 font-black uppercase text-xs tracking-widest border border-orange-500/30">
            <Download size={14} /> 100% GRATUIT AUJOURD'HUI
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none max-w-4xl mx-auto">
            MON ANALYSE DU QUINTÉ <span className="text-orange-500">OFFERTE</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Le Quinté est la course la plus dure. J'ai récupéré l'avis des entraîneurs et analysé la data. Je vous offre la fiche complète du jour.
          </p>

          <a 
            href={LINKS.FREE_QUINTE} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-xl font-black text-xl uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:scale-105 items-center gap-3"
          >
            TÉLÉCHARGER LE PDF (0€) <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className="bg-white border-y border-slate-200 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-2 p-3 bg-orange-50 rounded-full">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREUVE DE RÉSULTATS (BILAN FINANCIER) --- */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-6">
              LE TURF N'EST PAS UN JEU.<br/>
              C'EST UN <span className="text-orange-600">INVESTISSEMENT</span>.
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Je ne promets pas de gagner le Quinté à 100 000€ par magie. 
              Je vise la régularité et le profit net sur le long terme. Les chiffres ne mentent pas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 font-bold text-[10px] uppercase px-4 py-2 rounded-bl-xl">Bilan Certifié 2 ans</div>
               <h3 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-2">
                 <Banknote className="text-orange-600" /> Mon Bilan Financier
               </h3>
               <div className="space-y-6">
                 <div className="flex justify-between items-end border-b border-slate-200 pb-4">
                   <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Somme Jouée</span>
                   <span className="text-2xl font-black text-slate-900">1 230,00 €</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-slate-200 pb-4">
                   <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Gains Totaux</span>
                   <span className="text-2xl font-black text-slate-900">1 862,92 €</span>
                 </div>
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex justify-between items-center">
                   <span className="text-green-800 font-black uppercase text-sm tracking-widest">PROFIT NET</span>
                   <span className="text-4xl font-black text-green-600">+632,92 €</span>
                 </div>
               </div>
               <p className="mt-6 text-xs text-slate-400 italic text-center">
                 "Ma stratégie n'est pas de gagner gros d'un coup, mais un petit peu, très souvent."
               </p>
            </div>

            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent" />
              <h3 className="text-2xl font-black uppercase italic mb-8 relative z-10">
                VS Livret A (1,7%)
              </h3>
              <div className="space-y-8 relative z-10">
                <div>
                   <p className="text-slate-400 text-sm mb-2">Intérêts estimés sur Livret A (2 ans) :</p>
                   <div className="text-3xl font-bold text-slate-500 line-through decoration-red-500">45,00 €</div>
                </div>
                <div>
                   <p className="text-orange-200 text-sm mb-2 font-bold">Rendement CLUB RENARD :</p>
                   <div className="text-5xl md:text-6xl font-black text-yellow-400">+51,5 %</div>
                   <div className="text-sm font-bold text-green-400 mt-2 flex items-center gap-2">
                     <TrendingUp size={16} /> 15 FOIS PLUS QUE LA BANQUE
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION MÉTHODE & PHILOSOPHIE --- */}
      <section className="py-20 px-6 bg-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-10">
            
            {/* Colonne Philosophie */}
            <div className="flex-1 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-6">
                <BrainCircuit size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Ma Philosophie</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase text-slate-900 mb-6">"Encaisser 5€ tous les jours"</h3>
              <blockquote className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-orange-500 pl-4 mb-6">
                "Dans le turf, beaucoup rêvent du ticket à 10 000€... Ce n'est pas ma vision. 
                Je préfère encaisser 5€ tous les jours plutôt qu'espérer un gain qui ne tombera peut-être jamais. 
                La régularité n'est pas un hasard, elle repose sur l'analyse."
              </blockquote>
            </div>

            {/* Colonne Bankroll */}
            <div className="flex-1 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-1.5 rounded-full mb-6">
                <Scale size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Money Management</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase text-slate-900 mb-6">La Règle d'Or des 1%</h3>
              <p className="text-slate-600 mb-6 font-medium">
                Votre "Bankroll", c'est votre capital de guerre. Si vous misez 20€ sur un "coup sûr" et que le cheval tombe, vous perdez 20% de votre entreprise.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-orange-600"/> Mise Standard : 1% à 2%
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-orange-600"/> Mise Confiance : 5% MAX
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION APPEL À L'ACTION : COUPS SÛRS À 2€ --- */}
      <section className="py-16 px-6 bg-orange-600 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-orange-600 to-orange-700"></div>
         
         <div className="container mx-auto max-w-4xl text-center relative z-10 text-white">
           <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full mb-6 font-black uppercase text-xs tracking-widest">
             <Target size={14} /> Le vrai bénéfice est ailleurs
           </div>
           
           <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
             LE QUINTÉ EST UNE LOTERIE.<br/>
             DÉBLOQUEZ MES COUPS SÛRS.
           </h2>
           
           <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto font-medium">
             J'ai épluché toutes les courses du jour pour vous. Je n'ai gardé que les courses de plat à 8 partants où vos chances de victoire montent à 37,5%.
           </p>
           
           <div className="flex flex-col items-center">
             <a 
               href={LINKS.COUPS_SURS_2EUR}
               target="_blank" 
               rel="noreferrer"
               className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl md:text-2xl uppercase tracking-wider transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 hover:bg-slate-50 flex items-center gap-3"
             >
               MES COUPS SÛRS DU JOUR (2€) <Zap className="fill-current" size={24} />
             </a>
             <p className="mt-4 text-white/80 text-sm font-medium italic">Téléchargement immédiat. Réservé aux parieurs intelligents.</p>
           </div>
         </div>
      </section>

      {/* --- SECTION ABONNEMENT VIP NOUVELLE FORMULE --- */}
      <section id="subscription-promo" className="py-20 px-6 bg-slate-50 text-slate-900 flex flex-col items-center border-t border-slate-200">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-6">
            <Crown className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Offre Premium</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase italic tracking-tighter leading-none">
            REJOIGNEZ LE <span className="text-orange-600">CLUB VIP</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:border-orange-200 transition-all">
                <div>
                  <h3 className="text-xl font-black uppercase italic mb-4 text-slate-400">Club Renard (Hebdo)</h3>
                  <div className="text-3xl font-black text-slate-900 mb-6">5,00 € <span className="text-sm font-medium text-slate-400">/semaine</span></div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm font-medium text-slate-600"><CheckCircle2 className="w-4 h-4 text-orange-600" /> Les Coups Sûrs Quotidiens</li>
                    <li className="flex items-center gap-2 text-sm font-medium text-slate-600"><CheckCircle2 className="w-4 h-4 text-orange-600" /> Sans engagement</li>
                  </ul>
                </div>
                <a href={LINKS.SUBSCRIPTION} className="w-full block bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-black text-center uppercase text-sm transition-all">
                  Essayer 1 semaine
                </a>
             </div>

             <div className="bg-slate-900 p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden transform md:scale-105 border-4 border-orange-500">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg">Le Choix de l'Investisseur</div>
                <div>
                  <h3 className="text-xl font-black uppercase italic mb-4 text-yellow-400">Club VIP Mensuel</h3>
                  <div className="text-3xl font-black text-white mb-6">19,90 € <span className="text-sm font-medium text-slate-400">/mois</span></div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                      <Mail className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 
                      <span><strong>Confort Total :</strong> Quinté + Coups Sûrs envoyés automatiquement par email la veille.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                      <BookOpen className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 
                      <span><strong>Cadeau Inclus :</strong> Le Guide du Renard offert (Valeur 9,90€).</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                      <Zap className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> 
                      <span>L'accès à la vraie rentabilité chaque jour.</span>
                    </li>
                  </ul>
                </div>
                <a href={LINKS.SUBSCRIPTION} className="w-full block bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-black text-center uppercase text-lg transition-all shadow-lg shadow-orange-600/30">
                  S'abonner Maintenant
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 text-center px-6 flex flex-col items-center">
        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic block mb-8">RENARD<span className="text-orange-600">TURF</span></span>
        
        <div className="bg-yellow-400 text-slate-900 p-4 rounded-xl max-w-4xl mx-auto mb-8 w-full font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row items-center justify-center gap-4 shadow-sm">
           <span>🔞 INTERDIT AUX MOINS DE 18 ANS</span>
           <span className="hidden md:block text-yellow-600">|</span>
           <span>JOUEZ AVEC MODÉRATION : 09 74 75 13 13</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <button onClick={() => setActiveLegalModal('mentions')}>Mentions Légales</button>
           <button onClick={() => setActiveLegalModal('gaming')}>Jeu Responsable</button>
        </div>

        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] text-center italic">
          © 2026 RENARD TURF - DATA & ANALYSE
        </p>

        {activeLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 relative text-left shadow-2xl">
              <button onClick={() => setActiveLegalModal(null)} className="absolute top-6 right-6 font-black uppercase text-xs hover:text-orange-600">Fermer [X]</button>
              {activeLegalModal === 'mentions' ? (
                <>
                  <h3 className="text-2xl font-black uppercase italic mb-6">Mentions Légales</h3>
                  <div className="text-slate-500 text-xs leading-relaxed italic space-y-4">
                    <p>RenardTurf est un média indépendant d'analyse hippique. Nous ne sommes pas un opérateur de jeux.</p>
                    <p>Les liens vers les opérateurs de jeux sont des liens d'affiliation. Jouer comporte des risques : endettement, isolement, dépendance.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-black uppercase italic mb-6">Jeu Responsable</h3>
                  <p className="text-slate-500 text-xs leading-relaxed italic">Jouez avec modération. Le jeu doit rester un plaisir. Si vous sentez que vous perdez le contrôle, contactez Joueurs Info Service au 09 74 75 13 13.</p>
                </>
              )}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default App;
