// Elemente referenzieren
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = []; // Ein Array, in dem Elemente gespeichert werden


todoForm.addEventListener("submit", function (event) {
	event.preventDefault(); // Verhindert das implizite Verhalten 
	const todoText = todoInput.value;

	// Eingabeverifizierung
	if (todoText === "") {
		alert("Bitte geben Sie eine Aufgabe ein");
		return;
	}

	// Erstellen eines Objekts für neue Aufgabe
	const todo = {
		id: Date.now(),
		text: todoText,
		completed: false,
	};

	// Hinzufügen des Objekts zu dem Array
	todos.push(todo);

	todoInput.value = "";

	displayTodos();

	// Speichern im Localstorage
	saveTodos();
});

// Funktion zur Anzeige aller Artikel
function displayTodos() {
	todoList.innerHTML = "";

	todos.forEach(function (todo) {
		const li = document.createElement("li");
		li.setAttribute("data-key", todo.id);

		if (todo.completed === true) {
			li.classList.add("completed");
		}

		const textNode = document.createTextNode(todo.text);
		const deleteBtn = document.createElement("span");
		deleteBtn.className = "delete-todo";
		deleteBtn.appendChild(document.createTextNode("Delete"));
		const editBtn = document.createElement("span");
		editBtn.className = "edit-todo";
		editBtn.appendChild(document.createTextNode("Edit"));
		const completeBtn = document.createElement("span");
		completeBtn.className = "complete-todo";
		completeBtn.appendChild(document.createTextNode("Completed"));

		li.appendChild(textNode);
		li.appendChild(deleteBtn);
		li.appendChild(editBtn);
		li.appendChild(completeBtn);

		todoList.appendChild(li);
	});
}

let key;
// Klickereignisse
todoList.addEventListener("click", function (event) {
	if (event.target.classList.contains("delete-todo")) {
		key = event.target.parentElement.dataset.key;
		deleteTodoByKey(key);
	}

	if (event.target.classList.contains("complete-todo")) {
		key = event.target.parentElement.dataset.key;
		completeTodoByKey(key);
	}

	if (event.target.classList.contains("edit-todo")) {
		key = event.target.parentElement.dataset.key;
		editTodoByKey(key);
	}
});

// Funktion für Aufgaben löschen
function deleteTodoByKey(key) {
	todos = todos.filter((todo) => todo.id != key);
	displayTodos();
	saveTodos();
}

// Funktion zum Durchstreichen des erledigte Aufgabe
function completeTodoByKey(key) {
	todos.forEach(function (todo) {
		if (todo.id == key) {
			todo.completed = !todo.completed;
		}
	});
	displayTodos();
	saveTodos();
}

// Funktion zum Ändern des Aufgabentextes
function editTodoByKey(key) {
	const todoText = prompt("Geben Sie einen neuen Text ein");
	todos.forEach(function (todo) {
		if (todo.id == key) {
			todo.text = todoText;
		}
	});
	displayTodos();
	saveTodos();
}

// Code beim Laden der Seite
window.addEventListener("DOMContentLoaded", () => {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "https://www.example.com/endpoint", true);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			const data = JSON.parse(xhr.responseText);
			const todosJSON = localStorage.getItem("todos");

			if (todosJSON === null && data !== null) {
				localStorage.setItem("todos", JSON.stringify(data));
			}

			if (todosJSON !== null) {
				todos = JSON.parse(todosJSON);
			}

			displayTodos();
		} else {
			const todosJSON = localStorage.getItem("todos");
			if (todosJSON !== null) {
				todos = JSON.parse(todosJSON);
			}

			displayTodos();
		}
	};

	xhr.onerror = function () {
		const todosJSON = localStorage.getItem("todos");
		if (todosJSON !== null) {
			todos = JSON.parse(todosJSON);
		}

		displayTodos();
	};

	xhr.send();
});

// Speichern von Aufgaben im lokalen Speicher
const saveTodos = () => {
	const todosJSON = JSON.stringify(todos);
	localStorage.setItem("todos", todosJSON);
};

displayTodos();




