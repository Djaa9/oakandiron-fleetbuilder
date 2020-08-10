import { allAdmirals } from "../data/admirals";
import { factionTypes } from "../data/factionTypes";

const admiralProvider = {
  allowed: function (faction) {
    if (!faction)
      throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

    return allAdmirals.map(admiral => Object.assign({}, admiral))
                                            .filter(admiral => admiral.faction === faction.type || 
                                                               admiral.faction === factionTypes.NONE);
  }
};

export default admiralProvider;
