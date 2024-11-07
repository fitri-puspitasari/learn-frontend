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
                    <div className="note-item">1</div>
                    <div className="note-item">2</div>
                    <div className="note-item">3</div>
                    <div className="note-item">4</div>
                    <div className="note-item">5</div>
                    <div className="note-item">6</div>
                    <div className="note-item">7</div>
                    <div className="note-item">8</div>
                    <div className="note-item">9</div>
                    <div className="note-item">10</div>
                    <div className="note-item">11</div>
                    <div className="note-item">12</div>
                    <div className="note-item">13</div>
                    <div className="note-item">14</div>
                    <div className="note-item">15</div>
                </div>
            </div>
        )
    }
}

export default NotesListArea;