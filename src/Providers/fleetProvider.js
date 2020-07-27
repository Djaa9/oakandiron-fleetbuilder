const fleetProvider = {
    saveToUrl: function (fleet, history){
        console.log("compressing", fleet, history);
        history.replace("/fleetBuilder/" + JSON.stringify(fleet));
    },
    importFromUrl: function (compressedFleet){
        return JSON.parse(compressedFleet.match.params.fleet);
    }
};

export default fleetProvider;