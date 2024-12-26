document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskHistory = document.getElementById("taskHistory");
    const toastContainer = document.getElementById("toastContainer");

    const tasks = [];
    const history = [];

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const taskTime = document.getElementById("taskTime").value;
        const taskPriority = document.getElementById("taskPriority").value;

        const task = { name: taskName, time: taskTime, priority: taskPriority };
        tasks.push(task);
        displayTasks();

        showToast(`Task "${taskName}" added successfully!`);

        const taskTimeInMs = new Date();
        const [hours, minutes] = taskTime.split(":");
        taskTimeInMs.setHours(hours, minutes, 0, 0);

        const timeDifference = taskTimeInMs - new Date();
        if (timeDifference > 0) {
            setTimeout(() => {
                handleTaskNotification(task, taskTimeInMs);
            }, timeDifference);
        }

        taskForm.reset();
    });

    function displayTasks() {
        taskList.innerHTML = tasks
            .map(
                (task, index) => `
                <div class="task-card">
                    <div>
                        <span><strong>Task:</strong> ${task.name}</span>
                        <span><strong>Time:</strong> ${task.time}</span>
                        <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                    </div>
                    <button onclick="removeTask(${index})">Delete</button>
                </div>
            `
            )
            .join("");
    }

    function handleTaskNotification(task, taskTimeInMs) {
        showToast(`Task "${task.name}" (Priority: ${task.priority}) is starting now!`);
        removeTask(tasks.indexOf(task));
    }

    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    window.removeTask = (index) => {
        const task = tasks.splice(index, 1)[0];
        history.push(task);
        displayTasks();
        displayHistory();
    };

    function displayHistory() {
        taskHistory.innerHTML = history
            .map(
                (task) => `
                <div class="task-card">
                    <div>
                        <span><strong>Task:</strong> ${task.name}</span>
                        <span><strong>Time:</strong> ${task.time}</span>
                        <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                    </div>
                </div>
            `
            )
            .join("");
    }
});
