import React from "react";
import NotesMenuButton from "./NotesMenuButton";

// class NotesMenu extends React.Component {
//     constructor(props) {
//         super(props);
//         this.buttonInfo = [
//             {iconClass: "fa-solid fa-pencil", buttonText: "Tulis Catatan"},
//             {iconClass: "fa-solid fa-file-lines", buttonText: "Catatan Aktif"},
//             {iconClass: "fa-solid fa-box-archive", buttonText: "Arsip"},
//             {iconClass: "fa-solid fa-magnifying-glass", buttonText: "Cari Catatan"},
//         ]
        
//     }
//     render() {
//         return (
//             <div className="note-app__menu">
//                 {
//                     this.buttonInfo.forEach(info => {
//                         <NotesMenuButton iconClass={info.iconClass} buttonText={info.buttonText} />
//                     })
//                 }
//             </div>
//         )
//     }
// }

function NotesMenu() {
    const buttonInfo = [
        {iconClass: "feather-component", buttonText: "Tulis Catatan", buttonCLass:"write-button"},
        {iconClass: "fa-solid fa-file-lines", buttonText: "Catatan Aktif", buttonCLass:"note-button"},
        {iconClass: "fa-solid fa-box-archive", buttonText: "Arsip", buttonCLass:"archive-button"},
        {iconClass: "fa-solid fa-magnifying-glass", buttonText: "Cari Catatan", buttonCLass:"search-button"},
    ]
    return (
        <div className="note-app__menu">
            {buttonInfo.map((info, index) => (
                <NotesMenuButton 
                    key={index} 
                    iconClass={info.iconClass} 
                    buttonText={info.buttonText} 
                    buttonCLass={info.buttonCLass}
                />
            ))}
        </div>
    )
}

export default NotesMenu;

