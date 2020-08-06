import { allAdmirals } from "../Data/admirals";

const admiralProvider = {
  allowed: function (faction) {
    if (!faction)
      throw new Error("Faction not selected (faction = " + faction + "). Allowed Ships could not be determined");

    return allAdmirals.filter(admiral => admiral.factions.includes(faction.name)).sort((a, b) => a.cost < b.cost ? -1 : 1)
                                                                                 .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)); // Sort same cost alphabetically
  }
};
export default admiralProvider;
