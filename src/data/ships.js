  const allShips = [
    {
      name: "Sloop",
      cost: 7,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 2},
        {name: "Additional Guns", cost: 2},
        {name: "Sweeps", cost: 1},
        {name: "Swift", cost: 1}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Corvette",
      cost: 7,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 2},
        {name: "Additional Guns", cost: 2},
        {name: "Sweeps", cost: 1},
        {name: "Swift", cost: 1}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Brigantine",
      cost: 8,      
      upgrades: [        
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 2},
        {name: "Additional Guns", cost: 2},
        {name: "Sweeps", cost: 1},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Fluyt",
      cost: 11,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 2},
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 4}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Petite Fregate",
      cost: 13,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew",  cost: 4},
        {name: "Additional Guns", cost: 2},
        {name: "Sweeps", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Light Galleon",
      cost: 17,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 6},
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 6},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Sixth Rate",
      cost: 13,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 4},
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 4},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Fifth Rate",
      cost: 16,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 4},
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 4},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Fourth Rate",
      cost: 23,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 6},
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 6},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Third Rate",
      cost: 37,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 8}, 
        {name: "Additional Guns", cost: 6},
        {name: "Stout", cost: 6},
        {name: "Swift", cost: 1}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },
    {
      name: "Second Rate",
      cost: 55,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 8}, 
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 8},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },    
    {
      name: "First Rate",
      cost: 58,
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
        {name: "Additional Crew", cost: 8}, 
        {name: "Additional Guns", cost: 2},
        {name: "Stout", cost: 8},
        {name: "Swift", cost: 1},
        {name: "Weatherly", cost: 2}
      ],
      factions: ["English", "Spanish", "Dutch", "French", "Pirate"]
    },			
    {
      name: "Revenge",
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
      ],
      factions: ["Pirate"]
    },
    {
      name: "Queen Anne's Revenge",
      upgrades: [
        {name: "Skill 1", cost: 2},
        {name: "Skill 2", cost: 4},
      ],
      factions: ["Pirate"]
    }
  ];

  const Ships = {
    forFaction: function(faction){
      
      var shipsAvailableForFaction = allShips.filter(ship => ship.factions.includes(faction));
      
      switch(faction){
        case "English" || "Dutch" || "Pirate":
          return shipsAvailableForFaction;

        case "French":
          var frenchShips = shipsAvailableForFaction;
          frenchShips.forEach(ship => {
            ship.upgrades.forEach(upgrade =>{
              if (upgrade.name === "Swift" || "Weatherly")
              {
                if (upgrade.cost > 0)
                  upgrade.cost - 1;
              }
              if (upgrade.name === "Additional Guns")
                {
                  if (upgrade.cost > 1)
                    upgrade.cost - 1;
                }
            })
          })
          return allShips;
          
        case "Spanish":
          var spanishShips = shipsAvailableForFaction;
          spanishShips.forEach(ship => {
            ship.upgrades.forEach( upgrade => {
              if (upgrade.name === "Stout")
                Math.floor(upgrade.cost / 2);
              }
            )}
          );

          return spanishShips;
      }

      return allShips;
    }
  };

export default Ships;
  