import { factionTypes } from "../Data/factionTypes";
import { ships } from "../Data/ships";

const shipProvider = {
  all: ships,
  allowed: function (gameMode, faction, admiral) {
    if (!gameMode || !faction || !admiral)
      throw new Error("missing parameter when calling shipProvider.allowed. Allowed Ships could not be determined");

      console.log(gameMode);
    var allowedShips = ships;

    // Handle Game Mode
    if (gameMode.name === "Patrol")
      allowedShips = allowedShips.filter(ship => ship.class !== "Ship of the Line");

    // Handle Admiral
    if (admiral.keywords.includes("Rogues"))
      allowedShips = allowedShips.filter(ship => ship.class !== "Ship of the Line");

    // Handle Faction
    if (faction.type === factionTypes.ENGLISH || faction.type === factionTypes.DUTCH) {
      return allowedShips.filter(ship => ship.class !== "Pirate");
    }
    else if (faction.type === factionTypes.FRENCH) {
      var frenchShips = allowedShips.filter(ship => ship.class !== "Pirate");

      frenchShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Swift" || upgrade.name === "Weatherly") {
            if (upgrade.cost > 0) {
              upgrade.cost = (upgrade.cost - 1);
            }
          }
          if (upgrade.name === "Additional Guns") {
            if (upgrade.cost > 1)
              upgrade.cost = (upgrade.cost - 1);
          }
        })
      });

      return frenchShips;
    }
    else if (faction.type === factionTypes.SPANSIH) {
      var spanishShips = allowedShips.filter(ship => ship.class !== "Pirate");

      spanishShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Stout")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        })
      });

      return spanishShips;
    }
    else if (faction.type === factionTypes.PIRATE) {
      var pirateShips = allowedShips.filter(ship => ship.class !== "Ship of the Line");

      pirateShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Additional Crew")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        })
      });

      return pirateShips;
    }
    else
      return [];
  }
};

export default shipProvider;