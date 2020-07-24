import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import initiaTiveCardsProvider from 'Providers/initiativeCardsProvider.js';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

function InitiativeCardSelector(props) {
  const { open, onClose, faction, admiral } = props;

  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    console.log('update ic selection', admiral, faction);
    const allowedInitiativeCards = initiaTiveCardsProvider.allowed(faction);
    console.log(allowedInitiativeCards);
    setAvailableInitiativeCards(allowedInitiativeCards);
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
    onClose(checked);
  };

  const handleOk = () => {
    onClose(checked);
  };

  const handleCancel = () => {
    onClose(checked);
  };
  return (
    <Dialog onClose={handleOnClose} open={open}>
      <DialogTitle> Choose initiative Cards </DialogTitle>
      <DialogContent>
        <List>
          {availableInitiativeCards.map((card) => (
            <ListItem
              key={card.name}
              dense
              button
              onClick={handleListItemClick(card)}
            >
              <Checkbox
                edge='start'
                checked={checked.indexOf(card) !== -1}
                tabIndex={-1}
                disableRipple
              />

              <ListItemText
                primary={
                  card.name +
                  ' (+' +
                  card.initiativeValue +
                  ') [' +
                  card.faction +
                  ']'
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary'>
          Choose
        </Button>
      </DialogActions>
    </Dialog>
  );
}

InitiativeCardSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired,
};

export default InitiativeCardSelector;
