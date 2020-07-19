import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, Card, Divider, Button, InputLabel, Dialog, DialogTitle, List, ListItem, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { admirals } from './data/admirals.js'
import { factions } from './data/factions.js'
import { initiativeCards } from './data/initiativeCards.js'
import { gameModes } from './data/gameModes.js'
import { allShips } from './data/ships.js'

function App() {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    card: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    addShipButton: {
      margin: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  const [faction, setFaction] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [admiral, setAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);

  useEffect(() => {

    /*Update available admirals for new faction*/
    var admiralsInFaction = admirals.filter(admiral => admiral.factions.includes(faction));
    setAvailableAdmirals(admiralsInFaction);

    /*Update available initiative cards for new faction*/
    var initiativeCardsForFaction = initiativeCards.filter(card => card.factions.includes(faction));
    setAvailableInitiativeCards(initiativeCardsForFaction);

    /*Update available ships*/
    var shipsForFaction = allShips.filter(ship => ship.factions.includes(faction));
    setAvailableShips(shipsForFaction);
  },
    [faction]);

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    setFaction(event.target.value);
  };

  const handleAdmiralChange = (event) => {
    setAdmiral(event.target.value);
  };

  const handleAddShip = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (shipToAdd === null || "")
      return;

    var newSelectionOfShips = selectedShips;
    newSelectionOfShips.push(shipToAdd);
    setSelectedShips(newSelectionOfShips);
  };

  const handleOpenShipSelector = (event) => {
    setShipSelectorIsOpen(true);
  };

  return (
    <div className="App">

      <FormControl className={classes.formControl}>
        <InputLabel>Choose game Mode</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Game Mode"
          value={gameMode}
          onChange={handleGameModeChange}>
          {gameModes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Choose Faction</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Choose a faction"
          onChange={handleFactionChange}
          value={faction}>
          {factions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 
      {faction === "Pirate" ? (
        <FormControl className={classes.formControl}>
          <InputLabel>Choose Pirate Faction</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            value={faction}
            label="Select faction">
            {factions.filter(x => x.name !== "Pirate").map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
            ) : null} 
      */}

      <FormControl className={classes.formControl}>
        <InputLabel>Choose Admiral</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Admiral"
          disabled={faction === ""}
          value={admiral}
          onChange={handleAdmiralChange}>
          {availableAdmirals.map((option) => (
            <MenuItem key={option.name} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Available Initiative Cards</FormLabel>
        <FormGroup>
          {availableInitiativeCards.map(card =>
            <FormControlLabel
              control={
              <Checkbox name="card.name" />}
              label={card.name + " (" + card.initiativeValue + ")" + " (" + card.mainFaction + ")"}
            />
          )}

        </FormGroup>
      </FormControl>
    </Grid>

      <Divider />

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start">
        {selectedShips.map(ship => (
          <Card className={classes.card}>{ship.name}</Card>)
        )}


        <Button
          className={classes.addShipButton}
          variant="contained"
          onClick={handleOpenShipSelector}
          disabled={faction === ""}>
          Add Ship
      </Button>
        <ShipSelector open={shipSelectorIsOpen} availableShips={availableShips} selectionDone={handleAddShip}></ShipSelector>

      </Grid>
    </div>
  );
}

export default App;


function ShipSelector(props) {
  //const classes = useStyles();
  const { open, selectionDone, availableShips } = props;

  const handleListItemClick = (value) => {
    selectionDone(value);
  };

  return (
    <Dialog onClose={selectionDone} open={open}>
      <DialogTitle> Choose ship </DialogTitle>
      <List>
        {availableShips.map((ship) =>
          <ListItem key={ship.name} button onClick={() => handleListItemClick(ship)}>
            {ship.name}
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}

ShipSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  selectionDone: PropTypes.func.isRequired,
  availableShips: PropTypes.array
};