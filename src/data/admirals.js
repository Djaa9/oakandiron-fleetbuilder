 const allAdmirals = [
    {
      name: "Untested Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 2
    },
    {
      name: "Seasoned Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 4
    },
    /*{
      name: "Untested Bold Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Bold Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 1
    },
    {
      name: "Seasoned Bold Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 2
    },
    {
      name: "Untested Lucky Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Lucky Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Seasoned Lucky Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Untested Strict Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Strict Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Seasoned Strict Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Untested Persistent Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Persistent Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Seasoned Persistent Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Untested Brillant Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Brilliant Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Seasoned Brilliant Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Untested Inspiring Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Experienced Inspiring Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },
    {
      name: "Seasoned Inspiring Admiral",
      keywords: [],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"],
      cost: 0
    },*/
    {
      name: "Abraham Crijinssen",
      keywords: ["Rogues", "Raider", "Brave"],
      factions: ["Dutch"],
      cost: 1
    },
    {
      name: "Cornelis Evertsen the Youngest",
      keywords: [],
      factions: ["Dutch"],
      cost: 2
    },
    {
      name: "Michiel de Ruyter",
      keywords: [],
      factions: ["Dutch"],
      cost: 3
    },
    {
      name: "Henry Morgan",
      keywords: ["Rogues", "Clever", "Buccaneer Tactics"], // Implement BT can include a Pirate initiative card
      factions: ["English"],
      cost: 1
    },
    {
      name: "John Benbow",
      keywords: ["Dogged", "Inspiring", "Doughty"], //Todo implement auto include of doughty initiative card
      factions: ["English"],
      cost: 2
    },
    {
      name: "George Monck",
      keywords: [],
      factions: ["English"],
      cost: 3
    },
    {
      name: "Rene Dugay-Trouin",
      keywords: [],
      factions: ["French"],
      cost: 2
    },
    {
      name: "Jean Bart",
      keywords: ["Rogues", "Clever", "Tactitian", "Inspiring"],
      factions: ["French"],
      cost: 2
    },
    {
      name: "Jean II Comte d'Estrees",
      keywords: ["Persistent"],
      factions: ["French"],
      cost: 3
    },
    {
      name: "Manuel Rivero de Pardal",
      keywords: ["Rogues", "Brave", "Inspiring", "Pompous"],
      factions: ["Spanish"],
      cost: 1
    },
    {
      name: "Francisco Pereira Freire de la Cerda",
      keywords: [],
      factions: ["Spanish"],
      cost: 2
    },
    {
      name: "Andres Ochoa de Zarate",
      keywords: [],
      factions: ["Spanish"],
      cost: 3
    },
    {
      name: "Henry Jennings",
      keywords: [],
      factions: ["Pirate"],
      cost: 1
    },
    {
      name: "Jean Hamlin",
      keywords: [],
      factions: ["Pirate"],
      cost: 1
    },
    {
      name: "Edward \"Blackbeard\" Teach",
      keywords: [],
      factions: ["Pirate"],
      cost: 1
    },
    {
      name: "Bartholomew \"Black Bart\" Roberts",
      keywords: ["Rogues", "Interprid", "Inspiring"], // Implement auto add of Interprid initiative card
      factions: ["Pirate"],
      cost: 2
    }   
  ];

  const Admirals = {
    allowed: function(faction) {
        if(!faction)
            throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

            return allAdmirals.filter(admiral => admiral.factions.includes(faction.name));
    }
  };

  export default Admirals;