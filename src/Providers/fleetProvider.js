import { gameModes } from '../data/gameModes';
import { factions } from '../data/factions';
import { allAdmirals } from "../data/admirals";
import Commanders from '../data/commanders';
import shipProvider from '../Providers/shipProvider';

const fleetProvider = {
  toJson: function (fleet) {

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
        upgrades: ship.upgrades.map(upgrade => { return upgrade.selected ? upgrade.name : null }).filter(upgrade => upgrade)
      }
    }
    ) : [];
    shortForm.initiativeCards = fleet.initiativeCards ? fleet.initiativeCards.map(card => card.name) : null;

    return shortForm;
  },
  fromJson: function (Json) {
    var fleetProps = JSON.parse(Json);
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
  },
  toText: function (fleet) {
    let textString = "";
    console.log("toText", fleet);

    textString += "GAME SIZE: " + (fleet.gameMode ? fleet.gameMode.name : "-") + "\n";
    textString += "FACTION: " + (fleet.faction ? fleet.faction.name : "-") + "\n";
    textString += "ADMIRAL: " + (fleet.admiral ? fleet.admiral.name : "-") + "\n";
    textString += "\n"
    textString += "SHIPS: \n";
    fleet.ships.forEach(ship => {
      textString += ship.name + (ship.isFlagship ? " (Flagship)" : "") + "\n";
      textString += ship.commander ? ship.commander.name : "";
      textString += ship.skillLevel ? ship.skillLevel.name + "\n" : "";
      textString += ship.upgrades.filter(upgrade => upgrade.selected).length ? "Upgrades: \n" : "";
      ship.upgrades.forEach(upgrade => {
          textString += upgrade.selected ? (upgrade.name + "\n") : "";
        });
      textString += ship.upgradeCard1 || ship.upgradeCard2 ? "Upgrade Cards: \n" : "";
      textString += ship.upgradeCard1 ? (ship.upgradeCard1.name + "\n") : ""; 
      textString += ship.upgradeCard2 ? (ship.upgradeCard2.name + "\n") : "";
      textString += "\n";
    });
    textString += "INITIATIVE HAND: \n"
    fleet.initiativeCards.forEach(card => {
      textString += card.name + "\n";
    });

    return textString;
  }
};

export default fleetProvider;