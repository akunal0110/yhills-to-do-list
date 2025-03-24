$(document).ready(function () {
    loadTasks();

    // Add Task
    $("#addTaskBtn").click(function () {
        let taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
            let task = { text: taskText, completed: false };
            let tasks = getTasks();
            tasks.push(task);
            saveTasks(tasks);
            renderTasks();
            $("#taskInput").val("");
        }
    });

    // Mark Task as Completed
    $(document).on("click", ".complete-task", function () {
        let index = $(this).data("index");
        let tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    });

    // Delete Task
    $(document).on("click", ".delete-task", function () {
        let index = $(this).data("index");
        let tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    });

    // Filter Tasks
    $(".filter-btn").click(function () {
        let filter = $(this).data("filter");
        renderTasks(filter);
    });

    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
        let tasks = getTasks();
        $("#taskList").empty();
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            let taskClass = task.completed ? "completed" : "";
            let taskItem = `
                <li class="list-group-item">
                    <span class="task-text ${taskClass}">${task.text}</span>
                    <button class="btn btn-sm btn-success complete-task" data-index="${index}">✔</button>
                    <button class="btn btn-sm btn-danger delete-task" data-index="${index}">✖</button>
                </li>
            `;
            $("#taskList").append(taskItem);
        });
    }

    function loadTasks() {
        renderTasks();
    }
});
