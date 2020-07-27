import { initiativeCards } from '../Data/initiativeCards.js';
import { factions } from '../Data/factions.js';
import { factionTypes } from '../Data/factionTypes.js'

const initiaTiveCardsProvider = {
    allowed: function(faction) {
        if (!factions)
            throw new Error("missing parameter when calling initiaTiveCardsProvider.allowed. Allowed InitiaTive Cards could not be determined");

        switch (faction.type) {
            case factionTypes.ENGLISH: {
                return initiativeCards.generic.concat(initiativeCards.english);
            }
            case factionTypes.DUTCH: {
                return initiativeCards.generic.concat(initiativeCards.dutch);
            }
            case factionTypes.SPANISH: {
                return initiativeCards.generic.concat(initiativeCards.spanish);
            }
            case factionTypes.FRENCH: {
                return initiativeCards.generic.concat(initiativeCards.french);
            }
            case factionTypes.PIRATE: {
                return initiativeCards.generic.concat(initiativeCards.english)
                                              .concat(initiativeCards.dutch)
                                              .concat(initiativeCards.spanish)
                                              .concat(initiativeCards.french)
                                              .concat(initiativeCards.pirate);
            }
            default: {
                return [];
            }
        }
    }
};

export default initiaTiveCardsProvider;