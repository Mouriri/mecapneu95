// Base de données des dimensions populaires et estimation de tarifs indicatifs
const PNEU_POPULAR_SIZES = [
    { width: 175, height: 65, diameter: 14, popular: true, usedPrice: 25, newPriceFrom: 45 },
    { width: 185, height: 60, diameter: 15, popular: true, usedPrice: 28, newPriceFrom: 49 },
    { width: 185, height: 65, diameter: 15, popular: true, usedPrice: 30, newPriceFrom: 52 },
    { width: 195, height: 65, diameter: 15, popular: true, usedPrice: 30, newPriceFrom: 54 },
    { width: 195, height: 55, diameter: 16, popular: true, usedPrice: 35, newPriceFrom: 62 },
    { width: 205, height: 55, diameter: 16, popular: true, usedPrice: 35, newPriceFrom: 59 },
    { width: 205, height: 60, diameter: 16, popular: true, usedPrice: 38, newPriceFrom: 65 },
    { width: 215, height: 55, diameter: 16, popular: true, usedPrice: 40, newPriceFrom: 69 },
    { width: 215, height: 60, diameter: 16, popular: true, usedPrice: 42, newPriceFrom: 72 },
    { width: 215, height: 65, diameter: 16, popular: true, usedPrice: 45, newPriceFrom: 75 },
    { width: 205, height: 50, diameter: 17, popular: true, usedPrice: 40, newPriceFrom: 75 },
    { width: 215, height: 50, diameter: 17, popular: true, usedPrice: 45, newPriceFrom: 79 },
    { width: 215, height: 55, diameter: 17, popular: true, usedPrice: 45, newPriceFrom: 82 },
    { width: 225, height: 45, diameter: 17, popular: true, usedPrice: 42, newPriceFrom: 74 },
    { width: 225, height: 50, diameter: 17, popular: true, usedPrice: 45, newPriceFrom: 85 },
    { width: 225, height: 40, diameter: 18, popular: true, usedPrice: 48, newPriceFrom: 89 },
    { width: 225, height: 45, diameter: 18, popular: true, usedPrice: 50, newPriceFrom: 92 },
    { width: 235, height: 40, diameter: 18, popular: true, usedPrice: 52, newPriceFrom: 95 },
    { width: 235, height: 45, diameter: 18, popular: true, usedPrice: 52, newPriceFrom: 96 },
    { width: 245, height: 40, diameter: 18, popular: true, usedPrice: 55, newPriceFrom: 105 },
    { width: 225, height: 40, diameter: 19, popular: true, usedPrice: 58, newPriceFrom: 110 },
    { width: 235, height: 35, diameter: 19, popular: true, usedPrice: 60, newPriceFrom: 115 },
    { width: 245, height: 45, diameter: 19, popular: true, usedPrice: 65, newPriceFrom: 125 },
    { width: 255, height: 35, diameter: 19, popular: true, usedPrice: 68, newPriceFrom: 130 },
    { width: 255, height: 50, diameter: 19, popular: true, usedPrice: 69, newPriceFrom: 135 },
    { width: 275, height: 40, diameter: 20, popular: true, usedPrice: 79, newPriceFrom: 155 }
];

const SERVICE_PRICES = {
    montage: {
        title: "Montage & Équilibrage Pneu",
        unitPrice: 15,
        desc: "Montage, valvage et équilibrage haute précision par pneu"
    },
    reparation: {
        title: "Réparation Crevaison (Mèche / Champignon)",
        unitPrice: 15,
        desc: "Démontage, contrôle d'étanchéité, réparation garantie et gonflage"
    },
    geometrie: {
        title: "Géométrie / Parallélisme",
        unitPrice: 50,
        desc: "Réglage complet du train avant au banc laser haute précision"
    },
    vidange: {
        title: "Forfait Vidange & Filtre à Huile",
        unitPrice: 69,
        desc: "Huile synthétique homologuée constructeur + remplacement filtre à huile + 25 points de contrôle"
    },
    freinage: {
        title: "Plaquettes de Frein (Pose)",
        unitPrice: 40,
        desc: "Remplacement plaquettes de frein avant ou arrière (hors pièces)"
    },
    disquesFrein: {
        title: "Disques + Plaquettes de Frein (Pose)",
        unitPrice: 70,
        desc: "Remplacement complet disques + plaquettes (hors pièces)"
    },
    diagnostic: {
        title: "Diagnostic Électronique Valise",
        unitPrice: 30,
        desc: "Passage à la valise de diagnostic multimarques + lecture & effacement des codes défauts"
    },
    batterie: {
        title: "Contrôle & Remplacement Batterie",
        unitPrice: 20,
        desc: "Test du circuit de charge et pose de votre nouvelle batterie"
    }
};

const BRANDS = [
    { name: "Michelin", logo: "michelin", desc: "Performance & Longévité" },
    { name: "Continental", logo: "continental", desc: "Sécurité & Précision" },
    { name: "Bridgestone", logo: "bridgestone", desc: "Technologie Japonaise" },
    { name: "Pirelli", logo: "pirelli", desc: "Excellence Sport & Confort" },
    { name: "Goodyear", logo: "goodyear", desc: "Adhérence toutes saisons" },
    { name: "Hankook", logo: "hankook", desc: "Excellent rapport qualité/prix" },
    { name: "Dunlop", logo: "dunlop", desc: "Sportivité & Dynamisme" },
    { name: "Uniroyal", logo: "uniroyal", desc: "L'expert de la pluie" }
];

const REVIEWS_DATA = [
    {
        name: "Sofiane B.",
        date: "Il y a 2 semaines",
        rating: 5,
        comment: "Excellent accueil d'Aymen et Khalid ! Pneus montés en 15 minutes chrono sans rendez-vous. Tarif imbattable pour des pneus d'occasion en parfait état (on dirait des neufs). Je recommande les yeux fermés !",
        service: "Montage 2 pneus avant + équilibrage"
    },
    {
        name: "David M.",
        date: "Il y a 1 mois",
        rating: 5,
        comment: "Je suis venu un dimanche après-midi pour une crevaison sur la route. Garage ouvert le dimanche, c'est exceptionnel dans le 95 ! Réparé rapidement et avec le sourire. Merci pour votre professionnalisme !",
        service: "Réparation crevaison d'urgence"
    },
    {
        name: "Karim L.",
        date: "Il y a 3 semaines",
        rating: 5,
        comment: "4 pneus Michelin neufs montés et équilibrés au top. Très arrangeants, rapides et honnêtes sur les prix. Le patron et son équipe sont très sympas et compétents. C'est devenu mon garage de référence.",
        service: "Pack 4 pneus neufs Michelin"
    },
    {
        name: "Sarah T.",
        date: "Il y a 1 mois",
        rating: 5,
        comment: "Remplacement de mes plaquettes de frein et 2 pneus arrière. Prix très raisonnable, travail soigné et rapide. On peut attendre confortablement. Je reviendrai sans hésiter !",
        service: "Pneus + Plaquettes de frein"
    },
    {
        name: "Mohamed R.",
        date: "Il y a 2 mois",
        rating: 5,
        comment: "Super service, stock impressionnant de pneus toutes dimensions même pour mon SUV en 19 pouces. Équilibrage parfait sans aucune vibration sur autoroute. Bravo l'équipe Meca Pneu 95 !",
        service: "4 Pneus SUV 19 pouces"
    },
    {
        name: "Alexandre P.",
        date: "Il y a 2 mois",
        rating: 5,
        comment: "Vidange et changement de 2 pneus effectués sans prise de tête. Disponibles 7 jours sur 7 avec une équipe dynamique. Meilleur rapport qualité/prix du Val-d'Oise.",
        service: "Vidange + Pneus"
    }
];
