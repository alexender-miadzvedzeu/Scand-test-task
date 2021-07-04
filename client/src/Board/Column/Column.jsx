import React, { useEffect } from 'react';
import classes from './Column.module.css';
import Task from "./Task/Task";

const Column = props => {
    return (
        <div className={classes.wrapper}>
            {props.column.map((task, key) => <Task key={key} task={task} />)}
        </div>
    )
}
    
    

export default Column;