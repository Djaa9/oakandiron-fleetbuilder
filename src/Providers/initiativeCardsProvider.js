import { initiativeCards } from '../Data/initiativeCards.js';
import { factions } from '../Data/factions.js';
import { factionTypes } from '../Data/factionTypes.js'

const initiaTiveCardsProvider = {
    allowed: function(faction) {
        if (!factions)
            throw new Error("missing parameter when calling initiaTiveCardsProvider.allowed. Allowed InitiaTive Cards could not be determined");

            
            var initiativeCardsToReturn = initiativeCards.generic.sort((a, b) => a.name.localeCompare(b.name));
        switch (faction.type) {
            case factionTypes.ENGLISH: {
                return initiativeCardsToReturn.concat(initiativeCards.english.sort((a, b) => a.name.localeCompare(b.name)));
            }
            case factionTypes.DUTCH: {
                return initiativeCardsToReturn.concat(initiativeCards.dutch.sort((a, b) => a.name.localeCompare(b.name)));
            }
            case factionTypes.SPANISH: {
                return initiativeCardsToReturn.concat(initiativeCards.spanish.sort((a, b) => a.name.localeCompare(b.name)));
            }
            case factionTypes.FRENCH: {
                return initiativeCardsToReturn.concat(initiativeCards.french.sort((a, b) => a.name.localeCompare(b.name)));
            }
            case factionTypes.PIRATE: {
                return initiativeCardsToReturn.concat(initiativeCards.english.sort((a, b) => a.name.localeCompare(b.name)))
                                                                 .concat(initiativeCards.dutch.sort((a, b) => a.name.localeCompare(b.name)))
                                                                 .concat(initiativeCards.spanish.sort((a, b) => a.name.localeCompare(b.name)))
                                                                 .concat(initiativeCards.french.sort((a, b) => a.name.localeCompare(b.name)))
                                                                 .concat(initiativeCards.pirate.sort((a, b) => a.name.localeCompare(b.name)));
            }
            default: {
                return [];
            }
        }
    }
};

export default initiaTiveCardsProvider;