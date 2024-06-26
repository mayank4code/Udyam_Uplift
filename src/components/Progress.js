import React from "react";
import '../css/progress.css';
import ProgressBar from "@ramonak/react-progress-bar";



const Progress = (props) => {

    return <ProgressBar completed={Math.trunc(props.progress)}
        className="progress"
        bgColor="rgb(8, 50, 5)"
    />;

};

export default Progress;