// Tar emot ett argument i form av en array, den går sedan igenom denna och gör
// det möjligt för användaren att ladda ner allt i form av en .csv-fil.
function downloadData(arr) {
  // Gör så att webbläsaren förstår att detta ska vara "CSV data".
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Gå igenom varje element för vår array och lägg till det i `csvContent`.
  for (let i = 0; i < arr.length; i++) {
    csvContent += arr[i] + '\n';
  }

  // Gör om allt innehåll så en webbläsaren kan läsa av det.
  let encodedURI = encodeURI(csvContent);

  // Skapa en <a> som läggs till i <body>, sedan simulerar vi ett klick på denna
  // länk vilket kommer få webbläsaren att vilja ladda ner innehållet.
  var link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', 'the-list.txt');
  document.body.appendChild(link);
  link.click();
  link.remove();
}
