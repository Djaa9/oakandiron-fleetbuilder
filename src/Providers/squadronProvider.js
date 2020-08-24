import { gameModes } from '../data/gameModes';
import { factions } from '../data/factions';
import { allAdmirals } from "../data/admirals";
import Commanders from '../data/commanders';
import shipProvider from './shipProvider';
import apiUtil from './apiUtil';
import upgradeCardsProvider from './upgradeCardsProvider';
import initiativeCardsProvider from '../Providers/initiativeCardsProvider';

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

        // Copy ship and upgrades to new objects
        let newShip = shipProvider.all().find(ship => ship.name === shipShortForm.name);       

        newShip.isFlagship = shipShortForm.isFlagship;
        newShip.commander = shipShortForm.commander ? Commanders.all().find(commander => commander.name === shipShortForm.commander) : "";
        newShip.skillLevel = newShip.skillUpgrades.find(skillUpgrade => skillUpgrade.name === shipShortForm.skillLevel);
        newShip.upgradeCard1 = upgradeCardsProvider.all().find(upgradeCard => upgradeCard.name === shipShortForm.upgradeCards[0]);
        newShip.upgradeCard2 = upgradeCardsProvider.all().find(upgradeCard => upgradeCard.name === shipShortForm.upgradeCards[1]);
        newShip.upgrade = shipShortForm.upgrades.forEach(upgradeShortForm => {
          newShip.upgrades.find(upgrade => upgrade.name === upgradeShortForm).selected = true;  
        })
        return newShip;
      }
      );
    }

    if (shortForm.initiativeCards) {
      squadron.initiativeCards = shortForm.initiativeCards.map(initiativeCardShortForm => {
        return initiativeCardsProvider.all().find(card => card.name === initiativeCardShortForm ? initiativeCardShortForm : "");
      })
    }
    return squadron;
  },
  toText: (squadron) => {
    let text = "";

    text += "GAME SIZE: " + (squadron.gameMode ? squadron.gameMode.name : "-") + "\n";
    text += "FACTION: " + (squadron.faction ? squadron.faction.name : "-") + "\n";
    text += "ADMIRAL: " + (squadron.admiral ? squadron.admiral.name : "-") + "\n";
    text += "\n"
    text += "SHIPS: \n\n";

    if (squadron.ships)
      squadron.ships.forEach(ship => {
        text += "# " + ship.name + (ship.isFlagship ? " (Flagship)" : "") + "\n";
        text += ship.commander ? ("- " + ship.commander.name + "\n") : "";
        text += ship.skillLevel ? ("- " + ship.skillLevel.name + "\n") : "";
        text += ship.upgrades.filter(upgrade => upgrade.selected).length ? "Upgrades: \n" : "";
        ship.upgrades.forEach(upgrade => {
          text += upgrade.selected ? ("- " + upgrade.name + "\n") : "";
        });
        text += ship.upgradeCard1 || ship.upgradeCard2 ? "Upgrade Cards: \n" : "";
        text += ship.upgradeCard1 ? ("- " + ship.upgradeCard1.name + "\n") : "";
        text += ship.upgradeCard2 ? (ship.upgradeCard2.name + "\n") : "";
        text += "\n";
      });
    text += "INITIATIVE HAND: \n"

    if(squadron.initiativeCards)
    squadron.initiativeCards.forEach(card => {
      text += "(" + card.initiativeValue + ") " + card.name + "\n";
    });

    return text;
  }
};

export default squadronProvider;