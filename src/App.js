import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import {MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, Card, Divider, Button, InputLabel, Dialog, DialogTitle } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {admirals} from './data/admirals.js'
import {factions} from './data/factions.js'
import {initiativeCards} from './data/initiativeCards.js'
import {gameModes} from './data/gameModes.js'
import {ships} from './data/ships.js'

function App() {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(2),
      alignSelf: "left"
    }
  }));

  const classes = useStyles();

  const [faction, setFaction] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [admiral, setAdmiral] = useState("");
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);
  const [ships, setShips] = useState([]);
  const [availableShips, setAvailableShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);

  // Update form when faction is changed
  useEffect(() => {
    setAdmiral(""); // Reset admiral

    /*Update available admirals for new faction*/
    var admiralsInFaction = admirals.filter(x => x.factions.includes(faction));
    setAvailableAdmirals(admiralsInFaction);
    
    /*Update available initiative cards for new faction*/
    var initiativeCardsForFaction = initiativeCards.filter(x => x.factions.includes(faction));
    setAvailableInitiativeCards(initiativeCardsForFaction);
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

  const handleAddShip = (event) => {   
    console.log("SELECTED"); 
    setShipSelectorIsOpen(false);    
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
            <MenuItem key={option} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {faction === "Pirate" ? (
        <FormControl className={classes.formControl}>
          <InputLabel>Choose Pirate Faction</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            value={faction}
            label="Select faction"
            value={faction}
            helperText="Faction">
            {factions.filter(x => x.name !== "Pirate").map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}

      <FormControl className={classes.formControl}>
        <InputLabel>Choose Admiral</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Admiral"
          disabled={faction === ""}
          value={admiral}
          onChange={handleAdmiralChange}
          helperText="Admiral">
          {availableAdmirals.map((option) => (
            <MenuItem key={option.name} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Available Initiative Cards</FormLabel>
        <FormGroup>
          {availableInitiativeCards.map(card =>
            <FormControlLabel
              control={<Checkbox name="card.name" />}
              label={card.name + " (" + card.initiativeValue + ")"}
            />
          )}

        </FormGroup>
      </FormControl>
      <Divider />

{ships.map(ship =>
  <Card></Card>
  )}
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleOpenShipSelector}>
        Add Ship
      </Button>
      <ShipSelector open={shipSelectorIsOpen} availableShips={availableShips} selectionDone={handleAddShip}></ShipSelector>

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

  useEffect(() => { 
  
  console.log(open);
  },[])

  return (
    <Dialog onClose={selectionDone} open={open}>
      <DialogTitle> Choose ship </DialogTitle>
      Hey
    </Dialog>
  );
}

ShipSelector.propTypes = {
  open: PropTypes.bool.isRequired,
  selectionDone: PropTypes.func.isRequired,
  availableShips: PropTypes.array
};