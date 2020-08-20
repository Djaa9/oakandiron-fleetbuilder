import { gameModes } from '../data/gameModes';
import { factions } from '../data/factions';
import { allAdmirals } from "../data/admirals";
import Commanders from '../data/commanders';
import shipProvider from './shipProvider';
import apiUtil from './apiUtil';

const squadronProvider = {
  SaveAndGetId: async (squadron) => {

    var shortForm = {};
    shortForm.gameMode = squadron.gameMode ? squadron.gameMode.name : null;
    shortForm.faction = squadron.faction ? squadron.faction.name : null;
    shortForm.admiral = squadron.admiral ? squadron.admiral.name : null;
    shortForm.ships = squadron.ships ? squadron.ships.map(ship => {
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
    shortForm.initiativeCards = squadron.initiativeCards ? squadron.initiativeCards.map(card => card.name) : null;

    let response = await fetch(apiUtil.url() + '/squadron/',
      {
        method: 'post',
        body: JSON.stringify(shortForm),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    
    return await response.json();
  },
  GetFromId: async (id) => {
    let response = await fetch(apiUtil.url() + '/squadron/' + id);
    let shortForm = await response.json();

    console.log(shortForm);
    var squadron = {};

    if (shortForm.gameMode) {
      squadron.gameMode = gameModes.find(mode => mode.name === shortForm.gameMode);
    }
    if (shortForm.faction) {
      squadron.faction = factions.find(faction => faction.name === shortForm.faction);
    }
    if (shortForm.admiral) {
      squadron.admiral = allAdmirals.find(admiral => admiral.name === shortForm.admiral);
    }
    if (shortForm.ships) {
      squadron.ships = shortForm.ships.map(shipShortForm => {
        let newShip = shipProvider.all().find(ship => ship.name === shipShortForm.name);

          newShip.isFlagship = false;
          newShip.commander = shipShortForm.commander ? Commanders.all().find(commander => commander.name === shipShortForm.commander.name) : "";
          newShip.skillLevel = shipShortForm.skillLevel;
          newShip.upgradeCard1 = shipShortForm.upgradeCards[0];
          newShip.upgradeCard2 = shipShortForm.upgradeCards[1];
          //newShip.upgrades.map(upgrade => upgrade.name )      
          return newShip;            
      }      
      );
  }  
    console.log("provider squad", squadron);
    return squadron;
  },
  toText: (squadron) => {
    let text = "";

    text += "GAME SIZE: " + (squadron.gameMode ? squadron.gameMode.name : "-") + "\n";
    text += "FACTION: " + (squadron.faction ? squadron.faction.name : "-") + "\n";
    text += "ADMIRAL: " + (squadron.admiral ? squadron.admiral.name : "-") + "\n";
    text += "\n"
    text += "SHIPS: \n";
    squadron.ships.forEach(ship => {
      text += ship.name + (ship.isFlagship ? " (Flagship)" : "") + "\n";
      text += ship.commander ? ship.commander.name : "";
      text += ship.skillLevel ? ship.skillLevel.name + "\n" : "";
      text += ship.upgrades.filter(upgrade => upgrade.selected).length ? "Upgrades: \n" : "";
      ship.upgrades.forEach(upgrade => {
        text += upgrade.selected ? (upgrade.name + "\n") : "";
      });
      text += ship.upgradeCard1 || ship.upgradeCard2 ? "Upgrade Cards: \n" : "";
      text += ship.upgradeCard1 ? (ship.upgradeCard1.name + "\n") : "";
      text += ship.upgradeCard2 ? (ship.upgradeCard2.name + "\n") : "";
      text += "\n";
    });
    text += "INITIATIVE HAND: \n"
    squadron.initiativeCards.forEach(card => {
      text += card.name + "\n";
    });

    return text;
  }
};

export default squadronProvider;