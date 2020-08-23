import React, { useState, useEffect, } from 'react';
import Squadron from './Squadron';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Typography, Button, Grid, Snackbar } from '@material-ui/core';
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
  const [squadronDraft, setSquadronDraft] = useState({});
  const [cost, setCost] = useState(0);
  const [fleetExporterOpen, setFleetExporterOpen] = useState(false);
  const [showTooFewShipsMessage, setShowTooFewShipsMessage] = useState(false);
  const [showTooManyShipsMessage, setShowTooManyShipsMessage] = useState(false);
  const [showTooManyPointsMessage, setShowTooManyPointsMessage] = useState(false);

  useEffect(() => {
    const callProviderAsync = async () => {
      let squadron = await squadronProvider.GetFromId(squadronId);
      setSquadron(squadron);
    };

    callProviderAsync();
  }, [squadronId]);

  const handleSquadronChanged = (newSquadron) => {
    setSquadronDraft(Object.assign({}, newSquadron));
  };

  const handleSquadronRestrictions = () => {

    if (squadronDraft.gameMode) {
      setShowTooFewShipsMessage(squadronDraft.ships.length < squadronDraft.gameMode.minShips)

      if (squadronDraft.ships.length > squadronDraft.gameMode.maxShips)
        setShowTooManyShipsMessage(true)
      if (cost.current > squadronDraft.gameMode.maxPoints)
        setShowTooManyPointsMessage(true);
    };

    if (cost.current <= squadronDraft.gameMode.maxPoints) {
      setShowTooManyPointsMessage(false);
    };
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
              <SquadronCost squadron={squadronDraft} />
            </Grid>
            <Button className={classes.toolbarIcons} startIcon={<PublishIcon />} onClick={() => { setFleetExporterOpen(true) }} >Share</Button>
          </Toolbar>
        </AppBar>

        <Squadron squadron={squadron} onSquadronChanged={handleSquadronChanged} />
        {fleetExporterOpen &&
          <FleetExporter onClose={() => { setFleetExporterOpen(false) }} open={fleetExporterOpen} fleet={squadronDraft} />
        }
        { squadronDraft.gameMode &&
        <Snackbar open={showTooFewShipsMessage}
          autoHideDuration={4000}
          onClose={() => setShowTooFewShipsMessage(false)}
          message={"A fleet in " + squadronDraft.gameMode.name + " must have at least " + squadronDraft.gameMode.minShips + " ships"}
          action={(
            <Button color="secondary"
              size="small" onClick={() => setShowTooFewShipsMessage(false)}>
              hide
            </Button>
          )}>
        </Snackbar>
        }
        { squadronDraft.gameMode &&
        <Snackbar open={showTooManyShipsMessage}
          autoHideDuration={4000}
          onClose={() => setShowTooManyShipsMessage(false)}
          message={"A fleet in " + squadronDraft.gameMode.name + " cannot include more than " + squadronDraft.gameMode.minShips + " ships"}
          action={(
            <Button color="secondary"
              size="small" onClick={() => setShowTooManyShipsMessage(false)}>
              hide
            </Button>
          )}>
        </Snackbar>
        }
        { squadronDraft.gameMode &&
        <Snackbar open={showTooManyPointsMessage}
          autoHideDuration={4000}
          onClose={() => setShowTooManyPointsMessage(false)}
          message={"Your fleet is at " + cost + " points.  A fleet in " + squadronDraft.gameMode.name + " cannot cost more than " + squadronDraft.gameMode.maxPoints + " points"}
          action={(
            <Button color="secondary"
              size="small" onClick={() => setShowTooManyPointsMessage(false)}>
              hide
            </Button>
          )}>
        </Snackbar>
        }
      </div>
    );
  };

  export default SquadronBuilderView;