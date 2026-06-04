let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function addTask() {

        let taskText = document.getElementById("task").value;

        if (taskText === "") 
    {
        alert("it should not be empty");
        return;
    }

        let task = {
            text: taskText,
            completed: false
        };

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        createTask(task);

        document.getElementById("task").value = "";
    }

    function createTask(task) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.innerText = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        checkbox.onchange = function () {

            task.completed = checkbox.checked;
            if (checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function () {

            li.remove();

            tasks = tasks.filter(t => t !== task);

            localStorage.setItem("tasks", JSON.stringify(tasks));
        };
        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(deleteBtn);

        document.getElementById("taskList").appendChild(li);
    }

    // Load tasks when page opens
    tasks.forEach(task => {
        createTask(task);
    });