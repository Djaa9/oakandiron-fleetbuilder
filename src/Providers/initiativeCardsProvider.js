import { initiativeCards } from "../data/initiativeCards.js";
import { factions } from "../data/factions.js";
import { factionTypes } from "../data/factionTypes.js";

const initiativeCardsProvider = {
  allowed: (faction, admiral, ships) => {
    if (!factions || !admiral)
      throw new Error(
        "missing parameter when calling initiaTiveCardsProvider.allowed. Allowed InitiaTive Cards could not be determined"
      );

    var initiativeCardsToReturn = initiativeCards.generic;

    if (faction.type === factionTypes.ENGLISH) {
      initiativeCardsToReturn = initiativeCardsToReturn.concat(
        initiativeCards.english
      );
    }

    if (faction.type === factionTypes.DUTCH) {
      initiativeCardsToReturn = initiativeCardsToReturn.concat(
        initiativeCards.dutch
      );
    }

    if (faction.type === factionTypes.SPANISH) {
      initiativeCardsToReturn = initiativeCardsToReturn.concat(
        initiativeCards.spanish
      );
    }

    if (faction.type === factionTypes.FRENCH) {
      initiativeCardsToReturn = initiativeCardsToReturn.concat(
        initiativeCards.french
      );
    }

    if (faction.type === factionTypes.PIRATE) {
      initiativeCardsToReturn = initiativeCardsToReturn
        .concat(initiativeCards.english)
        .concat(initiativeCards.dutch)
        .concat(initiativeCards.spanish)
        .concat(initiativeCards.french)
        .concat(initiativeCards.pirate);
    }

    // Autoinclude "Buccaneer Tactics" if admiral has the keyword and is not pirate
    if (
      admiral.keywords.find((keyword) => keyword === "Buccaneer Tactics") &&
      faction.type !== factionTypes.PIRATE
    )
      initiativeCardsToReturn = initiativeCardsToReturn.concat(
        initiativeCards.pirate
      );

    // Autoinclude "Doughty" if admiral has the keyword
    if (admiral.keywords.find((keyword) => keyword === "Doughty")) {
      var autoIncludedDoughtyCard = initiativeCards.special.find(
        (card) => card.name === "Doughty"
      );
      autoIncludedDoughtyCard.autoInclude = true;
      initiativeCardsToReturn.push(autoIncludedDoughtyCard);
    }

    // Autoinclude "Intrepid" if admiral has the keyword
    if (admiral.keywords.find((keyword) => keyword === "Intrepid")) {
      var autoIncludedIntrepidCard = initiativeCards.special.find(
        (card) => card.name === "Intrepid"
      );
      autoIncludedIntrepidCard.autoInclude = true;
      initiativeCardsToReturn.push(autoIncludedIntrepidCard);
    }

    // Allow and Autoinclude "Double Rations" if the ship has the keyword (from Supply Ship upgrade card)
    if (
      ships.find((ship) =>
        [ship.upgradeCard1, ship.upgradeCard2].find((card) =>
          card ? card.keywords.includes("Double Rations") : false
        )
      )
    )
      initiativeCardsToReturn.push(
        initiativeCards.special
          .filter((card) => card.name === "Double Rations")
          .map((card) => {
            card.autoInclude = true;
            return card;
          })
          .find((card) => true)
      );

    return initiativeCardsToReturn
      .map((card) => Object.assign({}, card))
      .sort((a, b) => (a.initiativeValue < b.initiativeValue ? -1 : 1));
  },
  all: () => {
    return initiativeCards.generic
      .concat(initiativeCards.english)
      .concat(initiativeCards.dutch)
      .concat(initiativeCards.spanish)
      .concat(initiativeCards.french)
      .concat(initiativeCards.pirate);
  },
};

export default initiativeCardsProvider;
