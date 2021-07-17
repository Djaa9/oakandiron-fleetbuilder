import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import squadronProvider from "../Providers/squadronProvider.js";
import {
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  DialogContentText,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";

function FleetExporter(props) {
  // TODO Put func in util file
  function appUrl(resourceUrl) {
    if (process.env.NODE_ENV === "production")
      return "https://oai-toolkit.netlify.app";

    if (process.env.NODE_ENV === "development") return "http://localhost:3000";

    if (process.env.NODE_ENV === "test") return "http://localhost:3000";

    return "";
  }

  const { open, onClose, fleet } = props;

  const useStyles = makeStyles((theme) => ({
    fleetExporterDialog: {
      padding: theme.spacing(3),
    },
    textExportInputField: {
      width: "100%",
    },
    hiddenForm: {
      height: 0,
      width: 0,
      border: "none",
      outline: "none",
      resize: "none",
      "*::-webkit-box-shadow": "none",
      "*::moz-box-shadow": "none",
      "*::box-shadow": "none",
    },
    linkDiv: {
      marginBottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [fleetLink, setFleetLink] = useState("");
  const [fleetTextExport, setFleetTextExport] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (!fleet) return;

    const callProviderAsync = async () => {
      let link = appUrl() + "/squadron/";
      link += await squadronProvider.SaveAndGetId(fleet);

      setFleetLink(link);
    };

    callProviderAsync();

    setFleetTextExport(squadronProvider.toText(fleet));
  }, [fleet]);

  const copyTextToClipboard = () => {
    textAreaRef.current.value = fleetTextExport;
    textAreaRef.current.select();
    document.execCommand("copy");
  };

  const copyLinkToClipboard = () => {
    textAreaRef.current.value = fleetLink;
    textAreaRef.current.select();
    document.execCommand("copy");
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      className={classes.fleetExporterDialog}
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle> Share </DialogTitle>
      <DialogContent>
        <DialogContentText>
          From here you can share you list by copy pasting the text in the
          textbox.
        </DialogContentText>
        <Grid
          container
          direction="column"
          justifyContent="stretch"
          alignItems="stretch"
        >
          <div className={classes.linkDiv}>
            <Button
              startIcon={<AssignmentIcon />}
              onClick={copyLinkToClipboard}
            >
              {" "}
              Copy to clipboard{" "}
            </Button>
            <TextField
              className={classes.textExportInputField}
              variant="outlined"
              value={fleetLink}
            />
          </div>
          <div>
            <Button
              startIcon={<AssignmentIcon />}
              onClick={copyTextToClipboard}
            >
              {" "}
              Copy to clipboard{" "}
            </Button>
            <TextField
              className={classes.textExportInputField}
              multiline
              variant="outlined"
              value={fleetTextExport}
            />
          </div>
        </Grid>
        <textarea className={classes.hiddenForm} ref={textAreaRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FleetExporter.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fleet: PropTypes.object.isRequired,
};

export default FleetExporter;
