"use strict";

document.querySelector("#add").addEventListener("click", function (e) {
  console.log("test");
  let title = document.querySelector("#taskTitle").value;
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;
  let duration = document.querySelector("#duration").value;
  let description = document.querySelector("#description").value;
  let descriptionFirstSentence = "";
  //Bildar första meningen av Beskrivningen
  for (let i = 0; i < description.length; i++) {
    if (description[i] != ".") {
      descriptionFirstSentence += description[i];
    } else {
      i = description.length + 1;
    }
  }

  //Skapar alla tasks med inforamtionen vi får från "Create New Task"-formuläret
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  let classTime = document.createElement("div");
  classTime.classList.add("time");
  classTime.innerHTML = time + "\n " + date;
  classTime.innerHTML = `${time} \n <span class="smaller-date">${date}</span>`;
  taskDiv.append(classTime);

  let classInfo = document.createElement("div");
  classInfo.classList.add("info");

  let classTitle = document.createElement("p");
  classTitle.classList.add("title");
  classTitle.innerHTML = title;
  classInfo.append(classTitle);

  let classDescriptionDisplayNONE = document.createElement("p");
  classDescriptionDisplayNONE.classList.add("description");
  classDescriptionDisplayNONE.innerHTML = description;
  classDescriptionDisplayNONE.style.display = "none";
  classInfo.append(classDescriptionDisplayNONE);

  let classDescriptionFirstSentence = document.createElement("p");
  classDescriptionFirstSentence.classList.add(
    "task-description-first-senteces"
  );
  classDescriptionFirstSentence.innerHTML = descriptionFirstSentence;
  classInfo.append(classDescriptionFirstSentence);

  let classDescription = document.createElement("p");
  classDescription.classList.add("task-description");
  classDescription.innerHTML = "Description";
  classInfo.append(classDescription);
  // Om användare trycker på "Decription" så ska hela beskrivningen visas.
  classDescription.addEventListener("click", function () {
    if (this.innerHTML === "Description") {
      this.innerHTML = description;
    } else {
      this.innerHTML = "Description";
    }
  });

  let classDuration = document.createElement("p");
  classDuration.classList.add("task-duration");
  classDuration.innerHTML = duration;
  classInfo.append(classDuration);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.classList.add("delete-task");
  classInfo.append(deleteBtn);

  let checkBtn = document.createElement("button");
  checkBtn.innerHTML = "Check";
  checkBtn.classList.add("regret-task");
  classInfo.append(checkBtn);

  //När användaren trycker på "Check" kommer titeln och första meningen av beskrivningen att du
  //få stilen text-decoration: line-through;.
  //Om tasket är "Checkat" så ska man kunna "unchecka" den om man ångrar sig eller tryckte fel.
  checkBtn.addEventListener("click", function () {
    classTitle.classList.toggle("done");
    classDescriptionFirstSentence.classList.toggle("done");
    if (classTitle.classList.contains("done")) {
      this.innerHTML = "Uncheck";
    } else {
      this.innerHTML = "Check";
    }
  });

  // När användaren trycker på "Delete" på varje task så ska användaren kunna ändra sig.
  //Användare behöver godkänna att man vill radera ett task. Därför lägger jag till en knapp
  //som ger använderen valet att ångra sig. Knappen "Delete" blir även röd för att bättre visa användaren
  //att om man trycker på "Delete" igen så försvinner tasket.
  deleteBtn.addEventListener("click", function () {
    let regretBtn = document.createElement("button");
    regretBtn.innerHTML = "Cancel";
    regretBtn.classList.add("regret-task");
    deleteBtn.classList.add("red");
    classInfo.append(regretBtn);

    let remove = () => {
      taskDiv.remove();
    };
    this.addEventListener("click", remove);
    regretBtn.addEventListener("click", function () {
      this.remove();
      deleteBtn.classList.remove("red");
      deleteBtn.removeEventListener("click", remove);
    });
  });

  taskDiv.append(classInfo);
  document.querySelector("#task-divs").append(taskDiv);
});

// När användaren trycker på "Download" så skapas en array som ska skickas till funktionen downloadData() i helper.js
//Sedan skapas flera arrayer som innehåller alla titlar, beskrivningar, tider osv.
//Om det inte finns några tasks ska inte downloadData anropas, därför har vi en if-sats som kollar om det finns några titlar
//inlaggda. Om inte några titlar finns betyder det att vi inte har några tasks.
// Sedan formaterar vi en text och lägger in alla titlar, beskrivningar, tider osv i en sträng och push()ar in den i
//respektive index av arrayen vi skapade innan. Som vi sedan skickar iväg till helper.js.
// Jag valde att ändra filtypen av filen vi laddar ner till txt från csv för
//på min mac så öppnades programmet "Numbers" varje gång jag laddade ner filen och då skapades
//en ful och konstrigt excell-liknande ark. Därför valde jag att skapa en vanlig txt-fil istället.
//Om tasket är klart så läggs det till i arrayen som laddas ner men lägger till att den är klar.
//Då har man fortfarande informationen om vad man gjort klart. Annars ser jag ingen skillnad
//från att checka saker från att radera dem.
document.querySelector("#download").addEventListener("click", function () {
  let downloadArray = [];
  let titleInTask = document.querySelectorAll(".title");
  let descriptionDisplay = document.querySelectorAll(".description");
  let durationInTask = document.querySelectorAll(".task-duration");
  let timeInTask = document.querySelectorAll(".time");
  let dateInTask = document.querySelectorAll(".smaller-date");
  if (!titleInTask.length == 0) {
    for (let i = 0; i < titleInTask.length; i++) {
      let textPerTask = "";
      let newTime = "";
      let letters = timeInTask[i].innerHTML;
      for (let j = 0; j < 5; j++) {
        newTime += letters[j];
      }
      if (titleInTask[i].classList.contains("done")) {
        textPerTask += `Task No. ${i + 1} Done\n`;
      } else {
        textPerTask += `Task No. ${i + 1}\n`;
      }
      textPerTask += `Title:\n ${titleInTask[i].innerHTML}\n\n`;
      textPerTask += `Description:\n ${descriptionDisplay[i].innerHTML}\n\n`;
      textPerTask += `Duration:\n ${durationInTask[i].innerHTML}\n\n`;
      textPerTask += `Time:\n ${newTime}\n\n`;
      textPerTask += `Date:\n ${dateInTask[i].innerHTML}\n\n`;
      textPerTask += `-------------------------------------\n\n`;
      downloadArray.push(textPerTask);
      console.log(textPerTask);
    }

    downloadData(downloadArray);
  }
});

// När användaren trycker på "Delete All" så tas alla punkter i listan bort.
// Man kan även sätta att diven som innehåller alla punkter har sin innerHTML = "";
document.querySelector("#delete-all").addEventListener("click", function () {
  let allTasks = document.querySelectorAll(".task");
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i].remove();
  }
});

// När användare trycker på kanppen "Check All" så läggs en klass (.done) till på Title och DescriptionFirstSentence
// Klassen lägger till text-decoration: line-through;
document.querySelector("#check-all").addEventListener("click", function () {
  let checkAllTitles = document.querySelectorAll(".title");
  let checkAllDescr = document.querySelectorAll(
    ".task-description-first-senteces"
  );

  for (let i = 0; i < checkAllTitles.length; i++) {
    if (checkAllTitles[i].classList.contains("done")) {
    } else {
      checkAllTitles[i].classList.add("done");
      checkAllDescr[i].classList.add("done");
    }
  }
});

// Tar bort allt i Task-makern genom att sätta value = "" på alla inputs
document.querySelector("#reset").addEventListener("click", function () {
  console.log("test");
  document.querySelector("#taskTitle").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#time").value = "";
  document.querySelector("#duration").value = "";
  document.querySelector("#description").value = null;
});

// Light- och Dark Mode med hjälp av setProterty
// Kollar om Light Mode är på eller inte och utifrån det så ändras CSS-variablerna
document.querySelector("#change-mode").addEventListener("click", function () {
  let innerText = document.querySelector("#checkbox");
  if (innerText.innerHTML === "Light Mode") {
    innerText.innerHTML = "Dark Mode";
    document.getElementById("skew").style.transform =
      "skew(-45deg) translate(90%, -1%)";
    document.documentElement.style.setProperty("--bgColor", "#f4f4f4");
    document.documentElement.style.setProperty("--cardColor", "#eee");
    document.documentElement.style.setProperty("--textarea", "#d2d2d2");
    document.documentElement.style.setProperty("--textColor", "#4d4d4d");
    document.documentElement.style.setProperty("--textColor2", "#4d4d4d");
    document.documentElement.style.setProperty(
      "--borderColor",
      "rgba(139, 154, 170, 0.3)"
    );
    document.documentElement.style.setProperty(
      "--titleColor",
      "rgba(0, 0, 0, 0.54)"
    );
  } else {
    innerText.innerHTML = "Light Mode";
    document.getElementById("skew").style.transform =
      "skew(-45deg) translateX(-20px)";
    document.documentElement.style.setProperty("--bgColor", "#0b0b0b");
    document.documentElement.style.setProperty("--cardColor", "#090909");
    document.documentElement.style.setProperty("--textarea", "#222");
    document.documentElement.style.setProperty("--textColor", "#ebebe7");
    document.documentElement.style.setProperty(
      "--textColor2",
      "rgba(235, 235, 231, 0.8)"
    );
    document.documentElement.style.setProperty(
      "--titleColor",
      "rgba(235, 235, 231, 0.54)"
    );
    document.documentElement.style.setProperty(
      "--borderColor",
      "rgba(255, 255, 255, 0.1)"
    );
  }
});
