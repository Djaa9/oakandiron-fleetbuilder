import { allUpgradeCards } from "../data/upgradeCards";

const upgradeCardsProvider = {
    all: () => {
        return copy(allUpgradeCards)
    },
    allowed: function (faction, ship) {
        if (!ship)
            throw new Error("Ship not selected (ship = " + ship + "). Allowed Upgrade Cards could not be determined");

        if (!faction)
            throw new Error("Faction not selected (faction = " + faction + "). Upgrade Cards could not be determined");

        // Handle faction
        var allowedUpgradeCards = allUpgradeCards.filter(card => card.factions.includes(faction.name));

        // Handle class
        allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForClasses.includes(ship.class));

        // Handle Flagship
        if (ship.isFlagship)
            allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForFlagship);

         let sorted = allowedUpgradeCards.sort((a, b) => a.cost < b.cost ? -1 : 1)
                                   .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)); // Sort same cost alphabetically
         
         return copy(sorted);
        }
};

function copy(cardsToCopy) {
    return cardsToCopy = [...cardsToCopy].map(card => { return Object.assign({}, card); });
  };

export default upgradeCardsProvider;
