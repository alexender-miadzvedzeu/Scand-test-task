import React, { useState } from 'react';
import classes from './TaskForm.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux'
import { sendTaskThunk } from "../Redux/taskReducer";

const initialState = {
    title: "",
    description: "",
    assignee: "",
    currentField: ""
};

const TaskForm = ({ values, sendTask, tasksData, ...props }) => {
    
    const [form, setForm] = useState({ ...initialState });
    const send = () => {
        sendTask({ ...form });
        setForm({ ...initialState });
    }

    const onChangeText = field => e => setForm({ ...form, [field]: e.target.value });

    const isValid = () => form.title && form.description && form.assignee && form.currentField;

    return (
        <div className={classes.wrapper}>
            <TextField value={form.title} onChange={onChangeText("title")} style={{margin: "5px 0"}} className={classes.input} id="outlined-basic" label="Title" variant="outlined" />
            <TextField value={form.description} onChange={onChangeText("description")} style={{margin: "5px 0"}} className={classes.input} id="outlined-basic" label="Description" variant="outlined" />
            <TextField value={form.assignee} onChange={onChangeText("assignee")} style={{margin: "5px 0"}} className={classes.input} id="outlined-basic" label="Assignee" variant="outlined" />
            <TextField value={form.currentField} onChange={onChangeText("currentField")} style={{margin: "5px 0"}} className={classes.input} id="outlined-basic" label="Field" variant="outlined" select>
                {
                    props.fields && props.fields.map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))
                    
                }
            </TextField>
            <Button disabled={!isValid()} onClick={send} style={{width: "30%", margin: '0 auto'}} variant="contained" color="primary">Add task</Button>
        </div>
    )
}

const mapStateToProps = state => state.taskReducer;
const mapDispatchToProps = dispatch => ({
    sendTask: data => dispatch(sendTaskThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
