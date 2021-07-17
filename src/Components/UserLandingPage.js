import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const UserLandingPage = () => {

  const useStyles = makeStyles((theme) => ({
    AppBarHeader: {
      paddingRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <>
    <AppBar position="sticky">
    <Toolbar>
      <Grid 
        container  
        direction="row" 
        justifyContent="flex-start">
        <Typography className={classes.AppBarHeader} variant="subtitle1">
          My Squadrons
        </Typography>        
      </Grid>
    </Toolbar>
  </AppBar>
  <List>
    {[0,1,2,3].map((id) => 
      <ListItem button>
      <ListItemText key={id}
      primary="Pirates from hell" 
      secondary="Patrol 34/500" />
      <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                  
    </ListItem>
    )}    
  </List>
  </>
  );
};

export default UserLandingPage;
