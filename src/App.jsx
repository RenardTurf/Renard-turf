import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard'; // L'outil pour le presse-papier

export default function CarteBonPlan() {
  // Les données simulées de ta future base de données
  const deal = {
    nom: "AirPods Pro 2",
    prixInitial: "279€",
    prixAlerte: "199€",
    codePromo: "APPLE20",
    lienMarchand: "https://www.amazon.fr/..." // Ton lien d'affiliation
  };

  // La fonction magique qui s'active au clic
  const activerLeDeal = async () => {
    // 1. L'application copie silencieusement le code promo
    await Clipboard.setStringAsync(deal.codePromo);
    
    // 2. On prévient l'utilisateur avec un petit message
    Alert.alert(
      "Code copié ! ✂️",
      `Le code ${deal.codePromo} est dans votre presse-papier. Pensez à le coller au moment de payer !`,
      [
        { 
          text: "Aller vers l'offre", 
          // 3. On ouvre le site marchand
          onPress: () => Linking.openURL(deal.lienMarchand) 
        }
      ]
    );
  };

  return (
    <View style={styles.carte}>
      <Text style={styles.titre}>{deal.nom}</Text>
      <Text style={styles.prixBarre}>{deal.prixInitial}</Text>
      <Text style={styles.prixNouveau}>{deal.prixAlerte}</Text>
      
      {/* Le bouton que l'utilisateur va cliquer */}
      <TouchableOpacity style={styles.bouton} onPress={activerLeDeal}>
        <Text style={styles.texteBouton}>Profiter de l'offre</Text>
      </TouchableOpacity>
    </View>
  );
}

// Un peu de design pour que ça soit joli
const styles = StyleSheet.create({
  carte: { padding: 20, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1 },
  titre: { fontSize: 18, fontWeight: 'bold' },
  prixBarre: { textDecorationLine: 'line-through', color: 'gray' },
  prixNouveau: { fontSize: 24, color: 'green', fontWeight: 'bold', marginVertical: 10 },
  bouton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  texteBouton: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
