import { gameModes } from '../Data/gameModes';
import { factionTypes } from '../Data/factionTypes';
import Admirals from "../Providers/admiralsProvider";
import Commanders from '../Data/commanders.js';
import UpgradeCards from "../Providers/upgradeCardsProvider";
import { ships } from '../Data/ships';

const fleetProvider = {
    saveToUrl: function (fleet, history){

        var dataForUrl = [];

        fleet.forEach((fleetProp) => {
        
            if(fleetProp.gameMode){
                dataForUrl.push({gameMode: fleetProp.gameMode.name});
            }
              if(fleetProp.faction){
                dataForUrl.push({faction: fleetProp.faction.name});
              }
              if(fleetProp.admiral){            
                dataForUrl.push({admiral: fleetProp.admiral.name});
              }
              if(fleetProp.ships){
                console.log("ships", fleetProp.ships);
                //ships.forEach(ship => {
                  //  dataForUrl.ships.push({name: ship.name,
                   //                        isFlagShip: ship.isFlagShip,
                     //                      commander: ship.commander,
                       //                    skill: ship.skill,
                         //                  UpgradeCards})
                    
                //});
              }

                
  
              if(fleetProp.initiativeCards)
                dataForUrl.push({initiativeCards: fleetProp.initiativeCards});
          }
        );

          console.log(dataForUrl);

        var newRoute = "/fleetBuilder/" + JSON.stringify(dataForUrl);

        if(newRoute !== history.location.pathname)
            history.replace(newRoute);
    },
    importFromUrl: function (compressedFleet){
        return JSON.parse(compressedFleet.match.params.fleet);
    }
};

export default fleetProvider;