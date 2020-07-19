export const gameModes = [
    {
      name: 'Patrol',
      maxPoints: 50,
      minShips: 2,
      maxShips: 4,
      NotAllowedShipClasses: ["Ship of the Line"]
    },
    {
      name: 'Skirmish',
      maxPoints: 100,
      minShips: 3,
      maxShips: 8,
      NotAllowedShipClasses: []
    },
    {
      name: 'Engagement',
      maxPoints: 200,
      minShips: 4,
      maxShips: 10,
      NotAllowedShipClasses: ["Ship of the Line"]
    },
  ];