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
import Ships from './data/ships.js'
import { grey } from '@material-ui/core/colors';

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
      margin: theme.spacing(2)
    },
    shipsBg: {
      backgroundColor: grey[300]
    },
    costLabel: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedAdmiral, setSelectedAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);
  const [cost, SetCost] = useState(0);

  useEffect(() => {
    console.log("mode, faction or admiral changed");

    //TODO Confirmation dialog
    //setSelectedShips([]);

    /*Update available admirals*/
    var admiralsInFaction = admirals.filter(admiral => admiral.factions.includes(selectedFaction.name));
    setAvailableAdmirals(admiralsInFaction);

    /*Update available initiative cards*/
    var initiativeCardsForFaction = initiativeCards.filter(card => card.factions.includes(selectedFaction));
    setAvailableInitiativeCards(initiativeCardsForFaction);

    /*Update available ships*/
    if (selectedGameMode && selectedFaction && selectedAdmiral) {
      var shipsForFaction = Ships.allowed(selectedGameMode, selectedFaction, selectedAdmiral);
      setAvailableShips(shipsForFaction);
    }

  }, [selectedFaction, selectedAdmiral, selectedGameMode]);

  useEffect(() => {
    // Calculate cost
    if (selectedGameMode && selectedFaction && selectedGameMode) {
      console.log("Calculating cost", selectedShips);

      var newCost = 0;
      newCost = newCost + selectedAdmiral.cost;

      selectedShips.forEach(ship => {
        newCost = newCost + ship.cost;
      });

      SetCost(newCost);
    };
  })

  const handleGameModeChange = (event) => {
    console.log(event.target);
    setSelectedGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    setSelectedFaction(event.target.value);
  };

  const handleAdmiralChange = (event) => {
    setSelectedAdmiral(event.target.value);
  };

  const handleRemoveShip = (shipToRemove) => {
    var newSelectionOfShips = selectedShips;

    var indexOfShipToRemove = newSelectionOfShips.indexOf(shipToRemove);
    newSelectionOfShips.splice(indexOfShipToRemove, 1);
    setSelectedShips(newSelectionOfShips);
  };

  const handleAddShip = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (!shipToAdd)
      return;

    var newSelectionOfShips = selectedShips;
    newSelectionOfShips.push(shipToAdd);
    setSelectedShips(newSelectionOfShips);

    console.log("ship added", shipToAdd, newSelectionOfShips);
  };

  const handleOpenShipSelector = (event) => {
    setShipSelectorIsOpen(true);
  };

  return (
    <div className="App">
      <span className={classes.costLabel}>
        {cost + "/" + selectedGameMode.maxPoints}
      </span>
      <FormControl className={classes.formControl}>
        <InputLabel>Choose game Mode</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Game Mode"
          value={selectedGameMode}
          onChange={handleGameModeChange}>
          {gameModes.map((gameMode) => (
            <MenuItem key={gameMode.name} value={gameMode}>
              {gameMode.name + " (" + gameMode.maxPoints + " Points)"}
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
          value={selectedFaction}>
          {factions.map((faction) => (
            <MenuItem key={faction.name} value={faction}>
              {faction.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Choose Admiral</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Admiral"
          disabled={!selectedFaction}
          value={selectedAdmiral}
          onChange={handleAdmiralChange}>
          {availableAdmirals.map(admiral => (
            <MenuItem key={admiral.name} value={admiral}>
              {admiral.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />

      <Grid
        className={classes.shipsBg}
        container
        direction="column"
        justify="center"
        alignItems="flex-start">
        {selectedShips.map(ship => (
          <Card className={classes.card}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start">
              <Grid>
                {ship.name + " (+" + ship.cost + ")"}
                <FormControlLabel
                  control={
                    <Checkbox name="flagship" />}
                  label="Flagship"
                />
              </Grid>

              <FormControl>
                <FormGroup>
                  {ship.upgrades.map(upgrade =>
                    <FormControlLabel
                      control={
                        <Checkbox name={upgrade.name} />}
                      label={upgrade.name + " (+ " + upgrade.cost + ")"}
                    />
                  )}

                </FormGroup>

              </FormControl>
              <Divider />


            </Grid>
          </Card>)
        )}

        <Divider />

        <Button
          className={classes.addShipButton}
          variant="contained"
          onClick={handleOpenShipSelector}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}>
          Add Ship
      </Button>
        <ShipSelector open={shipSelectorIsOpen} availableShips={availableShips} selectionDone={handleAddShip}></ShipSelector>

      </Grid>

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
                  <Checkbox name={card.name} />}
                label={card.name + " (" + card.initiativeValue + ") (" + card.mainFaction + ")"}
              />
            )}

          </FormGroup>
        </FormControl>

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