// DOM ELEMENTS
const taskTitle = document.querySelector('#taskTitle');
const taskDescription = document.querySelector('#taskDescription');
const taskTag = document.querySelector('#taskTag');
const taskPriority = document.querySelector('#taskPriority');
const addtaskForm = document.querySelector('#addTaskForm');
const todoLane = document.querySelector('#todoLane');
const inProgressLane = document.querySelector('#inProgress');
const doneLane = document.querySelector('#doneLane');

const taskCardsCreationZone = document.querySelector('#todoLane .task-cards');

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
}

function handleAddTask(evt) {
    evt.preventDefault();
    const addTaskModal = bootstrap.Modal.getInstance('#addTaskModal');
    const task = getTaskObjectToCreate();

    const taskCard = createTaskCard(task);
    taskCardsCreationZone.appendChild(taskCard);

    addTaskModal.hide();
    clearAddTasksFields();
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
                        <button class="edit-btn btn btn-sm btn-warning"><i
                        class="fa fa-pencil"></i></button>
                        <button class="delete-btn btn btn-sm btn-danger" data-bs-toggle="modal"
                        data-bs-target="#deleteTaskModal"><i
                        class="fa fa-trash"></i></button>
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
        title: taskTitleValue,
        description: taskDescriptionValue,
        tag: taskTagValue,
        priority: taskPriorityValue
    };

    return task;
}

//Main
registerEvents();