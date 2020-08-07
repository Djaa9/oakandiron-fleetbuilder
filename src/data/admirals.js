import { factionTypes as faction } from "./factionTypes";

 export const allAdmirals = [
    {
      name: "Untested Admiral",
      admiralValue: 0,
      keywords: [],
      faction: faction.NONE,
      cost: 0
    },
    {
      name: "Experienced Admiral",
      admiralValue: 1,
      keywords: [],
      faction: faction.NONE,
      cost: 2
    },
    {
      name: "Seasoned Admiral",
      admiralValue: 2,
      keywords: [],
      faction: faction.NONE,
      cost: 4
    },
    {
      name: "Abraham Crijinssen",
      admiralValue: 1,
      keywords: ["Rogues", "Raider", "Brave"],
      faction: faction.DUTCH,
      cost: 4
    },
    {
      name: "Cornelis Evertsen the Youngest",
      admiralValue: 2,
      keywords: ["Bold"],
      faction: faction.DUTCH,
      cost: 5
    },
    {
      name: "Michiel de Ruyter",
      admiralValue: 3,
      keywords: ["Brave", "Brilliant", "Tactician", "Beloved"],
      faction: faction.DUTCH,
      cost: 15
    },
    {
      name: "Henry Morgan",
      admiralValue: 1,
      keywords: ["Rogues", "Clever", "Buccaneer Tactics"],
      faction: faction.ENGLISH,
      cost: 5
    },
    {
      name: "John Benbow",
      admiralValue: 2,
      keywords: ["Dogged", "Inspiring", "Doughty"], 
      faction: faction.ENGLISH,
      cost: 10
    },
    {
      name: "George Monck",
      admiralValue: 3,
      keywords: ["Tactician", "Superior coordination"],
      faction: faction.ENGLISH,
      cost: 8
    },
    {
      name: "Rene Dugay-Trouin",
      admiralValue: 2,
      keywords: ["Clever", "Bold"],
      faction: faction.FRENCH,
      cost: 6
    },
    {
      name: "Jean Bart",
      admiralValue: 2,
      keywords: ["Rogues", "Clever", "Tactitian", "Inspiring"],
      faction: faction.FRENCH,
      cost: 8
    },
    {
      name: "Jean II Comte d'Estrees",
      admiralValue: 3,
      keywords: ["Persistent"],
      faction: faction.FRENCH,
      cost: 7
    },
    {
      name: "Manuel Rivero de Pardal",
      admiralValue: 1,
      keywords: ["Rogues", "Brave", "Inspiring", "Pompous"],
      faction: faction.SPANISH,
      cost: 4
    },
    {
      name: "Francisco Pereira Freire de la Cerda",
      admiralValue: 2,
      keywords: ["Bold", "Pompous"],
      faction: faction.SPANISH,
      cost: 3
    },
    {
      name: "Andres Ochoa de Zarate",
      admiralValue: 3,
      keywords: ["Defender", "Indecisive"],
      faction: faction.SPANISH,
      cost: 4
    },
    {
      name: "Henry Jennings",
      admiralValue: 1,
      keywords: ["Rogues", "Raider", "Brilliant"],
      faction: faction.PIRATE,
      cost: 4
    },
    {
      name: "Jean Hamlin",
      admiralValue: 1,
      keywords: ["Rogues", "Tactician", "Lucky"],
      faction: faction.PIRATE,
      cost: 4
    },
    {
      name: "Edward \"Blackbeard\" Teach",
      admiralValue: 1,
      keywords: ["Rogues", "Brutal", "Dogged"],
      faction: faction.PIRATE,
      cost: 5
    },
    {
      name: "Bartholomew \"Black Bart\" Roberts",
      admiralValue: 2,
      keywords: ["Rogues", "Interprid", "Inspiring"],
      faction: faction.PIRATE,
      cost: 6
    }   
  ];