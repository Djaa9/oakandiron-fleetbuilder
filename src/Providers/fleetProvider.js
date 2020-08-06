import { gameModes } from '../Data/gameModes';
import { factions } from '../Data/factions';
import { allAdmirals } from "../Data/admirals";
import Commanders from '../Data/commanders';
import UpgradeCards from "../Providers/upgradeCardsProvider";
import { ships } from '../Data/ships';

const fleetProvider = {
  toUrlParams: function (fleetProps) {

    console.log("fleetProp for url", fleetProps);

    var shortForm = [];

    fleetProps.forEach((fleetProp) => {

      if (fleetProp.gameMode) {
        shortForm.push({ gameMode: fleetProp.gameMode.name });
      }
      if (fleetProp.faction) {
        shortForm.push({ faction: fleetProp.faction.name });
      }
      if (fleetProp.admiral) {
        shortForm.push({ admiral: fleetProp.admiral.name });
      }
      if (fleetProp.ships) {
        shortForm.push({ ships: fleetProp.ships.map(ship => {
          return {
            name: ship.name,
            isFlagship: ship.isFlagship,
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
      shortForm.push({ initiativeCards: fleetProp.initiativeCards.map(card => card.name) });
    }
    );

    console.log("dataForUrl", shortForm); // TODO remove
    
    return encodeURI(JSON.stringify(shortForm));

  },
  fromUrlParams: function (urlParams) {
    console.log("fromShortestForm urlParams", urlParams)

    // TODO UNWRAP FLEET OBJECTS
    var fleetProps = JSON.parse(decodeURI(urlParams.match.params.fleet));
    console.log("fromShortestForm decoded props", fleetProps);

    var fleet = [];

    fleetProps.forEach((fleetProp) => {
    if (fleetProp.gameMode) {      
      fleet.push({ gameMode: gameModes.find(mode => mode.name === fleetProp.gameMode) });
    }
    if (fleetProp.faction) {
      fleet.push({ faction: factions.find(faction => faction.name === fleetProp.faction) });
    }
    if (fleetProp.admiral) {
      fleet.push({ admiral: allAdmirals.find(admiral => admiral.name === fleetProp.admiral) });
    }
    if (fleetProp.ships) {
      fleet.push({ ships: fleetProp.ships.map(ship => {
        return {
          name: ships.find(shipFromData => shipFromData === ship.name),
          isFlagship: ship.isFlagship,
          commander: ship.commander.name,
          skillLevel: ship.skillLevel.name,
          upgradeCards: [ship.upgradeCard1.name, ship.upgradeCard2.name].filter(card => card),
          upgrades: ship.upgrades.map(upgrade => {if(upgrade.selected) return upgrade.name }).filter(upgrade => upgrade)
        }
      }
      )
     });
    }
  }
  );

  
    console.log("fleet from provider", fleet);
    return fleet;
  }
};

export default fleetProvider;