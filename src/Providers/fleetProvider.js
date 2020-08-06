import { gameModes } from '../Data/gameModes';
import { factions } from '../Data/factions';
import { allAdmirals } from "../Data/admirals";
import Commanders from '../Data/commanders';
import UpgradeCards from "../Providers/upgradeCardsProvider";
import shipProvider from '../Providers/shipProvider';

const fleetProvider = {
  toUrlParams: function (fleet) {

    console.log("fleetProp for url", fleet);

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
            upgrades: ship.upgrades.map(upgrade => {if(upgrade.selected) return upgrade.name }).filter(upgrade => upgrade)
          }
        }
        ) : [];
      shortForm.initiativeCards = fleet.initiativeCards ? fleet.initiativeCards.map(card => card.name) : null;

    console.log("dataForUrl", shortForm); // TODO remove
    
    return encodeURI(JSON.stringify(shortForm));

  },
  fromUrlParams: function (urlParams) {
    console.log("fromShortestForm urlParams", urlParams)

    var fleetProps = JSON.parse(decodeURI(urlParams.match.params.fleet));
    console.log("fromShortestForm decoded props", fleetProps); //TODO remove

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
  
    console.log("fleet from provider", fleet); // TODO remove
    return fleet;
  }
};

export default fleetProvider;