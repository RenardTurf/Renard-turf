import React from 'react';
// Ajout de SafeAreaView pour éviter que ça se cache sous l'heure/batterie
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, SafeAreaView } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() { // Renommé en App pour être lu par défaut
  
  const deal = {
    nom: "AirPods Pro 2",
    prixInitial: "279€",
    prixAlerte: "199€",
    codePromo: "APPLE20",
    lienMarchand: "https://www.amazon.fr" // L'URL est maintenant valide
  };

  const activerLeDeal = async () => {
    try {
      // 1. Copie du code
      await Clipboard.setStringAsync(deal.codePromo);
      
      // 2. Alerte avec bouton d'action
      Alert.alert(
        "Code copié ! ✂️",
        `Le code ${deal.codePromo} est dans votre presse-papier.`,
        [
          { text: "Annuler", style: "cancel" }, // Toujours bien de laisser le choix
          { 
            text: "Aller vers l'offre", 
            onPress: () => Linking.openURL(deal.lienMarchand) 
          }
        ]
      );
    } catch (error) {
      console.error("Erreur de copie :", error);
    }
  };

  return (
    <SafeAreaView style={styles.fondEcran}>
      <View style={styles.carte}>
        <Text style={styles.titre}>{deal.nom}</Text>
        <Text style={styles.prixBarre}>{deal.prixInitial}</Text>
        <Text style={styles.prixNouveau}>{deal.prixAlerte}</Text>
        
        <TouchableOpacity style={styles.bouton} onPress={activerLeDeal}>
          <Text style={styles.texteBouton}>Profiter de l'offre</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondEcran: {
    flex: 1,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center',     // Centre horizontalement
    backgroundColor: '#F0F0F5', // Un petit fond gris clair
  },
  carte: { 
    width: '85%', // La carte prend 85% de la largeur de l'écran
    padding: 20, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    // Ombre pour iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 4, 
  },
  titre: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  prixBarre: { textDecorationLine: 'line-through', color: '#888', marginTop: 5, fontSize: 16 },
  prixNouveau: { fontSize: 28, color: '#27AE60', fontWeight: 'bold', marginVertical: 10 },
  bouton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  texteBouton: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
