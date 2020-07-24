const allUpgradeCards = [
  {
    name: 'Unseasoned Timbers',
    cost: -3,
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    keywords: [],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Low Morale',
    cost: -2,
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    keywords: [],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Poorly Armed',
    cost: -2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Foul',
    cost: -1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Supply Ship',
    cost: -1,
    keywords: ['Double Rations', 'Valuable'],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: true,
  },
  {
    name: 'Merchants',
    cost: -1,
    keywords: ['Undermanned', 'Closed Quarters'],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Untested Crew',
    cost: -1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Fire Ship',
    cost: 0,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Boarding Party',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Corsairs',
    cost: 1,
    keywords: ['Fierce', 'Boarders'],
    factions: ['French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Efficent Loader',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Expert Sailing Master',
    cost: 1,
    keywords: [],
    factions: ['Dutch', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Kapers',
    cost: -1,
    keywords: ['Daring'],
    factions: ['Dutch', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Skilled Carpenter',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Skilled Surgeon',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Support Ship',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: true,
  },
  {
    name: 'Swashbucklers',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Expert Topmen',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Dismantling Shot',
    cost: 1,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Buccaneers',
    cost: 2,
    keywords: ['Marksmen'],
    factions: ['English', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Dispatch Ship',
    cost: 2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Vice Flag',
    cost: 2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Aggressive Crew',
    cost: 2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Troop Transport',
    cost: 2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Marines',
    cost: 2,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
  {
    name: 'Boarding Defenses',
    cost: 3,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Expert Gunners',
    cost: 3,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: [],
    notAllowedForFlagship: false,
  },
  {
    name: 'Veteran Crew',
    cost: 3,
    keywords: [],
    factions: ['English', 'Spanish', 'Dutch', 'French', 'Pirate'],
    notAllowedForClasses: ['Ship of the Line'],
    notAllowedForFlagship: false,
  },
];

const UpgradeCards = {
  allowed: function (faction, ship, flagship) {
    if (!ship)
      throw new Error(
        'Ship not selected (ship = ' +
          ship +
          '). Allowed Upgrade Cards could not be determined'
      );

    if (flagship === 'undefined' || flagship === '' || flagship === null)
      throw new Error(
        'Flagship not selected (flagship = ' +
          flagship +
          '). Upgrade Cards could not be determined'
      );

    if (!faction)
      throw new Error(
        'Faction not selected (faction = ' +
          faction +
          '). Upgrade Cards could not be determined'
      );

    // Handle faction
    let allowedUpgradeCards = allUpgradeCards.filter((card) =>
      card.factions.includes(faction.name)
    );
    console.log(allowedUpgradeCards);
    // Handle class
    allowedUpgradeCards = allowedUpgradeCards.filter(
      (card) => !card.notAllowedForClasses.includes(ship.class)
    );
    console.log(allowedUpgradeCards);
    // Handle Flagship
    if (flagship === true)
      allowedUpgradeCards = allowedUpgradeCards.filter(
        (card) => !card.notAllowedForFlagship
      );

    console.log(allowedUpgradeCards);
    return allowedUpgradeCards;
  },
};

export default UpgradeCards;
