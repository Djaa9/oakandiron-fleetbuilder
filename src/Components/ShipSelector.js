import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, List, ListItem, makeStyles } from '@material-ui/core';

function ShipSelector(props) {
  
  const useStyles = makeStyles((theme) => ({
    shipList: {
      padding: theme.spacing(2)
  }
  }));

  const classes = useStyles();
  const { open, onClose, availableShips } = props;

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
  selectionDone: PropTypes.func.isRequired,
  availableShips: PropTypes.array
};

export default ShipSelector;