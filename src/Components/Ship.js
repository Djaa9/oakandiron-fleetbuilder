import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Slider, MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, Button, InputLabel, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Commanders from '../data/commanders.js';
import UpgradeCards from '../data/upgradeCards';

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
        { name: "Skill 1", cost: 2},
        { name: "Skill 2", cost: 4}
    ]);

    const [availableCommanders, setAvailableCommanders] = useState([]);
    const [availableUpgradeCards, setAvailableUpgradeCards] = useState([]);
    const [costIncludingUpgrades, setCostIncludingUpgrades] = useState(ship.cost)
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
    const [upgrades, setUpgrades] = useState(ship.upgrades);
    const [selectedCommander, setSelectedCommander] = useState("");
    const [isFlagship, setIsFlagship] = useState(false);
    const [commanderSelectionDisabled, setCommanderSelectionDisabled] = useState(false);
    const [selectedUpgradeCard1, setSelectedUpgradeCard1] = useState("");
    const [selectedUpgradeCard2, setSelectedUpgradeCard2] = useState("");

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
        setAvailableUpgradeCards(availableUpgradeCards);

    }, []);

    // Calculate new cost of ship when selections change
    useEffect(() => {
        var newCostOfShip = ship.cost;
        newCostOfShip = selectedCommander ? selectedCommander.cost + newCostOfShip : newCostOfShip;
        newCostOfShip = selectedSkillLevel.cost ? newCostOfShip + selectedSkillLevel.cost : newCostOfShip;

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
        setAvailableUpgradeCards(availableUpgradeCards);

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
        setSelectedUpgradeCard1(event.target.value);
    };

    const handleUpgradeCard2Change = (event) => {
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

                        <Divider />

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
                                            className={classes.selectEmpty}
                                            value={selectedUpgradeCard1}
                                            onChange={handleUpgradeCard1Change}>
                                            {availableUpgradeCards.map((card) => (
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
                                            className={classes.selectEmpty}
                                            value={selectedUpgradeCard2}
                                            onChange={handleUpgradeCard2Change}>
                                            {availableUpgradeCards.map((card) => (
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