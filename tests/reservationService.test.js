const ReservationService = require('../src/reservationService');

describe('ReservationService', () => {

  // US05 — Confirmer la réservation
  test('réserver un créneau disponible retourne CONFIRMED avec un ID', () => {
    const result = ReservationService.reserve(true);
    expect(result.status).toBe('CONFIRMED');
    expect(result.reservationId).not.toBeNull();
  });

  // US05 — Créneau indisponible
  test('réserver un créneau indisponible lève une erreur', () => {
    expect(() => ReservationService.reserve(false)).toThrow('SLOT_NOT_AVAILABLE');
  });

  // US01 — Filtrer les salles
  test('filtrer les salles retourne uniquement les salles compatibles', () => {
    const salles = [
      { nom: 'A101', capacite: 30, disponible: true },
      { nom: 'B202', capacite: 10, disponible: true },
      { nom: 'C303', capacite: 25, disponible: false },
    ];
    const result = ReservationService.filterRooms(salles, 20);
    expect(result).toHaveLength(1);
    expect(result[0].nom).toBe('A101');
  });

});
