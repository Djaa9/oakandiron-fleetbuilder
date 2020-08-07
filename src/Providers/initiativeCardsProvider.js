import { initiativeCards } from '../Data/initiativeCards.js';
import { factions } from '../Data/factions.js';
import { factionTypes } from '../Data/factionTypes.js'

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
            var autoIncludedCard = initiativeCards.special.find(card => card.name === "Doughty");
            autoIncludedCard.autoInclude = true;
            initiativeCardsToReturn.push(autoIncludedCard);
        }
        
        if(admiral.keywords.find(keyword => keyword === "Intrepid")){
            var autoIncludedCard = initiativeCards.special.find(card => card.name === "Intrepid");
            autoIncludedCard.autoInclude = true;
            initiativeCardsToReturn.push(autoIncludedCard);
        }

        return initiativeCardsToReturn.sort((a, b) => a.faction.localeCompare(b.faction)) // Sort by faction
                                      .sort((a, b) => a.faction.type - b.faction.type || a.cost < b.cost ? -1 : 1); // if same faction sort by cost
                                      //.sort((a, b) => (a.cost - b.cost) - (a.faction.type - b.faction.type) || a.name.localeCompare(b.name)); // if same cost, sort by name
    }
};

export default initiativeCardsProvider;