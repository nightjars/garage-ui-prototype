export class GarageService {
  getGarages() {
    return [
      {
        garageName: 'Main',
        totalStalls: 100,
        vehicles: [
          {
            plate: 'ABC123',
            time_in: new Date(2015, 1, 1, 1, 1, 1, 1),
            time_out: null,
            checked_in: false
          }
        ]},
      {
        garageName: 'Second',
        totalStalls: 100,
        vehicles: [
          {
            plate: 'ABC124',
            time_in: new Date(2015, 1, 1, 1, 1, 1, 1),
            time_out: null,
            checked_in: false
          }
        ]}
    ];
  }
}
