import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, InputLabel, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Commanders from '../Data/commanders.js';
import UpgradeCards from "../Providers/upgradeCardsProvider";

function Ship(props) {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        card: {
            padding: theme.spacing(2),
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        removeButtons: {
            paddingLeft: "0px"
        }
    }));

    const classes = useStyles();
    const { ship, faction, costUpdated, removeShip } = props;

    const [availableSkillLevels] = useState([
        { name: "Skill 1", cost: 2 },
        { name: "Skill 2", cost: 4 }
    ]);

    const [availableCommanders, setAvailableCommanders] = useState([]);
    const [availableUpgrade1Cards, setAvailableUpgrade1Cards] = useState([]);
    const [availableUpgrade2Cards, setAvailableUpgrade2Cards] = useState([]);
    const [costIncludingUpgrades, setCostIncludingUpgrades] = useState(ship.cost)
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
    const [upgrades, setUpgrades] = useState(ship.upgrades);
    const [selectedCommander, setSelectedCommander] = useState("");
    const [isFlagship, setIsFlagship] = useState(false);
    const [commanderSelectionDisabled, setCommanderSelectionDisabled] = useState(false);
    const [selectedUpgradeCard1, setSelectedUpgradeCard1] = useState("");
    const [selectedUpgradeCard2, setSelectedUpgradeCard2] = useState("");
    const [upgradeCard1SelectorEnabled, setUpgradeCard1SelectorEnabled] = useState(true);
    const [upgradeCard2SelectorEnabled, setUpgradeCard2SelectorEnabled] = useState(true);

    // CONSTRUCTOR
    useEffect(() => {
        /*Update available Commanders*/
        if (faction) {
            var commandersForFaction = Commanders.allowed(faction);
            setAvailableCommanders(commandersForFaction);
        };

        /* Set slected property of all upgrades to false*/
        var unselectedUpgrades = upgrades.map(upgrade => {
            upgrade.selected = false
            return upgrade;
        });
        setUpgrades(unselectedUpgrades);

        /*Get available upgrade cards*/
        var availableUpgradeCards = UpgradeCards.allowed(faction, ship, isFlagship);
        setAvailableUpgrade1Cards(availableUpgradeCards);
        setAvailableUpgrade2Cards(availableUpgradeCards);

    }, []);

    // Calculate new cost of ship when selections change
    useEffect(() => {
        var newCostOfShip = ship.cost;
        newCostOfShip = selectedCommander ? selectedCommander.cost + newCostOfShip : newCostOfShip;
        newCostOfShip = selectedSkillLevel.cost ? newCostOfShip + selectedSkillLevel.cost : newCostOfShip;
        newCostOfShip = selectedUpgradeCard1.cost ? newCostOfShip + selectedUpgradeCard1.cost : newCostOfShip;
        newCostOfShip = selectedUpgradeCard2.cost ? newCostOfShip + selectedUpgradeCard2.cost : newCostOfShip;

        upgrades.filter(upgrade => upgrade.selected).forEach(upgrade => {
            newCostOfShip = newCostOfShip + upgrade.cost;
        });;

        setCostIncludingUpgrades(newCostOfShip);

    }, [selectedCommander, upgrades, selectedSkillLevel, selectedUpgradeCard1, selectedUpgradeCard2])

    // Alert listeners of cost change
    useEffect(() => {
        ship.costIncludingUpgrades = costIncludingUpgrades;
        costUpdated(ship.id, costIncludingUpgrades);
    }, [costIncludingUpgrades]);

    // Handle change in flagship state
    useEffect(() => {
        var availableUpgradeCards = UpgradeCards.allowed(faction, ship, isFlagship);
        setAvailableUpgrade1Cards(availableUpgradeCards);
        setAvailableUpgrade2Cards(availableUpgradeCards);

        if (isFlagship) {
            setSelectedCommander("");
            setCommanderSelectionDisabled(true);
        }
        else {
            setCommanderSelectionDisabled(false);
        }

    }, [isFlagship]);

    // EVENT LISTENERS
    const handleRemoveClicked = (ship) => {
        removeShip(ship);
    };

    const handleCommanderChange = (event) => {
        setSelectedCommander(event.target.value);
    };

    const handleFlagshipChange = (event) => {
        setIsFlagship(event.target.checked);
    };

    const handleSkillLevelChanged = (event) => {
        setSelectedSkillLevel(event.target.value);
    };

    const handleUpgradeSelectionChanged = (event, updatedUpgrade) => {
        var newUpgrades = upgrades.map(upgrade => {
            if (upgrade.name === updatedUpgrade.name) {
                upgrade.selected = event.target.checked;
            }
            return upgrade;
        });

        setUpgrades(newUpgrades);
    };

    const handleUpgradeCard1Change = (event) => {
        if (event.target.value.onlyAllowedSolo === true){
            setUpgradeCard2SelectorEnabled(false);
            setSelectedUpgradeCard2("");
        }
        else
            setUpgradeCard2SelectorEnabled(true);

        // Remove from Upgrade 2 selection
        var allowedUpgrade2 = UpgradeCards.allowed(faction, ship, isFlagship);
        allowedUpgrade2.map(card => {
            if (card.name !== event.target.value)
                return card;
        });
        
        setSelectedUpgradeCard1(event.target.value);
    };

    const handleUpgradeCard2Change = (event) => {
        if (event.target.value.name === "onlyAllowedSolo") {
            setUpgradeCard1SelectorEnabled(false);            
            setSelectedUpgradeCard2("");
        }
        else
            setUpgradeCard1SelectorEnabled(true);

        // Remove from Upgrade 2 selection
        var allowedUpgrade2 = UpgradeCards.allowed(faction, ship, isFlagship);
        allowedUpgrade2.map(card => {
            if (card.name !== event.target.value)
                return card;
        });        

        setSelectedUpgradeCard2(event.target.value);
    };

    const handleClearUpgradeCard1 = () => {
        setSelectedUpgradeCard1("");
    }

    const handleClearUpgradeCard2 = () => {
        setSelectedUpgradeCard2("");
    }

    const handleClearCommander = () => {
        setSelectedCommander("");
    }

    const handleClearSkillLevel = () => {
        setSelectedSkillLevel("");
    }

    return (
        <Card className={classes.card}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start">

                <Grid
                    container
                    direction="row"
                    justify="space between"
                    alignItems="center">
                    <h3>
                        {ship.name + " (+" + ship.cost + ")"}
                    </h3>
                    <IconButton onClick={() => handleRemoveClicked(ship)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox name="flagship" onChange={handleFlagshipChange} />}
                            label="Flagship" />
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Commander</InputLabel>
                                <Select
                                    displayEmpty
                                    isClearable={true}
                                    disabled={commanderSelectionDisabled}
                                    className={classes.selectEmpty}
                                    label="Select Commander"
                                    value={selectedCommander}
                                    onChange={handleCommanderChange}>
                                    {availableCommanders.map((commander) => (
                                        <MenuItem key={commander.name} value={commander}>
                                            {commander.name + " (+" + commander.cost + ")"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton className={classes.removeButtons} onClick={handleClearCommander}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Skill</InputLabel>
                                <Select
                                    displayEmpty
                                    isClearable={true}
                                    className={classes.selectEmpty}
                                    label="Select Skills"
                                    value={selectedSkillLevel}
                                    onChange={handleSkillLevelChanged}>
                                    {availableSkillLevels.map((skillLevel) => (
                                        <MenuItem key={skillLevel.name} value={skillLevel}>
                                            {skillLevel.name + " (+" + skillLevel.cost + ")"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton className={classes.removeButtons} onClick={handleClearSkillLevel}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>

                        <Divider />

                        {ship.upgrades.map(upgrade =>
                            <FormControlLabel
                                control={
                                    <Checkbox name={upgrade.name} onChange={(event) => handleUpgradeSelectionChanged(event, upgrade)} />}
                                label={upgrade.name + " (+" + upgrade.cost + ")"}
                            />
                        )}

                        <Divider />

                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Upgrade card 1</InputLabel>
                                <Select
                                    displayEmpty
                                    isClearable={true}
                                    disabled={!upgradeCard1SelectorEnabled}
                                    className={classes.selectEmpty}
                                    value={selectedUpgradeCard1}
                                    onChange={handleUpgradeCard1Change}>
                                    {availableUpgrade1Cards.map((card) => (
                                        <MenuItem key={card.name} value={card}>
                                            {card.cost > 0 ? card.name + " (+" + card.cost + ")" : card.name + " (" + card.cost + ")"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={handleClearUpgradeCard1}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Upgrade card 2</InputLabel>
                                <Select
                                    displayEmpty
                                    isClearable={true}
                                    disabled={!upgradeCard2SelectorEnabled}
                                    className={classes.selectEmpty}
                                    value={selectedUpgradeCard2}
                                    onChange={handleUpgradeCard2Change}>
                                    {availableUpgrade2Cards.map((card) => (
                                        <MenuItem key={card.name} value={card}>
                                            {card.cost > 0 ? card.name + " (+" + card.cost + ")" : card.name + " (" + card.cost + ")"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={handleClearUpgradeCard2}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Card>
    );
};

Ship.propTypes = {
    ship: PropTypes.object.isRequired,
    faction: PropTypes.object.isRequired,
    costUpdated: PropTypes.func,
    removeShip: PropTypes.func
};

export default Ship;