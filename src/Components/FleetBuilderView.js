import React, { useState, useEffect, } from 'react';
import Proptypes from 'prop-types';
import FleetBuilder from './FleetBuilder';
import fleetProvider from '../Providers/fleetProvider.js';
import { useHistory } from "react-router-dom";

function FleetBuilderView(props) {

    let history = useHistory();
    const [fleet, setFleet] = useState("");
    const { urlParams } = props;

    console.log("FleetBuilderView", urlParams)

    useEffect(() => {

        if (urlParams) {            
            var importedFleet = fleetProvider.importFromUrl(urlParams);

            setFleet(importedFleet);
            console.log(importedFleet);
        };
    }, []);

    const handleFleetChanged = (newFleet) => {
        console.log("handleFleetChanged", newFleet)
        fleetProvider.saveToUrl(newFleet, history);
    };

    if (fleet) {
        return (<FleetBuilder fleet={fleet} onFleetChanged={handleFleetChanged} />)
    }
    else {
        return (<FleetBuilder onFleetChanged={handleFleetChanged} />);
    }

};

FleetBuilderView.propTypes = {
    urlParams: Proptypes.object
};

export default FleetBuilderView;