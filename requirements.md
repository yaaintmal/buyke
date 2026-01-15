# Design Requirements “Einkaufsliste”

## Frontend: React + TS

- Input-Field + Btn
- Produktname
- Liste der Einträge
- Produktname
- Checkbox „gekauft“ (✓) (der Eintrag wird durchgestrichen nach dem abhaken)
- Löschen-Btn

## Backend Routes

- get /items
- post /items (Body: {name: string})
- put /items/:id (aktualisiert “gekauft” state) > body {bought: boolean}
- delete /items/:id

## MongoDB Modell

interface ShoppingItem {
\_id: ObjectId;
name: string;
bought: boolean;
createdAt: Date;
}

## Technische Anforderungen

- React + TS
- Express + TS
- MongoDB
- Front States via useState/useEffect
- Authentifizierung nicht notwendig
- Full README.md inkl. Setup Anleitung und Hinweis, ob externe UI-Bibliotheken verwendet wurden
- Struktur: Frontend und Backend getrennt
