import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import { Typography } from "@material-ui/core";

function SquadronCost(props) {
  const { squadron, onCostChanged } = props;

  const [squadronCost, setSquadronCost] = useState(0); // Set default if squad is loaded

  useEffect(() => {
    if (!squadron.gameMode || !squadron.faction || !squadron.admiral) return;

    var newCost = 0;
    newCost = newCost + squadron.admiral.cost;

    if (squadron.ships)
      squadron.ships.forEach((ship) => {
        var newCostOfShip = ship.cost;
        newCostOfShip = ship.commander
          ? ship.commander.cost + newCostOfShip
          : newCostOfShip;
        newCostOfShip = ship.skillLevel
          ? newCostOfShip + ship.skillLevel.cost
          : newCostOfShip;
        newCostOfShip = ship.upgradeCard1
          ? newCostOfShip + ship.upgradeCard1.cost
          : newCostOfShip;
        newCostOfShip = ship.upgradeCard2
          ? newCostOfShip + ship.upgradeCard2.cost
          : newCostOfShip;

        ship.upgrades
          .filter((upgrade) => upgrade.selected)
          .forEach((upgrade) => {
            newCostOfShip = newCostOfShip + upgrade.cost;
          });

        newCost += newCostOfShip;
      });

    setSquadronCost(newCost);
    onCostChanged(newCost);
  }, [squadron]);

  return (
    <div>
      <Typography variant="subtitle1">
        {squadron.gameMode
          ? "( " + squadronCost + "/" + squadron.gameMode.maxPoints + "points )"
          : " ( 0/0 points )"}
      </Typography>
    </div>
  );
}

SquadronCost.propTypes = {
  squadron: Proptypes.object.isRequired,
  onCostChanged: Proptypes.func,
};

export default SquadronCost;
