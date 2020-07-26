import { allUpgradeCards } from "../Data/upgradeCards";
const upgradeCardsProvider = {
    allowed: function (faction, ship, flagship) {
        if (!ship)
            throw new Error("Ship not selected (ship = " + ship + "). Allowed Upgrade Cards could not be determined");

        if (flagship === "undefined" || flagship === "" || flagship === null)
            throw new Error("Flagship not selected (flagship = " + flagship + "). Upgrade Cards could not be determined");

        if (!faction)
            throw new Error("Faction not selected (faction = " + faction + "). Upgrade Cards could not be determined");

        // Handle faction
        var allowedUpgradeCards = allUpgradeCards.filter(card => card.factions.includes(faction.name));
        console.log(allowedUpgradeCards);
        // Handle class
        allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForClasses.includes(ship.class));
        console.log(allowedUpgradeCards);
        // Handle Flagship
        if (flagship === true)
            allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForFlagship);

        console.log(allowedUpgradeCards);
        return allowedUpgradeCards;
    }
};
export default upgradeCardsProvider;
