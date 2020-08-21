import React, { useState, useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { factions } from '../data/factions';
import { gameModes } from '../data/gameModes';
import { FormControl, Select, Typography, List, ListItem, ListItemText, MenuItem, Button, InputLabel, Grid, Snackbar } from '@material-ui/core';
import Admirals from '../Providers/admiralsProvider';
import { grey } from '@material-ui/core/colors';
import ShipSelector from './ShipSelector';
import InitiativecardSelector from './InitiativeCardSelector';
import Ship from './Ship.js';

function Squadron(props) {

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
      padding: theme.spacing(2),
      margin: 0,
      maxWidth: "100%",
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
      margin: theme.spacing(2),
      backgroundColor: "#86A59C"
    },
    divider: {
      color: "#000000"
    },
    scrollableContainer: {
      "overflow-y": "auto"
    },
    title: {
      flexGrow: 1,
      maxWidth: 550
    },
    topForm: {
      padding: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  const { squadron, onSquadronChanged } = props;

  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedAdmiral, setSelectedAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);
  const [initiativeCardSelectorIsOpen, setInitiativeCardSelectorIsOpen] = useState(false);
  const [selectedInitiativeCards, setSelectedInitiativeCards] = useState([]);
  const [showTooFewShipsMessage, setShowTooFewShipsMessage] = useState(false);
  const [showTooManyShipsMessage, setShowTooManyShipsMessage] = useState(false);
  const [showTooManyPointsMessage, setShowTooManyPointsMessage] = useState(false);

  const shipIdCounter = useRef(1);
  const cost = useRef(0);

  // Handle when the squadron parameter changes
  useEffect(() => {
    if (squadron) {
      let newAvailableAdmirals;
      setSelectedGameMode(squadron.gameMode ? squadron.gameMode : "");
      if (squadron.faction) {
        setSelectedFaction(squadron.faction ? squadron.faction : "");
        newAvailableAdmirals = Admirals.allowed(squadron.faction);
        setAvailableAdmirals(newAvailableAdmirals);
      }
      if (squadron.admiral) {
        setSelectedAdmiral(newAvailableAdmirals.find(admiral => admiral.name === squadron.admiral.name));
      }
      if (squadron.initiativeCards)
        setSelectedInitiativeCards(squadron.initiativeCards);
      if (squadron.ships) {
        squadron.ships.map(ship => {
          ship.id = shipIdCounter.current++;
          return ship;
        });

        setSelectedShips(squadron.ships);
      }
    }
  }, [squadron])

  // Tell parent that the squadron has updated
  useEffect(() => {
    squadron.gameMode = selectedGameMode;
    squadron.faction = selectedFaction;
    squadron.admiral = selectedAdmiral;
    squadron.ships = selectedShips;
    squadron.initiativeCards = selectedInitiativeCards;
    squadron.cost = cost; // TODO Move to own component
  }, [selectedGameMode, selectedFaction, selectedAdmiral, selectedShips, selectedInitiativeCards, cost, onSquadronChanged, squadron]);

  // TODO Move to own component
  useEffect(() => {
    // Calculate cost TODO move this to its own component in FleetBuilderView
    if (selectedGameMode && selectedFaction && selectedGameMode) {
      var newCost = 0;
      newCost = newCost + selectedAdmiral.cost;

      selectedShips.forEach(ship => {
        newCost = newCost + ship.costIncludingUpgrades;
      });

      cost.current = newCost;
    };

    if (selectedGameMode) {
      setShowTooFewShipsMessage(selectedShips.length < selectedGameMode.minShips);

      if (setSelectedShips.length > selectedGameMode.maxShips)
        setShowTooManyShipsMessage(true);

      if (cost.current > selectedGameMode.maxPoints)
        setShowTooManyPointsMessage(true);
    }

    if (cost.current <= selectedGameMode.maxPoints) {
      setShowTooManyPointsMessage(false);
    }
  }, [JSON.stringify(selectedShips), selectedAdmiral, selectedFaction, selectedGameMode, selectedShips]);

  const handleInitiativeCardSelectorSave = (initiativecards) => {
    setInitiativeCardSelectorIsOpen(false);
    setSelectedInitiativeCards(initiativecards);
  };

  const handleInitiativeCardSelectorCancel = () => {
    setInitiativeCardSelectorIsOpen(false);
  };

  const handleShipSelectorFlowDone = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (!shipToAdd)
      return;

    const copyOfShipToAdd = Object.assign({}, shipToAdd);
    copyOfShipToAdd.id = shipIdCounter.current++;

    const newList = selectedShips;
    newList.push(copyOfShipToAdd);
    setSelectedShips(newList);
  };

  const handleNewfactionSelected = (event) => {
    const newFaction = event.target.value;
    setSelectedFaction(newFaction)
    setAvailableAdmirals(Admirals.allowed(newFaction));
  };

  const handleShipChanged = (updatedShip) => {
    var updatedListOfSelectedShips = selectedShips.map(ship => {
      return ship.id === updatedShip.id ? updatedShip : ship;
    });

    if (updatedShip.isFlagship && selectedShips.filter(ship => ship.isFlagship).length > 1) {
      updatedListOfSelectedShips.map(ship => {
        if (ship.id !== updatedShip.id)
          ship.isFlagship = false;

        return ship;
      });
    }

    setSelectedShips(updatedListOfSelectedShips);
  };

  return (
    <div className={classes.root}>

      <Grid className={classes.topForm} container>
        <FormControl className={classes.formControl}>
          <InputLabel>Choose game size</InputLabel>
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
          <InputLabel>Choose faction</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            label="Choose a faction"
            onChange={handleNewfactionSelected}
            value={selectedFaction}>
            {factions.map((faction) => (
              <MenuItem key={faction.type} value={faction}>
                {faction.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Choose admiral</InputLabel>
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
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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

      {selectedGameMode && selectedFaction && selectedAdmiral &&
        <InitiativecardSelector
          open={initiativeCardSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          ships={selectedShips}
          onCancel={handleInitiativeCardSelectorCancel}
          onSave={handleInitiativeCardSelectorSave} />
      }
      {selectedGameMode && selectedFaction && selectedAdmiral &&
        <ShipSelector
          open={shipSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          gameMode={selectedGameMode}
          onClose={handleShipSelectorFlowDone} />
      }
    </div>
  );
};

Squadron.propTypes = {
  squadron: Proptypes.object,
  onSquadronChanged: Proptypes.func
};

export default Squadron;