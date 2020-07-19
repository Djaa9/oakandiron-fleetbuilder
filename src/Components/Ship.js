import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, Button, InputLabel, Grid } from '@material-ui/core';
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
    const { ship, faction, gameMode, costUpdated, removeShip } = props;
    const [availableCommanders, setAvailableCommanders] = useState([]);

    useEffect(() => {
        /*Update available Commanders*/
        if (faction) {
            var commandersForFaction = Commanders.allowed(faction);
            setAvailableCommanders(commandersForFaction);
        };
    }, []);

    const handleRemoveClicked = (ship) => {
        removeShip(ship);
    };

    const handleCommanderChange = (event) => {
        console.log("df");
      };

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
                            <Checkbox name="flagship" />}
                        label="Flagship"
                    />
                    <Button onClick={() => handleRemoveClicked(ship)}>Remove</Button>
                </Grid>

                <FormControl>
                    <FormGroup>
                        {ship.upgrades.map(upgrade =>
                            <FormControlLabel
                                control={
                                    <Checkbox name={upgrade.name} />}
                                label={upgrade.name + " (+ " + upgrade.cost + ")"}
                            />
                        )}

                        <Divider />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Commander</InputLabel>
                            <Select
                                displayEmpty
                                className={classes.selectEmpty}
                                label="Select Commander"
                                value={ship.commander}
                                onChange={handleCommanderChange}>
                                {availableCommanders.map((commander) => (
                                    <MenuItem key={commander.name} value={commander}>
                                        {commander.name + " (+" + commander.cost + ")"}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider></Divider>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Upgrade card 1</InputLabel>
                            <Select
                                displayEmpty
                                className={classes.selectEmpty}
                                label="Select Crew Upgrade"
                                value={ship.commander}
                                onChange={handleCommanderChange}>
                                {availableCommanders.map((commander) => (
                                    <MenuItem key={commander.name} value={commander}>
                                        {commander.name + " (+" + commander.cost + ")"}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Upgrade card 2</InputLabel>
                            <Select
                                displayEmpty
                                className={classes.selectEmpty}
                                label="Select Crew Upgrade"
                                value={ship.commander}
                                onChange={handleCommanderChange}>
                                {availableCommanders.map((commander) => (
                                    <MenuItem key={commander.name} value={commander}>
                                        {commander.name + " (+" + commander.cost + ")"}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Card>
    );
};

Ship.propTypes = {
    ship: PropTypes.object.isRequired,
    faction: PropTypes.object.isRequired,
    gameMode: PropTypes.object.isRequired,
    costUpdated: PropTypes.func,
    removeShip: PropTypes.func
};

export default Ship;