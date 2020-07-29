import { gameModes } from '../Data/gameModes';
import { factionTypes } from '../Data/factionTypes';
import Admirals from "../Providers/admiralsProvider";
import Commanders from '../Data/commanders.js';
import UpgradeCards from "../Providers/upgradeCardsProvider";
import { ships } from '../Data/ships';

const fleetProvider = {
  toShortestForm: function (fleet) {

    var dataForUrl = [];

    fleet.forEach((fleetProp) => {

      if (fleetProp.gameMode) {
        dataForUrl.push({ gameMode: fleetProp.gameMode.name });
      }
      if (fleetProp.faction) {
        dataForUrl.push({ faction: fleetProp.faction.name });
      }
      if (fleetProp.admiral) {
        dataForUrl.push({ admiral: fleetProp.admiral.name });
      }
      if (fleetProp.ships) {
        dataForUrl.push({ ships: dataForUrl.ships = fleetProp.ships.map(ship => {
          return {
            name: ship.name,
            isFlagShip: ship.isFlagShip,
            commander: ship.commander.name,
            skillLevel: ship.skillLevel.name,
            upgradeCards: [ship.upgradeCard1.name, ship.upgradeCard2.name].filter(card => card),
            upgrades: ship.upgrades.map(upgrade => {if(upgrade.selected) return upgrade.name }).filter(upgrade => upgrade)
          }
        }
        )
       });
      };
      if (fleetProp.initiativeCards)
        dataForUrl.push({ initiativeCards: fleetProp.initiativeCards.map(card => card.name) });
    }
    );

    console.log("dataForUrl", dataForUrl);

    return dataForUrl;

  },
  importFromUrl: function (compressedFleet) {
    console.log("importFromUrl", compressedFleet)

    // TODO UNWRAP FLEET OBJECTS

    return JSON.parse(compressedFleet.match.params.fleet);
  }
};

export default fleetProvider;