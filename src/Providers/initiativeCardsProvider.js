import { initiativeCards } from '../data/initiativeCards.js';
import { factions } from '../data/factions.js';
import { factionTypes } from '../data/factionTypes.js'

const initiativeCardsProvider = {
    allowed: function (faction, admiral) {
        if (!factions || !admiral)
            throw new Error("missing parameter when calling initiaTiveCardsProvider.allowed. Allowed InitiaTive Cards could not be determined");

        var initiativeCardsToReturn = initiativeCards.generic;

        if (faction.type === factionTypes.ENGLISH) {
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.english);
        }

        if (faction.type === factionTypes.DUTCH) {
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.dutch);
        }

        if (faction.type === factionTypes.SPANISH) {
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.spanish);
        }

        if (faction.type === factionTypes.FRENCH) {
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.french);
        }

        if (faction.type === factionTypes.PIRATE) {
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.english)
                .concat(initiativeCards.dutch)
                .concat(initiativeCards.spanish)
                .concat(initiativeCards.french)
                .concat(initiativeCards.pirate);
        }

        if(admiral.keywords.find(keyword => keyword === "Buccaneer Tactics") && faction.type !== factionTypes.PIRATE)
            initiativeCardsToReturn = initiativeCardsToReturn.concat(initiativeCards.pirate);
        
        if(admiral.keywords.find(keyword => keyword === "Doughty")){
            var autoIncludedDoughtyCard = initiativeCards.special.find(card => card.name === "Doughty");
            autoIncludedDoughtyCard.autoInclude = true;
            initiativeCardsToReturn.push(autoIncludedDoughtyCard);
        }
        
        if(admiral.keywords.find(keyword => keyword === "Intrepid")){
            var autoIncludedIntrepidCard = initiativeCards.special.find(card => card.name === "Intrepid");
            autoIncludedIntrepidCard.autoInclude = true;
            initiativeCardsToReturn.push(autoIncludedIntrepidCard);
        }

        return initiativeCardsToReturn.map(card => Object.assign({}, card))
                                      .sort((a, b) => a.initiativeValue < b.initiativeValue ? -1 : 1);
    }
};

export default initiativeCardsProvider;