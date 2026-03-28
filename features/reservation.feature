Feature: Réservation de salle

  Scenario: Réservation complète réussie
    Given un utilisateur authentifié
    And une salle A101 disponible le 2026-03-28 de 10:00 à 11:00
    When il confirme la réservation
    Then la réservation est enregistrée
    And un identifiant unique est généré
    And un email de confirmation est préparé
    And le créneau devient indisponible

  Scenario: Filtrage par date et capacité
    Given plusieurs salles avec capacités différentes
    When l'utilisateur recherche une salle pour 20 places le 2026-03-28
    Then seules les salles compatibles et disponibles sont retournées

  Scenario: Tentative de réservation d'un créneau indisponible
    Given un utilisateur authentifié
    And une salle A101 déjà réservée le 2026-03-28 de 10:00 à 11:00
    When il tente de confirmer la réservation
    Then une erreur SLOT_NOT_AVAILABLE est retournée
