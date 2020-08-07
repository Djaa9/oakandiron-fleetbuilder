import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import initiativeCardsProvider from '../Providers/initiativeCardsProvider.js';
import { Dialog, DialogTitle, List, ListItem, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import { factionTypes } from '../Data/factionTypes.js';

function InitiativeCardSelector(props) {

  const { open, onSave, onCancel, faction, admiral } = props;

  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [autoIncludedCards, setAutoIncludedCards] = useState([]);
  const [maxHandSize, setMaxHandSize] = useState(0);

  useEffect(() => {
    console.log("InitiativeCardSelector adm or fac changed", admiral, faction);

    if (faction && admiral) {
      let allowedCards = initiativeCardsProvider.allowed(faction, admiral);
      setAutoIncludedCards(allowedCards.filter(card => card.autoInclude))  
      setAvailableInitiativeCards(allowedCards.filter(card => !card.autoInclude));
      setMaxHandSize(5 + admiral.admiralValue);
    }
    else {
      setAutoIncludedCards([])  
      setAvailableInitiativeCards([]);
    }

  }, [faction, admiral]);

  const handleListItemClick = (checkedCard) => {
    checkedCard.selected = !checkedCard.selected;

    let newListOfCards = availableInitiativeCards.map(card => card.name === checkedCard.name ? checkedCard : card);

    if (newListOfCards.filter(card => card.selected).length >= maxHandSize) // If there are more cards selected than the max handsize. 
      newListOfCards.forEach(card => { if (!card.selected) card.disabled = true }); // Then disable all non selected cards
    else {
      newListOfCards.forEach(card => { if (!card.selected) card.disabled = false }); // Else enable all non selected cards

      let listOfListOfCardsByValue = groupBy(newListOfCards, "initiativeValue");

      // If there are more than 2 cards of a cost selected Then disable all non selected cards of that cost
      listOfListOfCardsByValue.forEach(list => {
        if (list.filter(card => card.selected).length >= 2)
          list.forEach(card => { if (!card.selected) card.disabled = true });

        // If more discardedAfterUse cards are selected there won't be room for 3 non discardedAfterUse cards
        if (newListOfCards.filter(card => card.selected && card.discardedAfterUse).length >= (maxHandSize - 3))
          newListOfCards.forEach(card => { if (card.discardedAfterUse && !card.selected) card.disabled = true })

        // Admirals with Buccaneer Tactics can choose 1 Pirate card
        if (admiral.keywords.find(keyword => keyword === "Buccaneer Tactics") && (newListOfCards.filter(card => card.faction === "Pirate" && card.selected).length >= 1))  //TODO changes type of faction from string to enum
          newListOfCards.forEach(card => { if (card.faction === "Pirate" && !card.selected) card.disabled = true })  //TODO changes type of faction from string to enum

        // Pirates can only choose from 1 other faction
        let otherFactionCard = newListOfCards.find(card => card.selected && card.faction !== "All");
        let otherFaction = otherFactionCard ? otherFactionCard.faction : null;
        if (faction.type === factionTypes.PIRATE && otherFaction) {
          newListOfCards.filter(card => card.faction !== otherFaction && card.faction !== "Pirate" && card.faction !== "All").forEach(card => { if (!card.selected) card.disabled = true })
        }
      });
    }

    setAvailableInitiativeCards(newListOfCards);
  };

  const handleSave = () => {
    onSave(availableInitiativeCards.filter(card => card.selected).concat(autoIncludedCards));
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle> Choose initiative Cards </DialogTitle>
      <DialogContent>
        <Alert severity="info"> 
              <Typography style={{whiteSpace: 'pre-line'}} variant="body2">
              {"Your hand must include " + maxHandSize + " cards (5 + ADMIRAL " + admiral.admiralValue + ").\n"}
              {autoIncludedCards.map(card => (<b> {card.name} </b> )) }{autoIncludedCards.length > 0 && " will be added when selection is done"} 
              </Typography>
        </Alert>

        <List>
          {availableInitiativeCards.map((card) => (
            <ListItem disabled={card.disabled} key={card.name + card.selected} dense button onClick={() => handleListItemClick(card)}>
              <Checkbox
                key={card.name + card.selected}
                edge="start"
                checked={card.selected}
                disableRipple
                onClick={() => { }}
              />
              <ListItemText primary={card.name + " ( ADMIRAL " + card.initiativeValue + " | " + (card.discardedAfterUse ? "Discarded | " : "") + card.faction + " )"} /> {/*"TODO put in columns"*/}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="secondary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InitiativeCardSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func
};

function groupBy(arr, property) {
  return Object.values(arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);

    return memo;
  }, {}));
}

export default InitiativeCardSelector;
