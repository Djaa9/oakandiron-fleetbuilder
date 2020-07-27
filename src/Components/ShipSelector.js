import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shipProvider from '../Providers/shipProvider';
import { Dialog, DialogTitle, List, ListItem, makeStyles } from '@material-ui/core';

function ShipSelector(props) {
  
  const useStyles = makeStyles((theme) => ({
    shipList: {
      padding: theme.spacing(2)
  }
  }));

  const classes = useStyles();

  const { open, onClose, faction, admiral, gameMode } = props;

  const [availableShips, setAvailableShips] = useState([]);

useEffect(()=> {
  if(gameMode && faction && admiral)
    setAvailableShips(shipProvider.allowed(gameMode, faction, admiral));
}, [admiral, faction, gameMode])

  const handleListItemClick = (ship) => {
    onClose(ship);
  };

  const handleOnClose = () => {
    onClose(null);
  };

  return (
    <Dialog onClose={handleOnClose} open={open}>
      <DialogTitle> Choose ship </DialogTitle>
      <List className={classes.shipList}>
        {availableShips.map((ship) => <ListItem key={ship.name} button onClick={() => handleListItemClick(ship)}>
          {ship.name + " (+" + ship.cost + ")"}
        </ListItem>
        )}
      </List>
    </Dialog>
  );
};

ShipSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired,
  gameMode: PropTypes.object.isRequired
};

export default ShipSelector;