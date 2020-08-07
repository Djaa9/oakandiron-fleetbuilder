import { initiativeCards } from '../Data/initiativeCards.js';
import { factions } from '../Data/factions.js';
import { factionTypes } from '../Data/factionTypes.js'

const initiativeCardsProvider = {
    allowed: function (faction, admiral) {
        if (!factions || !admiral)
            throw new Error("missing parameter when calling initiaTiveCardsProvider.allowed. Allowed InitiaTive Cards could not be determined");

        console.log("initiativeCardsProvider", faction, admiral);

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

        console.log("return ic", initiativeCardsToReturn.sort((a, b) => a.initiativeValue < b.initiativeValue ? -1 : 1) ); //TODO REMOVE
        return initiativeCardsToReturn.sort((a, b) => a.initiativeValue < b.initiativeValue ? -1 : 1); // Sort by faction
                                      //.sort((a, b) => a.faction.type - b.faction.type ||  ); // if same faction sort by cost
    }
};

export default initiativeCardsProvider;