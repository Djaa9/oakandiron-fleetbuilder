import { allAdmirals } from "../Data/admirals";

const admiralProvider = {
  allowed: function (faction) {
    if (!faction)
      throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

    return allAdmirals.filter(admiral => admiral.factions.includes(faction.name));
  }
};
export default admiralProvider;
