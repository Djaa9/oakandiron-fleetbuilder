import React, { useState, useEffect, } from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { factions } from '../Data/factions';
import { gameModes } from '../Data/gameModes';
import { Typography, List, ListItem, ListItemText, MenuItem, Button, InputLabel, Grid, Toolbar, Snackbar } from '@material-ui/core';
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
      flexGrow: 1
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    sectionContainer: {
      backgroundColor: grey[200]
    },
    shipContainer: {
      padding: theme.spacing(2)
    },
    sectionHeader: {
      padding: theme.spacing(2),
      paddingBottom: 0
    },
    sectionSubHeader: {
      padding: theme.spacing(2),
      paddingLeft: 0,
      paddingBottom: 0
    },
    addButton: {
      margin: theme.spacing(2)
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
      padding: theme.spacing(1)
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
  const [showTooFewShipsMessage, setShowTooFewShipsMessage] = useState(false);
  const [showTooManyShipsMessage, setShowTooManyShipsMessage] = useState(false);
  const [showTooManyPointsMessage, setShowTooManyPointsMessage] = useState(false);

  /*Handles default fleet*/
  useEffect(() => {
    if (fleet) {
      setSelectedGameMode(fleet.gameMode ? fleet.gameMode : "");
      setSelectedFaction(fleet.faction ? fleet.faction : "");
      setSelectedAdmiral(fleet.admiral ? fleet.admiral : "");
      setSelectedShips(fleet.ships ? fleet.ships : []);
      setSelectedInitiativeCards(fleet.initiativeCards ? fleet.initiativeCards : []);
    }
  }, [fleet])

  useEffect(() => {
    if (onFleetChanged)
      onFleetChanged({
        gameMode: selectedGameMode,
        faction: selectedFaction,
        admiral: selectedAdmiral,
        ships: selectedShips,
        initiativeCards: selectedInitiativeCards
      });
  }, [selectedGameMode, selectedFaction, selectedAdmiral, JSON.stringify(selectedShips), selectedInitiativeCards]);

  useEffect(() => {
    /*Update available admirals*/
    if (selectedFaction){
      setAvailableAdmiral(Admirals.allowed(selectedFaction));
      setSelectedAdmiral("");
      setSelectedShips([]);
      setSelectedInitiativeCards([]);
    }
  }, [selectedFaction]);

  useEffect(() => {
    /*Update available admirals*/
    if (selectedAdmiral){
      setSelectedInitiativeCards([]);
      setSelectedShips([]);
    }
  }, [selectedAdmiral]);

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

    if (selectedGameMode) {
      setShowTooFewShipsMessage(selectedShips.length < selectedGameMode.minShips);

    if (setSelectedShips.length > selectedGameMode.maxShips)
      setShowTooManyShipsMessage(true);

    if (cost > selectedGameMode.maxPoints)
      setShowTooManyPointsMessage(true);
    }

    if (cost <= selectedGameMode.maxPoints){
      setShowTooManyPointsMessage(false);
    }
  }, [JSON.stringify(selectedShips), selectedAdmiral]);

  const handleInitiativeCardSelectorFlowDone = (initiativecards) => {
    setInitiativeCardSelectorIsOpen(false);
    setSelectedInitiativeCards(initiativecards);
  };

  const handleShipSelectorFlowDone = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (!shipToAdd)
      return;

    const copyOfShipToAdd = Object.assign({}, shipToAdd);
    copyOfShipToAdd.id = shipIdCounter;

    setShipIdCounter(shipIdCounter + 1);

    const newList = selectedShips;
    newList.push(copyOfShipToAdd);
    setSelectedShips(newList);
  };

  const handleShipChanged = (updatedShip) => {
    var updatedListOfSelectedShips = selectedShips.map(ship => {
      return ship.id === updatedShip.id ? updatedShip : ship;
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
            <h3>
              {"Fleet Cost: " + cost + "/" + selectedGameMode.maxPoints}
            </h3>
          ) : (<h3>
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

      <Grid
        className={classes.sectionContainer}
        container
        direction="column"
        alignItems="flex-start">
        <Grid container direction="row" alignItems="center">
          <Typography className={classes.sectionHeader} variant="h6">
            Ships
            </Typography>
          <Typography className={classes.sectionSubHeader} variant="body2">
            {selectedGameMode ? (" ( min: " + selectedGameMode.minShips + " max: " + selectedGameMode.maxShips + ")") : (null)}
          </Typography>
        </Grid>
        <Grid container
          className={classes.shipContainer}
          spacing={2}>
          {selectedShips.map(selectedShip => (
            <Grid key={selectedShip.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Ship
                key={selectedShip.id}
                ship={selectedShip}
                faction={selectedFaction}
                onShipChanged={handleShipChanged}
                removeShip={(shipToRemove) => {
                  let newlist = selectedShips.filter(ship => ship.id !== shipToRemove.id);
                  setSelectedShips(newlist);
                }} />
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
      </Grid>

      <Grid
        className={classes.sectionContainer}
        container
        direction="column"
        alignItems="flex-start">
        <Typography className={classes.sectionHeader} variant="h6">
          Initiative Cards
        </Typography>
        <List>
          {selectedInitiativeCards.map(card => (
            <ListItem key={card.name}>
              <ListItemText key={card.name} primary={card.name + " (" + card.initiativeValue + ") [" + card.faction + "]"} />
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
      </Grid>
      <Snackbar open={showTooFewShipsMessage}
        autoHideDuration={4000}
        onClose={() => setShowTooFewShipsMessage(false)}
        message={"A fleet in " + selectedGameMode.name + " must have at least " + selectedGameMode.minShips + " ships"}
        action={(
          <Button color="secondary"
            size="small" onClick={() => setShowTooFewShipsMessage(false)}>
            hide
          </Button>
        )}>
      </Snackbar>
      <Snackbar open={showTooManyShipsMessage}
        autoHideDuration={4000}
        onClose={() => setShowTooManyShipsMessage(false)}
        message={"A fleet in " + selectedGameMode.name + " cannot include more than " + selectedGameMode.minShips + " ships"}
        action={(
          <Button color="secondary"
            size="small" onClick={() => setShowTooManyShipsMessage(false)}>
            hide
          </Button>
        )}>
      </Snackbar>
      <Snackbar open={showTooManyPointsMessage}
        autoHideDuration={4000}
        onClose={() => setShowTooManyPointsMessage(false)}
        message={"Your fleet is at " + cost + " points.  A fleet in " + selectedGameMode.name + " cannot cost more than " + selectedGameMode.maxPoints + " points"}
        action={(
          <Button color="secondary"
            size="small" onClick={() => setShowTooManyPointsMessage(false)}>
            hide
          </Button>
        )}>
      </Snackbar>

        <InitiativecardSelector
          open={initiativeCardSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          onClose={handleInitiativeCardSelectorFlowDone} />

      {selectedGameMode && selectedFaction && selectedAdmiral &&
        <ShipSelector
          open={shipSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          gameMode={selectedGameMode}
          onClose={handleShipSelectorFlowDone} />}
    </div>
  );
};

FleetBuilder.propTypes = {
  fleet: Proptypes.array,
  onFleetChanged: Proptypes.func
};

export default FleetBuilder;