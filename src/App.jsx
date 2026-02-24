import React from 'react';

const ShutdownPage = () => {
  // Styles intégrés pour faciliter l'intégration sans dépendances CSS externes.
  // Tu peux adapter les couleurs si besoin.
  const styles = {
    container: {
      backgroundColor: '#1a202c', // Fond sombre style "turf nocturne"
      color: '#e2e8f0', // Texte clair
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    card: {
      backgroundColor: '#2d3748', // Carte légèrement plus claire
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      maxWidth: '600px',
      width: '100%',
      borderTop: '6px solid #10b981', // La touche verte "Vert Renard"
      borderBottom: '6px solid #10b981',
    },
    iconContainer: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2.25rem',
      marginBottom: '0.5rem',
      fontWeight: '800',
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    subtitle: {
       fontSize: '1.25rem',
       color: '#a0aec0',
       marginBottom: '2rem',
       fontWeight: '500',
    },
    divider: {
        height: '2px',
        backgroundColor: '#4a5568',
        width: '50%',
        margin: '0 auto 2rem auto',
    },
    bodyText: {
       fontSize: '1.05rem',
       lineHeight: '1.7',
       color: '#cbd5e0',
    },
    paragraph: {
        marginBottom: '1.5rem',
    },
    highlight: {
        color: '#10b981',
        fontWeight: 'bold',
    },
    importantNote: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        fontStyle: 'italic',
        borderLeft: '4px solid #10b981',
    },
    footer: {
        marginTop: '4rem',
        fontSize: '0.85rem',
        color: '#718096',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          🏁
        </div>
        <h1 style={styles.title}>Clap de fin</h1>
        <h2 style={styles.subtitle}>L'aventure Renard Turf s'arrête ici.</h2>
        
        <div style={styles.divider}></div>

        <div style={styles.bodyText}>
          <p style={styles.paragraph}>
            Après avoir analysé des centaines de courses, décortiqué les performances et partagé notre passion pour l'analyse hippique pointue, le moment est venu de fermer les portes du site.
          </p>
          <p style={styles.paragraph}>
            Ce fut une immense fierté de développer des outils comme le <span style={styles.highlight}>RPI (Renard Pro Index)</span> et la Méthode Renard 4.0 à vos côtés.
          </p>
          <p style={styles.paragraph}>
            Un merci gigantesque à toute la communauté, aux lecteurs fidèles et tout particulièrement à nos <span style={styles.highlight}>membres VIP</span> pour votre confiance et votre engagement tout au long de ce parcours.
          </p>

          <div style={styles.importantNote}>
            ℹ️ <strong>Note aux abonnés :</strong> Le service est désormais clos. Tous les prélèvements automatiques ont été définitivement stoppés.
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
         © 2023-{new Date().getFullYear()} Renard Turf. Terminé, mais la passion des courses reste.
      </footer>
    </div>
  );
};

export default ShutdownPage;
