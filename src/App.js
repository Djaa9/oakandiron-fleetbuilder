import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormLabel, FormControlLabel, FormHelperText } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

function App() {

  const admirals = [
    {
      name: "Untested Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Admiral",
      factions: "All",
      value: 1
    },
    {
      name: "Seasoned Admiral",
      factions: "All",
      value: 2
    },
    {
      name: "Untested Bold Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Bold Admiral",
      factions: "All",
      value: 1
    },
    {
      name: "Seasoned Bold Admiral",
      factions: "All",
      value: 2
    },
    {
      name: "Untested Lucky Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Lucky Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Seasoned Lucky Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Untested Strict Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Strict Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Seasoned Strict Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Untested Persistent Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Persistent Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Seasoned Persistent Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Untested Brillant Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Brilliant Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Seasoned Brilliant Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Untested Inspiring Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Experienced Inspiring Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Seasoned Inspiring Admiral",
      factions: "All",
      value: 0
    },
    {
      name: "Abraham Crijinssen",
      factions: ["Dutch"],
      value: 1
    },
    {
      name: "Cornelis Evertsen the Youngest",
      factions: ["Dutch"],
      value: 2
    },
    {
      name: "Michiel de Ruyter",
      factions: ["Dutch"],
      value: 3
    },
    {
      name: "Henry Morgan",
      factions: ["English"],
      value: 1
    },
    {
      name: "John Benbow",
      factions: ["English"],
      value: 2
    },
    {
      name: "George Monck",
      factions: ["English"],
      value: 3
    },
    {
      name: "Rene Dugay-Trouin",
      factions: ["French"],
      value: 2
    },
    {
      name: "Jean Bart",
      factions: ["French"],
      value: 2
    },
    {
      name: "Jean II Comte d'Estrees",
      factions: ["French"],
      value: 3
    },
    {
      name: "Manuel Rivero de Pardal",
      factions: ["Spanish"],
      value: 1
    },
    {
      name: "Francisco Pereira Freire de la Cerda",
      factions: ["Spanish"],
      value: 2
    },
    {
      name: "Andres Ochoa de Zarate",
      factions: ["Spanish"],
      value: 3
    },
    {
      name: "Henry Jennings",
      factions: ["Pirate"],
      value: 3
    },
    {
      name: "Jean Hamlin",
      factions: ["Pirate"],
      value: 1
    },
    {
      name: "Edward \"Blackbeard\" Teach",
      factions: ["Pirate"],
      value: 2
    },
    {
      name: "Bartholomew \"Black Bart\" Roberts",
      factions: ["Pirate"],
      value: 3
    }   
  ];

  const factions = [
    {
      name: 'Dutch',
      initiativeCards: [
        {
          name: "Boat Assault",
          initiativeValue: 1
        },
        {
          name: "Lured into the Shoals",
          initiativeValue: 2
        },
        {
          name: "Expert Boarding",
          initiativeValue: 3
        },
        {
          name: "Adaptive tactics",
          initiativeValue: 4
        },
        {
          name: "Seize the Opportunity",
          initiativeValue: 5
        }
      ]
    },
    {
      name: 'English',
      initiativeCards: [
        {
          name: "Zeal",
          initiativeValue: 1
        },
        {
          name: "Long Range Gunnery",
          initiativeValue: 2
        },
        {
          name: "Adjust Formation",
          initiativeValue: 3
        },
        {
          name: "Enagage More Closely",
          initiativeValue: 4
        },
        {
          name: "Fast Loader",
          initiativeValue: 5
        }
      ]
    },
    {
      name: 'French',
      initiativeCards: [
        {
          name: "Elan",
          initiativeValue: 1
        },
        {
          name: "Superior Firepower",
          initiativeValue: 2
        },
        {
          name: "Target Rigging",
          initiativeValue: 3
        },
        {
          name: "Swift Vessels",
          initiativeValue: 4
        },
        {
          name: "Boarders Away",
          initiativeValue: 5
        }
      ]
    },
    {
      name: 'Spanish',
      initiativeCards: [
        {
          name: "Repel Boarders",
          initiativeValue: 1
        },
        {
          name: "Heavy Musket Volley",
          initiativeValue: 2
        },
        {
          name: "Aggression",
          initiativeValue: 3
        },
        {
          name: "Resilient",
          initiativeValue: 4
        },
        {
          name: "Bravado",
          initiativeValue: 5
        }
      ]
    },
    {
      name: 'Pirate',
      initiativeCards: [
        {
          name: "Deception",
          initiativeValue: 2
        },
        {
          name: "Raise the Black",
          initiativeValue: 3
        }
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

  const genericInitiativeCards = [
    {
      name: "Await New Orders",
      initiativeValue: 1
    },
    {
      name: "Down!",
      initiativeValue: 1
    },
    {
      name: "Fire as She Bears",
      initiativeValue: 1
    },
    {
      name: "Intrepid (special rule)",
      initiativeValue: 1
    },
    {
      name: "Careful Aim",
      initiativeValue: 2
    },
    {
      name: "Take Courage",
      initiativeValue: 2
    },
    {
      name: "Effective Fire",
      initiativeValue: 3
    },
    {
      name: "Small Arms",
      initiativeValue: 3
    },
    {
      name: "Reload!",
      initiativeValue: 3
    },
    {
      name: "Rolling Broadsides",
      initiativeValue: 3
    },
    {
      name: "Adjust Position",
      initiativeValue: 4
    },
    {
      name: "Fleet Maneuver",
      initiativeValue: 4
    },
    {
      name: "Lee Guage Fire",
      initiativeValue: 4
    },
    {
      name: "Shoals Ahead",
      initiativeValue: 4
    },
    {
      name: "Boarding Through the Smoke",
      initiativeValue: 4
    },
    {
      name: "Doughty (Special rule)",
      initiativeValue: 4
    },
    {
      name: "Favorable Wind",
      initiativeValue: 5
    }
  ];

  const genericShips = [

  ];

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

  // Update form when faction is changed
  useEffect(() => {
    setAdmiral(""); // Reset admiral

    /*Update available admirals for new faction*/
    var admiralsInFaction = admirals.filter(x => x.factions === "All" || x.factions.includes(faction));
    setAvailableAdmirals(admiralsInFaction);
    
    /*Update available initiative cards for new faction*/
    var availableInitiativeCards = genericInitiativeCards;
    availableInitiativeCards.concat(faction.initiativeCards);
    setAvailableInitiativeCards(availableInitiativeCards);
  },[faction]);

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
