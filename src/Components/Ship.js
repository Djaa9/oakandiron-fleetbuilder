import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, Button, InputLabel, Grid, IconButton } from '@material-ui/core';
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
            margin: theme.spacing(1),
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    }));

    const classes = useStyles();
    const { ship, faction, costUpdated, removeShip } = props;

    const [availableCommanders, setAvailableCommanders] = useState([]);
    const [availableUpgradeCards, setAvailableUpgradeCards] = useState([]);
    const [costIncludingUpgrades, setCostIncludingUpgrades] = useState(ship.cost)
    const [skill1, setSkill1] = useState({ name: "Skill 1", cost: 2, selected: false })
    const [skill2, setSkill2] = useState({ name: "Skill 2", cost: 4, selected: false })
    const [skill2Enabled, setSkill2Enabled] = useState(true);
    const [skill1Enabled, setSkill1Enabled] = useState(false);
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
        newCostOfShip = skill1.selected ? newCostOfShip + skill1.cost : newCostOfShip;
        newCostOfShip = skill2.selected ? newCostOfShip + skill2.cost : newCostOfShip;
        newCostOfShip = selectedUpgradeCard1 ? newCostOfShip + selectedUpgradeCard1.cost : newCostOfShip;
        newCostOfShip = selectedUpgradeCard2 ? newCostOfShip + selectedUpgradeCard2.cost : newCostOfShip;

        upgrades.filter(upgrade => upgrade.selected).forEach(upgrade => {
            newCostOfShip = newCostOfShip + upgrade.cost;
        });;

        setCostIncludingUpgrades(newCostOfShip);

    }, [selectedCommander, upgrades, skill1.selected, skill2.selected, selectedUpgradeCard1, selectedUpgradeCard2])

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

    const handleSkill1Changed = (event) => {
        var newSkillState = skill1;
        newSkillState.selected = event.target.checked;
        setSkill1(newSkillState);

        setSkill2Enabled(!newSkillState.selected);
    };

    const handleSkill2Changed = (event) => {
        var newSkillState = skill2;
        newSkillState.selected = event.target.checked;
        setSkill2(newSkillState);

        setSkill1Enabled(newSkillState.selected);
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

    return (
        <Card className={classes.card}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start">
                <Grid>
                    {ship.name + " (+" + ship.cost + ")"}
                    <FormControlLabel
                        control={
                            <Checkbox name="flagship" onChange={handleFlagshipChange} />}
                        label="Flagship" />
                    <IconButton onClick={() => handleRemoveClicked(ship)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Grid>

                <FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={skill1Enabled}
                                    name={skill1.name} onChange={handleSkill1Changed} />}
                            label={skill1.name + " (+ " + skill1.cost + ")"}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={skill2Enabled}
                                    name={skill2.name} onChange={handleSkill2Changed} />}
                            label={skill2.name + " (+ " + skill2.cost + ")"}
                        />

                        <Divider />
                        {ship.upgrades.map(upgrade =>
                            <FormControlLabel
                                control={
                                    <Checkbox name={upgrade.name} onChange={(event) => handleUpgradeSelectionChanged(event, upgrade)} />}
                                label={upgrade.name + " (+ " + upgrade.cost + ")"}
                            />
                        )}

                        <Divider />
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
                        <IconButton onClick={handleClearCommander}>
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