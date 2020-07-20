import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Checkbox, FormGroup, FormControlLabel, Card, Divider, Button, InputLabel, Grid, responsiveFontSizes } from '@material-ui/core';
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
    const [cost, setCost] = useState(ship.cost);
    const [skill1, setSkill1] = useState({ name: "Skill 1", cost: 2, selected: false })
    const [skill2, setSkill2] = useState({ name: "Skill 2", cost: 4, selected: false })
    const [skill2Enabled, setSkill2Enabled] = useState(true);
    const [skill1Enabled, setSkill1Enabled] = useState(false);

    useEffect(() => {
        /*Update available Commanders*/
        if (faction) {
            var commandersForFaction = Commanders.allowed(faction);
            setAvailableCommanders(commandersForFaction);
        };
    }, []);

    useEffect(() => {
        console.log(cost);

    }, [cost]);

    const handleRemoveClicked = (ship) => {
        removeShip(ship);
    };

    const handleCommanderChange = (event) => {
        console.log("df");
    };

    const handleSkill1Changed = (event) => {
        var newSkillState = skill1;
        newSkillState.selected = event.target.checked;
        setSkill1(newSkillState);

        setSkill2Enabled(!newSkillState.selected);

        if (event.target.checked)
        setCost(cost + skill1.cost);
    else if (!event.target.checked)
        setCost(cost -skill1.cost);
    };

    const handleSkill2Changed = (event) => {
        var newSkillState = skill2;
        newSkillState.selected = event.target.checked;
        setSkill2(newSkillState);

        setSkill1Enabled(newSkillState.selected);

        if (event.target.checked)
            setCost(cost + skill2.cost);
        else if (!event.target.checked)
            setCost(cost -skill2.cost);
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
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    disabled={skill1Enabled} 
                                    name={skill1.name} onChange={handleSkill1Changed}/>}
                            label={skill1.name + " (+ " + skill1.cost + ")"}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={skill2Enabled}
                                    name={skill2.name} onChange={handleSkill2Changed}/>}
                            label={skill2.name + " (+ " + skill2.cost + ")"}
                        />

                        <Divider />
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
                                isClearable={true}
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
                        <Divider />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Upgrade card 1</InputLabel>
                            <Select
                                displayEmpty
                                isClearable={true}
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
                                isClearable={true}
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
    costUpdated: PropTypes.func,
    removeShip: PropTypes.func
};

export default Ship;