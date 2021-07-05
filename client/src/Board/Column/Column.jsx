import React, { useState } from 'react';
import classes from './Column.module.css';
import Task from "./Task/Task";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlineDelete } from 'react-icons/ai';
import { connect } from 'react-redux';
import { deleteField } from "../../Redux/taskReducer";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: "100%",
    background: isDragging ? 'lightgreen' : 'transparent',
    border: '1px solid grey',
    borderRadius: 5,
    marginTop: 5,
    ...draggableStyle
});

const Column = props => {
    
    const [hide, setHide] = useState(false);

    const deleteColumn = () => props.deleteField(props.title);

    return (
        <Droppable droppableId={props.title} >
        {
            (provided, snapshot) => (
                <div className={classes.wrapper} ref={provided.innerRef} style={{
                    width: `${hide ? "0px" : "300px"}`,
                    minWidth: `${hide ? "0px" : "300px"}`,
                    maxWidth: `${hide ? "0px" : "300px"}`,
                    margin: `${hide ? "0" : "0 3px"}`,
                    padding: `${hide ? "0" : "5px"}`,
                }}>
                <button onClick={() => setHide(!hide)} className={classes.button}>{hide ? "SHOW" : "HIDE"}</button>
                <h4 style={{display: `${hide ? "none" : "block"}`}} className={classes.fieldName}>
                    {props.title}
                    {
                        props.title !== "Unassigned" &&
                        <button className={classes.del} onClick={deleteColumn}><AiOutlineDelete /></button>
                    }
                </h4>
                {props.data.map((task, key) => <Draggable 
                        key={key}
                        draggableId={task.id}
                        index={key}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                            <Task hide={hide} task={task} delTask={props.delTask} />
                        </div>
                    )}
                </Draggable>)}
            </div>
            )
        }
        </Droppable>
    )
}
const mapDispatchToProps = dispatch => ({ deleteField: title => dispatch(deleteField(title)) });

export default connect(null, mapDispatchToProps)(Column);
