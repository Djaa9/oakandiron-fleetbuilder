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
      margin: theme.spacing(2),
      alignSelf: "left"
    }
  }));

  const classes = useStyles();

  const [faction, setFaction] = useState("");
  const [gameMode, setGameMode] = useState("patrol");
  const [admiral, setAdmiral] = useState("Untested Admiral");
  const [availableAdmirals, setAvailableAdminirals] = useState([]);
  const [availableInitiativeCards, setAvailableInitiativeCards] = useState([]);

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    var faction = factions.find(x => x.name === event.target.value);
    setFaction(faction);
    console.log(faction);

    setAdmiral("");
    var admiralsToLoad = [];
    faction.admirals.forEach(admiral => {
      admiralsToLoad.push({ value: admiral, label: admiral });
    });

    setAvailableAdminirals(admiralsToLoad);

    var availableInitiativeCards = genericInitiativeCards;

    availableInitiativeCards.concat(faction.initiativeCards);

  };

  const handleAdmiralChange = (event) => {
    setAdmiral(event.target.value);
  };

  const handleAddShip = (event) => {

  };


  const factions = [
    {
      name: 'Dutch',
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
      ],
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
      ],
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
      ],
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
      ],
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
      ],
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
        <InputLabel>Choose Faction</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select faction"
          value={faction.name}
          onChange={handleFactionChange}
          helperText="Faction">
          {factions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {faction.name === "Pirate" ?(
      <FormControl className={classes.formControl}>
        <InputLabel>Choose Pirate Faction</InputLabel>
        <Select
          displayEmpty
          className={classes.selectEmpty}
          label="Select faction"
          value={faction.value}
          onChange={handleFactionChange}
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
        Add Initiative card
      </Button>

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
