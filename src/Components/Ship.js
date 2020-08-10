import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, InputLabel, Grid, IconButton, Grow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Commanders from '../data/commanders.js';
import UpgradeCards from "../Providers/upgradeCardsProvider";

function Ship(props) {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: "200px"
        },
        card: {
            padding: theme.spacing(2),
            paddingTop: 0,
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        removeButtons: {
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0
        },
        divider: {
            marginTop: theme.spacing(2)
        }
    }));

    const classes = useStyles();
    const { ship, faction, onShipChanged, removeShip } = props;

    const [availableSkillLevels] = useState([
        { name: "Skill 1", cost: 2 },
        { name: "Skill 2", cost: 4 }
    ]); // TODO Move skills to ship definitions

    const [availableCommanders, setAvailableCommanders] = useState([]);
    const [availableUpgrade1Cards, setAvailableUpgrade1Cards] = useState([]);
    const [availableUpgrade2Cards, setAvailableUpgrade2Cards] = useState([]);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
    const [upgrades, setUpgrades] = useState(() => ship ? ship.upgrades : []);
    const [selectedCommander, setSelectedCommander] = useState("");
    const [isFlagship, setIsFlagship] = useState(false);
    const [commanderSelectionDisabled, setCommanderSelectionDisabled] = useState(false);
    const [selectedUpgradeCard1, setSelectedUpgradeCard1] = useState("");
    const [selectedUpgradeCard2, setSelectedUpgradeCard2] = useState("");
    const [upgradeCard1SelectorEnabled, setUpgradeCard1SelectorEnabled] = useState(true);
    const [upgradeCard2SelectorEnabled, setUpgradeCard2SelectorEnabled] = useState(true);

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
        var availableUpgradeCards = UpgradeCards.allowed(faction, ship);
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

        ship.isFlagship = isFlagship;
        ship.commander = selectedCommander;
        ship.skillLevel = selectedSkillLevel;
        ship.upgrades = upgrades;
        ship.upgradeCard1 = selectedUpgradeCard1;
        ship.upgradeCard2 = selectedUpgradeCard2;
        ship.costIncludingUpgrades = newCostOfShip;
        
        onShipChanged(ship);
    }, [isFlagship, selectedCommander, upgrades, selectedSkillLevel, selectedUpgradeCard1, selectedUpgradeCard2])

    useEffect(() => {
        if(selectedUpgradeCard1.onlyAllowedSolo){
            setUpgradeCard2SelectorEnabled(false);
            setSelectedUpgradeCard2("");
        }
    }, [selectedUpgradeCard1]);

    useEffect(() => {
        if(selectedUpgradeCard2.onlyAllowedSolo){
            setUpgradeCard1SelectorEnabled(false);
            setSelectedUpgradeCard1("");
        }
    }, [selectedUpgradeCard2]);

    useEffect(() => {
        setIsFlagship(ship.isFlagship);
    }, [ship.isFlagship]);

    // Handle change in flagship state
    useEffect(() => {
        var availableUpgradeCards = UpgradeCards.allowed(faction, ship);
        setAvailableUpgrade1Cards(availableUpgradeCards);
        setAvailableUpgrade2Cards(availableUpgradeCards);

        if(!availableUpgradeCards.find(card => card === selectedUpgradeCard1))
            setSelectedUpgradeCard1("");

        if(!availableUpgradeCards.find(card => card === selectedUpgradeCard2))
            setSelectedUpgradeCard2("");

        if (isFlagship) {
            setSelectedCommander("");
            setCommanderSelectionDisabled(true);
        }
        else {
            setCommanderSelectionDisabled(false);
        }

    }, [isFlagship]);

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

    return (
        <Grow in={true}>
        <Card className={classes.card}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch">

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <h3>
                        {ship.name + " (+" + ship.cost + ")"}
                    </h3>
                    <IconButton className={classes.removeShipIcon} onClick={() => removeShip(ship)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox key={ship.id} checked={isFlagship} name="flagship" onChange={(event) => setIsFlagship(event.target.checked)} />}
                            label="Flagship" />
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Commander</InputLabel>
                                <Select
                                    disabled={commanderSelectionDisabled}
                                    label="Select Commander"
                                    value={selectedCommander}
                                    onChange={(event) => setSelectedCommander(event.target.value)}>
                                    {availableCommanders.map((commander) => (
                                        <MenuItem key={commander.name} value={commander}>
                                            {commander.name + " (+" + commander.cost + ")"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedCommander &&
                            <IconButton className={classes.removeButtons} onClick={() => setSelectedCommander("")}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            }
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
                            {selectedSkillLevel &&
                            <IconButton className={classes.removeButtons} onClick={() => setSelectedSkillLevel("")}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            }
                        </Grid>

                        {ship.upgrades && ship.upgrades.length > 0 && <Divider className={classes.divider} />}
                        
                        {ship.upgrades.map(upgrade =>
                            <FormControlLabel
                                control={
                                    <Checkbox key={upgrade.name} 
                                              name={upgrade.name} 
                                              onChange={(event) => handleUpgradeSelectionChanged(event, upgrade)} />}
                                label={upgrade.name + " (+" + upgrade.cost + ")"}
                            />
                        )}

                        <Divider className={classes.divider} />

                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Upgrade card 1</InputLabel>
                                <Select
                                    displayEmpty
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
                            {selectedUpgradeCard1 &&
                            <IconButton className={classes.removeButtons} onClick={() => setSelectedUpgradeCard1("")}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            }
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
                            {selectedUpgradeCard2 &&
                            <IconButton className={classes.removeButtons} onClick={() => setSelectedUpgradeCard2("")}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            }
                        </Grid>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Card>
        </Grow>
    );
};

Ship.propTypes = {
    ship: PropTypes.object.isRequired,
    onShipChanged: PropTypes.func,
    faction: PropTypes.object.isRequired,
    removeShip: PropTypes.func
};

export default Ship;