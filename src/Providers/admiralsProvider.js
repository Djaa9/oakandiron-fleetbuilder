import { allAdmirals } from "../Data/admirals";
import { factionTypes } from "../Data/factionTypes";

const admiralProvider = {
  allowed: function (faction) {
    if (!faction)
      throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

    return allAdmirals.filter(admiral => admiral.faction === faction.type || 
                                         admiral.faction === factionTypes.NONE);
  }
};

export default admiralProvider;
