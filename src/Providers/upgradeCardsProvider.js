import { allUpgradeCards } from "../Data/upgradeCards";

const upgradeCardsProvider = {
    allowed: function (faction, ship, isFlagship) {
        if (!ship)
            throw new Error("Ship not selected (ship = " + ship + "). Allowed Upgrade Cards could not be determined");

        if (isFlagship === "undefined" || isFlagship === "" || isFlagship === null)
            throw new Error("Flagship not selected (flagship = " + isFlagship + "). Upgrade Cards could not be determined");

        if (!faction)
            throw new Error("Faction not selected (faction = " + faction + "). Upgrade Cards could not be determined");

        // Handle faction
        var allowedUpgradeCards = allUpgradeCards.filter(card => card.factions.includes(faction.name));

        // Handle class
        allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForClasses.includes(ship.class));

        // Handle Flagship
        if (isFlagship)
            allowedUpgradeCards = allowedUpgradeCards.filter(card => !card.notAllowedForFlagship);

        return allowedUpgradeCards.sort((a, b) => a.name.localeCompare(b.name));
    }
};
export default upgradeCardsProvider;
