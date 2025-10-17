// Données d'exemple pour les questions QCM

import { Question } from '../types';

export const sampleQuestions: Question[] = [
  // Questions Histoire
  {
    id: 'q001',
    category: 'histoire',
    difficulty: 'facile',
    question: 'En quelle année a eu lieu la Révolution française ?',
    options: ['1789', '1799', '1804', '1815'],
    correctAnswer: 0,
    explanation:
      "La Révolution française a débuté en 1789 avec la prise de la Bastille le 14 juillet. Cette date symbolise la fin de l'Ancien Régime.",
    source: 'Livret du citoyen, p. 12',
    examType: 'both',
    tags: ['révolution', '1789', 'bastille', 'histoire'],
  },
  {
    id: 'q002',
    category: 'histoire',
    difficulty: 'moyen',
    question: 'Quel événement marque le début de la Révolution française ?',
    options: [
      'La prise de la Bastille',
      "La Déclaration des Droits de l'Homme",
      "L'exécution de Louis XVI",
      'Le serment du Jeu de Paume',
    ],
    correctAnswer: 0,
    explanation:
      "La prise de la Bastille le 14 juillet 1789 est considérée comme l'événement fondateur de la Révolution française.",
    source: 'Livret du citoyen, p. 13',
    examType: 'both',
    tags: ['révolution', 'bastille', '1789', 'histoire'],
  },
  {
    id: 'q003',
    category: 'histoire',
    difficulty: 'difficile',
    question: 'Quelle déclaration a été adoptée le 26 août 1789 ?',
    options: [
      "Déclaration des Droits de l'Homme et du Citoyen",
      "Déclaration d'Indépendance",
      'Déclaration des Droits de la Femme',
      "Déclaration Universelle des Droits de l'Homme",
    ],
    correctAnswer: 0,
    explanation:
      "La Déclaration des Droits de l'Homme et du Citoyen, adoptée le 26 août 1789, énonce les droits fondamentaux de l'homme.",
    source: 'Livret du citoyen, p. 14',
    examType: 'both',
    tags: ['déclaration', 'droits', 'homme', 'citoyen', 'histoire'],
  },
  {
    id: 'q004',
    category: 'histoire',
    difficulty: 'moyen',
    question: 'Qui a créé le Code civil en 1804 ?',
    options: [
      'Napoléon Bonaparte',
      'Louis XVI',
      'Robespierre',
      'Louis-Philippe',
    ],
    correctAnswer: 0,
    explanation:
      "Napoléon Bonaparte a créé le Code civil en 1804, qui reste encore aujourd'hui la base du droit civil français.",
    source: 'Livret du citoyen, p. 18',
    examType: 'both',
    tags: ['napoléon', 'code civil', '1804', 'histoire'],
  },
  {
    id: 'q005',
    category: 'histoire',
    difficulty: 'facile',
    question: 'En quelle année Napoléon Bonaparte est-il devenu empereur ?',
    options: ['1804', '1799', '1815', '1821'],
    correctAnswer: 0,
    explanation:
      "Napoléon Bonaparte s'est proclamé empereur des Français le 2 décembre 1804.",
    source: 'Livret du citoyen, p. 19',
  },
  {
    id: 'q006',
    category: 'histoire',
    difficulty: 'moyen',
    question: "Quelle bataille a marqué la fin de l'Empire napoléonien ?",
    options: [
      'Bataille de Waterloo',
      "Bataille d'Austerlitz",
      'Bataille de Leipzig',
      'Bataille de Borodino',
    ],
    correctAnswer: 0,
    explanation:
      "La bataille de Waterloo le 18 juin 1815 a marqué la défaite définitive de Napoléon et la fin de l'Empire.",
    source: 'Livret du citoyen, p. 20',
  },

  // Questions Institutions
  {
    id: 'q007',
    category: 'institutions',
    difficulty: 'facile',
    question: 'Quel est le rôle du Président de la République ?',
    options: [
      "Chef de l'État",
      'Chef du gouvernement',
      'Président du Sénat',
      'Ministre de la Justice',
    ],
    correctAnswer: 0,
    explanation:
      "Le Président de la République est le chef de l'État français et garantit la continuité des institutions.",
    source: 'Constitution de 1958, article 5',
  },
  {
    id: 'q008',
    category: 'institutions',
    difficulty: 'moyen',
    question:
      'Depuis quand le Président de la République est-il élu au suffrage universel direct ?',
    options: ['1962', '1958', '1974', '1981'],
    correctAnswer: 0,
    explanation:
      "La révision constitutionnelle de 1962 a instauré l'élection du Président au suffrage universel direct.",
    source: 'Constitution de 1958, article 6',
  },
  {
    id: 'q009',
    category: 'institutions',
    difficulty: 'difficile',
    question: 'Quelle est la durée du mandat présidentiel depuis 2002 ?',
    options: ['5 ans', '7 ans', '4 ans', '6 ans'],
    correctAnswer: 0,
    explanation:
      'Depuis la révision constitutionnelle de 2002, le mandat présidentiel est de 5 ans (quinquennat).',
    source: 'Constitution de 1958, article 6',
  },
  {
    id: 'q010',
    category: 'institutions',
    difficulty: 'facile',
    question: "Combien y a-t-il de députés à l'Assemblée nationale ?",
    options: ['577', '348', '100', '500'],
    correctAnswer: 0,
    explanation:
      "L'Assemblée nationale compte 577 députés élus au suffrage universel direct.",
    source: 'Constitution de 1958, article 24',
  },
  {
    id: 'q011',
    category: 'institutions',
    difficulty: 'moyen',
    question: "Qui peut dissoudre l'Assemblée nationale ?",
    options: [
      'Le Président de la République',
      'Le Premier ministre',
      'Le Président du Sénat',
      'Le Conseil constitutionnel',
    ],
    correctAnswer: 0,
    explanation:
      "Le Président de la République peut dissoudre l'Assemblée nationale selon l'article 12 de la Constitution.",
    source: 'Constitution de 1958, article 12',
  },
  {
    id: 'q012',
    category: 'institutions',
    difficulty: 'difficile',
    question: "Quel est le mode d'élection des sénateurs ?",
    options: [
      'Collège électoral',
      'Suffrage universel direct',
      'Tirage au sort',
      'Nomination présidentielle',
    ],
    correctAnswer: 0,
    explanation:
      'Les sénateurs sont élus par un collège électoral composé de députés, conseillers régionaux, départementaux et municipaux.',
    source: 'Constitution de 1958, article 24',
  },

  // Questions Valeurs
  {
    id: 'q013',
    category: 'valeurs',
    difficulty: 'facile',
    question: 'Quelle est la devise de la République française ?',
    options: [
      'Liberté, Égalité, Fraternité',
      'Travail, Famille, Patrie',
      'Union, Force, Justice',
      'Paix, Justice, Liberté',
    ],
    correctAnswer: 0,
    explanation:
      'La devise officielle de la République française est "Liberté, Égalité, Fraternité" depuis 1848.',
    source: 'Constitution de 1958, article 2',
  },
  {
    id: 'q014',
    category: 'valeurs',
    difficulty: 'moyen',
    question:
      'Depuis quand "Liberté, Égalité, Fraternité" est-elle la devise officielle ?',
    options: ['1848', '1789', '1870', '1958'],
    correctAnswer: 0,
    explanation:
      'La devise "Liberté, Égalité, Fraternité" est devenue officielle en 1848 lors de la IIe République.',
    source: 'Constitution de 1958, article 2',
  },
  {
    id: 'q015',
    category: 'valeurs',
    difficulty: 'difficile',
    question: 'Quel principe garantit la liberté de conscience ?',
    options: [
      'La laïcité',
      'La démocratie',
      'La séparation des pouvoirs',
      "L'égalité",
    ],
    correctAnswer: 0,
    explanation:
      "La laïcité garantit la liberté de conscience et l'égalité de tous devant la loi, sans distinction de religion.",
    source: 'Constitution de 1958, article 1',
  },
  {
    id: 'q016',
    category: 'valeurs',
    difficulty: 'facile',
    question: "Quelle loi a instauré la séparation des Églises et de l'État ?",
    options: ['Loi de 1905', 'Loi de 1881', 'Loi de 1901', 'Loi de 1919'],
    correctAnswer: 0,
    explanation:
      "La loi du 9 décembre 1905 a instauré la séparation des Églises et de l'État.",
    source: 'Loi du 9 décembre 1905',
  },
  {
    id: 'q017',
    category: 'valeurs',
    difficulty: 'moyen',
    question: "Dans quelles régions la loi de 1905 ne s'applique-t-elle pas ?",
    options: ['Alsace-Moselle', 'Corse', 'Bretagne', 'Pays basque'],
    correctAnswer: 0,
    explanation:
      "En Alsace-Moselle, le concordat de 1801 est toujours en vigueur, la loi de 1905 ne s'y applique pas.",
    source: "Statut particulier d'Alsace-Moselle",
  },
  {
    id: 'q018',
    category: 'valeurs',
    difficulty: 'difficile',
    question:
      "Quel principe garantit la neutralité de l'État en matière religieuse ?",
    options: [
      'La laïcité',
      'La tolérance',
      'La liberté religieuse',
      "L'égalité",
    ],
    correctAnswer: 0,
    explanation:
      "La laïcité garantit la neutralité de l'État et des services publics en matière religieuse.",
    source: 'Constitution de 1958, article 1',
  },

  // Questions Droits et Devoirs
  {
    id: 'q019',
    category: 'droits-devoirs',
    difficulty: 'facile',
    question: 'Quel est un droit fondamental du citoyen ?',
    options: [
      'Le droit de vote',
      'Le devoir de payer des impôts',
      "L'obligation de faire son service militaire",
      'Le devoir de respecter la loi',
    ],
    correctAnswer: 0,
    explanation:
      'Le droit de vote est un droit fondamental du citoyen français.',
    source: 'Constitution de 1958, article 3',
  },
  {
    id: 'q020',
    category: 'droits-devoirs',
    difficulty: 'moyen',
    question: 'À partir de quel âge peut-on voter en France ?',
    options: ['18 ans', '16 ans', '21 ans', '20 ans'],
    correctAnswer: 0,
    explanation: "L'âge légal pour voter en France est de 18 ans.",
    source: 'Code électoral, article L1',
  },
  {
    id: 'q021',
    category: 'droits-devoirs',
    difficulty: 'difficile',
    question: 'Quel est un devoir du citoyen français ?',
    options: [
      'Payer ses impôts',
      'Exercer son droit de vote',
      'Manifester ses opinions',
      'Créer une association',
    ],
    correctAnswer: 0,
    explanation:
      'Payer ses impôts est un devoir du citoyen français, contribuant au financement des services publics.',
    source: 'Constitution de 1958, article 13',
  },
  {
    id: 'q022',
    category: 'droits-devoirs',
    difficulty: 'facile',
    question: 'Quel est le principe de base de la citoyenneté ?',
    options: [
      'Respecter la loi',
      'Exercer ses droits',
      'Participer aux élections',
      'Défendre ses opinions',
    ],
    correctAnswer: 0,
    explanation: 'Respecter la loi est le principe de base de la citoyenneté.',
    source: 'Constitution de 1958, article 4',
  },
  {
    id: 'q023',
    category: 'droits-devoirs',
    difficulty: 'moyen',
    question: 'Quel droit permet de créer une association ?',
    options: [
      "Droit d'association",
      'Droit de réunion',
      'Droit de manifestation',
      'Droit de pétition',
    ],
    correctAnswer: 0,
    explanation:
      "Le droit d'association permet de créer librement des associations selon la loi de 1901.",
    source: 'Loi du 1er juillet 1901',
  },
  {
    id: 'q024',
    category: 'droits-devoirs',
    difficulty: 'difficile',
    question: "Quel devoir concerne la protection de l'environnement ?",
    options: [
      'Devoir de protection',
      'Devoir de solidarité',
      'Devoir de respect',
      'Devoir de participation',
    ],
    correctAnswer: 0,
    explanation:
      "Le devoir de protection de l'environnement est un devoir citoyen moderne.",
    source: "Charte de l'environnement, 2005",
  },

  // Questions Géographie
  {
    id: 'q025',
    category: 'geographie',
    difficulty: 'facile',
    question: 'Combien y a-t-il de régions en France métropolitaine ?',
    options: ['13', '22', '26', '18'],
    correctAnswer: 0,
    explanation:
      'Il y a 13 régions en France métropolitaine depuis la réforme territoriale de 2016.',
    source: 'Réforme territoriale de 2016',
  },
  {
    id: 'q026',
    category: 'geographie',
    difficulty: 'moyen',
    question: 'Combien y a-t-il de départements en France métropolitaine ?',
    options: ['96', '100', '95', '101'],
    correctAnswer: 0,
    explanation:
      'Il y a 96 départements en France métropolitaine (de 01 à 95, plus Paris qui est à la fois ville et département).',
    source: 'Organisation territoriale française',
  },
  {
    id: 'q027',
    category: 'geographie',
    difficulty: 'difficile',
    question: 'Quel est le statut de la Nouvelle-Calédonie ?',
    options: [
      "Collectivité d'outre-mer",
      "Département d'outre-mer",
      "Région d'outre-mer",
      "Territoire d'outre-mer",
    ],
    correctAnswer: 0,
    explanation:
      "La Nouvelle-Calédonie est une collectivité d'outre-mer à statut particulier.",
    source: 'Statut de la Nouvelle-Calédonie',
  },
  {
    id: 'q028',
    category: 'geographie',
    difficulty: 'facile',
    question: 'Quelles sont les couleurs du drapeau français ?',
    options: [
      'Bleu, blanc, rouge',
      'Rouge, blanc, bleu',
      'Bleu, rouge, blanc',
      'Blanc, bleu, rouge',
    ],
    correctAnswer: 0,
    explanation:
      'Le drapeau français est tricolore : bleu, blanc, rouge (de gauche à droite).',
    source: 'Constitution de 1958, article 2',
  },
  {
    id: 'q029',
    category: 'geographie',
    difficulty: 'moyen',
    question: 'Qui a composé la Marseillaise ?',
    options: [
      'Rouget de Lisle',
      'Claude Joseph Rouget',
      'Jean-Baptiste Lully',
      'François-Joseph Gossec',
    ],
    correctAnswer: 0,
    explanation: 'La Marseillaise a été composée par Rouget de Lisle en 1792.',
    source: 'Histoire de la Marseillaise',
  },
  {
    id: 'q030',
    category: 'geographie',
    difficulty: 'difficile',
    question: 'Quel symbole représente la vigilance et le courage en France ?',
    options: ['Le coq gaulois', "L'aigle", 'Le lion', 'La colombe'],
    correctAnswer: 0,
    explanation:
      'Le coq gaulois est le symbole national non officiel qui représente la vigilance et le courage.',
    source: 'Symboles de la République',
  },

  // Questions Culture
  {
    id: 'q031',
    category: 'culture',
    difficulty: 'facile',
    question: "Quand l'Académie française a-t-elle été fondée ?",
    options: ['1635', '1648', '1650', '1620'],
    correctAnswer: 0,
    explanation:
      "L'Académie française a été fondée en 1635 par le cardinal de Richelieu.",
    source: "Histoire de l'Académie française",
  },
  {
    id: 'q032',
    category: 'culture',
    difficulty: 'moyen',
    question: "Combien y a-t-il de membres à l'Académie française ?",
    options: ['40', '50', '30', '60'],
    correctAnswer: 0,
    explanation:
      'L\'Académie française compte 40 membres élus à vie, appelés "les Immortels".',
    source: "Statuts de l'Académie française",
  },
  {
    id: 'q033',
    category: 'culture',
    difficulty: 'difficile',
    question: 'Quelle loi protège la langue française ?',
    options: ['Loi Toubon', 'Loi Bas-Lauriol', 'Loi Malraux', 'Loi Lang'],
    correctAnswer: 0,
    explanation:
      'La loi Toubon de 1994 protège la langue française et impose son usage dans certains domaines.',
    source: 'Loi du 4 août 1994',
  },
  {
    id: 'q034',
    category: 'culture',
    difficulty: 'facile',
    question: 'Quel est le plus grand musée du monde ?',
    options: [
      'Musée du Louvre',
      "Musée d'Orsay",
      "Musée de l'Ermitage",
      'Musée du Prado',
    ],
    correctAnswer: 0,
    explanation:
      'Le Musée du Louvre est le plus grand musée du monde par sa superficie.',
    source: 'Statistiques muséales',
  },
  {
    id: 'q035',
    category: 'culture',
    difficulty: 'moyen',
    question: 'Quel écrivain a écrit "Les Misérables" ?',
    options: [
      'Victor Hugo',
      'Émile Zola',
      'Gustave Flaubert',
      'Honoré de Balzac',
    ],
    correctAnswer: 0,
    explanation: 'Victor Hugo a écrit "Les Misérables", publié en 1862.',
    source: 'Littérature française du XIXe siècle',
  },
  {
    id: 'q036',
    category: 'culture',
    difficulty: 'difficile',
    question: "Quel château est un exemple d'architecture Renaissance ?",
    options: [
      'Château de Chambord',
      'Château de Versailles',
      'Château de Fontainebleau',
      'Château de Chenonceau',
    ],
    correctAnswer: 0,
    explanation:
      "Le château de Chambord est un exemple emblématique de l'architecture Renaissance française.",
    source: 'Architecture Renaissance française',
  },
];
