# Uppgift 2 - The List

Se videon för en kort introduktion samt slutresultatet av uppgiften.

## Intruktioner

Alla punkter som användaren skapar ska sparas i en Array.

Det innebär också att när en användare raderar en punkt ska den även raderas
från er Array. En punkt kan raderas på följande vis:

    - Användaren klickar på knappen "X" (finns till höger om varje punkt).
    - Användaren klickar på knappen "Delete all" (då raderas alla).
    - När användaren klickar på texten för en punkt ska den raderas från er
      Array OCH när dom klickar på samma punkt igen ska den läggas tillbaka.
        - Ni kan enkelt lägga till en CSS-klass (t.ex. "done") när dom klickat
          på punkten så användaren kan se att dom klarat av punkten. Klickar dom
          en gång till så tas klassen bort och punkten läggs åter till i er
          Array.
    - När användaren klickar på knappen "Check all" så ska samtliga punkter bli
      avklarade (se punkten ovan), vilket även innebär att er Array ska tömmas. 

En användare ska kunna lägga till en punkt genom att trycka på <Enter> i
textfältet. Dom måste fylla i minst ETT tecken och när en punkt läggs till
tömmer ni även textfältet.

I filen `helpers.js` finner ni funktionen "downloadData". Denna funktion tar
emot en Array som det enda argumentet och tar sedan innehållet och gör om det
till en textfil som användaren sedan kan ladda ner. Ni behöver bara anropa den
med en Array på följande vis:

    let demo = ['Sebbe', 'Erik'];
    downloadData(demo);

OBS! Tänk på (som visas i videon) att BARA dom punkter som INTE är genomstrukna
ska vara dom som laddas ned. Om det inte finns några punkter sparade i er Array
så ska ingeting ske när användaren trycker på "Download".

Tips 1: för att radera ett element från en Array måste ni först hitta elementets
position (index).
Tips 2: för att radera ett HTML-element använder ni "<ert element>.remove()".

## Inlämning

Uppgiften lämnas in individuellt på Canvas.

Lycka till!
