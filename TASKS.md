## TODO

### Bug

- [ ] Képfeltöltés beragad ha szerver error van

### Fejleszthető

- [ ] Feladat megoldás mező is lehet LaTeX
- [ ] Bármelyik feladat mező lehet latex, esetleg egy modal-os LaTeX editor?
- [ ] Feladat megnyitása ID alapján
- [ ] Feladat ellenörzés oldal, a menüben is
- [ ] Új feladat létrehozása meglévő alapján, alternativeDifficultyExerciseGroups, sameLogicExerciseGroups
- [ ] Feladatok listázása a csoportokban (alternativeDifficultyExerciseGroups, sameLogicExerciseGroups)
- [ ] Feladthoz hasonló feladatok megjelenítése (alternativeDifficultyExerciseGroups, sameLogicExerciseGroups)
- [ ] Csak a megfelelő jogosultság esetén lehessen adott oldalakra navigálni
  - Pl.: Ha valakinek nincs USER joga akkor csak beküldeni lehessen
- [ ] Ha lejár a JWT token session, akkor dobjon ki az oldal
  - Esetleg bejelentkezéskor egy jegyezzen meg 30 napra gomb? és akkor hosszú lejáratú tokent generálna a backend
- [ ] Feladat létrehozás mobil responsivitás
- [ ] Teljes oldal mobil responsivitás
- [ ] Profil módosítás, profilkép feltöltés
- [ ] Feladat képre kattintás esetén nyíljon meg nagyban

### Backend-re vár

- [ ] Feladatsorok listázása oldal
- [ ] Feladat oldal tag-kezelés
- [ ] Keresőben tag, excludeTag, isFinal alapján keresés
- [ ] Feladat keresőben eremény rendezhetősége

### Üzletre vár

- [ ] Profil oldal
    - Mit rakjunk ide, mi az ami fontos, vagy funky infó lehet
    - FE oldalon ha van ötlet hogy mit lenne jó ide rakni, akkor az tudja vezetni a fejlesztést
- [ ] Talon-ok kezelése
    - Feladatsoronként, emberenként, globálisan kezeljük?