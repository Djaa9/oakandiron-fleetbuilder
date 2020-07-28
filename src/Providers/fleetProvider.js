const fleetProvider = {
    saveToUrl: function (fleet, history){
        var newRoute = "/fleetBuilder/" + JSON.stringify(fleet);

        if(newRoute !== history.location.pathname)
            history.replace(newRoute);
    },
    importFromUrl: function (compressedFleet){
        return JSON.parse(compressedFleet.match.params.fleet);
    }
};

export default fleetProvider;