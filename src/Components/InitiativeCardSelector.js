import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import initiativeCardsProvider from '../Providers/initiativeCardsProvider.js';
import { Dialog, DialogTitle, List, ListItem, DialogContent, DialogActions, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { factionTypes } from '../Data/factionTypes.js';

function InitiativeCardSelector(props) {

  const useStyles = makeStyles((theme) => ({
    warningAlert: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();
  const { open, onClose, faction, admiral } = props;

  const [previouslySelectedInitiativeCards, setPreviouslySelectedInitiativeCards] = useState([]);
  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [maxHandSize, setMaxHandSize] = React.useState(0);

  useEffect(() => {
    if (faction && admiral) {
      let listWithAutoincludeHandled = initiativeCardsProvider.allowed(faction, admiral);
  
      listWithAutoincludeHandled.filter(card => card.autoInclude)
        .forEach(card => {
            card.selected = true;
            card.disabled = true;
        });
  
      setAvailableInitiativeCards(listWithAutoincludeHandled);
      setMaxHandSize(5 + admiral.admiralValue);
    }
  }, [faction, admiral]);

  const handleListItemClick = (checkedCard) => {

    checkedCard.selected = !checkedCard.selected;

    let newListOfCards = availableInitiativeCards.map(card => card.name === checkedCard.name ? checkedCard : card);

    // Remove cards that are added after restricitons are enforced
    // newListOfCards = newListOfCards.filter(card => !card.autoInclude);

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

    // INSERT Interprid and Doughty

    setAvailableInitiativeCards(newListOfCards);
  };

  const handleOnClose = () => {
    onClose([]);
  };

  const handleOk = () => {
    onClose(availableInitiativeCards);
  };

  const handleCancel = () => {
    onClose(availableInitiativeCards);
  };
  return (
    <Dialog onClose={handleOnClose} open={open}>
      <DialogTitle> Choose initiative Cards </DialogTitle>
      <DialogContent>
        <Alert severity="info"> {"Your hand must include " + maxHandSize + " cards (5 + ADMIRAL " + admiral.admiralValue + ")"} </Alert>
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
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InitiativeCardSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired
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
