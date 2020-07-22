import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initiativeCards } from '../data/initiativeCards';
import { Dialog, DialogTitle, List, ListItem, DialogContent, DialogActions, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

function InitiativeCardSelector(props) {

  const { open, onClose, faction, admiral } = props;

  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [checked, setChecked] = React.useState([0]);

  useEffect(() => {
        /*Update available initiative cards*/
        var initiativeCardsForFaction = initiativeCards.filter(card => card.factions.includes(faction.name));
        setAvailableInitiativeCards(initiativeCardsForFaction);
  }, [faction, admiral]);

  const handleListItemClick = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOnClose = () => {
    onClose(null);
  };

  const handleOk = () => {
    onClose(null);
  };

  const handleCancel = () => {
    onClose(null);
  };
  return (
    <Dialog onClose={handleOnClose} open={open}>
      <DialogTitle> Choose initiative Cards </DialogTitle>  
      <DialogContent>
      <List>
      {availableInitiativeCards.map((card)=> (

                  <ListItem key={card.name} dense button onClick={handleListItemClick(card)}>
  
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(card) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
  
              <ListItemText primary={card.name + " (" + card.initiativeValue + ") [" + card.mainFaction + "]"} />
            </ListItem>
      ))}
    </List>
    </DialogContent>
    <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InitiativeCardSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  selectionDone: PropTypes.func.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired
};

export default InitiativeCardSelector;
