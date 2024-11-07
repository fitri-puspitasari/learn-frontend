import React from "react";

class NotesListArea extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="note-content__list-area">
                <h3>Catatan Aktif</h3>
                <div className="notes-list">
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                    <div className="note-item"></div>
                </div>
            </div>
        )
    }
}

export default NotesListArea;