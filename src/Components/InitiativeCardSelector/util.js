import { factionTypes } from "../../data/factionTypes.js";

const util = {
  enforceHandRestrictions: (listToEnforce, admiral, faction, maxHandSize) => {
    if (listToEnforce.filter((card) => card.selected).length >= maxHandSize) {
      // If there are more cards selected than the max handsize.
      listToEnforce.forEach((card) => {
        if (!card.selected) card.disabled = true;
      }); // Then disable all non selected cards
    } else {
      listToEnforce.forEach((card) => {
        if (!card.selected) card.disabled = false;
      }); // Else enable all non selected cards

      let listOfListOfCardsByValue = groupBy(listToEnforce, "initiativeValue");

      // If there are more than 2 cards of a cost selected Then disable all non selected cards of that cost
      listOfListOfCardsByValue.forEach((list) => {
        if (list.filter((card) => card.selected).length >= 2)
          list.forEach((card) => {
            if (!card.selected) card.disabled = true;
          });

        // If more discardedAfterUse cards are selected there won't be room for 3 non discardedAfterUse cards
        if (
          listToEnforce.filter(
            (card) => card.selected && card.discardedAfterUse
          ).length >=
          maxHandSize - 3
        )
          listToEnforce.forEach((card) => {
            if (card.discardedAfterUse && !card.selected) card.disabled = true;
          });

        // Admirals with Buccaneer Tactics can choose 1 Pirate card
        if (
          admiral.keywords.find((keyword) => keyword === "Buccaneer Tactics") &&
          listToEnforce.filter(
            (card) => card.faction === "Pirate" && card.selected
          ).length >= 1
        )
          //TODO changes type of faction from string to enum
          listToEnforce.forEach((card) => {
            if (card.faction === "Pirate" && !card.selected)
              card.disabled = true;
          }); //TODO changes type of faction from string to enum

        // Pirates can only choose from 1 other faction
        let otherFactionCard = listToEnforce.find(
          (card) => card.selected && card.faction !== "All"
        );
        let otherFaction = otherFactionCard ? otherFactionCard.faction : null;
        if (faction.type === factionTypes.PIRATE && otherFaction) {
          listToEnforce
            .filter(
              (card) =>
                card.faction !== otherFaction &&
                card.faction !== "Pirate" &&
                card.faction !== "All"
            )
            .forEach((card) => {
              if (!card.selected) card.disabled = true;
            });
        }
      });
    }
  },
};

function groupBy(arr, property) {
  return Object.values(
    arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);

      return memo;
    }, {})
  );
}

export default util;
