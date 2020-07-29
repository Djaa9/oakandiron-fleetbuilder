import React, { useState, useEffect, } from 'react';
import Proptypes from 'prop-types';
import FleetBuilder from './FleetBuilder';
import fleetProvider from '../Providers/fleetProvider.js';
import { useHistory } from "react-router-dom";

function FleetBuilderView(props) {

    let history = useHistory();
    const [fleet, setFleet] = useState("");
    const { urlParams } = props;

    useEffect(() => {

        if (urlParams) {
            const fleetToImport = fleetProvider.fromUrlParams(urlParams);
            console.log(fleetToImport); // TODO remove
            setFleet(fleetToImport);            
        };
    }, []);

    const handleFleetChanged = (newFleet) => {
        history.replace(fleetProvider.toUrlParams(newFleet));
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