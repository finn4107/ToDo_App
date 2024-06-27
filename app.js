document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const todoList = document.getElementById("todoList");
    const searchInput = document.getElementById("search");
    const wichtigCheckbox = document.getElementById("wichtig");
    const sehrwichtigCheckbox = document.getElementById("sehrwichtig");

    // Sicherstellen, dass nur eine Checkbox ausgewählt werden kann
    wichtigCheckbox.addEventListener("change", () => {
        if (wichtigCheckbox.checked) {
            sehrwichtigCheckbox.checked = false;
        }
    });

    sehrwichtigCheckbox.addEventListener("change", () => {
        if (sehrwichtigCheckbox.checked) {
            wichtigCheckbox.checked = false;
        }
    });

    // Validierung vor dem Hinzufügen von TODOs
    function validateForm() {
        let isValid = true;

        const title = document.getElementById("title");
        const autor = document.getElementById("autor");
        const kategorie = document.getElementById("kategorie");
        const startdatum = document.getElementById("startdatum");
        const enddatum = document.getElementById("enddatum");
        const prozent = document.getElementById("prozent");

        if (title.value.trim() === "") {
            isValid = false;
            document.getElementById("titleError").textContent = "Titel ist erforderlich.";
        } else {
            document.getElementById("titleError").textContent = "";
        }

        if (autor.value.trim() === "") {
            isValid = false;
            document.getElementById("autorError").textContent = "Autor ist erforderlich.";
        } else {
            document.getElementById("autorError").textContent = "";
        }

        if (kategorie.value === "") {
            isValid = false;
            document.getElementById("kategorieError").textContent = "Kategorie ist erforderlich.";
        } else {
            document.getElementById("kategorieError").textContent = "";
        }

        if (startdatum.value === "") {
            isValid = false;
            document.getElementById("startdatumError").textContent = "Startdatum ist erforderlich.";
        } else {
            document.getElementById("startdatumError").textContent = "";
        }

        if (enddatum.value === "") {
            isValid = false;
            document.getElementById("enddatumError").textContent = "Enddatum ist erforderlich.";
        } else {
            document.getElementById("enddatumError").textContent = "";
        }

        if (prozent.value === "" || prozent.value < 0 || prozent.value > 100) {
            isValid = false;
            document.getElementById("prozentError").textContent = "Prozentsatz muss zwischen 0 und 100 liegen.";
        } else {
            document.getElementById("prozentError").textContent = "";
        }

        return isValid;
    }

    // Event-Listener für das Formular zum Hinzufügen von TODOs
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        if (!validateForm()) {
            return;
        }

        const title = document.getElementById("title").value;
        const beschreibung = document.getElementById("beschreibung").value;
        const autor = document.getElementById("autor").value;
        const kategorie = document.getElementById("kategorie").value;
        const wichtig = wichtigCheckbox.checked;
        const sehrwichtig = sehrwichtigCheckbox.checked;
        const startdatum = document.getElementById("startdatum").value;
        const enddatum = document.getElementById("enddatum").value;
        const prozent = document.getElementById("prozent").value;

        // Priorität in Klassen bestimmen
        let priorityClass = "";
        if (sehrwichtig) {
            priorityClass = "sehrwichtig";  // Sehr wichtig -> rot
        } else if (wichtig) {
            priorityClass = "wichtig";  // Wichtig -> orange
        } else {
            priorityClass = "unwichtig";  // Unwichtig -> grün
        }

        // Neues TODO-Element erstellen
        const todoItem = document.createElement("li");
        todoItem.innerHTML = `
            <div class="todo-content">
                <h3 class="${priorityClass}">${title}</h3>
                <p><strong>Beschreibung:</strong> ${beschreibung}</p>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Kategorie:</strong> ${kategorie}</p>
                <p><strong>Startdatum:</strong> ${startdatum}</p>
                <p><strong>Enddatum:</strong> ${enddatum}</p>
                <p><strong>Fortschritt:</strong> ${prozent}%</p>
            </div>
            <div class="actions">
                <button class="edit">Bearbeiten</button>
                <button class="delete">Löschen</button>
            </div>
        `;

        // TODO-Element zur Liste hinzufügen
        todoList.appendChild(todoItem);

        // Formular zurücksetzen
        todoForm.reset();
    });

    // Event-Listener für das Löschen und Bearbeiten von TODOs
    todoList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            // Löschen-Button wurde geklickt
            const todoItem = event.target.closest("li");
            todoList.removeChild(todoItem);
        } else if (event.target.classList.contains("edit")) {
            // Bearbeiten-Button wurde geklickt
            const todoItem = event.target.closest("li");
            const todoContent = todoItem.querySelector(".todo-content");

            // TODO-Daten extrahieren
            const title = todoContent.querySelector("h3").textContent;
            const beschreibung = todoContent.querySelector("p:nth-child(2)").textContent.split(": ")[1];
            const autor = todoContent.querySelector("p:nth-child(3)").textContent.split(": ")[1];
            const kategorie = todoContent.querySelector("p:nth-child(4)").textContent.split(": ")[1];
            const startdatum = todoContent.querySelector("p:nth-child(5)").textContent.split(": ")[1];
            const enddatum = todoContent.querySelector("p:nth-child(6)").textContent.split(": ")[1];
            const prozent = todoContent.querySelector("p:nth-child(7)").textContent.split(": ")[1].replace("%", "");

            // Formularfelder mit den Daten füllen
            document.getElementById("title").value = title;
            document.getElementById("beschreibung").value = beschreibung;
            document.getElementById("autor").value = autor;
            document.getElementById("kategorie").value = kategorie;
            document.getElementById("startdatum").value = startdatum;
            document.getElementById("enddatum").value = enddatum;
            document.getElementById("prozent").value = prozent;
            document.getElementById("wichtig").checked = todoItem.querySelector("h3").classList.contains("wichtig");
            document.getElementById("sehrwichtig").checked = todoItem.querySelector("h3").classList.contains("sehrwichtig");

            // TODO-Element aus der Liste entfernen
            todoList.removeChild(todoItem);
        }
    });

    // Event-Listener für die Suche
    searchInput.addEventListener("input", function(event) {
        const searchText = event.target.value.toLowerCase();
        const todos = todoList.getElementsByTagName("li");

        Array.from(todos).forEach(todo => {
            const todoText = todo.textContent.toLowerCase();
            if (todoText.includes(searchText)) {
                todo.style.display = "";
            } else {
                todo.style.display = "none";
            }
        });
    });
});
