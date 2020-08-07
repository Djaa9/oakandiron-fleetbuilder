export const initiativeCards = {
  generic: [
    {
      name: "Await New Orders",
      initiativeValue: 1,
      faction: "All",
      cardText: "Once revealed, choose a card in your Initiative Hand and place it face up on top of this card. Use the rules detailed on that card and the Initiative Value of this card. During the end phase, return both cards to your hand unless the card states that it must be discarded after being played",
      discardedAfterUse: false
    },
    {
      name: "Down!",
      initiativeValue: 1,
      faction: "All",
      cardText: "All ships in this Squadron reduce the amount of Fatigue taken from each Attack by 1 (to a minimum of 0).",
      discardedAfterUse: false
    },
    {
      name: "Fire as She Bears",
      initiativeValue: 1,
      faction: "All",
      cardText: "Ships in this Squadron in Formation may make a Free Broadside Attack against any ship that moves into a legal firing position during the Movement Phase. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Careful Aim",
      initiativeValue: 2,
      faction: "All",
      cardText: "When testing for critical damage, ships in this Squadron may re-roll any dice that fail to score (Skull), (swords), or (sail) results.",
      discardedAfterUse: false
    },
    {
      name: "Take Courage",
      initiativeValue: 2,
      faction: "All",
      cardText: "Each ship in this Squadron that is in Formation may immediately remove 1 point of Fatigue.",
      discardedAfterUse: false
    },
    {
      name: "Effective Fire",
      initiativeValue: 3,
      faction: "All",
      cardText: "Increase the broadside value of each ship in this squadron by 1 for the rest of this turn.",
      discardedAfterUse: false
    },
    {
      name: "Small Arms",
      initiativeValue: 3,
      faction: "All",
      cardText: "If an opposing ship ends its move within Pistol Shot of 1 or more ships in this Squadron during the movement phase, 1 of those ships may take a Free Partial Fire Attack against the opposing ship. This Attack cannot cause damage or critical hits to the target ship.",
      discardedAfterUse: false
    },
    {
      name: "Reload!",
      initiativeValue: 3,
      faction: "All",
      cardText: "Each ship in this Squadron that is in Formation may immediately remove a Reload marker.",
      discardedAfterUse: false
    },
    {
      name: "Rolling Broadsides",
      initiativeValue: 3,
      faction: "All",
      cardText: "Each ship in this Squadron may spend a Crew Action to make an Attack during the Movement Phase.",
      discardedAfterUse: false
    },
    {
      name: "Adjust Position",
      initiativeValue: 4,
      faction: "All",
      cardText: "Each ship in this Squadron that is in Formation or within Pistol Shot of a friendly ship and is not Entangled or Aground may make a Free shift directly sideways (up to speed 1) at the beginning or end of its move.",
      discardedAfterUse: false
    },
    {
      name: "Fleet Maneuver",
      initiativeValue: 4,
      faction: "All",
      cardText: "Each ship in this Squadron that is in Formation and not Entangled or Aground may immediately make a Free turn using the speed 1 tool.",
      discardedAfterUse: false
    },
    {
      name: "Lee Guage Fire",
      initiativeValue: 4,
      faction: "All",
      cardText: "When a ship in this Squadron that does not have an Anchored or Aground token makes a Broadside or Partial Fire Attack against a ship that is completely upwind of it, (Musket) results count as hits at Cannon Shot.",
      discardedAfterUse: false
    },
    {
      name: "Shoals Ahead",
      initiativeValue: 4,
      faction: "All",
      cardText: "All ships in this Squadron ignore Shoal Terrain.",
      discardedAfterUse: false
    },
    {
      name: "Boarding Through the Smoke",
      initiativeValue: 4,
      faction: "All",
      cardText: "Ships in this Squadron that make a Boarding Crew Action may make a Free Partial Fire Attack against the target ship imediately before the action.",
      discardedAfterUse: false
    },
    {
      name: "Favorable Wind",
      initiativeValue: 5,
      faction: "All",
      cardText: "Each ship in this Squadron that is sailing Large and not Entagled or Aground must increase their Speed rating by 1.",
      discardedAfterUse: false
    },
    {
      name: "Boat Assault",
      initiativeValue: 1,
      faction: "All",
      cardText: "During the Movement Phase, Ships in this squadron that move at Speed Rating 2 or less can place a Landing Party token on an opposing ship within Pistol Shot. During the Attack Phase, ships that deployed a Landing Party token this way may make a Close Combat Attack against the ship that it placed the token on. Landing Party tokens placed this way are removed at the end of the turn.",
      discardedAfterUse: false
    }
  ],
  dutch: [
    {
      name: "Lured into the Shoals",
      initiativeValue: 2,
      faction: "Dutch",
      cardText: "Place a shoal terrain piece within Musket Shot of a ship in this Squadron. May not be placed within Yard Arm distance of any ship. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Expert Boarding",
      initiativeValue: 3,
      faction: "Dutch",
      cardText: "During the Movement Phase, ships in this Squadron may make a Free Close Combat Attack immediately following a successful Boarding Action",
      discardedAfterUse: false
    },
    {
      name: "Adaptive tactics",
      initiativeValue: 4,
      faction: "Dutch",
      cardText: "If your opponent has any discarded Initiative Cards, you may apply the effects of 1 of those cards to your Squadron. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Seize the Opportunity",
      initiativeValue: 5,
      faction: "Dutch",
      cardText: "Ships in thisSquadron that are not in Formation during the Attack Phase roll 2 more dice during all Attacks. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    }
  ],
  english: [
    {
      name: "Zeal",
      initiativeValue: 1,
      faction: "English",
      cardText: "When this Squadron's Flagship takes a Rally Crew Action, each friendly ship within Musket Shot rolls a Skill Test. If the ship succeeds, remove 1 point of Fatigue for that ship",
      discardedAfterUse: false
    },
    {
      name: "Long Range Gunnery",
      initiativeValue: 2,
      faction: "English",
      cardText: "Each time a ship in this squadron rolls a (cannon) result on an Attack made at Cannon Shot, roll an additional dice for each (cannon), Apply this effect until there are no (cannon) results.",
      discardedAfterUse: false
    },
    {
      name: "Adjust Formation",
      initiativeValue: 3,
      faction: "English",
      cardText: "If a ship in this Squadron is within Pistol Shot of another friendly ship, it is treated as being in Formation.",
      discardedAfterUse: false
    },
    {
      name: "Engage More Closely",
      initiativeValue: 4,
      faction: "English",
      cardText: "Each ship in this Squadron that is not Entangled or Aground may make a Free Move Directly Sideways (up to Speed Rating 1) at the beginning or end of its Move. Additionally, ships within Pistol Shot roll 2 more dice during Broadside Attacks. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Fast Loader",
      initiativeValue: 5,
      faction: "English",
      cardText: "Each ship in this Squadron may immediately remove a reload marker. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    }
  ],
  french: [
    {
      name: "Elan",
      initiativeValue: 1,
      faction: "French",
      cardText: "During the Movement Phase, ships in this Squadron may spend a Crew Action to make a Partial Fire or Close Combat, Roll 1 more dice during these Attacks.",
      discardedAfterUse: false
    },
    {
      name: "Superior Firepower",
      initiativeValue: 2,
      faction: "French",
      cardText: "Increase the broadside value of each ship in this squadron by 2 for the rest of this turn. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Target Rigging",
      initiativeValue: 3,
      faction: "French",
      cardText: "Every ship in this Squadron must roll 1 more dice during Attacks made against rigging.",
      discardedAfterUse: false
    },
    {
      name: "Swift Vessels",
      initiativeValue: 4,
      faction: "French",
      cardText: "Each ship in this Squadron that is not In The Wind's Eye, Entangled, or Aground may immediately make a Free Speed 1 move.",
      discardedAfterUse: false
    },
    {
      name: "Boarders Away",
      initiativeValue: 5,
      faction: "French",
      cardText: "Ships in this Squadron automatically pass Sailing Tests when attempting Boarding Actions against ships at Minimal or Anchored Sail plans.",
      discardedAfterUse: false
    }
  ],
  spanish: [
    {
      name: "Repel Boarders",
      initiativeValue: 1,
      faction: "Spanish",
      cardText: "Close Combat Attacks made against any ship in this Squadron only count hits on (Skull) results.",
      discardedAfterUse: false
    },
    {
      name: "Heavy Musket Volley",
      initiativeValue: 2,
      faction: "Spanish",
      cardText: "Each ship in this Squadron may spend a Crew Action to make a Partial Fire Attack during the Movement Phase. This attack cannot cause damage or critical hits to the target ship.",
      discardedAfterUse: false
    },
    {
      name: "Aggression",
      initiativeValue: 3,
      faction: "Spanish",
      cardText: "When a ship in this Squadron makes an Attack of any kind within Musket Shot (must score at least 1 hit), the target takes 1 point of Fatigue.",
      discardedAfterUse: false
    },
    {
      name: "Resilient",
      initiativeValue: 4,
      faction: "Spanish",
      cardText: "Ships in this Squadron reduce the amount of damage taken from each attack by 1 (to a minimum of 1).",
      discardedAfterUse: false
    },
    {
      name: "Bravado",
      initiativeValue: 5,
      faction: "Spanish",
      cardText: " Ships in this Squadron that are not Shaken are treated as if they have no Fatigue. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    }
  ],
  pirate: [
    {
      name: "Deception",
      initiativeValue: 2,
      faction: "Pirate",
      cardText: "Ships in this Squadron may not be Attacked at Cannon Shot. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    },
    {
      name: "Raise the Black",
      initiativeValue: 3,
      faction: "Pirate",
      cardText: "All opposing ships within Musket Shot of a ship in this Squadron must immediately roll a Skill Test with 3 fewer dice. Each ship that fails this test takes 1 point of Fatigue. Discard this Initiative Card instead of returning it to your hand during the end phase.",
      discardedAfterUse: true
    }
  ],
  special: [
    {
      name: "Doughty",
      initiativeValue: 4,
      faction: "Admiral Keyword",
      cardText: "If you earned any Strike Points in the previous turn, immediately remove 1 Fatigue from each ship in this Squadron. This Card may only be included with a Squadron whose Admiral has the \"doughty\" special rule.1",
      discardedAfterUse: false
    },      
    {
      name: "Intrepid",
      initiativeValue: 1,
      faction: "Admiral Keyword",
      cardText: "Each ship in this Squadron within Musket shot of their Flagship may immediately remove 1 poin of Fatigue. This card may only be included with a Squadron whose Admiral has the \"Intrepid\" special rule.",
      discardedAfterUse: true
    },
  ]
};