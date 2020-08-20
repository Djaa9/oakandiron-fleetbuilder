import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import fleetProvider from '../Providers/squadronProvider.js';
import { Dialog, DialogTitle, TextField, Grid, DialogContentText, DialogContent, Button, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';

function FleetExporter(props) {


// TODO Put func in util file
    function appUrl(resourceUrl){

        if(process.env.NODE_ENV === "production")
          return "https://oai-toolkit.netlify.app";
      
        if(process.env.NODE_ENV === "development")
          return "http://localhost:3000";
      
        if(process.env.NODE_ENV === "test")
          return "http://localhost:3000";
      
          return "";
      }

    const { open, onClose, fleet } = props;

    const useStyles = makeStyles((theme) => ({
        fleetExporterDialog: {
            padding: theme.spacing(2)
        },
        textExportInputField: {
            width: "100%"
        },
        hiddenForm: {
            height: 0,
            width: 0,
            border: "0px"        
        }
    }));

    const classes = useStyles();

    const [fleetLink, setFleetLink] = useState("");
    const [fleetTextExport, setFleetTextExport] = useState("");
    const textExportInputField = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (!fleet) return;

        const callProviderAsync = async () => {
            let link = appUrl() + "/squadron/";
            link += await fleetProvider.SaveAndGetId(fleet);
            
            console.log(link);
            setFleetLink(link);
          };
          
          callProviderAsync();
        
        setFleetTextExport(fleetProvider.toText(fleet));
    }, [fleet])

    function copyToClipboard(e) {
        textAreaRef.current.value = textExportInputField.current.textContent;
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
      };

    return (
        <Dialog fullWidth={true}
            maxWidth="md"
            className={classes.fleetExporterDialog}
            open={open}
            onClose={() => onClose()}>
            <DialogTitle> Share </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    From here you can share you list by copy pasting the text in the textbox.
          </DialogContentText>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                                            
                    <Button startIcon={<AssignmentIcon />} onClick={copyToClipboard}> Copy to clipboard </Button>
                    <TextField ref={textExportInputField} className={classes.textExportInputField} multiline variant="outlined" defaultValue={fleetTextExport} />
                    
                </Grid>
                    <textarea className={classes.hiddenForm} ref={textAreaRef}/>
                </DialogContent>
                <DialogActions>
                
                    <Button onClick={() => onClose()} color="secondary">
                        Close
                    </Button>      
                   {/*<Button variant="contained" onClick={() => {}} color="primary">
                        Save as file
                    </Button> */}              
                </DialogActions>
            
        </Dialog>
    );

}

FleetExporter.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fleet: PropTypes.object.isRequired
};

export default FleetExporter;