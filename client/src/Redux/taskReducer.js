const SET_TASKS = 'SET_TASKS';

let initialState = {
    tasksFields: [],
    tasks: []
}

const taskReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_TASKS:
            let stateCopy = {...state};
            action.tasks.fields.forEach(field => {
                stateCopy.tasksFields.push(field);
            });
            stateCopy.tasksFields.forEach(field => {
                const filteredTasks = action.tasks.tasks.filter(task => {
                    return task.currentField.toLowerCase() === field.toLowerCase()
                })
                stateCopy.tasks.push(filteredTasks);
            })
            return stateCopy;
        default:
            break;
    }
    return state;
}

export const setTasksAC = tasks => {
    return {
        type: SET_TASKS,
        tasks: tasks
    }
}

export const getTasksThunk = () => {
    return (dispatch) => {
        fetch('http://localhost:7777/tasks')
        .then(response => response.json())
        .then(data => dispatch(setTasksAC(data)))
    }
}

export default taskReducer;