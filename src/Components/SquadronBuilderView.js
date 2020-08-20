import React, { useState, useEffect, } from 'react';
import FleetBuilder from './FleetBuilder';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Typography, Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import FleetExporter from './FleetExporter';
import { useParams } from 'react-router-dom';
import fleetProvider from '../Providers/squadronProvider';

function SquadronBuilderView() {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1
    },
    topForm: {
      padding: theme.spacing(1)
    },
    toolbarIcons: {
      color: theme.palette.background.default
    }
  }));

  let { squadronId } = useParams();
  const classes = useStyles();

  const [squadron, setSquadron] = useState({});
  const [fleetExporterOpen, setFleetExporterOpen] = useState(false);

  useEffect(() => {
    const callProviderAsync = async () => {
      let fleet = await fleetProvider.GetFromId(squadronId);
      setSquadron(fleet);
    };

    callProviderAsync();
  }, [squadronId]);

  const handleFleetChanged = (newFleet) => {
    setSquadron(newFleet);
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="subtitle1" className={classes.title}>
            Untitled Squadron
                {squadron.gameMode ? " ( " + squadron.cost + "/" + squadron.gameMode.maxPoints + "points )" : " ( 0/0 points )"}
          </Typography>
          <Button className={classes.toolbarIcons} startIcon={<PublishIcon />} onClick={() => { setFleetExporterOpen(true) }} >Share</Button>
        </Toolbar>
      </AppBar>

      <FleetBuilder fleet={squadron} onFleetChanged={handleFleetChanged} />
      {fleetExporterOpen &&
        <FleetExporter onClose={() => { setFleetExporterOpen(false) }} open={fleetExporterOpen} fleet={squadron} />
      }
    </div>
  );
};

export default SquadronBuilderView;