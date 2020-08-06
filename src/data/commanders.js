const allCommanders = [
    {
        name: "Bold Captain",
        cost: 1,
        keywords: ["Bold"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    },
    {
        name: "Lucky Captain",
        cost: 1,
        keywords: ["Lucky"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    },
    {
        name: "Strict Captain",
        cost: 1,
        keywords: ["Strict"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    },
    {
        name: "Persistent Captain",
        cost: 2,
        keywords: ["Persistent"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    },
    {
        name: "Captain Stede Bonnet",
        cost: 3,
        keywords: ["Bold", "Persistent"],
        factions: ["Pirate"]
    },
    {
        name: "Brilliant Captain",
        cost: 4,
        keywords: ["Brilliant"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    },
    {
        name: "Inspiring Captain",
        cost: 4,
        keywords: ["Inspiring"],
        factions: ["English", "French", "Spanish", "Dutch", "Pirate"]
    }
];

const Commanders = {
     allowed: function(faction){
        if(!faction)
            throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

            return allCommanders.filter(commander => commander.factions.includes(faction.name));
    },
        all: function(){
            return allCommanders;
    }
};

export default Commanders;
