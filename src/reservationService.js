class ReservationService {

  // US05 — Confirmer la réservation
  static reserve(available) {
    if (!available) throw new Error('SLOT_NOT_AVAILABLE');
    return {
      status: 'CONFIRMED',
      reservationId: 'RES-' + Date.now(),
    };
  }

  // US01 — Filtrer les salles par capacité et disponibilité
  static filterRooms(salles, capaciteMinimale) {
    return salles.filter(
      (salle) => salle.capacite >= capaciteMinimale && salle.disponible === true
    );
  }

}

module.exports = ReservationService;
