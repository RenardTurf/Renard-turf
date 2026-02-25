import React from 'react';

export default function App() {
  const deal = {
    nom: "AirPods Pro 2",
    prixInitial: "279€",
    prixAlerte: "199€",
    codePromo: "APPLE20",
    lienMarchand: "https://www.amazon.fr"
  };

  const activerLeDeal = async () => {
    try {
      // 1. Copie du code (Version Web)
      await navigator.clipboard.writeText(deal.codePromo);
      
      // 2. Alerte simple (Version Web)
      alert(`Code copié ! ✂️\nLe code ${deal.codePromo} est dans votre presse-papier. Pensez à le coller au moment du paiement.`);
      
      // 3. Ouverture du lien dans un nouvel onglet
      window.open(deal.lienMarchand, '_blank');
    } catch (error) {
      console.error("Erreur de copie :", error);
      // Fallback si le navigateur bloque la copie
      window.open(deal.lienMarchand, '_blank');
    }
  };

  return (
    <div style={styles.fondEcran}>
      <div style={styles.carte}>
        <h2 style={styles.titre}>{deal.nom}</h2>
        <p style={styles.prixBarre}>{deal.prixInitial}</p>
        <p style={styles.prixNouveau}>{deal.prixAlerte}</p>
        
        <button style={styles.bouton} onClick={activerLeDeal}>
          Profiter de l'offre
        </button>
      </div>
    </div>
  );
}

// Le design traduit en CSS pour le Web
const styles = {
  fondEcran: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F0F0F5',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  carte: { 
    width: '300px',
    padding: '20px', 
    backgroundColor: '#fff', 
    borderRadius: '15px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  titre: { fontSize: '20px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' },
  prixBarre: { textDecoration: 'line-through', color: '#888', margin: '0', fontSize: '16px' },
  prixNouveau: { fontSize: '28px', color: '#27AE60', fontWeight: 'bold', margin: '10px 0' },
  bouton: { 
    backgroundColor: '#007AFF', 
    color: 'white', 
    padding: '15px', 
    borderRadius: '10px', 
    border: 'none',
    fontWeight: 'bold', 
    fontSize: '16px',
    width: '100%',
    cursor: 'pointer',
    marginTop: '10px'
  }
};
