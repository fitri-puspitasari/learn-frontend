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

function NotesMenuButton({iconClass, buttonText, onChangePage, pageContent, isActive}) {
    const className = (isActive) ?  "note-app__menu__button button-active" : "note-app__menu__button button-inactive"
    if(iconClass == "feather-component") {
        return (
            <button className={className} datatitle={buttonText} onClick={() => onChangePage(pageContent)}>
                <FeatherIcon />
            </button>
        )
    }else{
        return (
            <button className={className} datatitle={buttonText} onClick={() => onChangePage(pageContent)}>
                <i className={iconClass}></i>
            </button>
        )
    }
}


export default NotesMenuButton;