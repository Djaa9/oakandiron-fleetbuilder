import { gameModes } from '../Data/gameModes';
import { factions } from '../Data/factions';
import { allAdmirals } from "../Data/admirals";
import Commanders from '../Data/commanders';
//import UpgradeCards from "../Providers/upgradeCardsProvider";
import shipProvider from '../Providers/shipProvider';

const fleetProvider = {
  toUrlParams: function (fleet) {

    var shortForm = {};

        shortForm.gameMode = fleet.gameMode ? fleet.gameMode.name : null;
        shortForm.faction = fleet.faction ? fleet.faction.name : null;
        shortForm.admiral = fleet.admiral ? fleet.admiral.name : null;
        shortForm.ships = fleet.ships ? fleet.ships.map(ship => {
          return {
            name: ship.name,
            isFlagship: ship.isFlagship,
            commander: ship.commander.name,
            skillLevel: ship.skillLevel.name,
            upgradeCards: [ship.upgradeCard1.name, ship.upgradeCard2.name].filter(card => card),
            upgrades: ship.upgrades.map(upgrade => {return upgrade.selected ? upgrade.name : null}).filter(upgrade => upgrade)
          }
        }
        ) : [];
      shortForm.initiativeCards = fleet.initiativeCards ? fleet.initiativeCards.map(card => card.name) : null;
    
    return encodeURI(JSON.stringify(shortForm));

  },
  fromUrlParams: function (urlParams) {
    var fleetProps = JSON.parse(decodeURI(urlParams.match.params.fleet));
    var fleet = [];

    fleetProps.forEach((fleetProp) => {
    if (fleetProp.gameMode) {      
      fleet.gameMode = gameModes.find(mode => mode.name === fleetProp.gameMode);
    }
    if (fleetProp.faction) {
      fleet.faction = factions.find(faction => faction.name === fleetProp.faction);
    }
    if (fleetProp.admiral) {
      fleet.admiral = allAdmirals.find(admiral => admiral.name === fleetProp.admiral);
    }
    if (fleetProp.ships) {
      fleet.ships = fleetProp.ships.map(shipFromUrl => {
        return {
          name: shipProvider.all().find(ship => ship.name === shipFromUrl),
          isFlagship: shipFromUrl.isFlagship,
          commander: shipFromUrl.commander ? Commanders.all().find(commander => commander.name === shipFromUrl.commander.name) : null,
          skillLevel: shipFromUrl.skillLevel,
          upgradeCards: [],
          upgrades: []
        }
      }
      );
    }
  }
  );
  
    return fleet;
  }
};

export default fleetProvider;