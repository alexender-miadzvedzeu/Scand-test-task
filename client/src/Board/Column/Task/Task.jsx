import React, { useState } from 'react';
import { updateTaskThunk } from "../../../Redux/taskReducer";
import { connect } from "react-redux";
import classes from './Task.module.css';
import { FiEdit3 } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

const Task = props => {

    const [editCard, setEditCard] = useState(null);

    const onChangeText = e => {
        setEditCard({
            ...editCard,
            description: e.target.value
        });
    };

    const saveDescription = () => {
        props.updateTaskThunk({ ...editCard });
    };

    return (
        <div className={classes.wrapper} style={{display: `${props.hide ? "none" : "block"}`}}>
            <h5 className={classes.title}>{props.task.title}</h5>
            {editCard ? 
                <textarea rows={10} className={classes.taskInput} value={editCard && editCard.description} onChange={onChangeText} /> : 
                <p className={classes.description}>{props.task.description}</p>}
            <div className={classes.buttonsConteiner}>
                {editCard ? 
                    <button className={classes.done} onClick={saveDescription}><MdDone /></button> : 
                    <button className={classes.edit} onClick={() => setEditCard({ description: props.task.description, id: props.task.id })}><FiEdit3 /></button> }
                <button className={classes.del} onClick={()=>props.delTask(props.task.id)}><AiOutlineDelete /></button>
            </div>
            <div className={classes.infoConteiner}>
                <span className={classes.date}>{props.task.publishDate}</span>
                <span className={classes.assignee}>{props.task.assignee}</span>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    updateTaskThunk: body => dispatch(updateTaskThunk(body))
});
export default connect(null, mapDispatchToProps)(Task);
