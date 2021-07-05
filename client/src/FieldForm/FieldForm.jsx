import React, { useState } from "react";
import classes from "./FieldForm.module.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveField } from "../Redux/taskReducer";
import { connect } from "react-redux";

const FieldForm = props => {

    const [title, setTitle] = useState("");

    const save = () => {
        props.saveField(title);
        setTitle("");
    };

    return <div className={classes.wrapper}>
        <TextField value={title} onChange={e => setTitle(e.target.value)} label="Field title" variant="outlined" />
        <Button disabled={!title} variant="contained" onClick={save} style={{width: "30%", margin: '5px auto 0 auto'}} color="primary">Add field</Button>
    </div>

};

const mapDispatchToProps = dispatch => ({ saveField: title => dispatch(saveField(title)) });

export default connect(null, mapDispatchToProps)(FieldForm);
