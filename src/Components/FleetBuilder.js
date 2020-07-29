import React, { useState, useEffect, } from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { factions } from '../Data/factions';
import { gameModes } from '../Data/gameModes';
import { Typography, List, ListItem, ListItemText, MenuItem, Divider, Button, InputLabel, Grid, Toolbar } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Admirals from "../Providers/admiralsProvider";
import { grey } from '@material-ui/core/colors';
import ShipSelector from './ShipSelector';
import InitiativecardSelector from './InitiativeCardSelector';
import Ship from './Ship.js';
import { AppBar } from '@material-ui/core';

function FleetBuilder(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    sectionContainer: {
      backgroundColor: grey[200],
      padding: theme.spacing(2)
    },
    sectionHeader: {
      margin: theme.spacing(2),
      marginBottom: 0
    },
    sectionSubHeader: {
      margin: theme.spacing(2),
      marginTop: 0
    },
    addButton: {
      margin: theme.spacing(2)
    },
    costLabel: {
      margin: theme.spacing(1)
    },
    divider: {
      color: "#000000"
    },
    scrollableContainer: {
      "overflow-y": "auto"
    },
    title: {
      flexGrow: 1
    },
    topForm: {
      margin: theme.spacing(2)
    }
  }));

  const classes = useStyles();
  const { fleet, onFleetChanged } = props;

  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedAdmiral, setSelectedAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmiral] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);
  const [initiativeCardSelectorIsOpen, setInitiativeCardSelectorIsOpen] = useState(false);
  const [selectedInitiativeCards, setSelectedInitiativeCards] = useState([]);
  const [cost, setCost] = useState(0);
  const [shipIdCounter, setShipIdCounter] = useState(0);

  /*Handles default fleet*/
  useEffect(() => {
    console.log("props changed in FleetBuilder:", fleet)

    if (fleet) {

      var importedFaction;

      fleet.forEach((fleetProp) => {

        if (fleetProp.gameMode) {
          var ImportedGameMode = gameModes.find(mode => mode.name === fleetProp.gameMode.name);
          setSelectedGameMode(ImportedGameMode);
          return;
        }
        if (fleetProp.faction) {
          var ImportedFaction = factions.find(faction => faction.name === fleetProp.faction.name);
          setSelectedFaction(ImportedFaction);
          importedFaction = ImportedFaction;
        }
        if (fleetProp.admiral) {
          var ImportedAdmiral = Admirals.allowed(importedFaction).find(admiral => admiral.name === fleetProp.admiral.name);
          setSelectedAdmiral(ImportedAdmiral);
        }
        if (fleetProp.ships){
          console.log("if(fleetProp.ships)", fleetProp);
          setSelectedShips(fleetProp.ships);
        }
        if (fleetProp.initiativeCards)
          setSelectedInitiativeCards(fleetProp.initiativeCards);
      }

      );
    }
  }, [fleet])

  useEffect(() => {
    console.log("FleetBuilder - somthings changed", onFleetChanged, selectedShips);
    
    if (onFleetChanged)
      onFleetChanged([{ gameMode: selectedGameMode }, { faction: selectedFaction }, { admiral: selectedAdmiral }, { ships: selectedShips }, { initiativeCards: selectedInitiativeCards }]);
  }, [selectedGameMode, selectedFaction, selectedAdmiral, JSON.stringify(selectedShips), selectedInitiativeCards]);

  useEffect(() => {
    /*Update available admirals*/
    if (selectedFaction)
      setAvailableAdmiral(Admirals.allowed(selectedFaction));
  }, [selectedFaction]);

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
  }, [JSON.stringify(selectedShips), selectedAdmiral]);

  const handleInitiativeCardSelectorFlowDone = (initiativecards) => {
    setInitiativeCardSelectorIsOpen(false);
    setSelectedInitiativeCards(initiativecards);
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

  const handleShipChanged = (updatedShip) => {
    console.log("handleShipChanged", updatedShip);

    var updatedListOfSelectedShips = selectedShips.map(ship => {
      if (ship.id === updatedShip.id)
          return updatedShip;
    });

    setSelectedShips(updatedListOfSelectedShips);
  };

  return (
    <div className={classes.root}>

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Oak And Iron Fleetbuilder
          </Typography>

          {selectedGameMode ? (
            <h3 className={classes.costLabel}>
              {"Fleet Cost: " + cost + "/" + selectedGameMode.maxPoints}
            </h3>
          ) : (<h3 className={classes.costLabel}>
            {"Fleet Cost: 0/0"}
          </h3>)}
        </Toolbar>

      </AppBar>

      <Grid className={classes.topForm} container>
        <FormControl className={classes.formControl}>
          <InputLabel>Choose Game Mode</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            label="Select Game Mode"
            value={selectedGameMode}
            onChange={(event) => setSelectedGameMode(event.target.value)}>
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
            onChange={(event) => setSelectedFaction(event.target.value)}
            value={selectedFaction}>
            {factions.map((faction) => (
              <MenuItem key={faction.type} value={faction}>
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
            onChange={(event) => setSelectedAdmiral(event.target.value)}>
            {availableAdmirals.map(admiral => (
              <MenuItem key={admiral.name} value={admiral}>
                {admiral.name + " (+" + admiral.cost + ")"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Divider />

      <Grid
        className={classes.sectionContainer}
        container
        spacing={2}
        direction="column"
        alignItems="flex-start">
        <Typography className={classes.sectionHeader} variant="h5">
          List of Ships
        </Typography>
        <Typography className={classes.sectionSubHeader} variant="h6">
          {selectedGameMode ? (" ( min: " + selectedGameMode.minShips + " max: " + selectedGameMode.maxShips + ")") : (null)}
        </Typography>
        <Grid container spacing={2}>
          {selectedShips.map(ship => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Ship
                ship={ship}                
                faction={selectedFaction}
                onShipChanged={handleShipChanged}
                removeShip={(shipToRemove) => setSelectedShips(selectedShips.filter(ship => ship.id !== shipToRemove.id))}/>
            </Grid>
          )
          )}
        </Grid>
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={() => setShipSelectorIsOpen(true)}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}>
          Add Ship
        </Button>

        {selectedGameMode && selectedFaction && selectedAdmiral &&
          <ShipSelector
            open={shipSelectorIsOpen}
            faction={selectedFaction}
            admiral={selectedAdmiral}
            gameMode={selectedGameMode}
            onClose={handleShipSelectorFlowDone} />}

      </Grid>

      <Divider />

      <Grid
        className={classes.sectionContainer}
        container
        spacing={2}
        direction="column"
        alignItems="flex-start">
        <Typography className={classes.sectionHeader} variant="h5">
          Initiative Cards
        </Typography>
        <List>
          {selectedInitiativeCards.map(card => (
            <ListItem>
              <ListItemText primary={card.name + " (" + card.initiativeValue + ") [" + card.faction + "]"} />
            </ListItem>
          ))}
        </List>
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={() => setInitiativeCardSelectorIsOpen(true)}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}>
          Choose Initiative Cards
        </Button>

        {selectedGameMode && selectedFaction && selectedAdmiral &&
          <InitiativecardSelector
            open={initiativeCardSelectorIsOpen}
            faction={selectedFaction}
            admiral={selectedAdmiral}
            onClose={handleInitiativeCardSelectorFlowDone} />}

      </Grid>
    </div>
  );
};

FleetBuilder.propTypes = {
  fleet: Proptypes.array,
  onFleetChanged: Proptypes.func
};

export default FleetBuilder;