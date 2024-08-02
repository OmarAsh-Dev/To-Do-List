const inputbox = document.getElementById("input-box");
const dueDateBox = document.getElementById("due-date-box");
const listcontainer = document.getElementById("list-container");

function AddTask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else if (dueDateBox.value === '') {
        alert("Please select a due date");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;

        // Create a single span element for the "Due:" label and date
        let dateSpan = document.createElement("span");
        let dueDate = new Date(dueDateBox.value);
        
        // Format the date as dd/mm/yy
        let day = String(dueDate.getDate()).padStart(2, '0');
        let month = String(dueDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let year = String(dueDate.getFullYear()).slice(-2); // Get last two digits of the year

        let formattedDate = `${day}/${month}/${year}`;
        dateSpan.className = "date-span";
        dateSpan.innerHTML = ` - Due: ${formattedDate}`;
        
        // Create the delete (cross) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        // Append the due date and delete button to the list item
        li.appendChild(dateSpan);
        li.appendChild(span);
        listcontainer.appendChild(li);
    }
    inputbox.value = "";
    dueDateBox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function loadData() {
    listcontainer.innerHTML = localStorage.getItem("data");
}

loadData();
