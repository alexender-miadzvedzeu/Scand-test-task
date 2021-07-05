const SET_TASKS = 'SET_TASKS';
const CLEAR_TASK = 'CLEAR_TASK';

const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const CHANGE_TASK_TEXT = 'CHANGE_TASK_TEXT';
const CHANGE_TASK_ENTITIE = 'CHANGE_TASK_ENTITIE';
const SEND_TASK = 'SEND_TASK';

const UPDATE_TASK = 'UPDATE_TASK';

let initialState = {
    tasksFields: [],
    tasks: [],
    changing: {
        taskTitle: '',
        taskText: '',
        entitie: '',
        onInputChanging: ''
    }
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TASKS:
            return { ...state, ...action.payload }

        case CHANGE_TASK_TITLE:
            return { ...state, changing: { ...state.changing, taskTitle: action.text } }
        
        case CHANGE_TASK_TEXT:
            return { ...state, changing: { ...state.changing, taskText: action.text } }
        
        case CHANGE_TASK_ENTITIE:
            return { ...state, changing: { ...state.changing, entitie: action.text } }
        
        case SEND_TASK:
            return state;
            
        case CLEAR_TASK:
            return {
                // ...state,
                tasksFields: [],
                tasks: [],
                changing: {
                    taskTitle: '',
                    taskText: '',
                    entitie: '',
                    onInputChanging: ''
                }
            }

        default:
            break;
    }
    return state;
}

export const setTasksAC = payload => {
    return { type: SET_TASKS, payload }
}



export const sendTaskeAC = id => {
    return { type: SEND_TASK, id }
}

export const updateTaskeAC = body => {
    return { type: UPDATE_TASK, body }
}

export const clearTasksAC = body => {
    return { type: CLEAR_TASK, body }
}

export const getTasksThunk = () => {
    return (dispatch) => {
        const prevScroll = window.scrollY;
        dispatch(clearTasksAC());
        fetch('http://localhost:7777/tasks')
        .then(response => response.json())
        .then(data => {
            const payload = { fields: data.fields };
            const tasks = {};
            data.fields.forEach(item => tasks[item] = []);
            data.tasks.forEach(item => {
                if (tasks[item.currentField]) {
                    tasks[item.currentField].push(item);
                } else {
                    if (!tasks["Unassigned"]) {
                        tasks["Unassigned"] = [];
                    }
                    tasks["Unassigned"].push(item);
                }
            });
            payload.tasks = tasks;
            dispatch(setTasksAC(payload));
            window.scrollTo(0, prevScroll);
        })
    }
}

export const delTaskThunk = id => {
    return async (dispatch) => {
        await fetch('http://localhost:7777/tasks', {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id": id})
        })
        .then(res => res.status === 200 ? dispatch(getTasksThunk()) : null)
    }
}

export const sendTaskThunk = (data) => {
    return async (dispatch) => {
        await fetch('http://localhost:7777/tasks', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })
        .then(res => res.status === 200 ? res.json() : null)
        .then(id => dispatch(getTasksThunk()))
    }
}

export const updateTaskThunk = body => {
    return async (dispatch) => {
        await fetch('http://localhost:7777/tasks', {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.status === 200 ? dispatch(getTasksThunk()) : null)
    }
}

export const saveField = (title) => {
    return async (dispatch) => {
        await fetch('http://localhost:7777/fields', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        })
        .then(res => res.text())
        .then(id => dispatch(getTasksThunk()))
    }
}

export const deleteField = (title) => {
    return async (dispatch) => {
        await fetch(`http://localhost:7777/fields/${title}`, { method: 'delete' })
        .then(res => res.text())
        .then(() => dispatch(getTasksThunk()))
    }
}

export default taskReducer;
