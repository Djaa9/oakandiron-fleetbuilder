import { factionTypes } from "../data/factionTypes";
import { ships } from "../data/ships";

const shipProvider = {
  all: () => {
    return copy(ships);
  },
  allowed: function (gameMode, faction, admiral) {
    if (!gameMode || !faction || !admiral) return;

    let allowedShips = copy(ships);

    allowedShips = allowedShips
      .sort((a, b) => (a.cost < b.cost ? -1 : 1))
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)); // Sort same cost alphabetically

    // Handle Game Mode
    if (gameMode.name === "Patrol")
      allowedShips = allowedShips.filter(
        (ship) => ship.class !== "Ship of the Line"
      );

    // Handle Admiral
    if (admiral.keywords.includes("Rogues"))
      allowedShips = allowedShips.filter(
        (ship) => ship.class !== "Ship of the Line"
      );

    // Handle Faction
    if (
      faction.type === factionTypes.ENGLISH ||
      faction.type === factionTypes.DUTCH
    ) {
      return allowedShips.filter((ship) => ship.class !== "Pirate");
    } else if (faction.type === factionTypes.FRENCH) {
      var frenchShips = allowedShips.filter((ship) => ship.class !== "Pirate");

      frenchShips.forEach((ship) => {
        ship.upgrades.forEach((upgrade) => {
          if (upgrade.name === "Swift" || upgrade.name === "Weatherly") {
            if (upgrade.cost > 0) {
              upgrade.cost = upgrade.cost - 1;
            }
          }
          if (upgrade.name === "Additional Guns") {
            if (upgrade.cost > 1) upgrade.cost = upgrade.cost - 1;
          }
        });
      });

      return frenchShips;
    } else if (faction.type === factionTypes.SPANISH) {
      var spanishShips = allowedShips.filter((ship) => ship.class !== "Pirate");

      spanishShips.forEach((ship) => {
        ship.upgrades.forEach((upgrade) => {
          if (upgrade.name === "Stout")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        });
      });

      return spanishShips;
    } else if (faction.type === factionTypes.PIRATE) {
      var pirateShips = allowedShips.filter(
        (ship) => ship.class !== "Ship of the Line"
      );

      pirateShips.forEach((ship) => {
        ship.upgrades.forEach((upgrade) => {
          if (upgrade.name === "Additional Crew")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        });
      });

      return pirateShips;
    } else return [];
  },
};

function copy(shipsToCopy) {
  return shipsToCopy.map((shipToCopy) => {
    let shipCopy = Object.assign({}, shipToCopy);
    shipCopy.upgrades = [...shipCopy.upgrades].map((upgrade) => {
      return Object.assign({}, upgrade);
    });
    return shipCopy;
  });
}

export default shipProvider;
