## TODO

### Bug

- [ ] Képfeltöltés beragad ha szerver error van
- [ ] Sima login esetén hibakezelés -> error mezők meg egy szöveg hogy nem sikerült belépni
- [ ] Feladat sor összeállító oldalon Latex megjelenítés
- [ ] Feladat sor összeállító oldalon képek layout-ja
- [ ] Feladat sor összeállító oldalon képek több soros sor levágásnál valami bug volt xD (szöveg félbe van vágva)
- [ ] Mi a faszra jó a csillag?
- [ ] Feladat beküldés nehézség checkboxoknál legyen szám érték a nehézségre. (Korcsoport szerinti nehézség *)


## Fejleszthető

- [X] Feladat esetén lehetnek collaborator (User)-ek akik ugyan úgy jelenjelenk meg mint a feladat létrehozói
- [ ] Feladat esetén lehessen módosítani, valamint létrehozásánál megadni, hogy kik a collaborator-ok
- [ ] Csak a megfelelő jogosultság esetén lehessen adott oldalakra navigálni
   - Pl.: Ha valakinek nincs USER joga akkor csak beküldeni lehessen

- [ ] Esetleg bejelentkezéskor egy jegyezzen meg 30 napra gomb? és akkor hosszú lejáratú tokent generálna a backend
- [X] Feladat listázás oldal mobil responsivitás
- [ ] Home page mobil responsivitás
- [ ] Oldal frissítésekor a dolgok megmaradjanak (feladat, kereső, stb)
- [ ] Bármelyik feladat mező lehet latex, esetleg egy modal-os LaTeX editor?

### Statisztika oldal

Szükség van egy olyan compose jellegű oldara, ahol lehet látni hogy egy feladatsoron egy feladat hány kategóriában van használva.
Feladatonként hány segítő kérdés, illetve hány (rósszz) válaszopció van megadva.

# Kész

- [X] Feladatsorok listázása oldal
- [X] Feladat keresőben eremény rendezhetősége
- [X] Feladat oldalon, a feladathoz jelenjen meg egy (vagy több) Alert, amikbe valami fontos infót lehet a feladathoz megadni
- [X] Profil oldal
  - Kérdés: Mit rakjunk ide, mi az ami fontos, vagy funky infó lehet
  - Válasz: User statisztikákat, a saját feladataival kapcsolatban
- [X] Talon-ok kezelése 
  - Kérdés: Feladatsoronként, emberenként, globálisan kezeljük? 
  - Válasz: A talonok feladatsoronként kezelődnek. 

- [X] Profil módosítás, profilkép feltöltés
- [X] Feladat képre kattintás esetén nyíljon meg nagyban
- [X] Tag nyilvántartó oldal, lehessen átnevezni szülő <-> gyerek kapcsolatok kezelése
  - [X] Tag-re kattintva nyíljon meg a keresőben beszűrve arra a tag-re.
- [X] Feladat oldal tag-kezelés
- [X] Keresőben tag, excludeTag, isFinal alapján keresés


- [X] Feladat létrehozás mobil responsivitás
- [X] Ha lejár a JWT token session, akkor dobjon ki az oldal

- [X] Új feladat létrehozása meglévő alapján, alternativeDifficultyExerciseGroups, sameLogicExerciseGroups
- [X] Feladthoz hasonló feladatok megjelenítése (alternativeDifficultyExerciseGroups, sameLogicExerciseGroups)

- [x] Feladat megoldás mező is lehet LaTeX
- [X] Feladat createAt, updatedAt mezők megjelenítése
- [X] Feladat source mező megjelenítés, módosítás, létrehozás
- [X] Feladat megnyitása ID alapján
- [X] Válaszopciók