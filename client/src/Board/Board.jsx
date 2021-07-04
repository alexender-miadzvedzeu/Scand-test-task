import React, { useEffect } from 'react';
import classes from './Board.module.css';

import { connect } from 'react-redux'
import { getTasksThunk } from "./../Redux/taskReducer";
import Column from './Column/Column';

const Board = ( { getTasks, tasksData } ) => {
    
    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className={classes.wrapper}>
            {tasksData.tasks.map((column, key) => <Column key={key} column={column} />)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasksData: state.taskReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getTasks: () => dispatch(getTasksThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);