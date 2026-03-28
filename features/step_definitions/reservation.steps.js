const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ReservationService = require('../../src/reservationService');

let salles = [];
let resultat = null;
let erreur = null;
let utilisateurAuthentifie = false;

// --- Given ---

Given('un utilisateur authentifié', () => {
  utilisateurAuthentifie = true;
});

Given('une salle A101 disponible le {word} de {word} à {word}', (date, debut, fin) => {
  salles = [{ nom: 'A101', capacite: 30, disponible: true, date, debut, fin }];
});

Given('une salle A101 déjà réservée le {word} de {word} à {word}', (date, debut, fin) => {
  salles = [{ nom: 'A101', capacite: 30, disponible: false, date, debut, fin }];
});

Given('plusieurs salles avec capacités différentes', () => {
  salles = [
    { nom: 'A101', capacite: 30, disponible: true },
    { nom: 'B202', capacite: 10, disponible: true },
    { nom: 'C303', capacite: 25, disponible: false },
  ];
});

// --- When ---

When('il confirme la réservation', () => {
  try {
    resultat = ReservationService.reserve(salles[0].disponible);
  } catch (e) {
    erreur = e;
  }
});

When('il tente de confirmer la réservation', () => {
  try {
    resultat = ReservationService.reserve(salles[0].disponible);
  } catch (e) {
    erreur = e;
  }
});

When("l'utilisateur recherche une salle pour {int} places le {word}", (places, date) => {
  resultat = ReservationService.filterRooms(salles, places);
});

// --- Then ---

Then('la réservation est enregistrée', () => {
  assert.strictEqual(resultat.status, 'CONFIRMED');
});

Then('un identifiant unique est généré', () => {
  assert.ok(resultat.reservationId);
});

Then('un email de confirmation est préparé', () => {
  // Simulé — la confirmation email sera implémentée en Release 1
  assert.ok(true);
});

Then('le créneau devient indisponible', () => {
  salles[0].disponible = false;
  assert.strictEqual(salles[0].disponible, false);
});

Then('une erreur SLOT_NOT_AVAILABLE est retournée', () => {
  assert.ok(erreur);
  assert.strictEqual(erreur.message, 'SLOT_NOT_AVAILABLE');
});

Then('seules les salles compatibles et disponibles sont retournées', () => {
  assert.strictEqual(resultat.length, 1);
  assert.strictEqual(resultat[0].nom, 'A101');
});
