import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, Card, Divider, Button, InputLabel, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Admirals from './data/admirals';
import { factions } from './data/factions';
import { gameModes } from './data/gameModes';
import Ships from './data/ships.js';
import { grey } from '@material-ui/core/colors';
import ShipSelector from './Components/ShipSelector';
import InitiativecardSelector from './Components/InitiativeCardSelector';
import Ship from './Components/Ship.js';

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
    },
    divider: {
      color: "#000000"
    }
  }));

  const classes = useStyles();

  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedAdmiral, setSelectedAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);
  const [initiativeCardSelectorIsOpen, setInitiativeCardSelectorIsOpen] = useState(false);
  const [cost, setCost] = useState(0);
  const [shipIdCounter, setShipIdCounter] = useState(0);


  useEffect(() => {
    console.log(selectedFaction);
    //TODO Confirmation dialog
    setSelectedShips([]);

    /*Update available admirals*/
    if(selectedFaction) {
      var admiralsInFaction = Admirals.allowed(selectedFaction);
      setAvailableAdmirals(admiralsInFaction);
    };

    /*Update available ships*/
    if (selectedGameMode && selectedFaction && selectedAdmiral) {
      var shipsForFaction = Ships.allowed(selectedGameMode, selectedFaction, selectedAdmiral);
      setAvailableShips(shipsForFaction);
    };

  },[selectedFaction, selectedAdmiral, selectedGameMode]);

  useEffect(() => {
    // Calculate cost
    if (selectedGameMode && selectedFaction && selectedGameMode) {

      var newCost = 0;
      newCost = newCost + selectedAdmiral.cost;

      selectedShips.forEach(ship => {
        newCost = newCost + ship.costIncludingUpgrades;
      });

      setCost(newCost);
    };
  },[JSON.stringify(selectedShips), selectedAdmiral]);

  const handleGameModeChange = (event) => {
    setSelectedGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    setSelectedFaction(event.target.value);
  };

  const handleAdmiralChange = (event) => {
    setSelectedAdmiral(event.target.value);
  };

  const handleRemoveShip = (shipToRemove) => {
    var newSelectionOfShips = selectedShips.filter(ship => ship.id !== shipToRemove.id);
    setSelectedShips(newSelectionOfShips);
  };

const handleInitiativeCardSelectorFlowDone = () => {
    setInitiativeCardSelectorIsOpen(false);
};

  const handleShipSelectorFlowDone = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (!shipToAdd)
      return;

    shipToAdd.id = shipIdCounter;
    shipToAdd.id++;
    setShipIdCounter(shipToAdd.id);

    var newSelectionOfShips = selectedShips;
    newSelectionOfShips.push(shipToAdd);
    setSelectedShips(newSelectionOfShips);
  };

  const handleOpenShipSelector = () => {
    setShipSelectorIsOpen(true);
  };

  const handleOpenInitiativeCardSelector = () => {
    setInitiativeCardSelectorIsOpen(true);
  };

  const handleShipCostUpdated = (shipId, newCost) => {
    var updatedListOfSelectedShips = selectedShips.map(ship => {
      if(ship.id == shipId)
        ship.costIncludingUpgrades = newCost;
        
        return ship;
    });

    setSelectedShips(updatedListOfSelectedShips);
  };

  return (
    <div className="App">

      {selectedGameMode ? (
      <h2 className={classes.costLabel}>
        {cost + "/" + selectedGameMode.maxPoints}
      </h2>
      ) : (<h2 className={classes.costLabel}>
        {"0/0"}
      </h2>)}

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
          <Ship ship={ship} faction={selectedFaction} removeShip={handleRemoveShip} costUpdated={handleShipCostUpdated}/>
          )
        )}

        <Divider />

        <Button
          className={classes.addShipButton}
          variant="containedPrimary"
          onClick={handleOpenShipSelector}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}>
          Add Ship
      </Button>
        <ShipSelector open={shipSelectorIsOpen} availableShips={availableShips} onClose={handleShipSelectorFlowDone}></ShipSelector>
      
      <Divider className={classes.divider}/>

      <Button
          className={classes.addShipButton}
          variant="containedPrimary"
          onClick={handleOpenInitiativeCardSelector}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}>
          Choose Initiative Cards
      </Button>
        <InitiativecardSelector open={initiativeCardSelectorIsOpen} faction={selectedFaction} admiral={selectedAdmiral} onClose={handleInitiativeCardSelectorFlowDone}></InitiativecardSelector>
    </Grid>
    </div>
  );
}

export default App;