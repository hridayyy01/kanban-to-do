// DOM ELEMENTS
const kanbanBoard = document.querySelector('.kanban-board');
const btnDeleteTask = document.querySelector("#btnDeleteTask");
const taskTitle = document.querySelector('#taskTitle');
const taskDescription = document.querySelector('#taskDescription');
const taskTag = document.querySelector('#taskTag');
const taskPriority = document.querySelector('#taskPriority');
const addtaskForm = document.querySelector('#addTaskForm');
const todoLane = document.querySelector('#todoLane');
const inProgressLane = document.querySelector('#inProgress');
const doneLane = document.querySelector('#doneLane');

const taskCardsCreationZone = document.querySelector('#todoLane .task-cards');

let tasks = [];

function loadFromLocalStorage() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
}

function storeToLocalStorage() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

const tagColor = {
    Personal: 'text-bg-primary',
    Work: 'text-bg-secondary'
};

const prorityColor = {
    Low: 'text-bg-success',
    Medium: 'text-bg-warning',
    High: 'text-bg-danger'
};

function registerEvents() {
    // Register all the events in this function
    addtaskForm.addEventListener('submit', handleAddTask);
    kanbanBoard.addEventListener('click', handlePrepareToDelete);
    btnDeleteTask.addEventListener('click', handleDeleteTask);
}

function handleAddTask(evt) {
    evt.preventDefault();
    const addTaskModal = bootstrap.Modal.getInstance('#addTaskModal');
    const task = getTaskObjectToCreate();
    tasks.push(task);
    const taskCard = createTaskCard(task);
    taskCardsCreationZone.appendChild(taskCard);

    addTaskModal.hide();
    clearAddTasksFields();
    storeToLocalStorage();
}

function showDeleteModal() {
    const deleteModal = new bootstrap.Modal('#deleteTaskModal');
    deleteModal.show();
}
function hideDeleteModal() {
    const deleteModal = bootstrap.Modal.getInstance('#deleteTaskModal');
    deleteModal.hide();
}

function handlePrepareToDelete(evt) {
    const targetElement = evt.target;
    let taskId;
    if(targetElement.classList.contains('delete-btn')) {
        showDeleteModal();
        // console.log(targetElement.getAttribute("data-task-id"));
        // console.log(targetElement.dataset);
        taskId = targetElement.dataset.taskId;
        btnDeleteTask.dataset.taskId = taskId;
    } else if(targetElement.parentElement.classList.contains("delete-btn")) {
        showDeleteModal();
        taskId = targetElement.parentElement.dataset.taskId;
        btnDeleteTask.dataset.taskId = taskId;
    }
}

function handleDeleteTask(evt) {
    const taskId = evt.target.dataset.taskId;
    const oldTasksLength = tasks.length;
    if(taskId) {
        tasks = tasks.filter(function(task) {
            return task.id != taskId
        });
        storeToLocalStorage();
        const newTasksLength = tasks.length;
        if(oldTasksLength !== newTasksLength) {
            hideDeleteModal();
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance('#deleteSuccessToast');
            toastBootstrap.show();
            createAndShowAllTasks();
        }
    }
}

function clearAddTasksFields() {
    taskTitle.value = '';
    taskDescription.value = '';
    taskTag.value = 'Work';
    taskPriority.value = 'Low';
}

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.classList.add('card');
    taskCard.classList.add('mb-3');

    taskCard.innerHTML = `
            <div class="card-body">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="badge ${tagColor[task.tag]}">${task.tag}</span>
                        <span class="badge ${prorityColor[task.priority]}">${task.priority}</span>
                    </div>
                    <div>
                        <button class="edit-btn btn btn-sm btn-warning">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button class="delete-btn btn btn-sm btn-danger" data-task-id = "${task.id}">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
    `;
    return taskCard;
}

function getTaskObjectToCreate() {
    const taskTitleValue = taskTitle.value ;
    const taskDescriptionValue = taskDescription.value;
    const taskTagValue = taskTag.value;
    const taskPriorityValue = taskPriority.value; 

    const task = {
        id: Date.now(),
        title: taskTitleValue,
        description: taskDescriptionValue,
        tag: taskTagValue,
        priority: taskPriorityValue
    };
    return task;
}

function createAndShowAllTasks() {
    //Remove all the current tasks and then create and show all the tasks
    while(taskCardsCreationZone.firstChild) {
        taskCardsCreationZone.firstChild.remove();
    }
    tasks.forEach(function(task) {
        const taskCard = createTaskCard(task);
        taskCardsCreationZone.appendChild(taskCard);
    });
}

//Main
registerEvents();
loadFromLocalStorage();
createAndShowAllTasks();