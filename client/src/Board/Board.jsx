
import React, { useEffect } from 'react';
import classes from './Board.module.css';

import { connect } from 'react-redux'
import { delTaskThunk, getTasksThunk, updateTaskThunk } from "./../Redux/taskReducer";

import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column/Column';

const Board = ( { getTasks, delTask, tasksData, dragEnd } ) => {
    
    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const onDragEnd = result => {
        const  body = {
            currentField: result.destination.droppableId,
            id: result.draggableId
        }
        dragEnd(body);
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ margin: "4% auto" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className={classes.wrapper}>
                        {tasksData.tasks ? Object.keys(tasksData.tasks).map(key => {
                            return <Column key={key} delTask={delTask} data={tasksData.tasks[key]} title={key} />
                        }) : null}
                    </div>
                </DragDropContext>
            </div>
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
        getTasks: () => dispatch(getTasksThunk()),
        delTask: id => dispatch(delTaskThunk(id)),
        dragEnd: body => dispatch(updateTaskThunk(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
