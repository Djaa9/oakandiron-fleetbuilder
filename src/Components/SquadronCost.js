import React, { useState, useEffect} from 'react';
import Proptypes from 'prop-types';
import { Typography } from '@material-ui/core';

function SquadronCost(props) {

    const { squadron } = props;

    const [squadronCost, setSquadronCost] = useState(0);

    useEffect(() => {

        if (squadron.gameMode && squadron.faction) {
            var newCost = 0;
            newCost = newCost + squadron.admiral.cost;
      
            squadron.ships.forEach(ship => { 

              var newCostOfShip = 0;
              newCostOfShip = ship.commander ? ship.commander.cost + newCostOfShip : newCostOfShip;
              newCostOfShip = ship.skillLevel ? newCostOfShip + ship.skillLevel.cost : newCostOfShip;
              newCostOfShip = ship.upgradeCard1 ? newCostOfShip + ship.upgradeCard1.cost : newCostOfShip;
              newCostOfShip = ship.upgradeCard2 ? newCostOfShip + ship.upgradeCard2.cost : newCostOfShip;
      
              ship.upgrades.filter(upgrade => upgrade.selected).forEach(upgrade => {
                  newCostOfShip = newCostOfShip + upgrade.cost;
              });

              newCost += newCostOfShip;
            });
          };

        setSquadronCost(newCost);
    }, [squadron])

    return (
        <div>
            <Typography variant="subtitle1">
                {squadron.gameMode ? "( " + squadronCost + "/" + squadron.gameMode.maxPoints + "points )" : " ( 0/0 points )"}
            </Typography>
        </div>
    );
};

SquadronCost.propTypes = {
    squadron: Proptypes.object
}

export default SquadronCost;

        