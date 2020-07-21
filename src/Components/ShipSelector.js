import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, List, ListItem } from '@material-ui/core';

function ShipSelector(props) {
  //const classes = useStyles();
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
      <List>
        {availableShips.map((ship) => <ListItem key={ship.name} button onClick={() => handleListItemClick(ship)}>
          {ship.name}
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