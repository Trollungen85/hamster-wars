# HAMSTERWARS backend

+ Backend: REST API med Node.js, Express och Firestore
+ Frontend: web app med React

Bilder och JSON data som du behöver för uppgiften finns i detta repo.


---
## Specifikation
#### Godkänt-nivå
Ett hamster-objekt ska innehålla följande egenskaper. Du får lägga till fler om du behöver, men du får inte ta bort några.

| Egenskap | Datatyp | Värde |
|:---------|:--------|:------|
|id        |string   |Id för hamster-objektet |
|name      |string   |Hamsterns namn |
|age       |number   |Hamsterns ålder i hela år |
|favFood   |string   |Hamsterns favoritmat |
|loves     |string   |Hamsterns favoritaktivitet |
|imgName   |string   |Namn på filen som har bild på hamstern |
|wins      |number   |Antal vinster |
|defeats   |number   |Antal förluster |
|games     |number   |Antal matcher totalt |

Hamster-objekt ska lagras som *documents* i en *collection* i Firestore. Du ska bygga ett API som med hjälp av datan har följande resurser. *Id* ska vara en unik kod, som används i API-resurser när man behöver referera till ett specifikt objekt. Du kan använda det id som Firestore skapar.

| Statisk resurs  | Respons        |
|-----------------|----------------|
| `/:filnamn`       | Frontend-filer |
| `/img/:filnamn`   | Hamsterbild    |

Alla API-resurser ska returnera JSON eller en HTTP statuskod.

| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/hamsters`     | -    | Array med alla hamsterobjekt  |
| GET    | `/hamsters/random` | -    | Ett slumpat hamsterobjekt  |
| GET    | `/hamsters/:id` | -    | Hamsterobjekt med ett specifikt id.<br>404 om inget objekt med detta id finns. |
| POST   | `/hamsters`     | Hamster-objekt utan id (ska skapas av databasen) | Statuskod 200 om det gick att lägga till ett nytt hamsterobjekt i databasen.<br> Statuskod 400 om något gick fel. |
| PUT    | `/hamsters/:id` | Objekt med de ändringar som ska göras i vald hamster | Statuskod 200 om id matchar en hamster.<br>Statuskod 404 om id inte matchar en hamster. <br>Statuskod 400 om ett annat fel inträffar. |
| DELETE | `/hamsters/:id` | -    | Statuskod 200 om id matchar en hamster och det gick att ta bort den från databasen.<br>Statuskod 404 om id inte matchar en hamster.<br>Statuskod 400 om ett annat fel inträffar. |

---
#### VG-nivå
Appen ska spara resultatet av genomförda matcher i databasen, i matchobjekt.

| Egenskap | Datatyp | Värde |
|:---------|:--------|:------|
|id        |string   |Matchens id |
|winnerId  |string   |Id för vinnande hamstern |
|loserId   |string   |Id för förlorande hamstern |

Nya API-resurser.

| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/matches`     | -    | Array med alla matchobjekt  |
| GET    | `/matches/:id` | -    | Matchobjekt med ett specifikt id.<br>404 om inget objekt med detta id finns. |
| POST   | `/matches`     | Match-objekt utan id (skapas av databasen) | Statuskod 200 om det gick att lägga till ett nytt objekt i databasen.<br> Statuskod 400 om något gick fel. |
| DELETE | `/matches/:id` | -    | Statuskod 200 om id matchar en match och det gick att ta bort den från databasen.<br>Statuskod 404 om id inte matchar en match.<br>Statuskod 400 om ett annat fel inträffar. |
| GET    | `/matchWinners/:id` | -    | Array med matchobjekt för alla matcher, som hamstern med *id* har vunnit. Statuskod 404 om id inte matchar en hamster som vunnit någon match.  |
| GET    | `/winners`      | -    | En array med hamsterobjekt för de 5 som vunnit flest matcher   |
| GET    | `/losers`       | -    | En array med hamsterobjekt för de 5 som förlorat flest matcher   |


#### Level ups
Resurser som är bra träning, men inte nödvändiga för högsta betyg.

1. `GET /defeated/:hamsterId`  - array med id för alla hamstrar den valda hamstern har besegrat
1. `GET /score/:challenger/:defender`  - två hamster-id som parameter. Respons ska vara ett objekt `{ challengerWins, defenderWins }` med antal vinster för respektive hamster, när de har mött varandra.
1. `GET /fewMatches`  - returnerar en array med id för de hamstrar som vunnit minst antal matcher. Arrayen ska ha minst ett element.
1. `GET /manyMatches`  - returnerar en array med id för de hamstrar som vunnit flest antal matcher. Arrayen ska ha minst ett element.



---
## Frågor och svar
Svar på eventuella vanliga frågor kommer att läggas till här.


---
## Bedömning
Observera att du måste följa specifikationen *exakt*. Du *måste* använda de namn och statuskoder som står här.

För *godkänt* krävs
+ du använder teknikerna Node, Express och Firestore
+ ditt API är publicerat online
+ ditt API följer specifikationen
+ ditt API implementerar G-nivån

För *väl godkänt* krävs dessutom
+ ditt API implementerar VG-nivån
