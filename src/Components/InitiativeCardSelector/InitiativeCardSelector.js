import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import initiativeCardsProvider from "../../Providers/initiativeCardsProvider.js";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Alert from "@material-ui/lab/Alert";
import util from "./util";

function InitiativeCardSelector(props) {
  const {
    open,
    onSave,
    onCancel,
    faction,
    admiral,
    ships,
    selectedInitiativeCards,
  } = props;
  const [maxHandSize, setMaxHandSize] = useState(() => {
    return admiral.admiralValue + 5;
  });

  const [availableInitiativeCards, setAvailableInitiativeCards] = useState(
    () => {
      if (selectedInitiativeCards.length > 0) {
        var newList = initiativeCardsProvider
          .allowed(faction, admiral, ships)
          .map((initiativeCard) => {
            let match = selectedInitiativeCards.find(
              (card) => card.name === initiativeCard.name
            );
            if (match) {
              match.selected = true;
              return match;
            }
            return initiativeCard;
          });

        return newList;
      } else return [];
    }
  );
  const [autoIncludedCards, setAutoIncludedCards] = useState(() => {
    return selectedInitiativeCards
      ? selectedInitiativeCards.filter((card) => card.autoInclude)
      : [];
  });

  useEffect(() => {
    if (faction && admiral) {
      let allowedCards;

      if (selectedInitiativeCards.length > 0) {
        var newList = initiativeCardsProvider
          .allowed(faction, admiral, ships)
          .map((initiativeCard) => {
            let match = selectedInitiativeCards.find(
              (card) => card.name === initiativeCard.name
            );
            if (match) {
              match.selected = true;
              return match;
            }
            return initiativeCard;
          });

        allowedCards = newList;
      } else
        allowedCards = initiativeCardsProvider.allowed(faction, admiral, ships);

      setAutoIncludedCards(allowedCards.filter((card) => card.autoInclude));
      setAvailableInitiativeCards(
        allowedCards.filter((card) => !card.autoInclude)
      );
      setMaxHandSize(5 + admiral.admiralValue);
    } else {
      setAutoIncludedCards([]);
      setAvailableInitiativeCards([]);
    }
  }, [faction, admiral, ships, selectedInitiativeCards]);

  useEffect(() => {
    util.enforceHandRestrictions(
      availableInitiativeCards,
      admiral,
      faction,
      maxHandSize
    );
  }, [availableInitiativeCards]);

  const handleListItemClick = (cardToAdd) => {
    setAvailableInitiativeCards(
      TryToAddCardAndEnforceHandRestrictions(cardToAdd)
    );
  };

  const TryToAddCardAndEnforceHandRestrictions = (cardToAdd) => {
    cardToAdd.selected = !cardToAdd.selected;

    let legalHand = availableInitiativeCards.map((card) =>
      card.name === cardToAdd.name ? cardToAdd : card
    );

    util.enforceHandRestrictions(legalHand, admiral, faction, maxHandSize);

    return legalHand;
  };

  const handleSave = () => {
    onSave(
      availableInitiativeCards
        .filter((card) => card.selected)
        .concat(autoIncludedCards)
    );
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle> Choose initiative Cards </DialogTitle>
      <DialogContent>
        <Alert severity="info">
          <Typography style={{ whiteSpace: "pre-line" }} variant="body2">
            {"Your hand must include " +
              maxHandSize +
              " cards (5 + ADMIRAL " +
              admiral.admiralValue +
              ").\n"}
            {autoIncludedCards.map((card) => (
              <b> {card.name + ","} </b>
            ))}
            {autoIncludedCards.length > 0 &&
              " will be added when selection is done"}
          </Typography>
        </Alert>

        <List>
          {availableInitiativeCards.map((card) => (
            <ListItem
              disabled={card.disabled}
              key={card.name + card.selected}
              dense
              button
              onClick={() => handleListItemClick(card)}
            >
              <Checkbox
                key={card.name + card.selected}
                edge="start"
                checked={card.selected}
                disableRipple
                onClick={() => {}}
              />
              <ListItemText
                primary={
                  card.name +
                  " ( ADMIRAL " +
                  card.initiativeValue +
                  " | " +
                  (card.discardedAfterUse ? "Discarded | " : "") +
                  card.faction +
                  " )"
                }
              />{" "}
              {/*"TODO put in columns"*/}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}

InitiativeCardSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  faction: PropTypes.object.isRequired,
  admiral: PropTypes.object.isRequired,
  ships: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  selectedInitiativeCards: PropTypes.array,
};

export default InitiativeCardSelector;
