import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
      marginTop: theme.spacing(2),
      alignSelf: "left"
    }
  }));

  const classes = useStyles();

  const [faction, setFaction] = useState("");
  const [gameMode, setGameMode] = useState("patrol");
  const [admiral, setAdmiral] = useState("Untested Admiral");
  const [availableAdmirals, setAvailableAdminirals] = useState([]);

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    var faction = factions.find(x => x.value === event.target.value);
    setFaction(faction);
    setAdmiral("");

    var admiralsToLoad = [];
    faction.admirals.forEach(admiral => {
      admiralsToLoad.push({ value: admiral, label: admiral });
    });

    setAvailableAdminirals(admiralsToLoad);
  };

  const handleAdmiralChange = (event) => {
    setAdmiral(event.target.value);
  };

  const handleAddShip = (event) => {

  };


  const factions = [
    {
      value: 'Dutch',
      admirals: [
        "Untested Admiral",
        "Experienced Admiral",
        "Seasoned Admiral",
        "Abraham Crijinssen",
        "Cornelis Evertsen the Youngest",
        "Michiel de Ruyter",
        "Untested Bold Admiral",
        "Experienced Bold Admiral",
        "Seasoned Bold Admiral",
        "Untested Lucky Admiral",
        "Experienced Lucky Admiral",
        "Seasoned Lucky Admiral",
        "Untested Strict Admiral",
        "Experienced Strict Admiral",
        "Seasoned Strict Admiral",
        "Untested Persistent Admiral",
        "Experienced Persistent Admiral",
        "Seasoned Persistent Admiral",
        "Untested Brillant Admiral",
        "Experienced Brilliant Admiral",
        "Seasoned Brilliant Admiral",
        "Untested Inspiring Admiral",
        "Experienced Inspiring Admiral",
        "Seasoned Inspiring Admiral"
      ]
    },
    {
      value: 'English',
      admirals: [
        "Untested Admiral",
        "Experienced Admiral",
        "Seasoned Admiral",
        "Henry Morgan",
        "John Benbow",
        "George Monck",
        "Untested Bold Admiral",
        "Experienced Bold Admiral",
        "Seasoned Bold Admiral",
        "Untested Lucky Admiral",
        "Experienced Lucky Admiral",
        "Seasoned Lucky Admiral",
        "Untested Strict Admiral",
        "Experienced Strict Admiral",
        "Seasoned Strict Admiral",
        "Untested Persistent Admiral",
        "Experienced Persistent Admiral",
        "Seasoned Persistent Admiral",
        "Untested Brillant Admiral",
        "Experienced Brilliant Admiral",
        "Seasoned Brilliant Admiral",
        "Untested Inspiring Admiral",
        "Experienced Inspiring Admiral",
        "Seasoned Inspiring Admiral"
      ]
    },
    {
      value: 'French',
      admirals: [
        "Untested Admiral",
        "Experienced Admiral",
        "Seasoned Admiral",
        "Rene Dugay-Trouin",
        "Jean Bart",
        "Jean II Comte d'Estrees",
        "Untested Bold Admiral",
        "Experienced Bold Admiral",
        "Seasoned Bold Admiral",
        "Untested Lucky Admiral",
        "Experienced Lucky Admiral",
        "Seasoned Lucky Admiral",
        "Untested Strict Admiral",
        "Experienced Strict Admiral",
        "Seasoned Strict Admiral",
        "Untested Persistent Admiral",
        "Experienced Persistent Admiral",
        "Seasoned Persistent Admiral",
        "Untested Brillant Admiral",
        "Experienced Brilliant Admiral",
        "Seasoned Brilliant Admiral",
        "Untested Inspiring Admiral",
        "Experienced Inspiring Admiral",
        "Seasoned Inspiring Admiral"

      ]
    },
    {
      value: 'Spanish',
      admirals: [
        "Untested Admiral",
        "Experienced Admiral",
        "Seasoned Admiral",
        "Manuel Rivero de Pardal",
        "Francisco Pereira Freire de la Cerda",
        "Andres Ochoa de Zarate",
        "Untested Bold Admiral",
        "Experienced Bold Admiral",
        "Seasoned Bold Admiral",
        "Untested Lucky Admiral",
        "Experienced Lucky Admiral",
        "Seasoned Lucky Admiral",
        "Untested Strict Admiral",
        "Experienced Strict Admiral",
        "Seasoned Strict Admiral",
        "Untested Persistent Admiral",
        "Experienced Persistent Admiral",
        "Seasoned Persistent Admiral",
        "Untested Brillant Admiral",
        "Experienced Brilliant Admiral",
        "Seasoned Brilliant Admiral",
        "Untested Inspiring Admiral",
        "Experienced Inspiring Admiral",
        "Seasoned Inspiring Admiral"
      ]
    },
    {
      value: 'Pirate',
      admirals: [
        "Untested Admiral",
        "Experienced Admiral",
        "Seasoned Admiral",
        "Henry Jennings",
        "Jean Hamlin",
        "Edward \"Blackbeard\" Teach",
        "Bartholomew \"Black Bart\" Roberts",
        "Untested Bold Admiral",
        "Experienced Bold Admiral",
        "Seasoned Bold Admiral",
        "Untested Lucky Admiral",
        "Experienced Lucky Admiral",
        "Seasoned Lucky Admiral",
        "Untested Strict Admiral",
        "Experienced Strict Admiral",
        "Seasoned Strict Admiral",
        "Untested Persistent Admiral",
        "Experienced Persistent Admiral",
        "Seasoned Persistent Admiral",
        "Untested Brillant Admiral",
        "Experienced Brilliant Admiral",
        "Seasoned Brilliant Admiral",
        "Untested Inspiring Admiral",
        "Experienced Inspiring Admiral",
        "Seasoned Inspiring Admiral",
      ]
    }
  ];

  const gameModes = [
    {
      value: 'patrol',
      label: 'Patrol 50 points',
      points: 50
    },
    {
      value: 'campaign',
      label: 'Campaign start 75 points',
      points: 75
    },
    {
      value: 'skirmish',
      label: 'Skirmish 100 points',
      points: 100
    },
    {
      value: 'engagement',
      label: 'Engagement 200 points',
      points: 200
    },
  ];

  return (
    <div className="App">

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Choose game Mode</InputLabel>
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
        <InputLabel id="demo-simple-select-label">Choose Faction</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select faction"
          value={faction.value}
          onChange={handleFactionChange}
          helperText="Faction">
          {factions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Choose Admiral</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select Admiral"
          disabled={faction == ""}
          value={admiral}
          onChange={handleAdmiralChange}
          helperText="Admiral">
          {availableAdmirals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleAddShip}>
          Add Ship
      </Button>

    </div>
  );
}

export default App;
