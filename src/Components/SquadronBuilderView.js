import React, { useState, useEffect, } from 'react';
import Squadron from './Squadron';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Typography, Button, Grid } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import FleetExporter from './FleetExporter';
import { useParams } from 'react-router-dom';
import squadronProvider from '../Providers/squadronProvider';
import SquadronCost from './SquadronCost';

function SquadronBuilderView() {
  const useStyles = makeStyles((theme) => ({
    topForm: {
      padding: theme.spacing(1)
    },
    toolbarIcons: {
      color: theme.palette.background.default
    },
    squadronName: {
      paddingRight: theme.spacing(1)
    }
  }));

  let { squadronId } = useParams();
  const classes = useStyles();

  const [squadron, setSquadron] = useState({});
  const [squadronWithCosts, setSquadronWithCosts] = useState({});
  const [fleetExporterOpen, setFleetExporterOpen] = useState(false);

  useEffect(() => {
    const callProviderAsync = async () => {
      let squadron = await squadronProvider.GetFromId(squadronId);
      setSquadron(squadron);
    };

    callProviderAsync();
  }, [squadronId]);

  const handleSquadronChanged = (newSquadron) => {
    setSquadronWithCosts(Object.assign({}, newSquadron));
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Grid 
          container
          direction="row"
          justify="flex-start">
          <Typography className={classes.squadronName} variant="subtitle1">
            Untitled Squadron
          </Typography>
          <SquadronCost squadron={squadronWithCosts} />
          </Grid>
          <Button className={classes.toolbarIcons} startIcon={<PublishIcon />} onClick={() => { setFleetExporterOpen(true) }} >Share</Button>
        </Toolbar>
      </AppBar>

      <Squadron squadron={squadron} onSquadronChanged={handleSquadronChanged} />
      {fleetExporterOpen &&
        <FleetExporter onClose={() => { setFleetExporterOpen(false) }} open={fleetExporterOpen} fleet={squadron} />
      }
    </div>
  );
};

export default SquadronBuilderView;