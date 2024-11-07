import React from "react";
import FeatherIcon from "../icon/FeatherIcon";

// class NotesMenuButton extends React.Component {
//     constructor(props) {
//         super(props);
//         // console.log(this)
//     }
//     render() {
//         return (
//             <button className="note-app__menu__button">
//                 <i className={this.props.iconClass}></i>
//                 <span>{this.props.buttonText}</span>
//             </button>
//         )
//     }
// }

function NotesMenuButton({iconClass, buttonText, buttonCLass}) {
    if(iconClass == "feather-component") {
        return (
            // <button className={`"note-app__menu__button" ${buttonCLass}`}>
            <button className="note-app__menu__button" datatitle={buttonText}>
                <FeatherIcon />
            </button>
        )
    }else{
        return (
            // <button className={`"note-app__menu__button" ${buttonCLass}`}>
            <button className="note-app__menu__button" datatitle={buttonText}>
                <i className={iconClass}></i>
            </button>
        )
    }
}


export default NotesMenuButton;