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

function NotesMenu({ pageActive, onChangePage }) {
    const buttonInfo = [
        {iconClass: "feather-component", buttonText: "Tulis Catatan", pageContent: "writing-area"},
        {iconClass: "fa-solid fa-file-lines", buttonText: "Catatan Aktif", pageContent: "list-area"},
        {iconClass: "fa-solid fa-box-archive", buttonText: "Arsip", pageContent: "archive-area"},
        {iconClass: "fa-solid fa-magnifying-glass", buttonText: "Cari Catatan", pageContent: "search-area"},
    ]
    return (
        <div className="note-app__menu">
            {buttonInfo.map((info, index) => (
                <NotesMenuButton 
                    key={index} 
                    iconClass={info.iconClass} 
                    buttonText={info.buttonText} 
                    onChangePage={onChangePage}
                    pageContent={info.pageContent}
                    isActive={pageActive == info.pageContent}
                />
            ))}
        </div>
    )
}

export default NotesMenu;

